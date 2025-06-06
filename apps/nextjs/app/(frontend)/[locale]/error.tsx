'use client';

import { useEffect } from 'react';
import useTranslation from '../../../../../packages/translations/src/useTranslation';

export default function Error({
    error,
    reset
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    const { t } = useTranslation();

    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-4">
                Es ist ein Fehler aufgetreten
            </h2>
            <button
                onClick={() => reset()}
                className="px-4 py-2 bg-blue-500 text-gray-700 rounded hover:bg-blue-600">
                Erneut versuchen
            </button>
        </div>
    );
}
