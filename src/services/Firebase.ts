import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { Auth, GoogleAuthProvider, GithubAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';

import { firebaseConfig } from '../../env';
import { ITravelHistory, IUser } from '../interfaces/user';

export type Provider = GithubAuthProvider | GoogleAuthProvider;

const DB_APP = initializeApp(firebaseConfig);
const DB = getFirestore(DB_APP);
const COLLECTION_USERS = 'users';

class Firebase {
  private _auth!: Auth;
  private _userId: string;
  private _isUserAuth!: boolean;

  constructor() {
    this._auth = {} as Auth;
    this._userId = '';
    this._isUserAuth = false;
  }

  async init() {
    this.auth = getAuth();
    this.userId = await this.setUserId();
    this.isUserAuth = !!this.auth.currentUser;
  }

  get auth() {
    return this._auth;
  }
  private set auth(auth: Auth) {
    this._auth = auth;
  }

  get isUserAuth() {
    return this._isUserAuth;
  }
  private set isUserAuth(state: boolean) {
    this._isUserAuth = state;
  }

  get userId() {
    return this._userId;
  }
  private set userId(uid: string) {
    this._userId = uid;
  }

  async addUserInfo(user: Omit<IUser, 'travelHistory'>) {
    try {
      const ref = doc(DB, COLLECTION_USERS, this.userId);
      await setDoc(ref, user, { merge: true });
    } catch (error) {
      this.logError(error);
    }
  }

  async addTravelHistory(travels: ITravelHistory[]) {
    console.log(travels);

    try {
      const ref = doc(DB, COLLECTION_USERS, this.userId);
      await setDoc(ref, { travelHistory: travels }, { merge: true });
    } catch (error) {
      this.logError(error);
    }
  }

  async getUserInfo(): Promise<IUser | undefined> {
    try {
      const ref = doc(DB, COLLECTION_USERS, this.userId);
      const userData = await getDoc(ref);

      return userData.data() as IUser;
    } catch (error) {
      this.logError(error);
    }
  }

  async signin(provider: Provider) {
    try {
      const userCred = await signInWithPopup(this.auth, provider);
      this.isUserAuth = true;
      return userCred;
    } catch (error) {
      this.logError(error);
    }
  }

  async signout() {
    try {
      await signOut(this.auth);
      this.isUserAuth = false;
    } catch (error) {
      this.logError(error);
    }
  }

  private async setUserId(): Promise<string> {
    return new Promise((res) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          res(user.uid);
        } else {
          console.log('No user is signed in');
          res('');
        }
      });
    });
  }

  private logError(error: unknown) {
    console.log(error);
    throw new Error(error as string);
  }
}

export default new Firebase();
