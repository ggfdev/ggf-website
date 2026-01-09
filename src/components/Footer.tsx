'use client';

import { Twitter, Instagram, Linkedin, Mail, MapPin } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';

import { useLanguage } from '@/LanguageContext';

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="relative pt-24 pb-12 z-20">

            <div className="container px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
                    <div className="space-y-6 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-3">
                            <Image
                                src="/gamepad_logo.png"
                                alt="Game Generation Factory Logo"
                                width={32}
                                height={32}
                                unoptimized
                                className="rounded-md"
                            />
                            <h2 className="text-2xl font-bold font-[family-name:var(--font-space)] tracking-tight text-black dark:text-white">Game Generation Factory</h2>
                        </div>
                        <p className="text-sm text-[var(--color-text-dim)] max-w-xs leading-relaxed">
                            {t.footer.desc}
                        </p>
                        <div className="space-y-2 pt-2 text-xs text-[var(--color-text-dim)]">
                            <a href="mailto:main@gamegenerationfactory.com" className="flex items-center justify-center md:justify-start gap-2 hover:text-black dark:hover:text-white transition-colors group">
                                <Mail size={12} className="text-[var(--color-primary)] group-hover:text-[var(--color-primary)] transition-colors" />
                                <span>main@gamegenerationfactory.com</span>
                            </a>
                            <div className="flex items-start justify-center md:justify-start gap-2">
                                <MapPin size={12} className="text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
                                <span className="max-w-[180px]">Kosuyolu, Salih Omurtak St. No:69 No:71, 34718 Kadikoy/Istanbul</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-16 md:gap-24 w-full md:w-auto justify-center md:justify-end">
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-black/40 dark:text-white/40">{t.footer.platform}</h4>
                            <ul className="space-y-2 text-sm text-[var(--color-text-dim)]">
                                <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">{t.footer.docs}</a></li>
                                <li><a href="#showcase" className="hover:text-black dark:hover:text-white transition-colors">{t.footer.showcase}</a></li>
                                <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">{t.footer.pricing}</a></li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-black/40 dark:text-white/40">{t.footer.company}</h4>
                            <ul className="space-y-2 text-sm text-[var(--color-text-dim)]">
                                <li><Link href="/about" className="hover:text-black dark:hover:text-white transition-colors">{t.footer.about}</Link></li>
                                <li><a href="https://x.com/GameGFactory" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors">{t.footer.twitter}</a></li>
                                <li><a href="mailto:main@gamegenerationfactory.com" className="hover:text-black dark:hover:text-white transition-colors">{t.footer.contact}</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-black/5 dark:border-white/5 gap-4">
                    <p className="text-xs text-[var(--color-text-dim)]">
                        {t.footer.rights}
                    </p>
                    <div className="flex gap-6 text-[var(--color-text-dim)]">
                        <a href="https://x.com/GameGFactory" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-all"><Twitter size={18} /></a>
                        <a href="https://www.instagram.com/gamegenerationfactory/" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-all"><Instagram size={18} /></a>
                        <a href="https://www.linkedin.com/company/gamegenerationfactory/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-all"><Linkedin size={18} /></a>
                        <a href="mailto:main@gamegenerationfactory.com" className="hover:text-black dark:hover:text-white transition-all"><Mail size={18} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
