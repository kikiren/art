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
import { useDispatch } from 'react-redux';
import { clearList, updateTitle, updateDescription } from '@/store/NewTripSlice';
import downloadMap from '@/components/forms/TripForm/downloadMap';
import { Input } from '@/components/ui/input';


export const TripForm: React.FC = () => {
  const dispatch = useDispatch();
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  return (
    <Card className="h-full" id="newTripForm">
      <CardHeader>
        <CardTitle>Add stops</CardTitle>
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
        }}>Clear</Button>
        <Button onClick={downloadMap}>Download</Button>
      </CardFooter>
    </Card>
  );
};

export default TripForm;
