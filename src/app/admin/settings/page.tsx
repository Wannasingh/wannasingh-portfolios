"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseAdmin } from "@/app/lib/supabase-admin";
import { supabase } from "@/app/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2, Save, ArrowLeft, Upload, FileText } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface SystemSettings {
    id: string;
    site_title: string;
    site_description: string;
    resume_url: string;
    maintenance_mode: boolean;
    google_analytics_id: string;
}

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState<SystemSettings | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetchSettings();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function fetchSettings() {
        const { data: { user } } = await supabaseAdmin.auth.getUser();
        if (!user) {
            router.push("/admin/login");
            return;
        }

        const { data, error } = await supabase
            .from('system_settings')
            .select('*')
            .single();
        
        if (data) {
            setSettings(data);
        } else if (error && error.code !== 'PGRST116') { // PGRST116 is 'not found'
             toast.error("Failed to fetch settings");
        } else {
             // If no settings exist yet, we might want to initialize (or handle in SQL)
             // For now, let's assume the SQL insert ran.
        }
        setLoading(false);
    }

    async function handleSave(e: React.FormEvent) {
        e.preventDefault();
        if (!settings) return;
        setSaving(true);

        const { error } = await supabaseAdmin
            .from('system_settings')
            .update({
                site_title: settings.site_title,
                site_description: settings.site_description,
                resume_url: settings.resume_url,
                maintenance_mode: settings.maintenance_mode,
                google_analytics_id: settings.google_analytics_id
            })
            .eq('id', settings.id);

        if (error) {
            toast.error("Failed to save settings");
            console.error(error);
        } else {
            toast.success("Settings saved successfully");
        }
        setSaving(false);
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        setUploading(true);
        
        try {
            const fileName = `resume-${Date.now()}.pdf`; // Simple unique name
            const { error: uploadError } = await supabase.storage
                .from('portfolio-assets')
                .upload(fileName, file, {
                    contentType: 'application/pdf',
                    upsert: true
                });

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('portfolio-assets')
                .getPublicUrl(fileName);

            setSettings(prev => prev ? ({ ...prev, resume_url: publicUrl }) : null);
            toast.success("Resume uploaded successfully");

        } catch (error: any) {
            console.error("Upload error:", error);
            toast.error("Failed to upload resume. Ensure bucket exists.");
        } finally {
            setUploading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!settings) {
        return (
             <div className="p-8 text-center text-muted-foreground">
                 No settings found. Please run the setup SQL script.
             </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <Link href="/admin">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold">General Settings</h1>
                 </div>
                 <Button onClick={handleSave} disabled={saving}>
                    {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Save Changes
                 </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>SEO & Metadata</CardTitle>
                        <CardDescription>Control how your site appears in search results.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Site Title</Label>
                            <Input 
                                value={settings.site_title || ''}
                                onChange={(e) => setSettings({...settings, site_title: e.target.value})}
                                placeholder="Wannasingh Portfolio"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Site Description</Label>
                            <Textarea 
                                value={settings.site_description || ''}
                                onChange={(e) => setSettings({...settings, site_description: e.target.value})}
                                placeholder="Full Stack Developer..."
                                rows={3}
                            />
                        </div>
                         <div className="space-y-2">
                            <Label>Google Analytics ID</Label>
                            <Input 
                                value={settings.google_analytics_id || ''}
                                onChange={(e) => setSettings({...settings, google_analytics_id: e.target.value})}
                                placeholder="G-XXXXXXXXXX"
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Files & Downloads</CardTitle>
                        <CardDescription>Manage downloadable assets.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Resume (PDF)</Label>
                            <div className="flex items-center gap-2">
                                <div className="flex-1">
                                    <Input 
                                        value={settings.resume_url || ''}
                                        onChange={(e) => setSettings({...settings, resume_url: e.target.value})}
                                        placeholder="https://..."
                                        className="text-xs font-mono"
                                    />
                                </div>
                                <div className="relative">
                                    <Input 
                                        type="file" 
                                        accept=".pdf" 
                                        className="absolute inset-0 opacity-0 cursor-pointer" 
                                        onChange={handleFileUpload}
                                        disabled={uploading}
                                    />
                                    <Button variant="outline" size="icon" type="button" disabled={uploading}>
                                        {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                                    </Button>
                                </div>
                            </div>
                            {settings.resume_url && (
                                <a href={settings.resume_url} target="_blank" className="text-xs text-primary flex items-center hover:underline mt-1">
                                    <FileText className="h-3 w-3 mr-1" /> Test Link
                                </a>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2 border-destructive/20 bg-destructive/5">
                    <CardHeader>
                        <CardTitle className="text-destructive">Danger Zone</CardTitle>
                        <CardDescription>Global switches that affect site availability.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between border p-4 rounded-lg bg-background">
                            <div className="space-y-0.5">
                                <Label className="text-base">Maintenance Mode</Label>
                                <p className="text-sm text-muted-foreground">
                                    Hide all pages and show a "Under Construction" screen.
                                </p>
                            </div>
                            <Switch 
                                checked={settings.maintenance_mode || false}
                                onCheckedChange={(c: boolean) => setSettings({...settings, maintenance_mode: c})}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
