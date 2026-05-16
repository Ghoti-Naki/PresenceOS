interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div>
      <h2 className="font-heading text-3xl sm:text-4xl text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-muted-foreground max-w-xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
