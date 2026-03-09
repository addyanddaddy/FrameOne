import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { success, error, requireAuth, getSearchParams } from "@/lib/api-helpers";

export async function GET(req: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const userId = (auth.session!.user as any).id;
  const params = getSearchParams(req);

  try {
    if (params.conversationWith) {
      // Get messages with a specific user
      const messages = await prisma.message.findMany({
        where: {
          OR: [
            { senderId: userId, recipientId: params.conversationWith },
            { senderId: params.conversationWith, recipientId: userId },
          ],
        },
        include: {
          sender: { select: { id: true, name: true, avatarUrl: true } },
        },
        orderBy: { createdAt: "asc" },
        take: 100,
      });

      // Mark unread messages as read
      await prisma.message.updateMany({
        where: {
          senderId: params.conversationWith,
          recipientId: userId,
          readAt: null,
        },
        data: { readAt: new Date() },
      });

      return success(messages);
    }

    // Get conversation list
    const conversations = await prisma.conversation.findMany({
      where: {
        OR: [
          { participantA: userId },
          { participantB: userId },
        ],
      },
      include: {
        userA: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
            roleProfiles: {
              include: { role: { select: { name: true } } },
              take: 1,
            },
          },
        },
        userB: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
            roleProfiles: {
              include: { role: { select: { name: true } } },
              take: 1,
            },
          },
        },
      },
      orderBy: { lastMessageAt: "desc" },
    });

    // Get unread counts
    const conversationsWithUnread = await Promise.all(
      conversations.map(async (conv) => {
        const otherUserId = conv.participantA === userId ? conv.participantB : conv.participantA;
        const otherUser = conv.participantA === userId ? conv.userB : conv.userA;
        const unreadCount = await prisma.message.count({
          where: { senderId: otherUserId, recipientId: userId, readAt: null },
        });
        const lastMessage = await prisma.message.findFirst({
          where: {
            OR: [
              { senderId: userId, recipientId: otherUserId },
              { senderId: otherUserId, recipientId: userId },
            ],
          },
          orderBy: { createdAt: "desc" },
          select: { content: true, createdAt: true, senderId: true },
        });
        return { ...conv, otherUser, unreadCount, lastMessage };
      })
    );

    return success(conversationsWithUnread);
  } catch (e) {
    return error("Failed to fetch messages", 500);
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const userId = (auth.session!.user as any).id;

  try {
    const { recipientId, content } = await req.json();
    if (!recipientId || !content?.trim()) return error("recipientId and content are required", 422);

    const message = await prisma.message.create({
      data: {
        senderId: userId,
        recipientId,
        content: content.trim(),
      },
    });

    // Upsert conversation
    const [a, b] = [userId, recipientId].sort();
    await prisma.conversation.upsert({
      where: { participantA_participantB: { participantA: a, participantB: b } },
      update: { lastMessageAt: new Date() },
      create: { participantA: a, participantB: b },
    });

    return success(message, 201);
  } catch (e) {
    return error("Failed to send message", 500);
  }
}
