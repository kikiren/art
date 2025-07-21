import { doc, getDoc, serverTimestamp, addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
import { formatTimestamp } from '@/lib/utils';


export interface newTripData {
    title: string;
    description: string;
    stops: any[];
}

export interface StopData {
    id: string;
    name: string;
    description: string;
    displayOnMap: boolean;
}

export interface TripData extends newTripData {
    id: string;
    createdAt: any;
    userId: string;
}

export const saveTrip = async (tripData: newTripData, userId: string) => {
    const data = { title: tripData.title, description: tripData.description, stops: tripData.stops, userId: userId, createdAt: serverTimestamp() }
    const docRef = await addDoc(collection(db, 'trips'), data);
    return docRef.id;
}

export const getTripById = async (id: string) => {
    const docRef = doc(db, 'trips', id);
    const docSnap = await getDoc(docRef);
    return docSnap.data() as TripData;
}

export const getTripsByUserId = async (userId: string) => {
    const tripsRef = collection(db, 'trips');
    const q = query(tripsRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
        const data = doc.data() as TripData;
        data.createdAt = formatTimestamp(data.createdAt);
        return data;
    });
}
