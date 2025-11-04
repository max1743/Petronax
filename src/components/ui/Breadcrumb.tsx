import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-text-secondary">
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          {index > 0 && (
            <ChevronRight className="w-4 h-4 text-text-muted" />
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-accent-yellow transition-colors"
            >
              {item.name}
            </Link>
          ) : (
            <span className="text-text-primary font-medium">{item.name}</span>
          )}
        </div>
      ))}
    </nav>
  );
}