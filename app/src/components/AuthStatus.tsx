"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { logout } from "@/services/auth";
import {
    User as UserIcon,
    Mail,
    Fingerprint,
    ShieldCheck,
    LogOut,
    UserCircle
} from "lucide-react";

export default function AuthStatus() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
        });
        return () => unsub();
    }, []);

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center p-6 text-gray-400 animate-pulse">
                <UserCircle size={48} strokeWidth={1} />
                <p className="mt-2 text-sm font-medium">Nenhum usuário conectado</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Avatar e Header */}
            <div className="flex flex-col items-center gap-3">
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                    <img
                        src={user.photoURL || ""}
                        alt="avatar"
                        className="relative w-20 h-20 rounded-full border-2 border-white object-cover shadow-sm"
                    />
                </div>
                <div className="text-center">
                    <h2 className="text-xl font-bold text-gray-800">{user.displayName}</h2>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Conectado via {user.providerData.map(p => p.providerId).join(", ")}
                    </span>
                </div>
            </div>

            {/* Grid de Informações */}
            <div className="grid gap-3 text-sm">
                <InfoRow
                    icon={<Mail size={16} />}
                    label="Email"
                    value={user.email || "N/A"}
                />
                <InfoRow
                    icon={<Fingerprint size={16} />}
                    label="UID"
                    value={user.uid}
                    isCode
                />
            </div>

            {/* Botão de Logout */}
            <button
                onClick={logout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-red-50 text-red-600 font-semibold border border-red-200 rounded-xl transition-colors duration-200 active:scale-[0.98]"
            >
                <LogOut size={18} />
                Sair da conta
            </button>
        </div>
    );
}

// Sub-componente para organizar as linhas de informação
function InfoRow({ icon, label, value, isCode = false }: {
    icon: React.ReactNode,
    label: string,
    value: string,
    isCode?: boolean
}) {
    return (
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="text-gray-400">
                {icon}
            </div>
            <div className="flex flex-col overflow-hidden">
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                    {label}
                </span>
                <span className={`text-gray-700 truncate ${isCode ? 'font-mono text-[11px] bg-gray-200/50 px-1 rounded' : 'font-medium'}`}>
                    {value}
                </span>
            </div>
        </div>
    );
}