// app/(wiki)/page.tsx (截取上半部分)
import Link from 'next/link';
import { SearchTrigger } from 'fumadocs-ui/layouts/shared/slots/search-trigger';
import { ThemeSwitch } from 'fumadocs-ui/layouts/shared/slots/theme-switch';
import { ShuuyouLogo } from '@/components/Logo';
import homepageConfig from '@/content/editor/homepage.json';

type HomeModule = {
    title: string;
    sub: string;
    href: string;
    desc: string;
};

type HomeInfoCard = {
    title: string;
    text: string;
    href: string;
    action: string;
};

type CollaborationConfig = {
    enabled: boolean;
    title: string;
    message: string;
    href?: string;
    linkText?: string;
};

export default function HomePage() {
    return (
        <main className="relative flex min-h-screen flex-col items-center bg-white p-8 md:p-16 border-x border-black dark:bg-black dark:border-white">
            <div className="absolute right-6 top-6 z-10 flex items-center gap-3 md:right-10 md:top-8">
                <SearchTrigger
                    className="border border-black bg-white text-black hover:bg-black hover:text-white dark:border-white dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black"
                    aria-label="打开搜索"
                />
                <ThemeSwitch
                    mode="light-dark-system"
                    className="border border-black px-2 py-1 dark:border-white"
                />
            </div>

            <div className="mt-16 flex w-full max-w-5xl flex-col items-center md:mt-12">
                <div className="text-center mb-10 flex w-full flex-col items-center md:mb-12">
                    <ShuuyouLogo variant="home" className="mb-6 h-24 w-auto text-black dark:text-white md:h-32" />
                    <p className="text-xs uppercase tracking-[0.5em] text-black dark:text-white font-light">
                        {homepageConfig.tagline}
                    </p>
                </div>

                <section className="mb-10 w-full max-w-4xl border border-black p-6 dark:border-white">
                    <p className="text-sm leading-7 text-black/80 dark:text-white/80">
                        {homepageConfig.intro}
                    </p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full max-w-4xl border border-black dark:border-white">
                    {homepageConfig.modules.map((module) => (
                        <ModuleCard key={module.href} {...(module as HomeModule)} />
                    ))}
                </div>

                <div className="mt-8 grid w-full max-w-4xl grid-cols-1 gap-0 border border-black dark:border-white md:grid-cols-2">
                    {homepageConfig.infoCards.map((card) => (
                        <InfoCard key={`${card.title}-${card.href}`} {...(card as HomeInfoCard)} />
                    ))}
                </div>

                <CollaborationNotice {...(homepageConfig.collaboration as CollaborationConfig)} />
            </div>
        </main>
    );
}

function CollaborationNotice({ enabled, title, message, href, linkText }: CollaborationConfig) {
    if (enabled) return null;

    return (
        <section className="mt-8 w-full max-w-4xl border border-black p-6 dark:border-white">
            <h3 className="font-serif text-xl font-black">{title}</h3>
            <p className="mt-3 text-sm leading-7 opacity-85">{message}</p>
            {href ? (
                <Link href={href} className="mt-4 inline-block text-[11px] tracking-[0.2em] uppercase underline underline-offset-4">
                    {linkText || '查看详情'}
                </Link>
            ) : null}
        </section>
    );
}

function InfoCard({
    title,
    text,
    href,
    action,
}: {
    title: string;
    text: string;
    href: string;
    action: string;
}) {
    return (
        <Link
            href={href}
            className="group block border border-black p-6 transition-all duration-0 hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
        >
            <h3 className="font-serif text-xl font-black">{title}</h3>
            <p className="mt-3 text-sm leading-7 opacity-80">{text}</p>
            <p className="mt-5 text-[11px] tracking-[0.2em] uppercase opacity-70 group-hover:opacity-100">{action}</p>
        </Link>
    );
}

function ModuleCard({ title, sub, href, desc }: { title: string; sub: string; href: string; desc: string }) {
    return (
        <Link
            href={href}
            className="group block p-8 border border-black dark:border-white bg-white dark:bg-black hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-0"
        >
            <h2 className="text-2xl font-bold font-serif mb-2">{title}</h2>
            <p className="text-[10px] tracking-widest uppercase opacity-70 mb-6">{sub}</p>
            <p className="text-sm font-mono opacity-50 group-hover:opacity-100">{desc}</p>
        </Link>
    );
}