import { getCachedGlobal } from '@/lib/api/getGlobals';
import type { Footer } from '@/payload-types';
import { Container, ContainerContent, Paragraph } from '@beluga/ui';
import parse from 'html-react-parser';
import FooterNavItem, { FooterNavItemProps } from './NavItem';
import { PayloadLocale } from '@beluga/translations';

const Footer = async ({ locale }: { locale: PayloadLocale }) => {
    const footerData: Footer = await getCachedGlobal('footer', 2, 'all')();
    return (
        <footer className="w-full border-t border-zinc-200 py-3 md:py-4">
            <Container
                as="div"
                spacing="none">
                <ContainerContent className="flex flex-wrap flex-col-reverse md:flex-row items-start md:items-center md:justify-between gap-x-4 gap-y-1">
                    <Paragraph
                        size="xs"
                        className="text-zinc-400 md:text-base">
                        {footerData.copyright &&
                            parse(String(footerData.copyright[locale as any]))}
                    </Paragraph>
                    {footerData.navItems && footerData.navItems.length > 0 ? (
                        <ul className="flex flex-wrap align-center">
                            {footerData.navItems.map((item: any) => {
                                return (
                                    <FooterNavItem
                                        key={item.id}
                                        locale={locale}
                                        link={item.link}
                                    />
                                );
                            })}
                        </ul>
                    ) : (
                        ''
                    )}
                </ContainerContent>
            </Container>
        </footer>
    );
};

export default Footer;
