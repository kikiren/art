'use client';

import { useEffect, useRef } from 'react';
import TripForm from '@/components/forms/TripForm';
import MapBoxMap from '@/components/MapBoxMap';
import { Montserrat } from 'next/font/google';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});


const PreviewContainer = () => {
  const title = useSelector((state: RootState) => state.newTrip.title);
  const description = useSelector((state: RootState) => state.newTrip.description);
  return (
    <div
      id="newTripPreview"
      className="box-border flex flex-col gap-3 p-8 aspect-[4/3] w-full bg-white"
    >
      <div className="flex-1">
        <MapBoxMap />
      </div>
      <div className="text-center flex flex-col gap-1">
        <h6 className={`text-3xl font-bold ${montserrat.className} font-bold`}>{title}</h6>
        <p className="text-xs font-light">
          {description}
        </p>
      </div>
    </div>
  );
};

const CreateTripPage = () => {

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div
      ref={sectionRef}
      id="create-trip"
      className="w-[100vw] h-[100vh] bg-gray-50 flex flex-col"
    >
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Create New Trip
            </h1>
          </div>
        </div>
      </div>

      <div className="flex flex-1">
        <div className="min-w-1/4">
          <TripForm />
        </div>
        <div className="p-10 flex-1 flex items-center justify-center relative">
          <div className="bg-black box-border p-5 aspect-[4/3] w-full max-w-[800px] flex items-center justify-center relative">
            <PreviewContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTripPage;
