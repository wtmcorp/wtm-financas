"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    Sparkles,
    TrendingUp,
    Shield,
    Zap,
    Target,
    Brain,
    Award,
    Users,
    ArrowRight,
    Check,
    Star,
    ChevronDown,
    BarChart3,
    Wallet,
    GraduationCap,
    Lock,
    CheckCircle2
} from "lucide-react";
import InteractiveLogo from "@/components/ui/InteractiveLogo";

export default function LandingPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin shadow-[0_0_30px_rgba(167,139,250,0.3)]"></div>
            </div>
        );
    }

    const features = [
        {
            icon: Brain,
            title: "IA Financeira",
            description: "Assistente inteligente que aprende com seus hábitos e oferece insights personalizados",
            color: "from-purple-500 to-pink-600"
        },
        {
            icon: BarChart3,
            title: "Análise Avançada",
            description: "Visualize seu patrimônio em tempo real com gráficos interativos e previsões precisas",
            color: "from-blue-500 to-cyan-600"
        },
        {
            icon: Target,
            title: "Metas Inteligentes",
            description: "Defina objetivos e acompanhe seu progresso com gamificação e recompensas",
            color: "from-green-500 to-emerald-600"
        },
        {
            icon: GraduationCap,
            title: "Educação Financeira",
            description: "Aprenda finanças de forma interativa com cursos, quizzes e certificados",
            color: "from-yellow-500 to-orange-600"
        },
        {
            icon: Shield,
            title: "100% Seguro",
            description: "Criptografia de ponta a ponta e autenticação em duas etapas para proteger seus dados",
            color: "from-red-500 to-pink-600"
        },
        {
            icon: Zap,
            title: "Automação Total",
            description: "Categorização automática, alertas inteligentes e relatórios gerados por IA",
            color: "from-indigo-500 to-purple-600"
        }
    ];

    const stats = [
        { value: "10k+", label: "Usuários Ativos" },
        { value: "R$ 50M+", label: "Economizados" },
        { value: "4.9/5", label: "Avaliação" },
        { value: "99.9%", label: "Uptime" }
    ];

    const testimonials = [
        {
            name: "Maria Silva",
            role: "Empreendedora",
            content: "Consegui economizar R$ 15.000 em 6 meses! O WTM Corps mudou completamente minha relação com dinheiro.",
            rating: 5,
            avatar: "MS"
        },
        {
            name: "João Santos",
            role: "Desenvolvedor",
            content: "A IA é impressionante! Ela previu meus gastos e me ajudou a evitar dívidas. Melhor investimento que já fiz.",
            rating: 5,
            avatar: "JS"
        },
        {
            name: "Ana Costa",
            role: "Professora",
            content: "Finalmente entendo para onde meu dinheiro vai. O sistema de educação é fantástico!",
            rating: 5,
            avatar: "AC"
        }
    ];

    return (
        <div className="min-h-screen bg-background overflow-x-hidden">
            {/* Hero Section */}
            <motion.section
                style={{ opacity, scale }}
                className="relative min-h-screen flex items-center justify-center overflow-hidden"
            >
                {/* Animated Background */}
                <div className="absolute inset-0 bg-mesh opacity-50" />
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: "1s" }} />
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        {/* Logo */}
                        <div className="flex justify-center mb-8">
                            <InteractiveLogo size="lg" />
                        </div>


                        {/* Main Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9]"
                        >
                            O Futuro das suas
                            <br />
                            <span className="gradient-text">Finanças Pessoais</span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-medium"
                        >
                            Controle total do seu dinheiro com{" "}
                            <span className="text-primary font-black">Inteligência Artificial</span>,
                            análises avançadas e educação. Tudo em um só lugar.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
                        >
                            <button
                                onClick={() => router.push("/register")}
                                className="group px-10 py-5 bg-primary hover:bg-white text-black font-black text-sm uppercase tracking-wider rounded-2xl transition-all shadow-2xl shadow-primary/20 hover:shadow-primary/40 hover:scale-105 flex items-center gap-3"
                            >
                                Começar Gratuitamente
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={() => router.push("/login")}
                                className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white font-black text-sm uppercase tracking-wider rounded-2xl transition-all border border-white/10 hover:border-white/20"
                            >
                                Já tenho conta
                            </button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 max-w-4xl mx-auto"
                        >
                            {stats.map((stat, i) => (
                                <div key={i} className="text-center">
                                    <div className="text-3xl md:text-4xl font-black gradient-text mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-gray-500 font-bold uppercase tracking-wider">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, repeat: Infinity, duration: 2 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2"
                    >
                        <ChevronDown size={32} className="text-gray-600 animate-bounce" />
                    </motion.div>
                </div>
            </motion.section>

            {/* Features Section */}
            <section className="relative py-32 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
                            Recursos <span className="gradient-text">Revolucionários</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Tudo que você precisa para dominar suas finanças em uma plataforma completa
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="glass-panel p-8 group cursor-pointer relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity" style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }} />

                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-2xl`}>
                                    <feature.icon size={28} className="text-white" />
                                </div>

                                <h3 className="text-2xl font-black text-white mb-4 tracking-tight">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="relative py-32 px-4 md:px-8 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
                            Amado por <span className="gradient-text">Milhares</span>
                        </h2>
                        <p className="text-xl text-gray-400">
                            Veja o que nossos usuários estão dizendo
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-panel p-8"
                            >
                                <div className="flex gap-1 mb-6">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} size={20} className="fill-yellow-500 text-yellow-500" />
                                    ))}
                                </div>

                                <p className="text-gray-300 leading-relaxed mb-6 italic">
                                    "{testimonial.content}"
                                </p>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black border-2 border-primary/30">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <div className="font-black text-white">{testimonial.name}</div>
                                        <div className="text-sm text-gray-500">{testimonial.role}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Final CTA */}
            <section className="relative py-32 px-4 md:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-panel p-16 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-blue-500/10" />

                        <div className="relative z-10 space-y-8">
                            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                                Pronto para transformar
                                <br />
                                <span className="gradient-text">suas finanças?</span>
                            </h2>

                            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                                Junte-se a milhares de pessoas que já estão no controle do seu futuro financeiro
                            </p>

                            <button
                                onClick={() => router.push("/register")}
                                className="group px-12 py-6 bg-primary hover:bg-white text-black font-black text-base uppercase tracking-wider rounded-2xl transition-all shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:scale-105 flex items-center gap-3 mx-auto"
                            >
                                Começar Agora - É Grátis
                                <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
                            </button>

                            <div className="flex items-center justify-center gap-6 pt-6 text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                    <Check size={16} className="text-green-500" />
                                    Sem cartão de crédito
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check size={16} className="text-green-500" />
                                    100% Gratuito
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check size={16} className="text-green-500" />
                                    Cancele quando quiser
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/5 py-12 px-4 md:px-8">
                <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm">
                    <p>© 2026 WTM Corps. Todos os direitos reservados.</p>
                    <p className="mt-2">Feito com ❤️ para revolucionar suas finanças</p>
                </div>
            </footer>
        </div>
    );
}
