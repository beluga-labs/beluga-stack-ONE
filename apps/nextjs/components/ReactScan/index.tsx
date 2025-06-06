'use client';
// react-scan must be imported before react
import { scan } from 'react-scan';
import { useEffect } from 'react';

export const ReactScan: React.FC = () => {
    useEffect(() => {
        // Only enable scan in development environment
        console.log('ReactScan: scan enabled', process.env.NODE_ENV);
        if (process.env.NODE_ENV === 'development') {
            scan({
                enabled: true
            });
        }
    }, []);

    return <></>;
};
