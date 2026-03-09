"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { cn, getInitials } from "@/lib/utils";
import { CameraIcon } from "@heroicons/react/24/outline";

interface AvatarUploadProps {
  currentUrl?: string | null;
  name: string;
  onUploadComplete: (url: string) => void;
  size?: "md" | "lg" | "xl";
}

const sizeClasses = {
  md: "h-16 w-16 text-lg",
  lg: "h-24 w-24 text-2xl",
  xl: "h-32 w-32 text-3xl",
};

export function AvatarUpload({ currentUrl, name, onUploadComplete, size = "xl" }: AvatarUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentUrl || null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview immediately
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(file);

    // Upload
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/uploadthing", {
        method: "POST",
        headers: { "x-uploadthing-package": "avatarUploader" },
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data?.[0]?.url) {
          onUploadComplete(data[0].url);
        }
      }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  }, [onUploadComplete]);

  return (
    <div className="relative group">
      <div className={cn(
        "relative rounded-full overflow-hidden bg-zinc-700 flex items-center justify-center ring-4 ring-zinc-800",
        sizeClasses[size],
      )}>
        {preview ? (
          <Image src={preview} alt={name} fill className="object-cover" />
        ) : (
          <span className="font-semibold text-zinc-400 select-none">{getInitials(name)}</span>
        )}

        {/* Hover overlay */}
        <label className={cn(
          "absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer",
          uploading && "opacity-100"
        )}>
          {uploading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent" />
          ) : (
            <>
              <CameraIcon className="h-6 w-6 text-white mb-1" />
              <span className="text-[10px] text-white font-medium">Change Photo</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={uploading}
          />
        </label>
      </div>
    </div>
  );
}
