import { initializeApp } from 'firebase/app';
import { Auth, getAuth, GoogleAuthProvider, signInWithPopup, GithubAuthProvider, signOut } from 'firebase/auth';
import { firebaseConfig } from '../../env';

export type Provider = GithubAuthProvider | GoogleAuthProvider;

class Firebase {
  private auth!: Auth;
  isUserAuth!: boolean;

  constructor() {
    this.isUserAuth = false;
  }

  async init() {
    initializeApp(firebaseConfig);
    this.auth = getAuth();
    this.isUserAuth = await this.checkIsUserAuth();
  }

  async signin(provider: Provider) {
    try {
      const userCred = await signInWithPopup(this.auth, provider);
      this.isUserAuth = true;
      return userCred;
    } catch (error) {
      console.error(error);
      throw new Error(error as string);
    }
  }

  async signout() {
    try {
      await signOut(this.auth);
      this.isUserAuth = false;
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  }

  private async checkIsUserAuth(): Promise<boolean> {
    return new Promise((res) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          user.getIdToken().then(function (idToken) {
            console.log(idToken);
            res(true);
          });
        } else {
          console.log('No user is signed in');
          res(false);
        }
      });
    });
  }
}

export default new Firebase();
