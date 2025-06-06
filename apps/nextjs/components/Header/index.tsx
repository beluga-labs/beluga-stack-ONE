import { Container, ContainerContent } from '@beluga/ui';
import LanguageSwitch from '../LanguageSwitch';
import Logo from '../Logo';

interface HeaderProps {
    locale?: string;
}

const Header: React.FC<HeaderProps> = ({ locale }) => {
    return (
        <header className="w-full sticky top-0 z-200 bg-white/80 backdrop-blur-lg border-b border-gray-200 py-3 md:py-5">
            <Container
                as="div"
                spacing="none">
                <ContainerContent className="flex items-center justify-between gap-8">
                    <Logo className="h-4 md:h-6" />
                    <LanguageSwitch locale={locale} />
                </ContainerContent>
            </Container>
        </header>
    );
};

export default Header;
