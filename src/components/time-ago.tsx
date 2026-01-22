import { formatDistanceToNow } from "date-fns";

export function TimeAgo({ date }: { date: string }) {
    if (!date) return null;
    return (
        <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(date), { addSuffix: true })}
        </span>
    );
}
