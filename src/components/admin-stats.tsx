"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FolderGit2, Code2, Briefcase, Layers } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

export function AdminStats() {
    const [counts, setCounts] = useState({
        projects: 0,
        skills: 0,
        experiences: 0,
        availability: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCounts() {
            const { count: projectsCount } = await supabase.from('projects').select('*', { count: 'exact', head: true });
            const { count: skillsCount } = await supabase.from('skills').select('*', { count: 'exact', head: true });
            const { count: expCount } = await supabase.from('experiences').select('*', { count: 'exact', head: true });
            const { count: availCount } = await supabase.from('availability').select('*', { count: 'exact', head: true });

            setCounts({
                projects: projectsCount || 0,
                skills: skillsCount || 0,
                experiences: expCount || 0,
                availability: availCount || 0
            });
            setLoading(false);
        }
        fetchCounts();
    }, []);

    const stats = [
        {
            title: "Total Projects",
            value: counts.projects,
            icon: FolderGit2,
            color: "text-orange-500",
            bg: "bg-orange-500/10"
        },
        {
            title: "Total Skills",
            value: counts.skills,
            icon: Code2,
            color: "text-green-500",
            bg: "bg-green-500/10"
        },
        {
            title: "Timeline Entries",
            value: counts.experiences,
            icon: Briefcase,
            color: "text-purple-500",
            bg: "bg-purple-500/10"
        },
        {
            title: "Availability Status",
            value: counts.availability,
            icon: Layers, // or any other icon
            color: "text-pink-500",
            bg: "bg-pink-500/10"
        }
    ];

    if (loading) {
        return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
            {[1,2,3,4].map(i => <div key={i} className="h-32 bg-muted rounded-xl"></div>)}
        </div>
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
                <Card key={i}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {stat.title}
                        </CardTitle>
                        <div className={`p-2 rounded-lg ${stat.bg}`}>
                            <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
