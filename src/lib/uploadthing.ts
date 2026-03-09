import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const f = createUploadthing();

export const ourFileRouter = {
  // Profile avatar / headshot
  avatarUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await getServerSession(authOptions);
      if (!session?.user) throw new Error("Unauthorized");
      return { userId: (session.user as any).id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { url: file.url, userId: metadata.userId };
    }),

  // Portfolio images (headshots, production stills, lookbooks)
  portfolioUploader: f({ image: { maxFileSize: "8MB", maxFileCount: 10 } })
    .middleware(async () => {
      const session = await getServerSession(authOptions);
      if (!session?.user) throw new Error("Unauthorized");
      return { userId: (session.user as any).id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { url: file.url, userId: metadata.userId };
    }),

  // Video reel uploads
  reelUploader: f({ video: { maxFileSize: "256MB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await getServerSession(authOptions);
      if (!session?.user) throw new Error("Unauthorized");
      return { userId: (session.user as any).id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { url: file.url, userId: metadata.userId };
    }),

  // Resume / PDF uploads
  resumeUploader: f({ pdf: { maxFileSize: "8MB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await getServerSession(authOptions);
      if (!session?.user) throw new Error("Unauthorized");
      return { userId: (session.user as any).id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { url: file.url, userId: metadata.userId };
    }),

  // Project documents (contracts, call sheets, NDAs)
  documentUploader: f({
    pdf: { maxFileSize: "16MB", maxFileCount: 5 },
    image: { maxFileSize: "8MB", maxFileCount: 5 },
  })
    .middleware(async () => {
      const session = await getServerSession(authOptions);
      if (!session?.user) throw new Error("Unauthorized");
      return { userId: (session.user as any).id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { url: file.url, userId: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
