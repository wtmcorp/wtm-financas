-- Schema SQL para Wtm Corps Finanças

-- Tabela de usuários (perfil)
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  income numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Tabela de chats
CREATE TABLE IF NOT EXISTS public.chats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  title text,
  updated_at timestamptz DEFAULT now()
);

-- Tabela de mensagens
CREATE TABLE IF NOT EXISTS public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id uuid REFERENCES public.chats(id) ON DELETE CASCADE,
  sender text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_messages_chat_id ON public.messages(chat_id);
CREATE INDEX IF NOT EXISTS idx_chats_user_id ON public.chats(user_id);

-- Exemplo simples de políticas RLS (opcional, ajuste conforme necessidade)
-- Habilitar RLS nas tabelas para proteger dados por usuário
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Política: permitir que o usuário veja apenas seu próprio perfil
CREATE POLICY if_not_exists_users_select ON public.users
  FOR SELECT
  USING (auth.uid() = id);

-- Política: permitir que o usuário insira seu próprio perfil via server (ajuste conforme uso)
CREATE POLICY if_not_exists_users_insert ON public.users
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Política: chats - cada usuário vê seus chats
CREATE POLICY if_not_exists_chats_select ON public.chats
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY if_not_exists_chats_insert ON public.chats
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Mensagens - cada chat pertence a um usuário via chat.user_id; permitir apenas se for do mesmo usuário
CREATE POLICY if_not_exists_messages_select ON public.messages
  FOR SELECT
  USING ( (SELECT user_id FROM public.chats WHERE id = chat_id) = auth.uid() );

CREATE POLICY if_not_exists_messages_insert ON public.messages
  FOR INSERT
  WITH CHECK ( (SELECT user_id FROM public.chats WHERE id = chat_id) = auth.uid() );

-- Observação: Políticas acima dependem da função `auth.uid()` do Supabase. Ajuste conforme seu fluxo de autenticação (JWT).