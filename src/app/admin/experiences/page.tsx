"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseAdmin } from "@/app/lib/supabase-admin";
import { supabase, Experience } from "@/app/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, Pencil, Trash2, ArrowLeft, Save, X } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";


export default function AdminExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentExp, setCurrentExp] = useState<Partial<Experience>>({});
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchExperiences();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchExperiences() {
    const { data: { user } } = await supabaseAdmin.auth.getUser();
    if (!user) {
      router.push("/admin/login");
      return;
    }

    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
       toast.error("Failed to load experience data");
    } else {
       setExperiences(data || []);
    }
    setLoading(false);
  }

  const handleEdit = (exp: Experience) => {
      setCurrentExp(exp);
      setIsDialogOpen(true);
  };

  const handleAddNew = () => {
      setCurrentExp({
          display_order: experiences.length + 1,
          type: 'work',
          title: '',
          period: '',
          description: ''
      });
      setIsDialogOpen(true);
  }

  const handleDelete = async (id: string) => {
      if(!confirm("Are you sure you want to delete this item?")) return;

      const { error } = await supabaseAdmin.from('experiences').delete().eq('id', id);
      if(error) {
          toast.error("Failed to delete item");
      } else {
          toast.success("Item deleted");
          fetchExperiences();
      }
  }

  const handleSave = async (e: React.FormEvent) => {
      e.preventDefault();
      setSaving(true);
      
      const payload = {
          title: currentExp.title,
          period: currentExp.period,
          description: currentExp.description,
          type: currentExp.type,
          display_order: currentExp.display_order
      };

      let error;
      if (currentExp.id) {
         // Update
         const res = await supabaseAdmin.from('experiences').update(payload).eq('id', currentExp.id);
         error = res.error;
      } else {
         // Create
         const res = await supabaseAdmin.from('experiences').insert([payload]);
         error = res.error;
      }

      if (error) {
          console.error(error);
          toast.error("Failed to save item");
      } else {
          toast.success("Saved successfully");
          setIsDialogOpen(false);
          fetchExperiences();
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
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                    <Link href="/admin">
                        <Button variant="ghost" size="icon" className="mr-2">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold">Experience Timeline</h1>
                </div>
                <Button onClick={handleAddNew}>
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>

            <div className="grid gap-4">
                {experiences.map((exp) => (
                    <Card key={exp.id} className="relative group">
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{exp.period}</span>
                                        <span className={`text-xs font-bold uppercase ${exp.type === 'education' ? 'text-blue-500' : 'text-green-500'}`}>{exp.type}</span>
                                    </div>
                                    <CardTitle className="text-lg">{exp.title}</CardTitle>
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleEdit(exp)}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(exp.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{exp.description}</p>
                            <div className="mt-2 text-xs text-muted-foreground/50 font-mono">Order: {exp.display_order}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>{currentExp.id ? "Edit Experience" : "Add Experience"}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSave} className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="period">Period (e.g. 2020 - 2024)</Label>
                                <Input 
                                    id="period" 
                                    value={currentExp.period || ''} 
                                    onChange={(e) => setCurrentExp({...currentExp, period: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="display_order">Display Order</Label>
                                <Input 
                                    id="display_order" 
                                    type="number"
                                    value={currentExp.display_order || 0} 
                                    onChange={(e) => setCurrentExp({...currentExp, display_order: parseInt(e.target.value)})}
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="title">Job Title / Role</Label>
                            <Input 
                                id="title" 
                                value={currentExp.title || ''} 
                                onChange={(e) => setCurrentExp({...currentExp, title: e.target.value})}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="type">Type</Label>
                            <select 
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={currentExp.type || 'work'}
                                onChange={(e) => setCurrentExp({...currentExp, type: e.target.value as any})}
                            >
                                <option value="work">Work</option>
                                <option value="education">Education</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea 
                                id="description" 
                                rows={3}
                                value={currentExp.description || ''} 
                                onChange={(e) => setCurrentExp({...currentExp, description: e.target.value})}
                                required
                            />
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={saving}>
                                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                Save
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    </div>
  );
}
