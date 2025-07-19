import React, { useRef, useEffect } from 'react';
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
    handleRemove: (idx: number) => void;
    index: number;
};

const SortableStopItem: React.FC<SortableStopItemProps> = ({ stop, handleRemove, index }) => {
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
                    onClick={() => handleRemove(index)}
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
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const sensors = useSensors(useSensor(PointerSensor));

    const handleRemove = (idx: number) => {
        dispatch(removeStop(idx));
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

    // 滚动到底部的函数
    const scrollToBottom = () => {
        if (scrollAreaRef.current) {
            const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
            if (scrollElement) {
                scrollElement.scrollTo({
                    top: scrollElement.scrollHeight,
                    behavior: 'smooth'
                });
            }
        }
    };

    // 暴露给外部调用的滚动函数（可选）
    const handleScrollToBottom = () => {
        scrollToBottom();
    };

    // 当stops数量增加时自动滚动到底部
    useEffect(() => {
        if (stops.length > 0) {
            // 使用setTimeout确保DOM更新完成后再滚动
            setTimeout(() => {
                scrollToBottom();
            }, 100);
        }
    }, [stops.length]);

    return (
        <ScrollArea
            ref={scrollAreaRef}
            className="w-full rounded-md border h-full max-h-[400px]"
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
                        {stops.map((stop, index) => (
                            <SortableStopItem key={`${stop.id}-${index}`} stop={stop} handleRemove={handleRemove} index={index} />
                        ))}
                    </SortableContext>
                </DndContext>
            )}
        </ScrollArea>
    );
};

export default StopList;
