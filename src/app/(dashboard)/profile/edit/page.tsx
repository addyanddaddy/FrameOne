"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AvatarUpload } from "@/components/upload/avatar-upload";
import { FileUpload } from "@/components/upload/file-upload";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function ProfileEditPage() {
  const { data: session } = useSession();
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/profiles")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setProfiles(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-indigo-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white">My Profiles</h1>
        <p className="text-sm text-zinc-400 mt-1">Manage your professional profiles across different roles.</p>
      </div>

      {/* User info card with avatar upload */}
      <Card className="p-6">
        <div className="flex items-center gap-6">
          <AvatarUpload
            name={session?.user?.name || "User"}
            currentUrl={session?.user?.image}
            onUploadComplete={(url) => {
              fetch("/api/users/me", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ avatarUrl: url }),
              });
            }}
            size="xl"
          />
          <div>
            <h2 className="text-xl font-semibold text-white">{session?.user?.name}</h2>
            <p className="text-sm text-zinc-400">{session?.user?.email}</p>
            <div className="flex gap-2 mt-2">
              {profiles.map((p: any) => (
                <Badge key={p.id} variant="primary" size="sm">{p.role?.name}</Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Role profiles */}
      {profiles.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-800 bg-zinc-900/30 p-16 text-center">
          <UserCircleIcon className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No role profiles yet</h3>
          <p className="text-sm text-zinc-500 mb-6">Complete your onboarding to set up your professional profiles.</p>
          <Button onClick={() => window.location.href = "/onboarding"}>Complete Onboarding</Button>
        </div>
      ) : (
        <div className="space-y-4">
          {profiles.map((profile: any) => (
            <Card key={profile.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-white">{profile.role?.name}</h3>
                  <Badge variant="gold" size="sm">{profile.role?.level}</Badge>
                  <Badge variant="default" size="sm">{profile.role?.taxonomyGroup?.name}</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <span>{profile._count?.projectAssignments || 0} credits</span>
                  <span>•</span>
                  <span>{profile._count?.receivedEndorsements || 0} endorsements</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Display Name" defaultValue={profile.displayName} />
                <Input label="City" defaultValue={profile.city || ""} placeholder="Los Angeles" />
                <Input label="Region / State" defaultValue={profile.region || ""} placeholder="California" />
                <Input label="Country" defaultValue={profile.country || ""} placeholder="United States" />
              </div>

              <div className="mt-4">
                <Textarea label="Bio" defaultValue={profile.bio || ""} placeholder="Describe your experience, specialties, and what you bring to a production..." />
              </div>

              {/* Media uploads */}
              <div className="mt-6 border-t border-zinc-800 pt-6">
                <h4 className="text-sm font-semibold text-white mb-4">Media & Documents</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FileUpload
                    type="image"
                    label="Portfolio / Headshots"
                    description="Production stills, headshots, lookbooks"
                    currentUrl={profile.portfolioUrl}
                    onUploadComplete={(url) => console.log("Portfolio:", url)}
                  />
                  <FileUpload
                    type="video"
                    label="Demo Reel"
                    description="Your best work — MP4 or MOV up to 256MB"
                    currentUrl={profile.reelUrl}
                    onUploadComplete={(url) => console.log("Reel:", url)}
                  />
                  <FileUpload
                    type="document"
                    label="Resume / CV"
                    description="PDF format preferred"
                    currentUrl={profile.resumeUrl}
                    onUploadComplete={(url) => console.log("Resume:", url)}
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button size="sm">Save Changes</Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
