'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            // 保存当前路径到 URL 参数中
            const currentPath = window.location.pathname;
            router.push(`/sign-in?redirect=${encodeURIComponent(currentPath)}`);
        }
    }, [isAuthenticated, loading, router]);

    // 显示加载状态
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    // 如果未认证，不渲染内容（会被重定向）
    if (!isAuthenticated) {
        return null;
    }

    // 如果已认证，渲染子组件
    return <>{children}</>;
};

export default ProtectedRoute; 