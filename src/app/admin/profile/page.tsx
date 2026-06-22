"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabaseAdmin } from '@/app/lib/admin-client';
import { supabase } from '@/app/lib/api-client'; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import { uploadImage } from "@/app/lib/storage-utils";

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
  avatar_url?: string;
  about_analogy_title_left?: string;
  about_analogy_desc_left?: string;
  about_analogy_title_right?: string;
  about_analogy_desc_right?: string;
  about_analogy_center_title?: string;
  about_analogy_label_left?: string;
  about_analogy_label_right?: string;
  about_analogy_label_center?: string;
  about_evolution_title?: string;
  about_evolution_subtitle?: string;
}

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
      if (!e.target.files || e.target.files.length === 0) return;
      const file = e.target.files[0];
      setUploading(true);

      try {
          const url = await uploadImage(file, "profile");
          setProfile(prev => prev ? ({ ...prev, avatar_url: url }) : null);
          toast.success("Photo uploaded successfully");
      } catch (err) {
          console.error("Photo upload error:", err);
          toast.error("Failed to upload photo. Ensure storage bucket is active.");
      } finally {
          setUploading(false);
      }
  }

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
            about_philosophy_content: profile.about_philosophy_content,
            avatar_url: profile.avatar_url,
            about_analogy_title_left: profile.about_analogy_title_left,
            about_analogy_desc_left: profile.about_analogy_desc_left,
            about_analogy_title_right: profile.about_analogy_title_right,
            about_analogy_desc_right: profile.about_analogy_desc_right,
            about_analogy_center_title: profile.about_analogy_center_title,
            about_analogy_label_left: profile.about_analogy_label_left,
            about_analogy_label_right: profile.about_analogy_label_right,
            about_analogy_label_center: profile.about_analogy_label_center,
            about_evolution_title: profile.about_evolution_title,
            about_evolution_subtitle: profile.about_evolution_subtitle
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
                        {/* Profile Photo Upload */}
                        <div className="flex flex-col md:flex-row items-center gap-6 pb-6 border-b">
                            <div className="relative w-28 h-28 rounded-full overflow-hidden border bg-muted flex items-center justify-center shrink-0">
                                {profile.avatar_url ? (
                                    <Image 
                                        src={profile.avatar_url} 
                                        alt="Profile Preview" 
                                        width={112}
                                        height={112}
                                        className="w-full h-full object-cover"
                                        unoptimized
                                    />
                                ) : (
                                    <span className="text-muted-foreground text-sm">No Photo</span>
                                )}
                                {uploading && (
                                    <div className="absolute inset-0 bg-background/85 flex items-center justify-center">
                                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2 flex-1">
                                <Label className="text-sm font-semibold">Profile Photo</Label>
                                <Input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handlePhotoUpload} 
                                    disabled={uploading}
                                    className="max-w-xs cursor-pointer bg-background"
                                />
                                <p className="text-xs text-muted-foreground">Supported formats: JPG, PNG, GIF, WebP.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input 
                                    id="name" 
                                    value={profile.name || ''} 
                                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input 
                                    id="email" 
                                    value={profile.email || ''} 
                                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="role">Role / Title (displayed in Hero)</Label>
                            <Input 
                                id="role" 
                                value={profile.role || ''} 
                                onChange={(e) => setProfile({...profile, role: e.target.value})}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="tagline">Tagline (Headline)</Label>
                            <Textarea 
                                id="tagline" 
                                rows={2}
                                value={profile.tagline || ''} 
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
                                value={profile.bio_short || ''} 
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

                        <div className="space-y-4 border p-4 rounded-lg bg-secondary/5">
                            <h3 className="font-semibold text-sm">About Page - Interactive Analogy (Fusion Engine)</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="analogy_title_left">Left Card Title (Data)</Label>
                                    <Input 
                                        id="analogy_title_left" 
                                        value={profile.about_analogy_title_left || ''} 
                                        onChange={(e) => setProfile({...profile, about_analogy_title_left: e.target.value})}
                                        placeholder='Solid Data'
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="analogy_desc_left">Left Card Subtitle</Label>
                                    <Input 
                                        id="analogy_desc_left" 
                                        value={profile.about_analogy_desc_left || ''} 
                                        onChange={(e) => setProfile({...profile, about_analogy_desc_left: e.target.value})}
                                        placeholder='DBA & Storage'
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="analogy_title_right">Right Card Title (UI)</Label>
                                    <Input 
                                        id="analogy_title_right" 
                                        value={profile.about_analogy_title_right || ''} 
                                        onChange={(e) => setProfile({...profile, about_analogy_title_right: e.target.value})}
                                        placeholder='Fluid UI'
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="analogy_desc_right">Right Card Subtitle</Label>
                                    <Input 
                                        id="analogy_desc_right" 
                                        value={profile.about_analogy_desc_right || ''} 
                                        onChange={(e) => setProfile({...profile, about_analogy_desc_right: e.target.value})}
                                        placeholder='App & Frontend'
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="analogy_center_title">Center Glowing Title</Label>
                                <Input 
                                    id="analogy_center_title" 
                                    value={profile.about_analogy_center_title || ''} 
                                    onChange={(e) => setProfile({...profile, about_analogy_center_title: e.target.value})}
                                    placeholder='The Hybrid Architect'
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="analogy_label_left">Left Slogan (Data Hover)</Label>
                                    <Input 
                                        id="analogy_label_left" 
                                        value={profile.about_analogy_label_left || ''} 
                                        onChange={(e) => setProfile({...profile, about_analogy_label_left: e.target.value})}
                                        placeholder='Robust Infrastructure'
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="analogy_label_right">Right Slogan (UI Hover)</Label>
                                    <Input 
                                        id="analogy_label_right" 
                                        value={profile.about_analogy_label_right || ''} 
                                        onChange={(e) => setProfile({...profile, about_analogy_label_right: e.target.value})}
                                        placeholder='Stunning Experience'
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="analogy_label_center">Center Slogan (Default)</Label>
                                    <Input 
                                        id="analogy_label_center" 
                                        value={profile.about_analogy_label_center || ''} 
                                        onChange={(e) => setProfile({...profile, about_analogy_label_center: e.target.value})}
                                        placeholder='The Perfect Balance'
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 border p-4 rounded-lg bg-secondary/5">
                            <h3 className="font-semibold text-sm">About Page - Evolution Headers</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="evolution_title">Evolution Title</Label>
                                    <Input 
                                        id="evolution_title" 
                                        value={profile.about_evolution_title || ''} 
                                        onChange={(e) => setProfile({...profile, about_evolution_title: e.target.value})}
                                        placeholder='My Evolution'
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="evolution_subtitle">Evolution Subtitle</Label>
                                    <Input 
                                        id="evolution_subtitle" 
                                        value={profile.about_evolution_subtitle || ''} 
                                        onChange={(e) => setProfile({...profile, about_evolution_subtitle: e.target.value})}
                                        placeholder='A path from deep backend infrastructure to modern frontend mastery.'
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="github">GitHub Link</Label>
                                <Input 
                                    id="github" 
                                    value={profile.github_link || ''} 
                                    onChange={(e) => setProfile({...profile, github_link: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="linkedin">LinkedIn Link</Label>
                                <Input 
                                    id="linkedin" 
                                    value={profile.linkedin_link || ''} 
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
