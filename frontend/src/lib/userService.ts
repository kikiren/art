import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase';
import { formatTimestamp } from '@/lib/utils';

export interface UserData {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    emailVerified: boolean;
    firstLoginTime: any; // Firestore timestamp
    lastLoginTime: any; // Firestore timestamp
    createdAt: any; // Firestore timestamp
    updatedAt: any; // Firestore timestamp
}

/**
 * 检查用户是否存在于数据库中
 */
export const checkUserExists = async (uid: string): Promise<boolean> => {
    try {
        const userDoc = await getDoc(doc(db, 'users', uid));
        return userDoc.exists();
    } catch (error) {
        console.error('Error checking user existence:', error);
        return false;
    }
};

/**
 * 获取用户数据
 */
export const getUserData = async (uid: string): Promise<UserData | null> => {
    try {
        const userDoc = await getDoc(doc(db, 'users', uid));
        if (userDoc.exists()) {
            return userDoc.data() as UserData;
        }
        return null;
    } catch (error) {
        console.error('Error getting user data:', error);
        return null;
    }
};

/**
 * 创建新用户
 */
export const createUser = async (userData: Omit<UserData, 'firstLoginTime' | 'lastLoginTime' | 'createdAt' | 'updatedAt'>): Promise<void> => {
    try {
        const now = serverTimestamp();
        const newUser: UserData = {
            ...userData,
            firstLoginTime: now,
            lastLoginTime: now,
            createdAt: now,
            updatedAt: now,
        };

        await setDoc(doc(db, 'users', userData.uid), newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

/**
 * 更新用户最后登录时间
 */
export const updateUserLastLogin = async (uid: string): Promise<void> => {
    try {
        await updateDoc(doc(db, 'users', uid), {
            lastLoginTime: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
    } catch (error) {
        console.error('Error updating user last login:', error);
        throw error;
    }
};

/**
 * 处理用户登录逻辑
 * 检查用户是否存在，如果不存在则创建新用户，如果存在则更新最后登录时间
 */
export const handleUserLogin = async (userData: Omit<UserData, 'firstLoginTime' | 'lastLoginTime' | 'createdAt' | 'updatedAt'>): Promise<{ isNewUser: boolean; userData: UserData | null }> => {
    try {
        const exists = await checkUserExists(userData.uid);

        if (!exists) {
            // 新用户，创建记录
            await createUser(userData);
            const newUserData = await getUserData(userData.uid);
            if (newUserData) {
                newUserData.lastLoginTime = formatTimestamp(newUserData.lastLoginTime);
                newUserData.createdAt = formatTimestamp(newUserData.createdAt);
                newUserData.updatedAt = formatTimestamp(newUserData.updatedAt);
                newUserData.firstLoginTime = formatTimestamp(newUserData.firstLoginTime);
            }
            return { isNewUser: true, userData: newUserData };
        } else {
            // 现有用户，更新最后登录时间
            await updateUserLastLogin(userData.uid);
            const existingUserData = await getUserData(userData.uid);
            if (existingUserData) {
                existingUserData.lastLoginTime = formatTimestamp(existingUserData.lastLoginTime);
                existingUserData.createdAt = formatTimestamp(existingUserData.createdAt);
                existingUserData.updatedAt = formatTimestamp(existingUserData.updatedAt);
                existingUserData.firstLoginTime = formatTimestamp(existingUserData.firstLoginTime);
            }
            return { isNewUser: false, userData: existingUserData };
        }
    } catch (error) {
        console.error('Error handling user login:', error);
        throw error;
    }
}; 