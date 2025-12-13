DEPLOYMENT — Wtm Corps Finanças

Resumo rápido
- Este documento descreve passos essenciais para subir o projeto no Vercel com segurança.

Recomendações antes do deploy
- Remova chaves sensíveis do repositório. Não comite `.env.local`.
- Gerei e guarde as chaves do OpenAI e do Supabase em local seguro.

Variáveis de ambiente recomendadas (Vercel)
- OPENAI_API_KEY: chave da OpenAI (ex: sk-...)
- NEXT_PUBLIC_SUPABASE_URL: url pública do seu projeto Supabase (se usar Supabase)
- NEXT_PUBLIC_SUPABASE_ANON_KEY: chave anônima do Supabase (opcional, só para cliente)
- SUPABASE_SERVICE_ROLE_KEY: chave do serviço (só se usar server-side APIs)
- NEXTAUTH_URL (se usar next-auth)

Comandos
- Build localmente para checar: `npm run build`
- Rodar em dev local: `npm run dev`

Instruções para Vercel
1. Faça login em https://vercel.com e conecte o repositório (GitHub/GitLab/Bitbucket).
2. Defina as variáveis de ambiente na seção "Settings → Environment Variables" do projeto Vercel.
   - Para segredos, use o ambiente `Production`.
3. Configure o comando de build: `npm run build` e o output (padrão Next) não precisa mudar.
4. Faça deploy — Vercel executará o build no servidor.

Sobre Supabase (chat em tempo real)
- Se planeja usar o chatbot com persistência e realtime:
  1. Crie um projeto em https://app.supabase.com
  2. Execute o SQL de schema (arquivo `SETUP_COMPLETO.md` ou `schema.sql` se fornecido)
  3. Copie `SUPABASE_URL` e `SUPABASE_ANON_KEY` (ou a `SERVICE_ROLE` para APIs server-side) para as env vars no Vercel.
  4. Atualize `.env.local` localmente apenas para testes (não commitar).

Segurança
- Nunca commit chaves privadas.
- Rotation de keys: se a chave foi exposta, regenere no painel da OpenAI/Supabase.

Checklist rápido antes de subir
- [ ] `npm run build` passa localmente
- [ ] `.env.local` contém apenas variáveis de desenvolvimento e está no `.gitignore`
- [ ] Variáveis de produção configuradas no Vercel
- [ ] Se usar Supabase, crie as tabelas e políticas RLS conforme o SQL de schema

Contato
- Se quiser, eu posso reimplementar AuthContext usando Supabase antes do deploy.
