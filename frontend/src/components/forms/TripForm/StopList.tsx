import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Button } from '@/components/ui/button';
import { X, GripVertical } from 'lucide-react';
import { removeStop, reorderStops } from '@/store/NewTripSlice';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type Stop = {
    id: string;
    name?: string;
    address?: string;
};

type SortableStopItemProps = {
    stop: Stop;
    handleRemove: (id: string) => void;
};

const SortableStopItem: React.FC<SortableStopItemProps> = ({ stop, handleRemove }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: stop.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        background: isDragging ? 'rgba(229,231,235,0.5)' : undefined, // Tailwind gray-200/50
    };

    return (
        <li
            ref={setNodeRef}
            style={style}
            className="list-none"
            tabIndex={0}
            aria-label={`${stop.name || 'Unnamed Stop'}`}
        >
            <div className="py-2 px-4 flex items-center justify-between gap-2">
                <Button
                    variant="ghost"
                    aria-label="Drag to reorder"
                    tabIndex={0}
                    {...attributes}
                    {...listeners}
                >
                    <GripVertical className="w-4 h-4 text-gray-400" />
                </Button>
                <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{stop.name || 'Unnamed Stop'}</div>
                    <div className="text-xs text-gray-500 truncate">{stop.address || ''}</div>
                </div>
                <Button
                    variant="ghost"
                    aria-label="Remove stop"
                    tabIndex={0}
                    onClick={() => handleRemove(stop.id)}
                >
                    <X />
                </Button>
            </div>
            <Separator />
        </li>
    );
};

const StopList: React.FC = () => {
    const dispatch = useDispatch();
    const stops = useSelector((state: RootState) => state.newTrip.stops) as Stop[];

    const sensors = useSensors(useSensor(PointerSensor));

    const handleRemove = (id: string) => {
        dispatch(removeStop(id));
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = stops.findIndex((stop) => stop.id === active.id);
        const newIndex = stops.findIndex((stop) => stop.id === over.id);

        if (oldIndex === -1 || newIndex === -1) return;

        const newStops = arrayMove(stops, oldIndex, newIndex);
        dispatch(reorderStops(newStops));
    };

    return (
        <ScrollArea
            className="h-full w-full rounded-md border"
            aria-label="List of stops"
        >
            {stops.length === 0 ? (
                <div className="text-gray-400 py-2 px-4">No stops added yet.</div>
            ) : (
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext items={stops.map((stop) => stop.id)} strategy={verticalListSortingStrategy}>
                        {stops.map((stop) => (
                            <SortableStopItem key={stop.id} stop={stop} handleRemove={handleRemove} />
                        ))}
                    </SortableContext>
                </DndContext>
            )}
        </ScrollArea>
    );
};

export default StopList;
