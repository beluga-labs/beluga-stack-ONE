'use client';

import {
    Container,
    ContainerContent,
    Heading,
    Paragraph,
    type HeadingProps,
    type ParagraphProps
} from '@beluga/ui';
import { cn } from '@beluga/utils';

interface TitleGroupProps {
    lead?: string;
    title: string;
    description?: string;
    leadProps?: Partial<Omit<ParagraphProps, 'children'>>;
    headingProps?: Partial<Omit<HeadingProps, 'children'>> & {
        level?: HeadingProps['level'];
    };
    descriptionProps?: Partial<Omit<ParagraphProps, 'children' | 'variant'>>;
    aside?: React.ReactNode[] | React.ReactNode;
    className?: string;
    asideProps?: Partial<
        Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>
    >;
}

const TitleGroup: React.FC<TitleGroupProps> = ({
    title,
    lead,
    description,
    leadProps,
    headingProps,
    descriptionProps,
    aside,
    asideProps,
    className
}) => {
    return (
        <div className="flex gap-4 items-start justify-between">
            <div
                className={cn(
                    'shrink-0 min-w-1/2 flex flex-col gap-1',
                    className
                )}>
                {lead && (
                    <Paragraph
                        variant="primary"
                        size="sm"
                        weight="semibold"
                        className="uppercase"
                        {...leadProps}>
                        {lead}
                    </Paragraph>
                )}
                <Heading
                    level={1}
                    size="xl"
                    {...headingProps}>
                    {title}
                </Heading>
                {description && (
                    <Paragraph
                        variant="muted"
                        size="sm"
                        {...descriptionProps}>
                        {description}
                    </Paragraph>
                )}
            </div>
            {aside && (
                <div
                    className="flex flex-col gap-4"
                    {...asideProps}>
                    {aside}
                </div>
            )}
        </div>
    );
};

export { TitleGroup, type TitleGroupProps };
