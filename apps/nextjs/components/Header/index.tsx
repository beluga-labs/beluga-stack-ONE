import { Container, ContainerContent } from '@beluga/ui';
import { LanguageSwitch } from '../LanguageSwitch';
import Logo from '../Logo';
import { ThemeSwitch } from '../ThemeSwitch';

interface HeaderProps {
    locale?: string;
}

const Header: React.FC<HeaderProps> = ({ locale }) => {
    return (
        <header className="w-full sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-zinc-200 py-3 md:py-5 dark:bg-zinc-950 dark:border-zinc-800">
            <Container
                as="div"
                spacing="none">
                <ContainerContent className="flex items-center justify-between gap-8">
                    <Logo className="h-4 md:h-6" />
                    <div className="flex items-center gap-2">
                        <ThemeSwitch />
                        <LanguageSwitch />
                    </div>
                </ContainerContent>
            </Container>
        </header>
    );
};

export default Header;
