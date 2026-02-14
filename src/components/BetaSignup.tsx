'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Send, Users, Gamepad2, Stars } from 'lucide-react';
import { supabase } from '@/lib/supabase';

function Counter({ value, label, icon: Icon, suffix = '+' }: { value: number, label: string, icon: any, suffix?: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = value;
            const duration = 2000;
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);
            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return (
        <div ref={ref} className="text-center space-y-2 p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 transition-colors duration-500">
            <div className="flex justify-center text-[var(--color-primary-light)] mb-2">
                <Icon size={32} />
            </div>
            <div className="text-4xl font-bold font-[family-name:var(--font-space)] text-black dark:text-white">
                {count.toLocaleString()}{suffix}
            </div>
            <div className="text-sm text-[var(--color-text-dim)] uppercase tracking-widest font-medium">
                {label}
            </div>
        </div>
    );
}

import { useLanguage } from '@/LanguageContext';

export default function BetaSignup() {
    const { t } = useLanguage();
    const [email, setEmail] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    // Form fields
    const [fullname, setFullname] = useState('');
    const [experience, setExperience] = useState('');
    const [engines, setEngines] = useState<string[]>([]);
    const [programming, setProgramming] = useState('');
    const [useCase, setUseCase] = useState('');
    const [timeCommitment, setTimeCommitment] = useState('');
    const [devices, setDevices] = useState<string[]>([]);
    const [introduction, setIntroduction] = useState('');
    const [socialMedia, setSocialMedia] = useState('');
    const [socialMediaUsername, setSocialMediaUsername] = useState('');

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setShowForm(true);
        }
    };

    const handleCheckboxChange = (value: string, setState: React.Dispatch<React.SetStateAction<string[]>>) => {
        setState(prev =>
            prev.includes(value)
                ? prev.filter(v => v !== value)
                : [...prev, value]
        );
    };

    const handleFullSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate required fields
        if (!email || !fullname || !experience || engines.length === 0 || !programming || !useCase || !timeCommitment || devices.length === 0 || !introduction || !socialMedia) {
            alert('Please fill in all required fields');
            return;
        }

        // If user selected "Yes" for social media, username is required
        if (socialMedia === 'yes' && !socialMediaUsername) {
            alert('Please provide your social media username or link');
            return;
        }

        setStatus('loading');

        try {
            const { error } = await supabase
                .from('waitlist')
                .insert([{
                    email,
                    fullname,
                    experience,
                    engines: engines.join(', '),
                    programming,
                    use_case: useCase,
                    time_commitment: timeCommitment,
                    devices: devices.join(', '),
                    introduction,
                    social_media: socialMedia,
                    social_media_username: socialMedia === 'yes' ? socialMediaUsername : null
                }]);

            if (error) {
                if (error.code === '23505') {
                    alert('This email is already in the waitlist! 😎');
                } else {
                    console.error('Supabase error:', error);
                    alert(`An error occurred: ${error.message}`);
                }
                setStatus('idle');
                return;
            }

            setStatus('success');
            // Reset form
            setEmail('');
            setFullname('');
            setExperience('');
            setEngines([]);
            setProgramming('');
            setUseCase('');
            setTimeCommitment('');
            setDevices([]);
            setIntroduction('');
            setSocialMedia('');
            setSocialMediaUsername('');
            setShowForm(false);
        } catch (err) {
            console.error('Submit error:', err);
            alert('A connection error occurred.');
            setStatus('idle');
        }
    };

    return (
        <section id="waitlist" className="relative py-32 container px-4 md:px-6 z-20">

            <div className="grid lg:grid-cols-2 gap-16 items-start relative z-10">

                {/* Left Side: Stats & Text */}
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-space)] leading-tight">
                            {t.waitlist.title}<span className="text-gradient">{t.waitlist.titleAccent}</span>
                        </h2>
                        <p className="text-lg text-[var(--color-text-dim)] leading-relaxed">
                            {t.waitlist.description}
                        </p>
                        <ul className="space-y-3 pt-2">
                            {t.waitlist.benefits.map((benefit: string, index: number) => (
                                <li key={index} className="flex items-start gap-3 text-[var(--color-text-dim)]">
                                    <span className="text-[var(--color-primary-light)] mt-1">•</span>
                                    <span className="leading-relaxed">{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Counter value={10} suffix="K+" label={t.waitlist.gamesLabel} icon={Gamepad2} />
                    </div>
                </div>

                {/* Right Side: Signup Box */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative group"
                >
                    <div className="relative p-8 md:p-12 rounded-[var(--radius-card)] bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/20 space-y-8 transition-colors duration-500">
                        <div className="space-y-2 text-center md:text-left">
                            <h3 className="text-2xl font-bold text-black dark:text-white">{t.waitlist.cardTitle}</h3>
                            {t.waitlist.cardSubtitle && <p className="text-[var(--color-text-dim)]">{t.waitlist.cardSubtitle}</p>}
                        </div>

                        <AnimatePresence mode="wait">
                            {status === 'success' ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="p-6 rounded-xl bg-green-500/10 border border-green-500/20 text-center space-y-4"
                                >
                                    <Stars className="mx-auto text-green-600" size={48} />
                                    <p className="font-bold text-green-800">{t.waitlist.success}</p>
                                </motion.div>
                            ) : !showForm ? (
                                <motion.form
                                    key="email-form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleEmailSubmit}
                                    className="space-y-4"
                                >
                                    <div className="relative">
                                        <input
                                            type="email"
                                            required
                                            placeholder={t.waitlist.placeholder}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-6 py-4 rounded-xl bg-white dark:bg-black border border-black/10 dark:border-white/20 focus:border-black/30 dark:focus:border-white/50 outline-none transition-all text-black dark:text-white placeholder:text-gray-400 font-medium"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-4 rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold flex items-center justify-center gap-2 hover:bg-gray-900 dark:hover:bg-gray-200 transition-all group"
                                    >
                                        <span>{t.waitlist.button}</span>
                                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </button>
                                    <p className="text-[10px] text-center text-[var(--color-text-dim)] uppercase tracking-widest">
                                        {t.waitlist.footer}
                                    </p>
                                </motion.form>
                            ) : (
                                <motion.form
                                    key="full-form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleFullSubmit}
                                    className="space-y-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar"
                                >
                                    {/* Full Name */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-black dark:text-white">
                                            {t.waitlist.form.fullname} <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder={t.waitlist.form.fullnamePlaceholder}
                                            value={fullname}
                                            onChange={(e) => setFullname(e.target.value)}
                                            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-black border border-black/10 dark:border-white/20 focus:border-black/30 dark:focus:border-white/50 outline-none transition-all text-black dark:text-white text-sm"
                                        />
                                    </div>

                                    {/* Experience */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-black dark:text-white">
                                            {t.waitlist.form.experience} <span className="text-red-500">*</span>
                                        </label>
                                        <div className="space-y-2">
                                            {Object.entries(t.waitlist.form.experienceOptions).map(([key, label]) => (
                                                <label key={key} className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="experience"
                                                        value={key}
                                                        checked={experience === key}
                                                        onChange={(e) => setExperience(e.target.value)}
                                                        required
                                                        className="w-4 h-4"
                                                    />
                                                    <span className="text-sm text-black dark:text-white">{label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Engines */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-black dark:text-white">
                                            {t.waitlist.form.engines} <span className="text-red-500">*</span>
                                        </label>
                                        <p className="text-xs text-[var(--color-text-dim)]">{t.waitlist.form.enginesHelper}</p>
                                        <div className="space-y-2">
                                            {Object.entries(t.waitlist.form.enginesOptions).map(([key, label]) => (
                                                <label key={key} className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        value={key}
                                                        checked={engines.includes(key)}
                                                        onChange={() => handleCheckboxChange(key, setEngines)}
                                                        className="w-4 h-4"
                                                    />
                                                    <span className="text-sm text-black dark:text-white">{label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Programming */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-black dark:text-white">
                                            {t.waitlist.form.programming} <span className="text-red-500">*</span>
                                        </label>
                                        <div className="space-y-2">
                                            {Object.entries(t.waitlist.form.programmingOptions).map(([key, label]) => (
                                                <label key={key} className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="programming"
                                                        value={key}
                                                        checked={programming === key}
                                                        onChange={(e) => setProgramming(e.target.value)}
                                                        required
                                                        className="w-4 h-4"
                                                    />
                                                    <span className="text-sm text-black dark:text-white">{label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Use Case */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-black dark:text-white">
                                            {t.waitlist.form.useCase} <span className="text-red-500">*</span>
                                        </label>
                                        <div className="space-y-2">
                                            {Object.entries(t.waitlist.form.useCaseOptions).map(([key, label]) => (
                                                <label key={key} className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="useCase"
                                                        value={key}
                                                        checked={useCase === key}
                                                        onChange={(e) => setUseCase(e.target.value)}
                                                        required
                                                        className="w-4 h-4"
                                                    />
                                                    <span className="text-sm text-black dark:text-white">{label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Time Commitment */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-black dark:text-white">
                                            {t.waitlist.form.timeCommitment} <span className="text-red-500">*</span>
                                        </label>
                                        <div className="space-y-2">
                                            {Object.entries(t.waitlist.form.timeCommitmentOptions).map(([key, label]) => (
                                                <label key={key} className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="timeCommitment"
                                                        value={key}
                                                        checked={timeCommitment === key}
                                                        onChange={(e) => setTimeCommitment(e.target.value)}
                                                        required
                                                        className="w-4 h-4"
                                                    />
                                                    <span className="text-sm text-black dark:text-white">{label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Devices */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-black dark:text-white">
                                            {t.waitlist.form.devices} <span className="text-red-500">*</span>
                                        </label>
                                        <p className="text-xs text-[var(--color-text-dim)]">{t.waitlist.form.devicesHelper}</p>
                                        <div className="space-y-2">
                                            {Object.entries(t.waitlist.form.devicesOptions).map(([key, label]) => (
                                                <label key={key} className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        value={key}
                                                        checked={devices.includes(key)}
                                                        onChange={() => handleCheckboxChange(key, setDevices)}
                                                        className="w-4 h-4"
                                                    />
                                                    <span className="text-sm text-black dark:text-white">{label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Introduction */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-black dark:text-white">
                                            {t.waitlist.form.introduction} <span className="text-red-500">*</span>
                                        </label>
                                        <p className="text-xs text-[var(--color-text-dim)]">{t.waitlist.form.introductionHelper}</p>
                                        <textarea
                                            required
                                            rows={4}
                                            placeholder={t.waitlist.form.introductionPlaceholder}
                                            value={introduction}
                                            onChange={(e) => setIntroduction(e.target.value)}
                                            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-black border border-black/10 dark:border-white/20 focus:border-black/30 dark:focus:border-white/50 outline-none transition-all text-black dark:text-white text-sm resize-none"
                                        />
                                    </div>

                                    {/* Social Media */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-black dark:text-white">
                                            {t.waitlist.form.socialMedia} <span className="text-red-500">*</span>
                                        </label>
                                        <div className="space-y-2">
                                            {Object.entries(t.waitlist.form.socialMediaOptions).map(([key, label]) => (
                                                <label key={key} className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="socialMedia"
                                                        value={key}
                                                        checked={socialMedia === key}
                                                        onChange={(e) => setSocialMedia(e.target.value)}
                                                        required
                                                        className="w-4 h-4"
                                                    />
                                                    <span className="text-sm text-black dark:text-white">{label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Conditional: Social Media Username */}
                                    {socialMedia === 'yes' && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="space-y-2"
                                        >
                                            <label className="block text-sm font-bold text-black dark:text-white">
                                                {t.waitlist.form.socialMediaUsername} <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                required={socialMedia === 'yes'}
                                                placeholder={t.waitlist.form.socialMediaUsernamePlaceholder}
                                                value={socialMediaUsername}
                                                onChange={(e) => setSocialMediaUsername(e.target.value)}
                                                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-black border border-black/10 dark:border-white/20 focus:border-black/30 dark:focus:border-white/50 outline-none transition-all text-black dark:text-white text-sm"
                                            />
                                        </motion.div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="w-full py-4 rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold flex items-center justify-center gap-2 hover:bg-gray-900 dark:hover:bg-gray-200 transition-all group disabled:opacity-50"
                                    >
                                        <span>{status === 'loading' ? t.waitlist.loading : t.waitlist.form.submit}</span>
                                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
