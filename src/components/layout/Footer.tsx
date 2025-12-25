import { Heart, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
    return (
        <footer className="bg-black border-t border-white/5 py-12 pb-32 md:pb-12">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="space-y-4">
                        <Logo size={120} />
                        <p className="text-gray-500 text-sm leading-relaxed">
                            A nova era da gestão patrimonial. Inteligência, elegância e precisão em cada centavo.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-black text-[10px] uppercase tracking-[0.2em] mb-6">Navegação</h4>
                        <ul className="space-y-4">
                            {["Home", "Cartões", "Investir", "Aprenda"].map((item) => (
                                <li key={item}>
                                    <Link href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`} className="text-gray-500 hover:text-primary text-sm font-medium transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-black text-[10px] uppercase tracking-[0.2em] mb-6">Recursos</h4>
                        <ul className="space-y-4">
                            {["Wtm AI", "Simulador", "Arsenal", "Metas"].map((item) => (
                                <li key={item} className="text-gray-500 text-sm font-medium cursor-default hover:text-gray-300 transition-colors">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-black text-[10px] uppercase tracking-[0.2em] mb-6">Contato</h4>
                        <div className="space-y-4">
                            <a href="mailto:contato@wtmcorps.com" className="flex items-center gap-3 text-gray-500 hover:text-white transition-colors group">
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-all">
                                    <Mail size={14} />
                                </div>
                                <span className="text-sm font-medium">Email</span>
                            </a>
                            <a href="https://wa.me/5511950916614" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-500 hover:text-white transition-colors group">
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-green-500/10 group-hover:text-green-500 transition-all">
                                    <Heart size={14} />
                                </div>
                                <span className="text-sm font-medium">WhatsApp</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest">
                        © {new Date().getFullYear()} Wtm Corps. Todos os direitos reservados.
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-600 uppercase tracking-widest">
                        <span>Feito com</span>
                        <Heart size={10} className="text-red-500 fill-red-500" />
                        <span>para o seu futuro</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
