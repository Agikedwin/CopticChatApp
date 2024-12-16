import { doc, getDoc } from 'firebase/firestore';
import { create } from 'zustand'
import { db } from './firebase';

export const useUsersStore = create((set) => ({
    currentUser: null,
    isLoading: true,
    fetchUserInfo: async (uid) => {
        console.log("the uuid at the user store +++++++++++", uid)

        if(!uid) return set({currentUser: null, isLoading: false});

        try {
            const docRef = doc(db, "users", uid);          
            

            const docSnap = await getDoc(docRef);

            console.log("User docs::::: ", docSnap.exists())

            
            if(docSnap.exists()){
                console.log("Documet data ", docSnap.data())
                set({currentUser: docSnap.data(), isLoading: false})
            }else{
                set({currentUser: null, isLoading: false})
            }
            
        } catch (error) {
            console.log(error.message)
            return set({currentUser: null, isLoading: false});
            
        }
 
    }
  }))