import Link from 'next/link';

type BreadcrumbItem = {
  name: string;
  href: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center gap-2" role="list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              {isLast ? (
                <span
                  className="eyebrow text-ink-100 opacity-40 text-xs"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <>
                  <Link
                    href={item.href}
                    className="eyebrow text-ink-100 opacity-40 hover:opacity-70 transition-opacity text-xs"
                  >
                    {item.name}
                  </Link>
                  <span aria-hidden="true" className="eyebrow text-ink-100 opacity-20 text-xs">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
