'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import _ from 'lodash';
import { useDispatch, us, useSelector } from 'react-redux';
import { addTempStop } from '@/store/NewTripSlice';
import { Input } from '@/components/ui/input';
import { RootState } from '@/store';

interface Place {
  properties: any;
  id: string;
  place_name: string;
  center: [number, number];
  context?: Array<{ id: string; text: string }>;
}

export default function MapboxAutocomplete() {
  const dispatch = useDispatch();
  const tempStop = useSelector((state: RootState) => state.newTrip.tempStop);
  const [suggestions, setSuggestions] = useState<Place[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSelected, setHasSelected] = useState(false);
  const [lastSearchValue, setLastSearchValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const searchPlaces = useCallback(async (query: string) => {
    if (!query.trim() || query.length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    // Don't search if the value hasn't changed and we already have suggestions
    if (query === lastSearchValue && suggestions.length > 0) {
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`/api/place?query=${query}`);
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await res.json();
      if (data.features) {
        setSuggestions(data.features);
        setIsOpen(true);
        setSelectedIndex(-1);
        setLastSearchValue(query);
      }
    } catch (error) {
      console.error('Error searching places:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleInputChange = _.debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      searchPlaces(value);
    },
    500
  );

  const handleSelect = (place: Place) => {
    setIsOpen(false);
    setSelectedIndex(-1);
    setHasSelected(true); // Mark that user has selected an option
    setSuggestions([]); // Clear suggestions
    const newPlace = {
      id: _.get(place, 'id'),
      name: _.get(place, 'properties.name_preferred'),
      address: _.get(place, 'properties.full_address'),
      coordinates: _.get(place, 'geometry.coordinates'),
      displayOnMap: true,
    };
    dispatch(addTempStop(newPlace));
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) {
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSelect(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      inputRef.current &&
      !inputRef.current.contains(event.target as Node) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleFocus = () => {
    // Only show dropdown if there are suggestions and user hasn't just selected
    if (suggestions.length > 0 && !hasSelected) {
      setIsOpen(true);
    }
  };

  if (tempStop) {
    return null;
  }

  return (
    <div className="relative">
      <Input
        placeholder="Search for place"
        ref={inputRef}
        type="text"
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        className={`focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
      />
      {isLoading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
        </div>
      )}

      {isOpen && suggestions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          {suggestions.map((place, index) => (
            <div
              key={place.id}
              className={`px-3 py-2 cursor-pointer hover:bg-gray-50 ${index === selectedIndex
                ? 'bg-blue-50 text-blue-900'
                : 'text-gray-900'
                }`}
              onClick={() => handleSelect(place)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <div className="font-medium text-sm">
                {place.properties.name_preferred}
              </div>
              <div className="text-xs text-gray-500">
                {place.properties.full_address}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
