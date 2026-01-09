'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import { useLanguage } from '@/LanguageContext';
import { useTheme } from '@/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function Navigation() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const { lang, setLang, t } = useLanguage();
    const { theme, toggleTheme } = useTheme();

    // Background opacity transitions as you scroll
    const navBg = useTransform(
        scrollY,
        [0, 100],
        [
            theme === 'light' ? 'rgba(216, 219, 222, 0)' : 'rgba(9, 9, 11, 0)',
            theme === 'light' ? 'rgba(216, 219, 222, 0.8)' : 'rgba(9, 9, 11, 0.8)'
        ]
    );

    const navBlur = useTransform(
        scrollY,
        [0, 100],
        ['blur(0px)', 'blur(12px)']
    );

    useEffect(() => {
        return scrollY.on('change', (latest) => {
            setIsScrolled(latest > 50);
        });
    }, [scrollY]);

    const navItems = [
        { key: 'about', label: t.footer.about, isInternal: true },

        { key: 'features', label: t.nav.features },
        { key: 'studio', label: t.nav.studio },
        { key: 'showcase', label: t.nav.showcase },
        { key: 'waitlist', label: t.nav.waitlist },
    ];

    return (
        <motion.nav
            style={{
                backgroundColor: navBg,
                backdropFilter: navBlur,
            }}
            className={`fixed top-0 left-0 w-full z-[100] transition-colors duration-300 ${isScrolled ? 'border-b border-black/10 dark:border-white/10 py-4' : 'py-6'
                }`}
        >
            <div className="container px-4 md:px-6 flex justify-between items-center">
                <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <Image
                            src="/gamepad_logo.png"
                            alt="Game Generation Factory Logo"
                            width={40}
                            height={40}
                            unoptimized
                            priority
                            className="rounded-lg shadow-lg border border-black/10 dark:border-white/10"
                        />
                        <span className="text-xl font-bold font-[family-name:var(--font-space)] tracking-tight text-black dark:text-white">Game Generation Factory</span>
                    </motion.div>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <div className="flex gap-8 text-sm font-medium">
                        {navItems.map((item) => (
                            item.isInternal ? (
                                <Link
                                    key={item.key}
                                    href={`/${item.key}`}
                                    className="text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <a
                                    key={item.key}
                                    href={`/#${item.key}`}
                                    className="text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white transition-colors"
                                >
                                    {item.label}
                                </a>
                            )
                        ))}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleTheme}
                        className="p-2 rounded-full bg-black/5 dark:bg-white/5 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                        aria-label="Toggle Dark Mode"
                    >
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </motion.button>

                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="/#waitlist"
                        className="px-5 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                    >
                        {t.nav.getStarted}
                    </motion.a>
                </div>
            </div>
        </motion.nav>
    );
}
