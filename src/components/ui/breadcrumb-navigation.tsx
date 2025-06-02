
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, ChevronRight } from 'lucide-react';

interface BreadcrumbNavigationProps {
  customItems?: Array<{
    label: string;
    href?: string;
  }>;
}

const BreadcrumbNavigation = ({ customItems }: BreadcrumbNavigationProps) => {
  const location = useLocation();
  
  const getPathSegments = () => {
    const segments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: Array<{ label: string; href?: string }> = [{ label: 'Home', href: '/' }];
    
    if (customItems) {
      breadcrumbs.push(...customItems);
      return breadcrumbs;
    }
    
    // Auto-generate breadcrumbs based on path
    let currentPath = '';
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      let label = segment;
      switch (segment) {
        case 'ai-leren':
          label = 'AI Leren';
          break;
        case 'nl':
          label = 'Nederlands';
          break;
        case 'admin':
          label = 'Admin Dashboard';
          break;
        case 'tools':
          label = 'AI Tools';
          break;
        default:
          label = segment.charAt(0).toUpperCase() + segment.slice(1);
      }
      
      breadcrumbs.push({
        label,
        href: index === segments.length - 1 ? undefined : currentPath
      });
    });
    
    return breadcrumbs;
  };

  const breadcrumbs = getPathSegments();

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {item.href ? (
                    <BreadcrumbLink asChild>
                      <Link to={item.href} className="flex items-center hover:text-blue-600">
                        {index === 0 && <Home className="h-4 w-4 mr-1" />}
                        {item.label}
                      </Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default BreadcrumbNavigation;
