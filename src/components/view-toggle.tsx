"use client";

import { LayoutGrid, List } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function ViewToggle() {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const view = searchParams.get("view") || "grid";

    function setView(mode: "grid" | "list") {
        const params = new URLSearchParams(searchParams);
        params.set("view", mode);
        replace(`/?${params.toString()}`, { scroll: false });
    }

    return (
        <div className="flex bg-muted p-1 rounded-lg">
            <button
                onClick={() => setView("grid")}
                className={cn(
                    "p-2 rounded-md transition-all",
                    view === "grid" ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                )}
            >
                <LayoutGrid className="h-4 w-4" />
            </button>
            <button
                onClick={() => setView("list")}
                className={cn(
                    "p-2 rounded-md transition-all",
                    view === "list" ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                )}
            >
                <List className="h-4 w-4" />
            </button>
        </div>
    );
}
