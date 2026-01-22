import { fetchInternships } from "@/lib/jsearch";
import { InternshipCard } from "@/components/internship-card";
import { SearchBar } from "@/components/search-bar";
import { ThemeToggle } from "@/components/theme-toggle";
import { ViewToggle } from "@/components/view-toggle";
import { Filters } from "@/components/filters";
import { Suspense } from "react";
import { Sparkles, Filter as FilterIcon } from "lucide-react";

interface SearchParams {
  query?: string;
  location?: string;
  date_posted?: "all" | "today" | "3days" | "week" | "month";
  view?: string;
  remote?: string;
  job_type?: "INTERN" | "FULLTIME" | "CONTRACT" | "PARTTIME";
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const query = params.query || "Software Developer Intern";
  const location = params.location;
  const datePosted = params.date_posted || "month";
  const view = (params.view as "grid" | "list") || "grid";
  const remoteOnly = params.remote === "true";
  const jobType = params.job_type || "INTERN";

  // Fetch data
  const internships = await fetchInternships({
    query,
    location,
    datePosted,
    remoteOnly,
    jobType
  });

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-7xl items-center justify-between mx-auto px-4 md:px-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="hidden font-bold sm:inline-block text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
              ShipIntern
            </span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container max-w-7xl mx-auto px-4 md:px-6 py-8">

        {/* Search Header */}
        <section className="flex flex-col items-center text-center space-y-6 mb-12">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tighter">
              Find <span className="text-primary">Internships</span> That Matter
            </h1>
            <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto">
              Live search across top platforms. Powered by AI.
            </p>
          </div>
          <Suspense>
            <SearchBar />
          </Suspense>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">

          {/* Sidebar Filters */}
          <aside className="hidden lg:block lg:col-span-1 sticky top-24">
            <div className="rounded-xl border border-border bg-card text-card-foreground p-4 shadow-sm">
              <div className="flex items-center gap-2 font-semibold text-lg mb-4 pb-2 border-b border-border">
                <FilterIcon className="h-5 w-5" /> Filters
              </div>
              <Suspense>
                <Filters />
              </Suspense>
            </div>
          </aside>

          {/* Mobile Filter Toggle (Could implement a drawer here, but just stacking for now) */}
          <div className="lg:hidden w-full">
            <details className="group rounded-xl border border-border bg-card p-4">
              <summary className="flex items-center justify-between font-medium cursor-pointer list-none">
                <span className="flex items-center gap-2"><FilterIcon className="h-4 w-4" /> Filters</span>
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <div className="mt-4 pt-4 border-t border-border">
                <Suspense>
                  <Filters />
                </Suspense>
              </div>
            </details>
          </div>

          {/* Feed Section */}
          <div className="col-span-1 lg:col-span-3 space-y-6">

            {/* Visual Header for Feed */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-muted/20 p-4 rounded-xl border border-border/50">
              <div>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  {internships.length > 0 ? internships.length : 0} Results
                  <span className="text-muted-foreground text-sm font-normal">for &quot;{query}&quot;</span>
                </h2>
                {/* Active Pills */}
                <div className="flex flex-wrap gap-2 mt-2 text-xs">
                  {remoteOnly && <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 font-medium border border-green-500/20">Remote Only</span>}
                  {location && location !== "India" && <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 font-medium border border-blue-500/20">{location}</span>}
                  <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary-foreground font-medium border border-secondary/20">{datePosted}</span>
                </div>
              </div>
              <Suspense>
                <ViewToggle />
              </Suspense>
            </div>

            {/* Content */}
            {internships.length > 0 ? (
              <div className={view === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                : "flex flex-col gap-4"
              }>
                {internships.map((internship) => (
                  <InternshipCard
                    key={internship.job_id}
                    internship={internship}
                    viewMode={view}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 rounded-2xl border border-dashed bg-muted/10">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                  <FilterIcon className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">No internships found</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto mt-1">
                    Try broadening your filters or checking a different location.
                  </p>
                </div>
                <a href="/" className="text-primary hover:underline text-sm font-medium">Clear all filters</a>
              </div>
            )}
          </div>

        </div>

      </main>
    </div>
  );
}
