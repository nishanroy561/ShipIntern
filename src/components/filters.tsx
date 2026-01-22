"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
    MapPin,
    Briefcase,
    Clock,
    RotateCcw,
    Check
} from "lucide-react";

export function Filters() {
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    // Local state for immediate UI feedback, though likely better to just use URL state directly for simplicity
    const defaultLocation = searchParams.get("location") || "India";
    const defaultDate = searchParams.get("date_posted") || "month";
    const defaultRemote = searchParams.get("remote") === "true";
    const defaultType = searchParams.get("job_type") || "INTERN";

    const [location, setLocation] = useState(defaultLocation);

    function updateFilter(key: string, value: string | null) {
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        replace(`/?${params.toString()}`, { scroll: false });
    }

    function toggleRemote() {
        const current = searchParams.get("remote") === "true";
        updateFilter("remote", current ? null : "true");
    }

    // Common Indian Tech Hubs
    const commonLocations = ["Bangalore", "Mumbai", "Delhi", "Hyderabad", "Pune", "Gurgaon", "Remote"];

    const roles = [
        { label: "Software Engineer", query: "Software Engineer Intern" },
        { label: "Frontend", query: "Frontend Developer Intern" },
        { label: "Backend", query: "Backend Developer Intern" },
        { label: "Full Stack", query: "Full Stack Developer Intern" },
        { label: "Mobile / App", query: "Mobile App Developer Intern" },
        { label: "Data Science", query: "Data Science Intern" },
        { label: "UI/UX Design", query: "UI UX Design Intern" },
        { label: "Product mgmt", query: "Product Management Intern" },
    ];

    const currentQuery = searchParams.get("query") || "";

    return (
        <div className="space-y-8 p-1">

            {/* Roles / Category */}
            <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <Briefcase className="h-4 w-4" /> Category
                </h3>
                <div className="flex flex-wrap gap-2">
                    {roles.map((role) => {
                        const isActive = currentQuery.includes(role.label) || currentQuery === role.query;
                        return (
                            <button
                                key={role.label}
                                onClick={() => updateFilter("query", role.query)}
                                className={cn(
                                    "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
                                    isActive
                                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                                        : "bg-card hover:bg-muted border-border text-foreground"
                                )}
                            >
                                {role.label}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Location Filter */}
            <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> Location
                </h3>
                <div className="flex flex-wrap gap-2">
                    {commonLocations.map((loc) => {
                        // If "Remote" is clicked here, we treat it as location="Remote"
                        const isActive = searchParams.get("location") === loc || (loc === "Remote" && searchParams.get("location") === "Remote");
                        return (
                            <button
                                key={loc}
                                onClick={() => updateFilter("location", isActive ? "India" : loc)}
                                className={cn(
                                    "px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors",
                                    isActive
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "bg-card hover:bg-muted border-border text-foreground"
                                )}
                            >
                                {loc}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Job Type */}
            <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <Briefcase className="h-4 w-4" /> Job Type
                </h3>
                <select
                    className="w-full bg-card border border-border rounded-lg p-2 text-sm focus:ring-2 focus:ring-primary outline-none"
                    value={defaultType}
                    onChange={(e) => updateFilter("job_type", e.target.value)}
                >
                    <option value="INTERN">Internship</option>
                    <option value="FULLTIME">Full Time</option>
                    <option value="CONTRACT">Contract</option>
                    <option value="PARTTIME">Part Time</option>
                </select>
            </div>

            {/* Date Posted */}
            <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <Clock className="h-4 w-4" /> Date Posted
                </h3>
                <div className="grid grid-cols-2 gap-2">
                    {[
                        { label: "Today", val: "today" },
                        { label: "3 Days", val: "3days" },
                        { label: "This Week", val: "week" },
                        { label: "This Month", val: "month" },
                    ].map((opt) => (
                        <button
                            key={opt.val}
                            onClick={() => updateFilter("date_posted", opt.val)}
                            className={cn(
                                "px-3 py-2 rounded-lg text-xs font-medium border transition-colors",
                                defaultDate === opt.val
                                    ? "bg-secondary text-secondary-foreground border-secondary"
                                    : "bg-card hover:bg-muted border-border"
                            )}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Remote Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-card border border-border">
                <label className="text-sm font-medium cursor-pointer flex-1" htmlFor="remote-toggle">
                    Remote Only
                </label>
                <button
                    id="remote-toggle"
                    onClick={toggleRemote}
                    className={cn(
                        "w-10 h-6 rounded-full transition-colors relative",
                        defaultRemote ? "bg-green-500" : "bg-muted-foreground/30"
                    )}
                >
                    <span className={cn(
                        "absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform",
                        defaultRemote ? "translate-x-4" : "translate-x-0"
                    )} />
                </button>
            </div>

            {/* Reset */}
            <button
                onClick={() => replace("/")}
                className="w-full py-2 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
                <RotateCcw className="h-3.5 w-3.5" /> Reset Filters
            </button>

        </div>
    );
}
