"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseAdmin } from "@/app/lib/supabase-admin";
import { supabase, SkillCategory, Skill } from "@/app/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, Pencil, Trash2, ArrowLeft, ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
const AVAILABLE_ICONS = [
  "SiOracle", "SiPostgresql", "SiDatabricks", "SiApachespark", "SiVeritas", 
  "SiNodedotjs", "SiDotnet", "SiOpenapiinitiative", "SiGraphql", "SiRedis", "SiDocker",
  "SiReact", "SiNextdotjs", "SiTypescript", "SiFramer", "SiRedux", "SiTailwindcss",
  "SiShield" // Manual mapping in frontend
];

export default function AdminSkillsPage() {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Dialog States
  const [isCatDialogOpen, setIsCatDialogOpen] = useState(false);
  const [isSkillDialogOpen, setIsSkillDialogOpen] = useState(false);
  
  const [currentCat, setCurrentCat] = useState<Partial<SkillCategory>>({});
  const [currentSkill, setCurrentSkill] = useState<Partial<Skill>>({});
  
  const [expandedCat, setExpandedCat] = useState<string | null>(null);

  const router = useRouter();

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
      .from('skill_categories')
      .select(`
        *,
        skills (*)
      `)
      .order('display_order', { ascending: true });

    if (error) {
       toast.error("Failed to load skills");
    } else {
       // Sort skills
       const sorted = data?.map((cat: SkillCategory) => ({
           ...cat,
           skills: cat.skills.sort((a: Skill, b: Skill) => a.display_order - b.display_order)
       })) || [];
       setCategories(sorted);
    }
    setLoading(false);
  }

  // --- Category Handlers ---
  const handleEditCat = (cat: SkillCategory) => {
      setCurrentCat(cat);
      setIsCatDialogOpen(true);
  };
  const handleNewCat = () => {
      setCurrentCat({ display_order: categories.length + 1, name: '', icon_name: 'Code2' });
      setIsCatDialogOpen(true);
  };
  const handleSaveCat = async (e: React.FormEvent) => {
      e.preventDefault();
      const payload = { name: currentCat.name, icon_name: currentCat.icon_name, class_name: currentCat.class_name, display_order: currentCat.display_order };
      
      let error;
      if (currentCat.id) {
          const res = await supabaseAdmin.from('skill_categories').update(payload).eq('id', currentCat.id);
          error = res.error;
      } else {
          const res = await supabaseAdmin.from('skill_categories').insert([payload]);
          error = res.error;
      }

      if(error) toast.error("Failed to save category");
      else { toast.success("Category saved"); setIsCatDialogOpen(false); fetchData(); }
  };
  const handleDeleteCat = async (id: string) => {
      if(!confirm("Delete category? This will delete all skills inside it!")) return;
      // Note: Cascade delete should handle skills if configured, otherwise needs manual delete
      // Assuming cascade for now or manual
      const { error } = await supabaseAdmin.from('skill_categories').delete().eq('id', id);
      if(error) toast.error("Failed to delete category");
      else { toast.success("Category deleted"); fetchData(); }
  };

  // --- Skill Handlers ---
  const handleEditSkill = (skill: Skill) => {
      setCurrentSkill(skill);
      setIsSkillDialogOpen(true);
  };
  const handleNewSkill = (catId: string) => {
      const cat = categories.find(c => c.id === catId);
      const order = cat ? cat.skills.length + 1 : 1;
      setCurrentSkill({ category_id: catId, display_order: order, name: '', icon_key: '' });
      setIsSkillDialogOpen(true);
  };
  const handleSaveSkill = async (e: React.FormEvent) => {
      e.preventDefault();
      const payload = { 
          name: currentSkill.name, 
          icon_key: currentSkill.icon_key, 
          display_order: currentSkill.display_order,
          category_id: currentSkill.category_id 
      };
      
      let error;
      if (currentSkill.id) {
          const res = await supabaseAdmin.from('skills').update(payload).eq('id', currentSkill.id);
          error = res.error;
      } else {
          const res = await supabaseAdmin.from('skills').insert([payload]);
          error = res.error;
      }

      if(error) toast.error("Failed to save skill");
      else { toast.success("Skill saved"); setIsSkillDialogOpen(false); fetchData(); }
  };
  const handleDeleteSkill = async (id: string) => {
      if(!confirm("Delete skill?")) return;
      const { error } = await supabaseAdmin.from('skills').delete().eq('id', id);
      if(error) toast.error("Failed to delete skill");
      else { toast.success("Skill deleted"); fetchData(); }
  };


  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
             <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                    <Link href="/admin">
                        <Button variant="ghost" size="icon" className="mr-2">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold">Tech Arsenal (Skills)</h1>
                </div>
                <Button onClick={handleNewCat}>
                    <Plus className="mr-2 h-4 w-4" /> Add Category
                </Button>
            </div>

            <div className="space-y-4">
                {categories.map(cat => (
                    <Card key={cat.id} className="overflow-hidden">
                        <div 
                            className="flex items-center p-4 bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
                            onClick={() => setExpandedCat(expandedCat === cat.id ? null : cat.id)}
                        >
                            <div className="mr-2">
                                {expandedCat === cat.id ? <ChevronDown className="h-5 w-5"/> : <ChevronRight className="h-5 w-5"/>}
                            </div>
                            <div className="flex-1 font-bold flex items-center gap-2">
                                {cat.name} 
                                <span className="text-xs font-normal text-muted-foreground bg-primary/10 px-2 py-0.5 rounded">{cat.skills.length} skills</span>
                            </div>
                            <div className="flex gap-1" onClick={e => e.stopPropagation()}>
                                <Button variant="ghost" size="icon" onClick={() => handleEditCat(cat)}><Pencil className="h-4 w-4"/></Button>
                                <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDeleteCat(cat.id)}><Trash2 className="h-4 w-4"/></Button>
                            </div>
                        </div>
                        
                        {expandedCat === cat.id && (
                            <div className="p-4 border-t bg-card">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {cat.skills.map(skill => (
                                        <div key={skill.id} className="flex items-center justify-between p-3 border rounded-lg bg-background shadow-sm group">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 flex items-center justify-center bg-secondary rounded text-xs font-mono" title={skill.icon_key}>
                                                    {skill.icon_key ? skill.icon_key.substring(2,4) : "??"}
                                                </div>
                                                <span className="font-medium text-sm">{skill.name}</span>
                                            </div>
                                            <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                                                 <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEditSkill(skill)}><Pencil className="h-3 w-3"/></Button>
                                                 <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDeleteSkill(skill.id)}><Trash2 className="h-3 w-3"/></Button>
                                            </div>
                                        </div>
                                    ))}
                                    <Button variant="outline" className="h-full min-h-[58px] border-dashed" onClick={() => handleNewSkill(cat.id)}>
                                        <Plus className="mr-2 h-4 w-4" /> Add Skill
                                    </Button>
                                </div>
                            </div>
                        )}
                    </Card>
                ))}
            </div>
            
            {/* Category Dialog */}
            <Dialog open={isCatDialogOpen} onOpenChange={setIsCatDialogOpen}>
                <DialogContent>
                    <DialogHeader><DialogTitle>{currentCat.id ? "Edit Category" : "New Category"}</DialogTitle></DialogHeader>
                    <form onSubmit={handleSaveCat} className="space-y-4 py-4">
                        <Input value={currentCat.name || ''} onChange={e => setCurrentCat({...currentCat, name: e.target.value})} placeholder="Category Name" required />
                        <Input value={currentCat.display_order || 0} type="number" onChange={e => setCurrentCat({...currentCat, display_order: parseInt(e.target.value)})} placeholder="Order" required />
                        <Input value={currentCat.icon_name || ''} onChange={e => setCurrentCat({...currentCat, icon_name: e.target.value})} placeholder="Icon Name (Lucide)" />
                        <Input value={currentCat.class_name || ''} onChange={e => setCurrentCat({...currentCat, class_name: e.target.value})} placeholder="Tailwind Class (e.g. text-blue-500)" />
                        <DialogFooter><Button type="submit">Save</Button></DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

             {/* Skill Dialog */}
             <Dialog open={isSkillDialogOpen} onOpenChange={setIsSkillDialogOpen}>
                <DialogContent>
                    <DialogHeader><DialogTitle>{currentSkill.id ? "Edit Skill" : "New Skill"}</DialogTitle></DialogHeader>
                    <form onSubmit={handleSaveSkill} className="space-y-4 py-4">
                        <Input value={currentSkill.name || ''} onChange={e => setCurrentSkill({...currentSkill, name: e.target.value})} placeholder="Skill Name" required />
                        <Input value={currentSkill.display_order || 0} type="number" onChange={e => setCurrentSkill({...currentSkill, display_order: parseInt(e.target.value)})} placeholder="Order" required />
                        <div className="space-y-2">
                             <Label>Icon Key (React Icons)</Label>
                             <div className="flex gap-2">
                                <Input value={currentSkill.icon_key || ''} onChange={e => setCurrentSkill({...currentSkill, icon_key: e.target.value})} placeholder="e.g. SiReact" />
                             </div>
                             <p className="text-xs text-muted-foreground">Available examples: {AVAILABLE_ICONS.slice(0, 5).join(", ")}...</p>
                        </div>
                        <DialogFooter><Button type="submit">Save</Button></DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    </div>
  );
}
