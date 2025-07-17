import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { removeStop } from '@/store/stopListSlice';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const StopList = () => {
    const dispatch = useDispatch();
    const stops = useSelector((state: RootState) => state.stopList.list);
    return (
        <ScrollArea
            className="h-full w-full rounded-md border"
            aria-label="List of stops"
        >
            {stops.length === 0 ? (
                <div className="text-gray-400 py-2 px-4">No stops added yet.</div>
            ) : (
                <ul>
                    {stops.map((stop: any) => (
                        <li key={stop.id}>
                            <div className="py-2 px-4 flex items-center justify-between cursor-pointer">
                                <div>
                                    <div className="font-medium">
                                        {stop.name || 'Unnamed Stop'}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {stop.address || ''}
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    aria-label="Remove stop"
                                    onClick={() => dispatch(removeStop(stop.id))}
                                >
                                    <X />
                                </Button>
                            </div>
                            <Separator />
                        </li>
                    ))}
                </ul>
            )}
        </ScrollArea>
    );
};

export default StopList;
