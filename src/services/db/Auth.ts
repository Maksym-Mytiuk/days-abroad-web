import { Auth, getAuth, signInWithPopup, signOut, AuthProvider } from 'firebase/auth';
import logger from '../../utils/logger';

export interface IAuth {
  signin(provider: AuthProvider): Promise<void>;
  signout(): Promise<void>;
}

export default class Authentication implements IAuth {
  private _auth: Auth;

  constructor() {
    this._auth = {} as Auth;
    this.init();
  }

  init() {
    this._auth = getAuth();
  }

  get auth() {
    return this._auth;
  }

  async signin(provider: AuthProvider) {
    try {
      await signInWithPopup(this.auth, provider);
    } catch (error) {
      logger.error(error as string);
    }
  }

  async signout() {
    try {
      await signOut(this.auth);
    } catch (error) {
      logger.error(error as string);
    }
  }
}
