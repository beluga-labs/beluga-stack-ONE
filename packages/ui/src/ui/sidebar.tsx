import * as React from 'react';
import { cn } from '@beluga/utils';

// Sidebar Container
interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
    collapsed?: boolean;
}

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
    ({ className, children, collapsed, ...props }, ref) => {
        return (
            <aside
                ref={ref}
                className={cn(
                    'h-screen overflow-x-hidden flex flex-col justify-between',
                    className
                )}
                {...props}>
                {children}
            </aside>
        );
    }
);
Sidebar.displayName = 'Sidebar';

// Sidebar Header
interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    collapsed?: boolean;
}

const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
    ({ className, children, collapsed, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn('py-2', collapsed ? 'px-3' : 'px-4', className)}
                {...props}>
                {children}
            </div>
        );
    }
);
SidebarHeader.displayName = 'SidebarHeader';

// Sidebar Content
interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {
    collapsed?: boolean;
}

const SidebarContent = React.forwardRef<HTMLDivElement, SidebarContentProps>(
    ({ className, children, collapsed, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn('flex-1 overflow-y-auto', className)}
                {...props}>
                {children}
            </div>
        );
    }
);
SidebarContent.displayName = 'SidebarContent';

// Sidebar Footer
interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    collapsed?: boolean;
}

const SidebarFooter = React.forwardRef<HTMLDivElement, SidebarFooterProps>(
    ({ className, children, collapsed, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn('py-2', collapsed ? 'px-3' : 'px-4', className)}
                {...props}>
                {children}
            </div>
        );
    }
);
SidebarFooter.displayName = 'SidebarFooter';

export { Sidebar, SidebarHeader, SidebarContent, SidebarFooter };
