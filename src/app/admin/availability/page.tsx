"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseAdmin } from "@/app/lib/supabase-admin";
import { supabase, Availability } from "@/app/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, Pencil, Trash2, ArrowLeft, Save, GripVertical } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function AdminAvailabilityPage() {
  const [items, setItems] = useState<Availability[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Partial<Availability>>({});
  const [saving, setSaving] = useState(false);
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
      .from('availability')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
       toast.error("Failed to load availability data");
    } else {
       setItems(data || []);
    }
    setLoading(false);
  }

  const handleEdit = (item: Availability) => {
      setCurrentItem(item);
      setIsDialogOpen(true);
  };

  const handleAddNew = () => {
      setCurrentItem({
          display_order: items.length + 1,
          item_text: ''
      });
      setIsDialogOpen(true);
  }

  const handleDelete = async (id: string) => {
      if(!confirm("Delete this option?")) return;

      const { error } = await supabaseAdmin.from('availability').delete().eq('id', id);
      if(error) {
          toast.error("Failed to delete");
      } else {
          toast.success("Deleted");
          fetchData();
      }
  }

  const handleSave = async (e: React.FormEvent) => {
      e.preventDefault();
      setSaving(true);
      
      const payload = {
          item_text: currentItem.item_text,
          display_order: currentItem.display_order
      };

      let error;
      if (currentItem.id) {
         const res = await supabaseAdmin.from('availability').update(payload).eq('id', currentItem.id);
         error = res.error;
      } else {
         const res = await supabaseAdmin.from('availability').insert([payload]);
         error = res.error;
      }

      if (error) {
          console.error(error);
          toast.error("Failed to save");
      } else {
          toast.success("Saved successfully");
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
        <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                    <Link href="/admin">
                        <Button variant="ghost" size="icon" className="mr-2">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold">Availability Options</h1>
                </div>
                <Button onClick={handleAddNew}>
                    <Plus className="mr-2 h-4 w-4" /> Add Option
                </Button>
            </div>

            <div className="space-y-4">
                <p className="text-sm text-muted-foreground mb-4">
                    These items appear on the "Hire Me" page under "I am open to discussing:".
                </p>
                {items.map((item) => (
                    <Card key={item.id} className="flex items-center p-4 gap-4">
                        <div className="cursor-move text-muted-foreground">
                             <GripVertical className="h-5 w-5" />
                        </div>
                        <div className="flex-1 font-medium">
                            {item.item_text}
                        </div>
                        <div className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-1 rounded">
                            Ord: {item.display_order}
                        </div>
                        <div className="flex gap-1">
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                                <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleDelete(item.id)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </Card>
                ))}
                
                {items.length === 0 && (
                    <div className="text-center py-10 text-muted-foreground border-2 border-dashed rounded-xl">
                        No availability options set.
                    </div>
                )}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{currentItem.id ? "Edit Option" : "Add Option"}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSave} className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="item_text">Text</Label>
                            <Input 
                                id="item_text" 
                                value={currentItem.item_text || ''} 
                                onChange={(e) => setCurrentItem({...currentItem, item_text: e.target.value})}
                                required
                                placeholder="e.g. Freelance projects"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="display_order">Display Order</Label>
                            <Input 
                                id="display_order" 
                                type="number"
                                value={currentItem.display_order || 0} 
                                onChange={(e) => setCurrentItem({...currentItem, display_order: parseInt(e.target.value)})}
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
