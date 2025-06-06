'use client';

import { Alert, AlertDescription, AlertTitle } from '@beluga/ui';
import {
    AlertCircle,
    AlertTriangle,
    CheckCircle2,
    Info,
    MessageSquare
} from 'lucide-react';

interface CalloutProps {
    variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info';
    title?: string;
    message?: string;
    className?: string;
}

const variantIcons = {
    default: MessageSquare,
    destructive: AlertCircle,
    success: CheckCircle2,
    warning: AlertTriangle,
    info: Info
};

const Callout: React.FC<CalloutProps> = ({
    variant = 'default',
    title,
    message,
    className
}) => {
    const Icon = variantIcons[variant];

    return (
        <Alert
            variant={variant}
            className={className}>
            <Icon className="size-4" />
            {title && <AlertTitle>{title}</AlertTitle>}
            {message && <AlertDescription>{message}</AlertDescription>}
        </Alert>
    );
};

export { Callout, type CalloutProps };
