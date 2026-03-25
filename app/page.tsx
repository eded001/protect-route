"use client";

import { useState } from "react";
import { GitMergeIcon, Loader2, UserCircle } from "lucide-react";
import { loginWithGoogle, loginWithGithub } from "@/services/auth";
import { useRouter } from "next/navigation";
import AuthStatus from "@/components/AuthStatus";

export default function LoginPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();

  async function handleLogin(fn: () => Promise<any>, provider: string) {
    try {
      setLoading(provider);

      const result = await fn();

      // 🔑 pega token do firebase
      const token = await result.user.getIdToken();

      // 🔐 cria sessão no backend
      await fetch("/api/session", {
        method: "POST",
        body: JSON.stringify({ token }),
      });

      // 🚀 redireciona
      router.push("/app");

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-gray-100 to-gray-200 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-10">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 text-white shadow-lg mb-4">
            <UserCircle size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Bem-vindo
          </h1>
          <p className="text-gray-500 mt-2">
            Escolha uma forma de acessar sua conta
          </p>
        </div>

        {/* Buttons Group */}
        <div className="flex flex-col gap-4">
          {/* Google Button */}
          <button
            onClick={() => handleLogin(loginWithGoogle, 'google')}
            disabled={!!loading}
            className="group relative w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3.5 px-4 rounded-xl border border-gray-300 shadow-sm transition-all active:scale-[0.98] disabled:opacity-70"
          >
            {loading === 'google' ? (
              <Loader2 className="animate-spin text-gray-500" size={20} />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            )}
            <span>Entrar com Google</span>
          </button>

          {/* GitHub Button */}
          <button
            onClick={() => handleLogin(loginWithGithub, 'github')}
            disabled={!!loading}
            className="w-full flex items-center justify-center gap-3 bg-gray-900 hover:bg-black text-white font-medium py-3.5 px-4 rounded-xl shadow-lg transition-all active:scale-[0.98] disabled:opacity-70"
          >
            {loading === 'github' ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <GitMergeIcon size={20} />
            )}
            <span>Entrar com GitHub</span>
          </button>
        </div>

        {/* Divider text */}
        <div className="relative my-8 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <span className="relative px-4 bg-white text-sm text-gray-400 uppercase tracking-widest">
            Sessão Atual
          </span>
        </div>

        {/* Status Component */}
        <div className="bg-gray-50 rounded-2xl p-4 border border-dashed border-gray-200">
          <AuthStatus />
        </div>

        <p className="mt-8 text-center text-xs text-gray-400">
          Ao entrar, você concorda com nossos <br />
          <a href="#" className="underline hover:text-gray-600">Termos de Serviço</a>.
        </p>
      </div>
    </div>
  );
}