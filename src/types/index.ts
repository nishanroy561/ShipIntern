export interface Internship {
    job_id: string;
    employer_name: string;
    employer_logo?: string;
    job_title: string;
    job_publisher: string;
    job_employment_type: string;
    job_apply_link: string;
    job_description: string;
    job_is_remote: boolean;
    job_posted_at_datetime_utc: string;
    job_city?: string;
    job_state?: string;
    job_country?: string;
    job_max_salary?: number;
    job_min_salary?: number;
    job_salary_currency?: string;
    job_salary_period?: string;
}

export interface JSearchResponse {
    status: string;
    request_id: string;
    data: Internship[];
}
