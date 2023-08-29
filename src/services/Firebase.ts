// TODO decompose it
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { Auth, GoogleAuthProvider, GithubAuthProvider, getAuth, signInWithPopup, signOut, User } from 'firebase/auth';

import { firebaseConfig } from '../../env';
import { DEFAULT_USER, ITrip, IUser } from '../interfaces/user';

export type Provider = GithubAuthProvider | GoogleAuthProvider;

const DB_APP = initializeApp(firebaseConfig);
const DB = getFirestore(DB_APP);
const COLLECTION_USERS = 'users';

class Firebase {
  private auth!: Auth;
  private _user: User;
  private _isUserAuth!: boolean;

  constructor() {
    this.auth = {} as Auth;
    this._user = {} as User;
    this._isUserAuth = false;
  }

  async init() {
    this.auth = getAuth();
    this.user = await this.setUser();
    this.isUserAuth = !!this.auth.currentUser;
  }

  get isUserAuth() {
    return this._isUserAuth;
  }
  private set isUserAuth(state: boolean) {
    this._isUserAuth = state;
  }

  get user() {
    return this._user;
  }
  private set user(user: User) {
    this._user = user;
  }

  async addUserInfo(user: Omit<IUser, 'travelHistory'>) {
    try {
      const ref = doc(DB, COLLECTION_USERS, this.user.uid);
      await setDoc(ref, user, { merge: true });
    } catch (error) {
      this.logError(error);
    }
  }

  async addTravelHistory(travelHistory: ITrip[]) {
    try {
      const ref = doc(DB, COLLECTION_USERS, this.user.uid);
      await setDoc(ref, { travelHistory }, { merge: true });
    } catch (error) {
      this.logError(error);
    }
  }

  async deleteTrip(trips: ITrip[]) {
    try {
      const ref = doc(DB, COLLECTION_USERS, this.user.uid);
      await setDoc(ref, { travelHistory: trips }, { merge: true });
    } catch (error) {
      this.logError(error);
    }
  }

  async getUserInfo(): Promise<IUser | undefined> {
    try {
      if (!this.user.uid) {
        await this.init();
      }

      const ref = doc(DB, COLLECTION_USERS, this.user.uid);
      const userDoc = await getDoc(ref);
      const userData = userDoc.data() as IUser;

      if (!userData) {
        const user = { ...DEFAULT_USER, email: this.user.email } as IUser;
        await setDoc(ref, user, { merge: true });
        return user;
      }

      return userData;
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

  private async setUser(): Promise<User> {
    return new Promise((res) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          res(user);
        } else {
          console.error('No user is signed in');
          res({} as User);
        }
      });
    });
  }

  private logError(error: unknown) {
    console.error(error);
    throw new Error(error as string);
  }
}

export default new Firebase();
