import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTrips } from "@/store/userSlice";
import { clearList } from "@/store/NewTripSlice";
import { saveTrip as saveTripToDB, getTripsByUserId } from "@/lib/tripServices";

export const useTrip = () => {

    const dispatch = useAppDispatch();
    const trips = useAppSelector((state) => state.user.trips);

    const saveTrip = async (trip: any, userId: string): Promise<string> => {
        const tripId = await saveTripToDB(trip, userId);
        const trips = await getTripsByUserId(userId);
        dispatch(setTrips(trips));
        dispatch(clearList());
        return tripId;
    };

    return {
        trips,
        saveTrip
    };
}