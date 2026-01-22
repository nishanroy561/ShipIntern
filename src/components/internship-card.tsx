"use client";

import { Internship } from "@/types";
import { BadgeCheck, MapPin, ExternalLink, CalendarClock, Building2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface InternshipCardProps {
    internship: Internship;
    viewMode?: "grid" | "list";
}

export function InternshipCard({ internship, viewMode = "grid" }: InternshipCardProps) {
    // Fallback logo if employer_logo is missing
    const logoUrl = internship.employer_logo || "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg";

    const isRemote = internship.job_is_remote;
    const postedDate = internship.job_posted_at_datetime_utc
        ? formatDistanceToNow(new Date(internship.job_posted_at_datetime_utc), { addSuffix: true })
        : "Recently";

    // Stipend formatting
    const stipend = internship.job_min_salary && internship.job_max_salary
        ? `${internship.job_salary_currency} ${internship.job_min_salary}-${internship.job_max_salary}`
        : "Stipend not disclosed";

    return (
        <div
            className={cn(
                "group relative flex overflow-hidden rounded-xl border border-border bg-card/50 text-card-foreground shadow-sm transition-all hover:shadow-lg hover:border-primary/50 backdrop-blur-sm",
                viewMode === "grid" ? "flex-col" : "flex-row items-center gap-6 p-4"
            )}
        >
            {/* Header / Logo Section */}
            <div className={cn("relative p-6 pb-2", viewMode === "grid" ? "" : "p-0 w-16 h-16 shrink-0")}>
                <div className={cn("aspect-square relative overflow-hidden rounded-lg border bg-white p-2", viewMode === "grid" ? "w-16 h-16" : "w-full h-full")}>
                    <img
                        src={logoUrl}
                        alt={internship.employer_name}
                        className="object-contain w-full h-full"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + internship.employer_name + "&background=random";
                        }}
                    />
                </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-1 flex-col p-6 pt-2">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-lg font-semibold leading-none tracking-tight group-hover:text-primary transition-colors">
                            {internship.job_title}
                        </h3>
                        <div className="mt-1 flex items-center text-sm text-muted-foreground">
                            <Building2 className="mr-1 h-3.5 w-3.5" />
                            <span className="font-medium mr-2">{internship.employer_name}</span>
                            {isRemote && <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold text-foreground">Remote</span>}
                        </div>
                    </div>
                    {viewMode === "list" && (
                        <Link
                            href={internship.job_apply_link}
                            target="_blank"
                            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                        >
                            Apply
                        </Link>
                    )}
                </div>

                <div className="mt-4 flex flex-wrap gap-y-2 gap-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-secondary" />
                        <span>{internship.job_city || internship.job_country || "Remote"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <BadgeCheck className="h-4 w-4 text-green-500" />
                        <span>{stipend}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <CalendarClock className="h-4 w-4 text-orange-400" />
                        <span>{postedDate}</span>
                    </div>
                </div>

                {viewMode === "grid" && (
                    <div className="mt-6">
                        <Link
                            href={internship.job_apply_link}
                            target="_blank"
                            className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 group-hover:scale-[1.02] active:scale-95 ease-in-out duration-200"
                        >
                            Apply Now <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
