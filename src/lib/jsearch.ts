import { JSearchResponse, Internship } from "@/types";

export interface SearchOptions {
    query: string;
    location?: string;
    datePosted?: "all" | "today" | "3days" | "week" | "month";
    remoteOnly?: boolean;
    jobType?: "INTERN" | "FULLTIME" | "CONTRACT" | "PARTTIME";
    minSalary?: number;
}

export async function fetchInternships(options: SearchOptions | string): Promise<Internship[]> {
    const rapidApiKey = process.env.RAPIDAPI_KEY;
    const rapidApiHost = process.env.RAPIDAPI_HOST;

    if (!rapidApiKey) {
        console.error("RAPIDAPI_KEY is not defined");
        return [];
    }

    // Normalize args
    let searchQuery = typeof options === "string" ? options : options.query;
    const location = typeof options !== "string" && options.location ? options.location : "India";
    const datePosted = typeof options !== "string" && options.datePosted ? options.datePosted : "month";
    const remoteOnly = typeof options !== "string" ? options.remoteOnly : false;
    const jobType = typeof options !== "string" ? options.jobType : "INTERN";

    // Construct Base Query
    const fullQuery = `${searchQuery} in ${location}`;

    // Build URL parameters
    const params = new URLSearchParams({
        query: fullQuery,
        page: "1",
        num_pages: "1",
        date_posted: datePosted,
    });

    if (remoteOnly) {
        params.set("remote_jobs_only", "true");
    }

    if (jobType) {
        params.set("employment_types", jobType);
    }

    // JSearch API host check
    const host = rapidApiHost || "jsearch.p.rapidapi.com";
    const url = `https://${host}/search?${params.toString()}`;

    const requestOptions = {
        method: "GET",
        headers: {
            "x-rapidapi-key": rapidApiKey,
            "x-rapidapi-host": host,
        },
    };

    try {
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
            const errText = await response.text();
            console.error(`API call failed: ${response.status} - ${errText}`);
            return [];
        }

        const result: JSearchResponse = await response.json();
        return result.data || [];
    } catch (error) {
        console.error("Error fetching internships:", error);
        return [];
    }
}
