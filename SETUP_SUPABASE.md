Guia rápido — Configurar Supabase e aplicar schema

1) Criar projeto Supabase
- Acesse https://app.supabase.com
- Crie um novo projeto (free tier funciona para testes)
- Guarde o `Project URL` e `anon/public key` e `service_role key` (Service Role só para servidor)

2) Aplicar o schema (SQL)
- No painel do Supabase: Database → SQL Editor
- Crie uma nova query e cole o conteúdo de `schema.sql` (arquivo deste repositório)
- Rode a query para criar as tabelas e políticas

3) Variáveis de ambiente (no Vercel)
- Abra o projeto no Vercel → Settings → Environment Variables
- Adicione:
  - `NEXT_PUBLIC_SUPABASE_URL` = Project URL (ex: https://xyz.supabase.co)
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Anon public key
  - `SUPABASE_SERVICE_ROLE_KEY` = Service Role key (marque como ENViroment SECRET)
  - `OPENAI_API_KEY` = sua chave da OpenAI

4) Testar localmente
- Crie `.env.local` com as mesmas variáveis acima (não commitar)
- Rode `npm run dev` e teste registro/login na aplicação

5) Observações de segurança
- Nunca coloque `SUPABASE_SERVICE_ROLE_KEY` no cliente ou em `.env.local` que será comitado.
- Use `SUPABASE_SERVICE_ROLE_KEY` apenas em rotas server-side (API routes) quando precisar de privilégios de escrita que bypass RLS.

6) Próximos passos opcionais
- Revisar e ajustar as políticas RLS no `schema.sql` ao seu fluxo de permissões.
- Implementar `middleware.ts` server-side que utiliza `supabaseAdmin` para validar tokens de sessão (requer `@supabase/auth-helpers-nextjs` ou lógica JWT manual).

Se quiser, eu posso gerar o comando SQL pronto com as rotinas específicas do seu app (índices extras, triggers, etc.).