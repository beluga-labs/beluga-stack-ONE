import Main from '@/components/Main';
import { Locale } from '@beluga/translations/types';
import { Container, ContainerContent, Heading } from '@beluga/ui';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

type Args = {
    params: Promise<{ locale?: Locale }>;
};

export default async function HomePage({
    params: paramsPromise
}: Args): Promise<JSX.Element> {
    const { locale = 'de' } = await paramsPromise;

    return (
        <Main>
            <Container>
                <ContainerContent className="flex flex-col items-center justify-center gap-8">
                    <Image
                        alt="beluga Logo"
                        className="h-24 w-auto"
                        height={223}
                        priority
                        src="/images/beluga_logo_signet.svg"
                        width={900}
                    />
                    <Heading
                        className="text-primary-500 dark:text-primary-500"
                        level={1}
                        size="xl"
                        font="serif"
                        align="center">
                        beluga stack
                        <br />
                        <span className="font-extrabold font-sans uppercase text-base">
                            2025
                        </span>
                    </Heading>
                </ContainerContent>
            </Container>
        </Main>
    );
}
