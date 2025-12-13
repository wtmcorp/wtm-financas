// Exemplo de uso do novo AuthContext com Supabase
// Este arquivo mostra como integrar a autenticação nas suas páginas

import React, { useState, ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

// ===================================
// 1. COMPONENTE PROTEGIDO
// ===================================
export function ProtectedPage({ children }: { children: ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  return <>{children}</>;
}

// ===================================
// 2. PÁGINA DE LOGIN
// ===================================
export function LoginExample() {
  const { login } = useAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      // Redirecionamento automático pelo AuthContext
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
}

// ===================================
// 3. PÁGINA DE REGISTRO
// ===================================
export function RegisterExample() {
  const { register } = useAuth();
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const [error, setError] = React.useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(form.email, form.password, form.name, form.phone);
      // Sucesso - usuário será redirecionado
    } catch (err: any) {
      setError(err.message || 'Erro ao registrar');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type="text"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Nome"
      />
      <input
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        placeholder="Email"
      />
      <input
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        placeholder="Senha"
      />
      <input
        type="tel"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        placeholder="Telefone (opcional)"
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Registrar</button>
    </form>
  );
}

// ===================================
// 4. COMPONENTE DE PERFIL DO USUÁRIO
// ===================================
export function UserProfile() {
  const { user, updateIncome, logout } = useAuth();
  const [income, setIncome] = React.useState(user?.income || 0);

  const handleUpdateIncome = async () => {
    try {
      await updateIncome(income);
      alert('Renda atualizada com sucesso!');
    } catch (err) {
      alert('Erro ao atualizar renda');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      // Redirecionamento automático
    } catch (err) {
      alert('Erro ao fazer logout');
    }
  };

  if (!user) {
    return <div>Nenhum usuário logado</div>;
  }

  return (
    <div>
      <h1>Bem-vindo, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <p>Telefone: {user.phone || 'Não informado'}</p>

      <div>
        <label>Renda Mensal (R$):</label>
        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(parseFloat(e.target.value))}
        />
        <button onClick={handleUpdateIncome}>Atualizar</button>
      </div>

      <button onClick={handleLogout} style={{ color: 'red' }}>
        Logout
      </button>
    </div>
  );
}

// ===================================
// 5. HEADER COM STATUS DE AUTENTICAÇÃO
// ===================================
export function AuthHeader() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Wtm Corps Finanças</h1>
        {isAuthenticated && user ? (
          <div>
            <span>{user.name}</span>
            <button onClick={logout} style={{ marginLeft: '10px' }}>
              Sair
            </button>
          </div>
        ) : (
          <div>
            <a href="/login">Login</a>
            <a href="/register" style={{ marginLeft: '10px' }}>
              Registrar
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

// ===================================
// 6. ATUALIZAR LAYOUT PRINCIPAL
// ===================================
// Em src/app/layout.tsx, envolva com o AuthProvider:

import { AuthProvider } from '@/contexts/AuthContext';

export function RootLayoutExample({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          <AuthHeader />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

// ===================================
// 7. CHAMAR O CHAT EM QUALQUER PÁGINA
// ===================================
import Chat from '@/components/ai/Chat';

export function ChatPageExample() {
  return (
    <ProtectedPage>
      <div style={{ height: '600px' }}>
        <Chat />
      </div>
    </ProtectedPage>
  );
}

// ===================================
// 8. HOOK CUSTOMIZADO PARA DADOS DO USUÁRIO
// ===================================
export function useUserData() {
  const { user } = useAuth();

  return {
    name: user?.name || 'Visitante',
    email: user?.email || 'não-logado@example.com',
    income: user?.income || 0,
    isLoaded: !!user,
  };
}

// ===================================
// EXEMPLO DE USO
// ===================================

// Em qualquer página:

export function MyPageExample() {
  const { name, income } = useUserData();

  return (
    <div>
      <h1>Olá, {name}!</h1>
      <p>Sua renda mensal: R$ {income.toFixed(2)}</p>
    </div>
  );
}

// ===================================
// API DE FETCH AUTENTICADO
// ===================================
export async function fetchAutenticado(url: string, options: RequestInit = {}) {
  // Nota: hooks do React não podem ser usados aqui. Como este arquivo é
  // um conjunto de exemplos, usamos localStorage para obter o usuário salvo
  // na implementação atual (AuthContext baseado em localStorage).
  const saved = typeof window !== 'undefined' ? localStorage.getItem('wtm_user') : null;
  const user = saved ? JSON.parse(saved as string) : null;

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> | undefined),
  };

  // Se você estiver usando Supabase em produção, substitua por Authorization: `Bearer <token>`.
  if (user?.id) {
    headers['X-User-Id'] = user.id;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response.json();
}

// ===================================
// MIGRATIONS DO CÓDIGO ANTIGO
// ===================================

// ANTES (usando localStorage):
// const users = localStorage.getItem("wtm_all_users");

// DEPOIS (usando Supabase):
// const { data } = await supabase.from("users").select("*");

// ANTES (estado local):
// const [user, setUser] = useState(null);

// DEPOIS (Supabase Auth):
// const { user } = useAuth();
