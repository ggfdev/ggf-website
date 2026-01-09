'use client';

import FeatureCard from './FeatureCard';
import { Bot, Zap, Code2 } from 'lucide-react';

import { useLanguage } from '@/LanguageContext';

export default function FeatureShowcase() {
    const { t } = useLanguage();

    return (
        <section id="features" className="relative py-32 container px-4 md:px-6 z-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard
                    title={t.features.item2.title}
                    description={t.features.item2.description}
                    icon={<Zap className="w-8 h-8" />}
                    delay={0.1}
                />
                <FeatureCard
                    title={t.features.item1.title}
                    description={t.features.item1.description}
                    icon={<Bot className="w-8 h-8" />}
                    delay={0.2}
                />
                <FeatureCard
                    title={t.features.item3.title}
                    description={t.features.item3.description}
                    icon={<Code2 className="w-8 h-8" />}
                    delay={0.3}
                />
            </div>
        </section>
    );
}
