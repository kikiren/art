'use client';

import { useEffect, useRef } from 'react';
import TripForm from '@/components/forms/TripForm';
import MapBoxMap from '@/components/MapBoxMap';

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
      className="w-screen bg-gray-50 min-h-[100vh] flex flex-col"
    >
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Create New Trip
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto"></p>
          </div>
        </div>
      </div>

      <div className="flex flex-1">
        <div className="w-1/3">
          <TripForm />
        </div>
        <div className="w-2/3">
          <MapBoxMap />
        </div>
      </div>
    </div>
  );
};

export default CreateTripPage;
