import { PayloadLocale } from '@beluga/translations';
import { cn } from '@beluga/utils';

export interface FooterNavItemProps {
    locale?: PayloadLocale;
    link: {
        label: Record<PayloadLocale, string>;
        url: Record<PayloadLocale, string>;
        target?: 'self' | 'blank' | null;
    };
    id?: string | null;
    className?: string;
}

const FooterNavItem: React.FC<FooterNavItemProps> = ({
    locale,
    link,
    className
}) => {
    return (
        <li
            className={cn(
                "relative block after:content-[''] after:absolute after:-right-0 after:top-1/2 after:translate-x-1/2 after:-translate-y-1/2 after:w-0.5 after:h-[70%] after:bg-gray-400 last:after:hidden",
                className
            )}>
            <a
                href={link.url[locale || 'de']}
                target={`_${link.target ?? 'self'}`}
                className="text-base text-gray-700 hover:text-primary-500 p-1.5">
                {link.label[locale || 'de']}
            </a>
        </li>
    );
};

export default FooterNavItem;
