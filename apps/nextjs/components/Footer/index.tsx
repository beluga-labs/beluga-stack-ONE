import { Container, ContainerContent, Paragraph } from '@beluga/ui';

const Footer = async () => {
    return (
        <footer className="w-full border-t border-gray-200 py-3 md:py-4">
            <Container
                as="div"
                spacing="none">
                <ContainerContent className="flex flex-wrap flex-col-reverse md:flex-row items-start md:items-center md:justify-between gap-x-4 gap-y-1">
                    <Paragraph
                        size="xs"
                        className="text-gray-400 md:text-base">
                        beluga
                    </Paragraph>
                </ContainerContent>
            </Container>
        </footer>
    );
};

export default Footer;
