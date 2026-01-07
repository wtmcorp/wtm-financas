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
            title: "Inteligência que entende você",
            description: "Nossa IA não apenas soma números. Ela aprende seus hábitos e sugere caminhos reais para você sobrar dinheiro no fim do mês.",
            color: "from-purple-500 to-pink-600"
        },
        {
            icon: BarChart3,
            title: "Clareza total, sem esforço",
            description: "Esqueça planilhas complexas. Visualize seu patrimônio e evolução com gráficos que contam uma história clara sobre seu futuro.",
            color: "from-blue-500 to-cyan-600"
        },
        {
            icon: Target,
            title: "Seus sonhos com data marcada",
            description: "Defina metas reais — da reserva de emergência à viagem dos sonhos — e veja exatamente quanto falta para chegar lá.",
            color: "from-green-500 to-emerald-600"
        },
        {
            icon: GraduationCap,
            title: "Conhecimento que liberta",
            description: "Aprenda a investir e cuidar do seu dinheiro com conteúdos simples, diretos e sem o 'economês' chato dos bancos.",
            color: "from-yellow-500 to-orange-600"
        },
        {
            icon: Shield,
            title: "Segurança de nível bancário",
            description: "Seus dados são protegidos com criptografia de ponta a ponta. Sua privacidade é nossa prioridade absoluta.",
            color: "from-red-500 to-pink-600"
        },
        {
            icon: Zap,
            title: "Tudo no piloto automático",
            description: "Categorização inteligente e alertas que avisam antes de você estourar o orçamento. Controle total, zero trabalho manual.",
            color: "from-indigo-500 to-purple-600"
        }
    ];

    const stats = [
        { value: "15k+", label: "Vidas Transformadas" },
        { value: "R$ 62M+", label: "Patrimônio Gerido" },
        { value: "4.9/5", label: "Satisfação Total" },
        { value: "24/7", label: "Suporte Ativo" }
    ];

    const testimonials = [
        {
            name: "Mariana Almeida",
            role: "Designer Freelancer",
            content: "Eu sempre tive medo de olhar minha conta. Com a WTM, eu finalmente entendi para onde meu dinheiro ia e consegui investir pela primeira vez.",
            rating: 5,
            avatar: "MA"
        },
        {
            name: "Ricardo Souza",
            role: "Engenheiro",
            content: "A IA é surreal. Ela me avisou de uma assinatura que eu nem usava e me ajudou a economizar R$ 400 logo no primeiro mês.",
            rating: 5,
            avatar: "RS"
        },
        {
            name: "Carla Mendes",
            role: "Autônoma",
            content: "O curso de investimentos dentro da plataforma é melhor que muito curso pago por aí. Simples, direto e prático.",
            rating: 5,
            avatar: "CM"
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
                <div className="absolute inset-0 bg-mesh opacity-30" />
                <div className="absolute inset-0">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.2, 0.3, 0.2]
                        }}
                        transition={{ duration: 8, repeat: Infinity }}
                        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"
                    />
                    <motion.div
                        animate={{
                            scale: [1.2, 1, 1.2],
                            opacity: [0.2, 0.3, 0.2]
                        }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px]"
                    />
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-10"
                    >
                        {/* Badge de Autoridade */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]"
                        >
                            <Star size={12} className="text-primary fill-primary" />
                            A plataforma nº 1 em clareza financeira
                        </motion.div>

                        {/* Main Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-5xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-[0.85]"
                        >
                            Sua vida financeira,
                            <br />
                            <span className="gradient-text">simplificada.</span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-medium"
                        >
                            Pare de lutar contra planilhas. Deixe nossa inteligência organizar seu futuro enquanto você foca no que realmente importa.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => router.push("/register")}
                                className="group px-12 py-6 bg-primary text-black font-black text-sm uppercase tracking-wider rounded-2xl transition-all shadow-[0_20px_50px_rgba(167,139,250,0.3)] flex items-center gap-3"
                            >
                                Começar minha transformação
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => router.push("/login")}
                                className="px-12 py-6 bg-white/5 text-white font-black text-sm uppercase tracking-wider rounded-2xl transition-all border border-white/10"
                            >
                                Já sou membro
                            </motion.button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-20 max-w-5xl mx-auto"
                        >
                            {stats.map((stat, i) => (
                                <div key={i} className="text-center group">
                                    <div className="text-4xl md:text-5xl font-black text-white mb-2 group-hover:gradient-text transition-all duration-500">
                                        {stat.value}
                                    </div>
                                    <div className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">
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
                        transition={{ delay: 1.2, repeat: Infinity, duration: 2 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
                        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                    >
                        <ChevronDown size={32} className="text-gray-600 animate-bounce" />
                    </motion.div>
                </div>
            </motion.section>

            {/* Problem Section - Nova Seção */}
            <section className="relative py-32 px-4 md:px-8 border-y border-white/5 bg-white/[0.01]">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="w-16 h-1 bg-primary rounded-full" />
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
                            Cansado de não saber para onde seu <span className="gradient-text">dinheiro foge?</span>
                        </h2>
                        <p className="text-xl text-gray-400 leading-relaxed">
                            A maioria das pessoas vive no escuro financeiro. Contas que chegam de surpresa,
                            dinheiro que some na metade do mês e a sensação de que você nunca vai conseguir
                            construir um patrimônio real.
                        </p>
                        <div className="space-y-4">
                            {[
                                "Sem planilhas chatas e manuais",
                                "Sem termos técnicos complicados",
                                "Sem medo de olhar o extrato bancário"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-gray-300 font-bold">
                                    <CheckCircle2 className="text-primary" size={20} />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-primary/20 rounded-[3rem] blur-[100px] animate-pulse" />
                        <div className="relative glass-panel p-8 rounded-[3rem] border-primary/20">
                            <div className="space-y-6">
                                <div className="h-4 w-3/4 bg-white/10 rounded-full animate-pulse" />
                                <div className="h-4 w-1/2 bg-white/10 rounded-full animate-pulse" />
                                <div className="h-32 w-full bg-primary/5 rounded-2xl border border-primary/10 flex items-center justify-center">
                                    <Zap size={48} className="text-primary animate-bounce" />
                                </div>
                                <div className="h-4 w-full bg-white/10 rounded-full animate-pulse" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative py-32 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-24"
                    >
                        <h2 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                            Tudo que você precisa em <br />
                            <span className="gradient-text">um só lugar.</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Desenvolvemos as ferramentas mais poderosas do mercado para que você tenha o controle absoluto da sua vida.
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
                                whileHover={{ y: -15, scale: 1.02 }}
                                className="glass-panel p-10 group cursor-pointer relative overflow-hidden h-full flex flex-col"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-2xl`}>
                                    <feature.icon size={32} className="text-white" />
                                </div>

                                <h3 className="text-2xl font-black text-white mb-4 tracking-tight">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed flex-1">
                                    {feature.description}
                                </p>

                                <div className="mt-8 flex items-center gap-2 text-primary text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                                    Saber mais <ArrowRight size={14} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Authority/About Section - Nova Seção */}
            <section className="relative py-32 px-4 md:px-8 bg-primary/5 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                <div className="max-w-5xl mx-auto text-center space-y-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-primary text-black font-black text-xs uppercase tracking-[0.2em]"
                    >
                        <Shield size={16} />
                        O Propósito WTM Finanças
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                        Não somos apenas um app. <br />
                        Somos seu <span className="gradient-text">braço direito.</span>
                    </h2>
                    <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
                        Acreditamos que a liberdade financeira não é sobre ter milhões na conta,
                        mas sobre ter a tranquilidade de saber exatamente onde você está e para onde está indo.
                        Nossa missão é democratizar a inteligência financeira de elite para todos.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
                        {[
                            { title: "Transparência", desc: "Sem taxas escondidas ou letras miúdas." },
                            { title: "Simplicidade", desc: "Finanças explicadas para seres humanos." },
                            { title: "Resultados", desc: "Foco total na sua evolução real." }
                        ].map((item, i) => (
                            <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/10">
                                <h4 className="text-white font-black uppercase tracking-widest mb-2">{item.title}</h4>
                                <p className="text-sm text-gray-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            </section>

            {/* Testimonials Section */}
            <section className="relative py-32 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-24"
                    >
                        <h2 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                            Quem usa, <span className="gradient-text">recomenda.</span>
                        </h2>
                        <p className="text-xl text-gray-400">
                            Histórias reais de pessoas que retomaram o controle de suas vidas.
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
                                whileHover={{ y: -10 }}
                                className="glass-panel p-10 relative"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <Star size={40} className="text-primary fill-primary" />
                                </div>
                                <div className="flex gap-1 mb-8">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} size={18} className="fill-primary text-primary" />
                                    ))}
                                </div>

                                <p className="text-lg text-gray-300 leading-relaxed mb-10 italic font-medium">
                                    "{testimonial.content}"
                                </p>

                                <div className="flex items-center gap-4 border-t border-white/5 pt-8">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center text-primary font-black border border-primary/30 shadow-lg">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <div className="font-black text-white text-lg">{testimonial.name}</div>
                                        <div className="text-sm text-gray-500 font-bold uppercase tracking-widest">{testimonial.role}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="relative py-32 px-4 md:px-8">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-panel p-12 md:p-24 relative overflow-hidden rounded-[4rem] border-primary/30"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-blue-600/20" />
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />

                        <div className="relative z-10 space-y-10">
                            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[0.9]">
                                O primeiro passo para sua <br />
                                <span className="gradient-text">liberdade começa aqui.</span>
                            </h2>

                            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-medium">
                                Junte-se a mais de 15.000 pessoas que decidiram nunca mais se preocupar com dinheiro.
                            </p>

                            <motion.button
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => router.push("/register")}
                                className="group px-16 py-8 bg-primary text-black font-black text-lg uppercase tracking-widest rounded-[2rem] transition-all shadow-[0_30px_60px_rgba(167,139,250,0.4)] flex items-center gap-4 mx-auto"
                            >
                                Criar minha conta grátis
                                <Sparkles size={28} className="group-hover:rotate-12 transition-transform" />
                            </motion.button>

                            <div className="flex flex-wrap items-center justify-center gap-8 pt-10 text-xs font-black text-gray-500 uppercase tracking-[0.2em]">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck size={18} className="text-green-500" />
                                    100% Seguro
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 size={18} className="text-green-500" />
                                    Sem Cartão
                                </div>
                                <div className="flex items-center gap-2">
                                    <Zap size={18} className="text-primary" />
                                    Acesso Imediato
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/5 py-20 px-4 md:px-8 bg-black/20">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="text-center md:text-left space-y-4">
                        <div className="flex items-center justify-center md:justify-start gap-3">
                            <InteractiveLogo size="sm" />
                            <span className="text-2xl font-black text-white tracking-tighter uppercase">
                                Wtm<span className="text-primary">Corps</span>
                            </span>
                        </div>
                        <p className="text-gray-500 max-w-sm">
                            Transformando a relação das pessoas com o dinheiro através da tecnologia e clareza.
                        </p>
                    </div>
                    <div className="text-center md:text-right text-gray-500 text-sm font-medium">
                        <p>© 2026 WTM Corps. Todos os direitos reservados.</p>
                        <p className="mt-2 text-primary/50">Intelligence OS for Human Life</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

import { ShieldCheck } from "lucide-react";
