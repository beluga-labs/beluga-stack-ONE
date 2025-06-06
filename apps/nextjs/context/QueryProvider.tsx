'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

interface QueryProviderProps {
    children: React.ReactNode[] | React.ReactNode;
}

const QueryProvider = ({ children, ...props }: QueryProviderProps) => {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider
            client={queryClient}
            {...props}>
            {children}
        </QueryClientProvider>
    );
};

export default QueryProvider;
