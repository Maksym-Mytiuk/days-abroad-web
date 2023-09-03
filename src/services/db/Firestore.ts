import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  DocumentReference,
  DocumentData,
  PartialWithFieldValue,
} from 'firebase/firestore';
import { firebaseConfig } from '../../../env';

const FIREBASE_APP = initializeApp(firebaseConfig);

export default class Firestore {
  private firestore;
  private collection: string;

  constructor(collection: string) {
    this.firestore = getFirestore(FIREBASE_APP);
    this.collection = collection;
  }

  async getDocument(ref: DocumentReference) {
    return await getDoc(ref);
  }

  getReference(segment: string) {
    return doc(this.firestore, this.collection, segment);
  }

  save(ref: DocumentReference, data: PartialWithFieldValue<DocumentData>) {
    setDoc(ref, data, { merge: true });
  }
}
