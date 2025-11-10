import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { db } from './config';

const COLLECTION_NAME = 'contactRequests';

// Neue Kontaktanfrage hinzufügen
export const addContactRequest = async (requestData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...requestData,
      date: new Date().toISOString(),
      status: 'neu',
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Fehler beim Hinzufügen der Kontaktanfrage:', error);
    throw error;
  }
};

// Alle Kontaktanfragen abrufen
export const getContactRequests = async () => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Fehler beim Abrufen der Kontaktanfragen:', error);
    // Falls Index fehlt, versuche ohne orderBy
    if (error.code === 'failed-precondition') {
      // Index fehlt, lade ohne Sortierung
      try {
        const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
        const requests = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        // Manuell sortieren
        return requests.sort((a, b) => {
          const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || a.date);
          const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || b.date);
          return dateB - dateA;
        });
      } catch (fallbackError) {
        console.error('Auch Fallback fehlgeschlagen:', fallbackError);
        throw error;
      }
    }
    throw error;
  }
};

// Kontaktanfrage aktualisieren (z.B. Status ändern)
export const updateContactRequest = async (id, updates) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Fehler beim Aktualisieren der Kontaktanfrage:', error);
    throw error;
  }
};

// Kontaktanfrage löschen
export const deleteContactRequest = async (id) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Fehler beim Löschen der Kontaktanfrage:', error);
    throw error;
  }
};

// Echtzeit-Updates abonnieren
export const subscribeToContactRequests = (callback, onError) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('createdAt', 'desc')
    );
    
    return onSnapshot(q, (querySnapshot) => {
      const requests = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(requests);
    }, (error) => {
      console.error('Fehler beim Abonnieren von Kontaktanfragen:', error);
      if (error.code === 'failed-precondition') {
        console.error('Firestore Index fehlt! Bitte erstelle einen Index für createdAt in Firebase Console.');
      }
      if (onError) onError(error);
    });
  } catch (error) {
    console.error('Fehler beim Erstellen der Query:', error);
    if (onError) onError(error);
    return () => {}; // Return empty unsubscribe function
  }
};

