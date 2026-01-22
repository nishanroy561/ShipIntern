"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Search, Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function SearchBar() {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const [term, setTerm] = useState(searchParams.get("query")?.toString() || "");
    const [isAiMode, setIsAiMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function handleSearch(searchTerm: string) {
        if (!searchTerm) {
            const params = new URLSearchParams(searchParams);
            params.delete("query");
            replace(`/?${params.toString()}`);
            return;
        }

        if (isAiMode) {
            setIsLoading(true);
            try {
                const response = await fetch("/api/ai-search", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ prompt: searchTerm }),
                });
                const data = await response.json();

                if (data.query) {
                    const params = new URLSearchParams();
                    params.set("query", data.query);
                    if (data.location) params.set("location", data.location);
                    if (data.datePosted) params.set("date_posted", data.datePosted);

                    // Update input text to match what we assume the user meant, or keep their prompt?
                    // Let's keep their prompt but search with the new params
                    replace(`/?${params.toString()}`);
                }
            } catch (error) {
                console.error("AI Search Failed", error);
                // Fallback to normal search
                const params = new URLSearchParams();
                params.set("query", searchTerm);
                replace(`/?${params.toString()}`);
            } finally {
                setIsLoading(false);
            }
        } else {
            const params = new URLSearchParams(searchParams);
            params.set("query", searchTerm);
            // Clear other filters on new manual search
            params.delete("location");
            params.delete("date_posted");
            replace(`/?${params.toString()}`);
        }
    }

    return (
        <div className="relative w-full max-w-2xl mx-auto">
            <div className={cn(
                "flex items-center w-full rounded-2xl border bg-background px-4 py-2 shadow-sm transition-all duration-300 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent",
                isAiMode ? "border-primary/50 ring-2 ring-primary/20 shadow-lg shadow-primary/10" : "border-border"
            )}>
                {isLoading ? (
                    <Loader2 className="h-5 w-5 mr-3 animate-spin text-primary" />
                ) : (
                    <Search className={cn("h-5 w-5 mr-3 transition-colors", isAiMode ? "text-primary" : "text-muted-foreground")} />
                )}

                <input
                    className="flex-1 bg-transparent text-lg outline-none placeholder:text-muted-foreground"
                    placeholder={isAiMode ? "Describe your dream internship (e.g. 'high paying remote react jobs')..." : "Search by role, company, or skill..."}
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch(term);
                        }
                    }}
                    disabled={isLoading}
                />
                <button
                    onClick={() => setIsAiMode(!isAiMode)}
                    className={cn(
                        "ml-2 flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                        isAiMode
                            ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90"
                            : "bg-secondary/10 text-secondary-foreground hover:bg-secondary/20"
                    )}
                    title="Toggle AI Search"
                >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>AI Search</span>
                </button>
            </div>
        </div>
    );
}
