import { cn } from '@beluga/utils';

import { ForwardedRef, forwardRef } from 'react';

interface MainProps {
    children: React.ReactNode;
    className?: string;
}

const Main = forwardRef<HTMLElement, MainProps>(
    ({ children, className }, ref: ForwardedRef<HTMLElement>) => {
        return (
            <main
                ref={ref}
                className={cn('w-full mb-32', className)}>
                {children}
            </main>
        );
    }
);

export default Main;
