import { Heart, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-t from-black to-card border-t border-white/10 mt-auto">
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* About */}
                    <div>
                        <h3 className="text-primary font-bold text-lg mb-4">Wtm Corps Finanças</h3>
                        <p className="text-gray-400 text-sm">
                            Sua plataforma completa para organizar finanças, investir com inteligência e alcançar seus objetivos.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold text-sm mb-4">Links Rápidos</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-gray-400 hover:text-primary text-sm transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/cards" className="text-gray-400 hover:text-primary text-sm transition-colors">
                                    Cartões
                                </Link>
                            </li>
                            <li>
                                <Link href="/invest" className="text-gray-400 hover:text-primary text-sm transition-colors">
                                    Investir
                                </Link>
                            </li>
                            <li>
                                <Link href="/learn" className="text-gray-400 hover:text-primary text-sm transition-colors">
                                    Aprenda
                                </Link>
                            </li>
                            <li>
                                <Link href="/goals" className="text-gray-400 hover:text-primary text-sm transition-colors">
                                    Metas
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-white font-bold text-sm mb-4">Recursos</h4>
                        <ul className="space-y-2">
                            <li className="text-gray-400 text-sm">Wtm AI - Assistente</li>
                            <li className="text-gray-400 text-sm">Simulador de Investimentos</li>
                            <li className="text-gray-400 text-sm">Comparador de Cartões</li>
                            <li className="text-gray-400 text-sm">Organizador de Metas</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-bold text-sm mb-4">Contato</h4>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="https://wa.me/5511950916614"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-green-500 text-sm transition-colors flex items-center gap-2"
                                >
                                    <span>WhatsApp</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:contato@wtmcorps.com"
                                    className="text-gray-400 hover:text-primary text-sm transition-colors flex items-center gap-2"
                                >
                                    <Mail size={14} />
                                    <span>Email</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-xs">
                        © {new Date().getFullYear()} Wtm Corps Finanças. Todos os direitos reservados.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>Feito com</span>
                        <Heart size={12} className="text-red-500 fill-red-500" />
                        <span>para você</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
