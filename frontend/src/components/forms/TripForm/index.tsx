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
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { clearList } from '@/store/NewTripSlice';
import downloadMap from '@/components/forms/TripForm/downloadMap';


export const TripForm: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <Card className="h-full" id="newTripForm">
      <CardHeader>
        <CardTitle>Add stops</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 h-full">
        <MapboxAutocomplete />
        <StopList />
      </CardContent>
      <CardFooter className="flex gap-2 justify-end">
        <Button variant="secondary" onClick={() => {
          dispatch(clearList());
        }}>Clear</Button>
        <Button onClick={downloadMap}>Download</Button>
      </CardFooter>
    </Card>
  );
};

export default TripForm;
