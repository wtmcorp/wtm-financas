<<<<<<< HEAD
import { Card } from "@/components/ui/Card";
import { Github } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="p-6 space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-primary mb-2">Configurações</h1>
                <p className="text-gray-400 text-sm">Gerencie sua conta e privacidade.</p>
            </header>

            <Card className="p-4 space-y-4">
                <h2 className="font-bold text-white">Transparência</h2>
                <p className="text-sm text-gray-400">
                    O código fonte do Wtm Corps é aberto para auditoria da comunidade.
                    Isso garante que seus dados são tratados com a máxima segurança.
                </p>
                <a
                    href="https://github.com/wtmcorps/finance"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:text-white transition-colors"
                >
                    <Github size={20} />
                    <span>Auditar Código no GitHub</span>
                </a>
            </Card>

            <Card className="p-4 space-y-4">
                <h2 className="font-bold text-white">Dados</h2>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Cache Offline</span>
                    <span className="text-green-500 text-xs font-bold">ATIVO (90 dias)</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Versão</span>
                    <span className="text-gray-500 text-xs">v1.0.0 (Beta)</span>
                </div>
            </Card>
        </div>
    );
}
=======
import { Card } from "@/components/ui/Card";
import { Github } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="p-6 space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-primary mb-2">Configurações</h1>
                <p className="text-gray-400 text-sm">Gerencie sua conta e privacidade.</p>
            </header>

            <Card className="p-4 space-y-4">
                <h2 className="font-bold text-white">Transparência</h2>
                <p className="text-sm text-gray-400">
                    O código fonte do Wtm Corps é aberto para auditoria da comunidade.
                    Isso garante que seus dados são tratados com a máxima segurança.
                </p>
                <a
                    href="https://github.com/wtmcorps/finance"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:text-white transition-colors"
                >
                    <Github size={20} />
                    <span>Auditar Código no GitHub</span>
                </a>
            </Card>

            <Card className="p-4 space-y-4">
                <h2 className="font-bold text-white">Dados</h2>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Cache Offline</span>
                    <span className="text-green-500 text-xs font-bold">ATIVO (90 dias)</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Versão</span>
                    <span className="text-gray-500 text-xs">v1.0.0 (Beta)</span>
                </div>
            </Card>
        </div>
    );
}
>>>>>>> 46276ec2febfdeeaa4cfc24d7a60e3a06907fd7a
