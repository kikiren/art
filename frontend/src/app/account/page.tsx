'use client';

import React, { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { User, LogOut, Mail, Shield, Calendar, Clock } from 'lucide-react';
import { getUserData, UserData } from '@/lib/userService';

const AccountPage = () => {
    const { user, signOut } = useAuth();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            if (user?.uid) {
                try {
                    const data = await getUserData(user.uid);
                    setUserData(data);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchUserData();
    }, [user?.uid]);

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error('Sign out error:', error);
        }
    };

    const formatTimestamp = (timestamp: any) => {
        if (!timestamp) return '未知';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleString('zh-CN');
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
                        <p className="text-gray-600 mt-2">Manage your account information and preferences</p>
                    </div>

                    <div className="grid gap-6">
                        {/* User Info Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    Profile Information
                                </CardTitle>
                                <CardDescription>
                                    View and manage your personal information
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    {user?.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt="Profile"
                                            className="h-16 w-16 rounded-full"
                                        />
                                    ) : (
                                        <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                                            <User className="h-8 w-8 text-gray-500" />
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="text-lg font-semibold">
                                            {user?.displayName || 'No name set'}
                                        </h3>
                                        <p className="text-gray-600 flex items-center gap-1">
                                            <Mail className="h-4 w-4" />
                                            {user?.email}
                                        </p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">User ID</label>
                                        <p className="text-sm text-gray-600 mt-1">{user?.uid}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Email Verification Status</label>
                                        <div className="flex items-center gap-2 mt-1">
                                            {user?.emailVerified ? (
                                                <Shield className="h-4 w-4 text-green-500" />
                                            ) : (
                                                <Shield className="h-4 w-4 text-red-500" />
                                            )}
                                            <span className={`text-sm ${user?.emailVerified ? 'text-green-600' : 'text-red-600'}`}>
                                                {user?.emailVerified ? 'Verified' : 'Not Verified'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {userData && (
                                    <>
                                        <Separator />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                                    <Calendar className="h-4 w-4" />
                                                    First Login Time
                                                </label>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {formatTimestamp(userData.firstLoginTime)}
                                                </p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                                    <Clock className="h-4 w-4" />
                                                    Last Login Time
                                                </label>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {formatTimestamp(userData.lastLoginTime)}
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>

                        {/* 账户操作卡片 */}
                        <Card>
                            <CardHeader>
                                <CardTitle>账户操作</CardTitle>
                                <CardDescription>
                                    管理您的账户
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button
                                    variant="outline"
                                    onClick={handleSignOut}
                                    className="flex items-center gap-2"
                                >
                                    <LogOut className="h-4 w-4" />
                                    退出登录
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default AccountPage;