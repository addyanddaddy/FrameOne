"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  CloudArrowUpIcon,
  DocumentIcon,
  FilmIcon,
  PhotoIcon,
  XMarkIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

type UploadType = "image" | "video" | "document" | "any";

interface FileUploadProps {
  type?: UploadType;
  label?: string;
  description?: string;
  currentUrl?: string | null;
  onUploadComplete: (url: string) => void;
  onRemove?: () => void;
  className?: string;
}

const typeConfig = {
  image: {
    accept: "image/*",
    icon: PhotoIcon,
    label: "Upload Image",
    description: "JPG, PNG or WebP up to 8MB",
  },
  video: {
    accept: "video/*",
    icon: FilmIcon,
    label: "Upload Video Reel",
    description: "MP4 or MOV up to 256MB",
  },
  document: {
    accept: ".pdf,.doc,.docx",
    icon: DocumentIcon,
    label: "Upload Document",
    description: "PDF or Word up to 16MB",
  },
  any: {
    accept: "*",
    icon: CloudArrowUpIcon,
    label: "Upload File",
    description: "Any file up to 16MB",
  },
};

export function FileUpload({
  type = "any",
  label,
  description,
  currentUrl,
  onUploadComplete,
  onRemove,
  className,
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(!!currentUrl);
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const config = typeConfig[type];
  const Icon = config.icon;

  const handleFile = useCallback(async (file: File) => {
    setFileName(file.name);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/uploadthing", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data?.[0]?.url) {
          onUploadComplete(data[0].url);
          setUploaded(true);
        }
      }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  }, [onUploadComplete]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    setUploaded(false);
    setFileName(null);
    onRemove?.();
  };

  return (
    <div className={cn("space-y-1.5", className)}>
      {label && <label className="block text-sm font-medium text-zinc-300">{label}</label>}

      {uploaded && fileName ? (
        <div className="flex items-center justify-between rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-3">
          <div className="flex items-center gap-3">
            <CheckCircleIcon className="h-5 w-5 text-emerald-500" />
            <span className="text-sm text-white truncate max-w-[200px]">{fileName}</span>
          </div>
          <button onClick={handleRemove} className="text-zinc-400 hover:text-white transition-colors">
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={cn(
            "flex flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-8 cursor-pointer transition-colors",
            dragOver
              ? "border-indigo-500 bg-indigo-500/10"
              : "border-zinc-700 bg-zinc-800/30 hover:border-zinc-600 hover:bg-zinc-800/50",
            uploading && "pointer-events-none opacity-60"
          )}
        >
          {uploading ? (
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-indigo-500 border-t-transparent" />
          ) : (
            <>
              <Icon className="h-8 w-8 text-zinc-500 mb-2" />
              <p className="text-sm font-medium text-zinc-300">{config.label}</p>
              <p className="text-xs text-zinc-500 mt-1">{description || config.description}</p>
              <p className="text-xs text-indigo-400 mt-2">Click or drag and drop</p>
            </>
          )}
          <input
            type="file"
            accept={config.accept}
            onChange={handleChange}
            className="hidden"
            disabled={uploading}
          />
        </label>
      )}
    </div>
  );
}
