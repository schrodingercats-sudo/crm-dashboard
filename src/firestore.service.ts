import { Injectable, inject } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, query, where, orderBy, setDoc, Timestamp } from 'firebase/firestore';

// Reuse config (In a real app, move to environment file)
const firebaseConfig = {
    apiKey: "AIzaSyCWqmOiSs08mXXtNVpJhGb7_SG0kcyLWQ0",
    authDomain: "zyptenix-ab.firebaseapp.com",
    projectId: "zyptenix-ab",
    storageBucket: "zyptenix-ab.firebasestorage.app",
    messagingSenderId: "710758393566",
    appId: "1:710758393566:web:6c008994a556ec3691044f",
    measurementId: "G-S10E7B3ZKJ"
};

export interface Client {
    id?: string;
    name: string;
    username: string; // Used for login
    password: string; // Plain stored for this specific MVP requirement
    projectIdea: string;
    createdAt: any;
}

export interface ProjectUpdate {
    id?: string;
    clientId: string;
    content: string;
    type: 'text' | 'image' | 'milestone';
    imageUrl?: string;
    timestamp: any;
}

@Injectable({
    providedIn: 'root'
})
export class FirestoreService {
    private app = initializeApp(firebaseConfig);
    private db = getFirestore(this.app);

    constructor() { }

    // --- Admin: Client Management ---

    async addClient(client: Client) {
        try {
            const clientsRef = collection(this.db, 'clients');
            // Check for duplicate username
            const q = query(clientsRef, where('username', '==', client.username));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                throw new Error('Username already exists');
            }

            const docRef = await addDoc(clientsRef, {
                ...client,
                createdAt: Timestamp.now()
            });
            return docRef.id;
        } catch (e) {
            console.error("Error adding client: ", e);
            throw e;
        }
    }

    async getClients(): Promise<Client[]> {
        const clientsRef = collection(this.db, 'clients');
        const q = query(clientsRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Client));
    }

    async getClient(id: string): Promise<Client | null> {
        const docRef = doc(this.db, 'clients', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Client;
        }
        return null;
    }

    // --- Admin: Updates Management ---

    async addUpdate(update: ProjectUpdate) {
        try {
            // We store updates in a root collection 'updates' for simplicity, 
            // linking them via clientId.
            const updatesRef = collection(this.db, 'updates');
            const docRef = await addDoc(updatesRef, {
                ...update,
                timestamp: Timestamp.now()
            });
            return docRef.id;
        } catch (e) {
            console.error("Error adding update: ", e);
            throw e;
        }
    }

    async getUpdates(clientId: string): Promise<ProjectUpdate[]> {
        const updatesRef = collection(this.db, 'updates');
        const q = query(
            updatesRef,
            where('clientId', '==', clientId),
            orderBy('timestamp', 'desc')
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ProjectUpdate));
    }

    // --- Portal: Client Auth ---

    async loginClient(username: string, password: string): Promise<Client | null> {
        const clientsRef = collection(this.db, 'clients');
        const q = query(clientsRef, where('username', '==', username), where('password', '==', password));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            return { id: doc.id, ...doc.data() } as Client;
        }
        return null;
    }
}
