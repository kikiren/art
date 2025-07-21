'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTrip } from '@/hooks/useTrip';
import ProtectedRoute from '@/components/ProtectedRoute';

type Trip = {
    id: string;
    title: string;
    description?: string;
    createdAt?: string | number | Date;
    [key: string]: any;
};

const formatDate = (dateValue: string | number | Date | undefined): string => {
    if (!dateValue) return '';
    const date = typeof dateValue === 'string' || typeof dateValue === 'number'
        ? new Date(dateValue)
        : dateValue;
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

const TripsPage: React.FC = () => {
    const { trips } = useTrip();
    const router = useRouter();

    const handleCreateTrip = () => {
        router.push('/create');
    };

    return (
        <ProtectedRoute>
            <div className="max-w-6xl mx-auto py-8 px-4">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">My Trips</h1>
                    <Button
                        onClick={handleCreateTrip}
                        className="ml-4"
                        aria-label="Create Trip"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                handleCreateTrip();
                            }
                        }}
                    >
                        Create Trip
                    </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {trips && trips.length > 0 ? (
                        trips.map((trip: Trip) => (
                            <Card key={trip.id} className="flex flex-col h-full">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-lg">{trip.title}</CardTitle>
                                    {trip.createdAt && (
                                        <span className="text-xs text-gray-400 ml-2" aria-label="Created at">
                                            {formatDate(trip.createdAt)}
                                        </span>
                                    )}
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <p className="text-gray-600">{trip.description}</p>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <div className="text-gray-500 text-center py-12 col-span-full">No trips found.</div>
                    )}
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default TripsPage;