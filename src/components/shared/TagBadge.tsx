interface TagBadgeProps {
  tag: string;
}

export default function TagBadge({ tag }: TagBadgeProps) {
  return (
    <span className="text-xs px-2.5 py-1 rounded-full border border-border bg-muted text-muted-foreground font-medium">
      {tag}
    </span>
  );
}
