"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseAdmin } from "@/app/lib/supabase-admin";
import { supabase } from "@/app/lib/supabase"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface ProfileData {
  id?: string;
  name: string;
  role: string;
  email: string;
  tagline: string;
  bio_short: string;
  github_link: string;
  linkedin_link: string;
  twitter_link?: string;
  about_philosophy_title?: string;
  about_philosophy_content?: string;
}

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkUserAndFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function checkUserAndFetch() {
    const { data: { user } } = await supabaseAdmin.auth.getUser();
    if (!user) {
      router.push("/admin/login");
      return;
    }
    
    // Fetch Profile
    const { data, error } = await supabase
      .from('profile')
      .select('*')
      .single();

    if (error) {
       console.error(error);
       toast.error("Failed to load profile data");
    } else {
       setProfile(data);
    }
    setLoading(false);
  }

  async function handleSave(e: React.FormEvent) {
      e.preventDefault();
      if (!profile) return;
      setSaving(true);

      const { error } = await supabaseAdmin
        .from('profile')
        .update({
            name: profile.name,
            role: profile.role,
            email: profile.email,
            tagline: profile.tagline,
            bio_short: profile.bio_short,
            github_link: profile.github_link,
            linkedin_link: profile.linkedin_link,
            twitter_link: profile.twitter_link,
            about_philosophy_title: profile.about_philosophy_title,
            about_philosophy_content: profile.about_philosophy_content
        })
        .eq('id', profile.id);

      if (error) {
          toast.error("Failed to update profile");
          console.error(error);
      } else {
          toast.success("Profile updated successfully");
      }
      setSaving(false);
  }

  if (loading) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-background">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
      );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-6">
                <Link href="/admin">
                    <Button variant="ghost" size="icon" className="mr-2">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold">Manage Profile</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input 
                                    id="name" 
                                    value={profile.name} 
                                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input 
                                    id="email" 
                                    value={profile.email} 
                                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="role">Role / Title (displayed in Hero)</Label>
                            <Input 
                                id="role" 
                                value={profile.role} 
                                onChange={(e) => setProfile({...profile, role: e.target.value})}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="tagline">Tagline (Headline)</Label>
                            <Textarea 
                                id="tagline" 
                                rows={2}
                                value={profile.tagline} 
                                onChange={(e) => setProfile({...profile, tagline: e.target.value})}
                                className="resize-none"
                            />
                            <p className="text-xs text-muted-foreground">Use a period (.) to separate lines in the Hero display.</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bio">Short Bio (Hero Description)</Label>
                            <Textarea 
                                id="bio" 
                                rows={3}
                                value={profile.bio_short} 
                                onChange={(e) => setProfile({...profile, bio_short: e.target.value})}
                            />
                        </div>
                        
                        <div className="space-y-4 border p-4 rounded-lg bg-secondary/5">
                            <h3 className="font-semibold text-sm">About Page Content</h3>
                            <div className="space-y-2">
                                <Label htmlFor="about_title">Philosophy Title</Label>
                                <Input 
                                    id="about_title" 
                                    value={profile.about_philosophy_title || ''} 
                                    onChange={(e) => setProfile({...profile, about_philosophy_title: e.target.value})}
                                    placeholder='The "Heavy Lifting" Philosophy'
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="about_content">Philosophy Content</Label>
                                <Textarea 
                                    id="about_content" 
                                    rows={5}
                                    value={profile.about_philosophy_content || ''} 
                                    onChange={(e) => setProfile({...profile, about_philosophy_content: e.target.value})}
                                    placeholder="My journey didn't start with CSS animations..."
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="github">GitHub Link</Label>
                                <Input 
                                    id="github" 
                                    value={profile.github_link} 
                                    onChange={(e) => setProfile({...profile, github_link: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="linkedin">LinkedIn Link</Label>
                                <Input 
                                    id="linkedin" 
                                    value={profile.linkedin_link} 
                                    onChange={(e) => setProfile({...profile, linkedin_link: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="twitter">Twitter/X Link</Label>
                                <Input 
                                    id="twitter" 
                                    value={profile.twitter_link || ''} 
                                    onChange={(e) => setProfile({...profile, twitter_link: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <Button type="submit" disabled={saving} className="min-w-[120px]">
                                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                {saving ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
