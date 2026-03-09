import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { success, error, requireAuth, getSearchParams } from "@/lib/api-helpers";

export async function GET(req: NextRequest) {
  const params = getSearchParams(req);
  const page = parseInt(params.page || "1");
  const limit = 20;

  try {
    const posts = await prisma.post.findMany({
      where: { visibility: "public" },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
            roleProfiles: {
              include: { role: { select: { name: true, slug: true } } },
              take: 1,
            },
          },
        },
        comments: {
          include: {
            author: { select: { id: true, name: true, avatarUrl: true } },
          },
          orderBy: { createdAt: "asc" },
          take: 5,
        },
        _count: { select: { comments: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    });

    return success(posts);
  } catch (e) {
    return error("Failed to fetch posts", 500);
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const userId = (auth.session!.user as any).id;

  try {
    const { content, imageUrl, videoUrl, postType, visibility, targetRoles } = await req.json();
    if (!content?.trim()) return error("Content is required", 422);

    const post = await prisma.post.create({
      data: {
        authorId: userId,
        content: content.trim(),
        imageUrl,
        videoUrl,
        postType: postType || "update",
        visibility: visibility || "public",
        targetRoles,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
            roleProfiles: {
              include: { role: { select: { name: true, slug: true } } },
              take: 1,
            },
          },
        },
        _count: { select: { comments: true } },
      },
    });

    return success(post, 201);
  } catch (e) {
    return error("Failed to create post", 500);
  }
}
