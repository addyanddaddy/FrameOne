"use client";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <h2 className="text-xl font-light text-[#f0efe6]">Something went wrong</h2>
      <p className="text-sm text-[#9e9eab] max-w-md text-center">{error.message}</p>
      <button
        onClick={reset}
        className="px-6 py-2 rounded-full bg-[#9d7663] text-white text-sm hover:bg-[#c4a47a] transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
