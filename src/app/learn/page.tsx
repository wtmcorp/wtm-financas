<<<<<<< HEAD
import TermCard from "@/components/education/TermCard";
import { Card } from "@/components/ui/Card";
import { Lightbulb } from "lucide-react";

export default function LearnPage() {
    return (
        <div className="p-6 space-y-8 pb-24">
            <header>
                <h1 className="text-2xl font-bold text-primary mb-2">Aprenda</h1>
                <p className="text-gray-400 text-sm">Domine os termos que afetam seu bolso.</p>
            </header>

            <section>
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Lightbulb className="text-yellow-400" size={20} />
                    Dicas Financeiras
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                    <Card className="bg-white/5 border-l-4 border-green-500">
                        <h3 className="font-bold text-white mb-2">Regra 50-30-20</h3>
                        <p className="text-sm text-gray-400">
                            Divida sua renda em: 50% para necessidades básicas, 30% para desejos e lazer, e 20% para investimentos e dívidas.
                        </p>
                    </Card>
                    <Card className="bg-white/5 border-l-4 border-blue-500">
                        <h3 className="font-bold text-white mb-2">Reserva de Emergência</h3>
                        <p className="text-sm text-gray-400">
                            Antes de investir em risco, junte de 6 a 12 meses do seu custo de vida em um investimento com liquidez diária (ex: CDB 100% CDI).
                        </p>
                    </Card>
                </div>
            </section>

            <section>
                <h2 className="text-lg font-bold text-white mb-4">Dicionário Financeiro</h2>
                <div className="space-y-4">
                    <TermCard
                        term="CDI"
                        definition="Taxa média dos empréstimos de curtíssimo prazo feitos entre os bancos. É a principal referência para investimentos de Renda Fixa."
                        example="R$ 1.000 a 100% do CDI hoje (13,71% a.a.) viram R$ 1.137 em 12 meses (bruto)."
                        color="text-green-400"
                    />
                    <TermCard
                        term="Selic"
                        definition="Taxa básica de juros da economia brasileira, definida pelo Copom a cada 45 dias. Controla a inflação e influencia todas as outras taxas."
                        example="Se a Selic sobe, o crédito fica mais caro e a Renda Fixa rende mais. Hoje está em 15,00%."
                        color="text-blue-400"
                    />
                    <TermCard
                        term="IPCA"
                        definition="Índice oficial da inflação no Brasil. Mede a variação de preços de uma cesta de produtos e serviços para o consumidor final."
                        example="Se seu investimento rende menos que o IPCA, você perdeu poder de compra."
                        color="text-red-400"
                    />
                    <TermCard
                        term="LCI & LCA"
                        definition="Letras de Crédito Imobiliário e do Agronegócio. São investimentos de Renda Fixa isentos de Imposto de Renda para pessoas físicas."
                        example="Uma LCI de 90% do CDI pode render mais que um CDB de 110% do CDI por não ter imposto."
                        color="text-purple-400"
                    />
                    <TermCard
                        term="FGC"
                        definition="Fundo Garantidor de Créditos. Garante até R$ 250 mil por CPF e por instituição financeira em caso de falência do banco."
                        example="Se o banco quebrar, o FGC devolve seu dinheiro investido em CDB, LCI, LCA e Poupança."
                        color="text-orange-400"
                    />
                    <TermCard
                        term="IGP-M"
                        definition="Conhecido como 'inflação do aluguel'. É muito influenciado pelo dólar e preços no atacado."
                        example="Usado para reajustar contratos de aluguel e algumas tarifas de energia."
                        color="text-yellow-400"
                    />
                </div>
            </section>
        </div>
    );
}
=======
import TermCard from "@/components/education/TermCard";
import { Card } from "@/components/ui/Card";
import { Lightbulb } from "lucide-react";

export default function LearnPage() {
    return (
        <div className="p-6 space-y-8 pb-24">
            <header>
                <h1 className="text-2xl font-bold text-primary mb-2">Aprenda</h1>
                <p className="text-gray-400 text-sm">Domine os termos que afetam seu bolso.</p>
            </header>

            <section>
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Lightbulb className="text-yellow-400" size={20} />
                    Dicas Financeiras
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                    <Card className="bg-white/5 border-l-4 border-green-500">
                        <h3 className="font-bold text-white mb-2">Regra 50-30-20</h3>
                        <p className="text-sm text-gray-400">
                            Divida sua renda em: 50% para necessidades básicas, 30% para desejos e lazer, e 20% para investimentos e dívidas.
                        </p>
                    </Card>
                    <Card className="bg-white/5 border-l-4 border-blue-500">
                        <h3 className="font-bold text-white mb-2">Reserva de Emergência</h3>
                        <p className="text-sm text-gray-400">
                            Antes de investir em risco, junte de 6 a 12 meses do seu custo de vida em um investimento com liquidez diária (ex: CDB 100% CDI).
                        </p>
                    </Card>
                </div>
            </section>

            <section>
                <h2 className="text-lg font-bold text-white mb-4">Dicionário Financeiro</h2>
                <div className="space-y-4">
                    <TermCard
                        term="CDI"
                        definition="Taxa média dos empréstimos de curtíssimo prazo feitos entre os bancos. É a principal referência para investimentos de Renda Fixa."
                        example="R$ 1.000 a 100% do CDI hoje (13,71% a.a.) viram R$ 1.137 em 12 meses (bruto)."
                        color="text-green-400"
                    />
                    <TermCard
                        term="Selic"
                        definition="Taxa básica de juros da economia brasileira, definida pelo Copom a cada 45 dias. Controla a inflação e influencia todas as outras taxas."
                        example="Se a Selic sobe, o crédito fica mais caro e a Renda Fixa rende mais. Hoje está em 15,00%."
                        color="text-blue-400"
                    />
                    <TermCard
                        term="IPCA"
                        definition="Índice oficial da inflação no Brasil. Mede a variação de preços de uma cesta de produtos e serviços para o consumidor final."
                        example="Se seu investimento rende menos que o IPCA, você perdeu poder de compra."
                        color="text-red-400"
                    />
                    <TermCard
                        term="LCI & LCA"
                        definition="Letras de Crédito Imobiliário e do Agronegócio. São investimentos de Renda Fixa isentos de Imposto de Renda para pessoas físicas."
                        example="Uma LCI de 90% do CDI pode render mais que um CDB de 110% do CDI por não ter imposto."
                        color="text-purple-400"
                    />
                    <TermCard
                        term="FGC"
                        definition="Fundo Garantidor de Créditos. Garante até R$ 250 mil por CPF e por instituição financeira em caso de falência do banco."
                        example="Se o banco quebrar, o FGC devolve seu dinheiro investido em CDB, LCI, LCA e Poupança."
                        color="text-orange-400"
                    />
                    <TermCard
                        term="IGP-M"
                        definition="Conhecido como 'inflação do aluguel'. É muito influenciado pelo dólar e preços no atacado."
                        example="Usado para reajustar contratos de aluguel e algumas tarifas de energia."
                        color="text-yellow-400"
                    />
                </div>
            </section>
        </div>
    );
}
>>>>>>> 46276ec2febfdeeaa4cfc24d7a60e3a06907fd7a
