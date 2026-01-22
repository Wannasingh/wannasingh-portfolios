"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseAdmin } from "@/app/lib/supabase-admin";
import { supabase, Project } from "@/app/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, Pencil, Trash2, ArrowLeft, Save, Star, ExternalLink, Github, Upload, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<Project>>({});
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  // Temporary state for array inputs as text strings (comma separated)
  const [techStackStr, setTechStackStr] = useState("");
  const [keyFeaturesStr, setKeyFeaturesStr] = useState("");

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchData() {
    const { data: { user } } = await supabaseAdmin.auth.getUser();
    if (!user) {
      router.push("/admin/login");
      return;
    }

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
       toast.error("Failed to load projects");
    } else {
       setProjects(data || []);
    }
    setLoading(false);
  }

  const handleEdit = (project: Project) => {
      setCurrentProject(project);
      setTechStackStr(project.tech_stack?.join(", ") || "");
      setKeyFeaturesStr(project.key_features?.join("\n") || "");
      setIsDialogOpen(true);
  };

  const handleAddNew = () => {
      setCurrentProject({
          title: "",
          is_featured: false,
          tech_stack: [],
          key_features: [],
          image_path: ""
      });
      setTechStackStr("");
      setKeyFeaturesStr("");
      setIsDialogOpen(true);
  }

  const handleDelete = async (id: string) => {
      if(!confirm("Are you sure? This action cannot be undone.")) return;

      const { error } = await supabaseAdmin.from('projects').delete().eq('id', id);
      if(error) {
          toast.error("Failed to delete project");
      } else {
          toast.success("Project deleted");
          fetchData();
      }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files || e.target.files.length === 0) {
          return;
      }
      const file = e.target.files[0];
      setUploading(true);
      
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('portfolio-assets')
            .upload(filePath, file);

        if (uploadError) {
             console.error("Upload error details:", uploadError);
             throw uploadError;
        }
        
        // Get Public URL
        const { data: { publicUrl } } = supabase.storage
            .from('portfolio-assets')
            .getPublicUrl(filePath);

        setCurrentProject(prev => ({ ...prev, image_path: publicUrl }));
        toast.success("Image uploaded successfully");

      } catch (error: unknown) {
          const err = error as Error;
          console.error("Error uploading image:", err);
          toast.error(`Upload failed: ${err.message || "Unknown error"}. Check console.`);
      } finally {
          setUploading(false);
      }
  };

  const handleSave = async (e: React.FormEvent) => {
      e.preventDefault();
      setSaving(true);
      
      const techStackArray = techStackStr.split(',').map(s => s.trim()).filter(s => s.length > 0);
      const keyFeaturesArray = keyFeaturesStr.split('\n').map(s => s.trim()).filter(s => s.length > 0);

      const payload = {
          ...currentProject,
          tech_stack: techStackArray,
          key_features: keyFeaturesArray,
      };
      
      // Remove id from payload if creating
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, created_at, ...updateData } = payload;

      let error;
      if (currentProject.id) {
         const res = await supabaseAdmin.from('projects').update(updateData).eq('id', currentProject.id);
         error = res.error;
      } else {
         const res = await supabaseAdmin.from('projects').insert([updateData]);
         error = res.error;
      }

      if (error) {
          console.error(error);
          toast.error("Failed to save project");
      } else {
          toast.success("Project saved successfully");
          setIsDialogOpen(false);
          fetchData();
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

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="container mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                    <Link href="/admin">
                        <Button variant="ghost" size="icon" className="mr-2">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold">Projects Showcase</h1>
                </div>
                <Button onClick={handleAddNew}>
                    <Plus className="mr-2 h-4 w-4" /> Add Project
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {projects.map((project) => (
                    <Card key={project.id} className="flex flex-col h-full border hover:border-primary/50 transition-colors">
                        <div className="relative h-48 w-full bg-muted overflow-hidden rounded-t-lg">
                            {project.image_path ? (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img src={project.image_path} alt={project.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-muted-foreground">
                                    <ImageIcon className="h-10 w-10 opacity-20" />
                                </div>
                            )}
                            {project.is_featured && (
                                <span className="absolute top-2 right-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full flex items-center gap-1 font-bold shadow-sm">
                                    <Star className="h-3 w-3 fill-current" /> Featured
                                </span>
                            )}
                        </div>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs font-mono uppercase text-muted-foreground border px-1 rounded">{project.category || "Uncategorized"}</span>
                                    </div>
                                    <CardTitle>{project.title}</CardTitle>
                                </div>
                                <div className="flex gap-1">
                                    <Button variant="ghost" size="icon" onClick={() => handleEdit(project)}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleDelete(project.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-4">
                            <p className="text-sm text-muted-foreground line-clamp-2">{project.overview || project.problem}</p>
                            
                            <div className="flex flex-wrap gap-1">
                                {project.tech_stack?.slice(0, 5).map(tech => (
                                    <span key={tech} className="text-xs bg-secondary px-2 py-0.5 rounded text-secondary-foreground">{tech}</span>
                                ))}
                                {project.tech_stack && project.tech_stack.length > 5 && (
                                    <span className="text-xs text-muted-foreground px-1">+{project.tech_stack.length - 5} more</span>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="border-t pt-4 text-xs text-muted-foreground flex justify-between">
                            <div className="flex gap-3">
                                {project.demo_link && (
                                    <a href={project.demo_link} target="_blank" className="flex items-center hover:text-primary">
                                        <ExternalLink className="h-3 w-3 mr-1"/> Demo
                                    </a>
                                )}
                                {project.github_link && (
                                    <a href={project.github_link} target="_blank" className="flex items-center hover:text-primary">
                                        <Github className="h-3 w-3 mr-1"/> Code
                                    </a>
                                )}
                            </div>
                            <div>
                                {new Date(project.created_at).toLocaleDateString()}
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{currentProject.id ? "Edit Project" : "New Project"}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSave} className="space-y-6 py-4">
                         
                        {/* Image Upload Section */}
                        <div className="space-y-2">
                             <Label>Project Image</Label>
                             <div className="flex items-center gap-4">
                                {currentProject.image_path ? (
                                    <div className="relative w-32 h-20 rounded border overflow-hidden">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={currentProject.image_path} alt="Preview" className="w-full h-full object-cover" />
                                        <button 
                                            type="button"
                                            onClick={() => setCurrentProject(p => ({...p, image_path: ""}))}
                                            className="absolute top-0 right-0 bg-destructive text-white p-1 rounded-bl"
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="w-32 h-20 rounded border border-dashed flex items-center justify-center bg-muted/50">
                                        <ImageIcon className="h-6 w-6 text-muted-foreground" />
                                    </div>
                                )}
                                <div className="flex-1">
                                    <Label htmlFor="image-upload" className="cursor-pointer inline-flex h-9 items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium shadow-sm hover:bg-secondary/80">
                                        {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                                        {uploading ? "Uploading..." : "Upload Image"}
                                    </Label>
                                    <Input 
                                        id="image-upload" 
                                        type="file" 
                                        accept="image/*" 
                                        className="hidden" 
                                        onChange={handleFileUpload}
                                        disabled={uploading}
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Recommended: 16:9 aspect ratio.
                                    </p>
                                    {/* Fallback text input for manual URL */}
                                    <Input 
                                        value={currentProject.image_path || ""}
                                        onChange={(e) => setCurrentProject(p => ({...p, image_path: e.target.value}))}
                                        placeholder="Or paste image URL directly"
                                        className="mt-2 h-8 text-xs font-mono"
                                    />
                                </div>
                             </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <Label htmlFor="title">Project Title</Label>
                                <Input 
                                    id="title" 
                                    value={currentProject.title || ''} 
                                    onChange={(e) => setCurrentProject({...currentProject, title: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Input 
                                    id="category" 
                                    value={currentProject.category || ''} 
                                    onChange={(e) => setCurrentProject({...currentProject, category: e.target.value})}
                                    placeholder="e.g. Full Stack App"
                                />
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="overview">Overview</Label>
                            <Textarea 
                                id="overview" 
                                value={currentProject.overview || ''} 
                                onChange={(e) => setCurrentProject({...currentProject, overview: e.target.value})}
                                placeholder="Short description of the project"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <Label htmlFor="problem">Problem</Label>
                                <Textarea 
                                    id="problem" 
                                    value={currentProject.problem || ''} 
                                    onChange={(e) => setCurrentProject({...currentProject, problem: e.target.value})}
                                    rows={2}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="solution">Solution</Label>
                                <Textarea 
                                    id="solution" 
                                    value={currentProject.solution || ''} 
                                    onChange={(e) => setCurrentProject({...currentProject, solution: e.target.value})}
                                    rows={2}
                                />
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="impact">Impact</Label>
                            <Input 
                                id="impact" 
                                value={currentProject.impact || ''} 
                                onChange={(e) => setCurrentProject({...currentProject, impact: e.target.value})}
                                placeholder="e.g. Reduced latency by 50%"
                            />
                        </div>

                        <div className="space-y-2">
                             <Label>Tech Stack (comma separated)</Label>
                             <Input 
                                value={techStackStr}
                                onChange={(e) => setTechStackStr(e.target.value)}
                                placeholder="React, Node.js, Postgres, Redis"
                             />
                        </div>

                        <div className="space-y-2">
                             <Label>Key Features (one per line)</Label>
                             <Textarea 
                                value={keyFeaturesStr}
                                onChange={(e) => setKeyFeaturesStr(e.target.value)}
                                placeholder="Real-time updates&#10;Offline mode&#10;User auth"
                                rows={4}
                             />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="demo_link">Live Demo URL</Label>
                                <Input 
                                    id="demo_link" 
                                    value={currentProject.demo_link || ''} 
                                    onChange={(e) => setCurrentProject({...currentProject, demo_link: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="github_link">GitHub URL</Label>
                                <Input 
                                    id="github_link" 
                                    value={currentProject.github_link || ''} 
                                    onChange={(e) => setCurrentProject({...currentProject, github_link: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="flex items-center space-x-2 border p-4 rounded-lg bg-secondary/10">
                            <input 
                                type="checkbox" 
                                id="is_featured"
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                checked={currentProject.is_featured || false}
                                onChange={(e) => setCurrentProject({...currentProject, is_featured: e.target.checked})}
                            />
                            <div className="flex flex-col">
                                <Label htmlFor="is_featured" className="cursor-pointer font-bold">Featured Project</Label>
                                <span className="text-xs text-muted-foreground">Featured projects appear on the homepage.</span>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={saving}>
                                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                Save Project
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    </div>
  );
}
