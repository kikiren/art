"use client"


import React from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { clearTempStop, addStop } from '@/store/NewTripSlice'
import { useDispatch } from 'react-redux'

interface TempStop {
    id: string;
    name: string;
    address: string;
    coordinates: [number, number];
    displayOnMap: boolean;
}

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required.",
    }),
    displayOnMap: z.boolean(),
})

const StopForm: React.FC = () => {
    const tempStop = useSelector((state: RootState) => state.newTrip.tempStop);
    if (!tempStop) {
        return null;
    }

    return <TheForm tempStop={tempStop} />
}


const TheForm: React.FC<{ tempStop: TempStop }> = ({ tempStop }) => {


    const dispatch = useDispatch();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            name: tempStop.name,
            displayOnMap: tempStop.displayOnMap,
        },
    })

    const handleFormSubmit = (data: z.infer<typeof formSchema>) => {
        const newStop = {
            id: tempStop.id,
            name: data.name,
            address: tempStop.address,
            coordinates: tempStop.coordinates,
            displayOnMap: data.displayOnMap,
        }
        dispatch(addStop(newStop));
        dispatch(clearTempStop());
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} >
                <Card className="rounded-md">
                    <CardContent className="flex flex-col gap-4">
                        <FormField

                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Display Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Display name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="displayOnMap"
                            render={({ field }) => (
                                <FormItem className="flex items-center gap-3">
                                    <FormControl>
                                        <Checkbox
                                            id="displayOnMap"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            onBlur={field.onBlur}
                                            name={field.name}
                                            aria-label="Display on map"
                                        />
                                    </FormControl>
                                    <FormLabel>Display on map</FormLabel>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                        <Button
                            variant="outline"
                            aria-label="Cancel"
                            tabIndex={0}
                            onClick={() => {
                                dispatch(clearTempStop());
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            aria-label="Add stop"
                            tabIndex={1}
                        >
                            Add stop
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}

export default StopForm