'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import MapboxAutocomplete from '@/components/forms/TripForm/MapboxAutocomplete';
import StopList from '@/components/forms/TripForm/StopList';
export const TripForm: React.FC = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Add stops</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 h-full">
        <MapboxAutocomplete />
        <StopList />
      </CardContent>
      <CardFooter className="flex gap-2"></CardFooter>
    </Card>
  );
};

export default TripForm;
