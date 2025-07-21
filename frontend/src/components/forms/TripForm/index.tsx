'use client';

import React, { useRef } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { clearList, updateTitle, updateDescription } from '@/store/NewTripSlice';
import downloadMap from '@/components/forms/TripForm/downloadMap';
import { Input } from '@/components/ui/input';
import { RootState } from '@/store';
import StopForm from '@/components/forms/TripForm/StopForm';
import { useTrip } from '@/hooks/useTrip';
import { useRouter } from 'next/navigation';


export const TripForm: React.FC = () => {
  const dispatch = useDispatch();
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const stops = useSelector((state: RootState) => state.newTrip.stops);

  const tripData = useSelector((state: RootState) => state.newTrip);
  const user = useSelector((state: RootState) => state.auth!.user);
  const { saveTrip } = useTrip();
  const router = useRouter();
  return (
    <Card className="h-full" id="newTripForm">
      <CardHeader>
        <CardTitle>Create a new trip</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 h-full">
        <Input
          placeholder="Title"
          ref={titleRef}
          onChange={(e) => dispatch(updateTitle(e.target.value))}
        />
        <Input
          placeholder="Description"
          ref={descriptionRef}
          onChange={(e) => dispatch(updateDescription(e.target.value))}
        />
        <MapboxAutocomplete />
        <StopForm />
        <div className="text-sm text-gray-500">{stops.length} stops added</div>
        <StopList />
      </CardContent>
      <CardFooter className="flex gap-2 justify-end">
        <Button variant="secondary" onClick={() => {
          dispatch(clearList());
          if (titleRef.current) {
            titleRef.current.value = '';
          }
          if (descriptionRef.current) {
            descriptionRef.current.value = '';
          }
        }}>Re-start</Button>
        <Button onClick={downloadMap}>Preview</Button>
        <Button onClick={downloadMap}>Download</Button>
        <Button onClick={() => {
          saveTrip(tripData, user!.uid)
          router.push('/trips');
        }}>Save</Button>
      </CardFooter>
    </Card >
  );
};

export default TripForm;
