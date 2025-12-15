// components/Layout.tsx
import { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';
import PrimaryButton from './buttons/PrimaryButton';

type LayoutProps = {
    children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    const { logout } = useAuth();

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Шапка */}
            <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">Админ-панель</h1>
                <PrimaryButton onClick={logout}>Выйти</PrimaryButton>
            </header>

            {/* Основной контент */}
            <main className="p-6">{children}</main>
        </div>
    );
}
