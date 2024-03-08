// firebaseUtils.ts
import { query, collection, where, getDocs, QuerySnapshot, DocumentData, limit } from 'firebase/firestore';
import { firestore } from './FirebaseConfig'; // Import your firebase config


interface UserData {
  // Define the structure of your document data here
  // For example:
  id: string;
  name: string;
  city: string;
  // Add other fields as needed
}


export async function getSingleDocumentByField(collectionName: string, fieldName: string, fieldValue: string): Promise<UserData | null> {
  try {
    const q = query(collection(firestore, collectionName), where(fieldName, "==", fieldValue), limit(1));
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

    if (!querySnapshot.empty) {
      // Document found, return its data
      const documentData: UserData = querySnapshot.docs[0].data() as UserData;
      return documentData;
    } else {
      console.log("No document found!");
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    throw error;
  }
}