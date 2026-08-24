import { AuthProvider, User } from 'firebase/auth';
import firestore from './Firestore';
import authentication, { IAuth } from './Auth';

import { IUser, DEFAULT_USER } from '@/common/interfaces/user';
import logger from '@/common/utils/logger';

const USERS_COLLECTION = 'users';

class UserDb implements IAuth {
  private db: firestore;
  private authentication: authentication;
  private user: User;
  private initialized?: Promise<void>;

  constructor(DB: typeof firestore, Authentication: typeof authentication) {
    this.db = new DB(USERS_COLLECTION);
    this.authentication = new Authentication();
    this.user = {} as User;
  }

  get isUserAuth() {
    return !!this.authentication.auth.currentUser;
  }

  // Shared across callers so route loaders can each await it without re-running.
  public init() {
    this.initialized ??= this.resolveInitialUser();
    return this.initialized;
  }

  private async resolveInitialUser() {
    this.authentication.init();
    this.user = await this.setUser();
  }

  public save(user: Partial<IUser>) {
    if (!this.user.uid) {
      logger.error('Cannot save: no authenticated user');
      return;
    }

    const ref = this.getUserRef();
    this.db.save(ref, user);
  }

  public async signin(provider: AuthProvider) {
    await this.authentication.signin(provider);
    this.user = this.authentication.auth.currentUser ?? ({} as User);
  }

  public async signout() {
    await this.authentication.signout();
    this.user = {} as User;
    this.initialized = undefined;
  }

  public async getUser(): Promise<IUser | undefined> {
    try {
      await this.init();

      // init() is memoized, so a stale empty result cannot be retried by calling it
      // again. Fall back to the live auth state, which is populated by this point.
      if (!this.user.uid) {
        const currentUser = this.authentication.auth.currentUser;
        if (!currentUser) {
          return;
        }
        this.user = currentUser;
      }

      const ref = this.getUserRef();
      const doc = await this.db.getDocument(ref);
      const data = doc.data() as IUser;

      if (!data) {
        const user = { ...DEFAULT_USER, email: this.user.email } as IUser;
        this.save(user);
        return user;
      }

      return data;
    } catch (error) {
      logger.error(error as string);
    }
  }

  // Resolves once auth state is known. On a cold load Firebase restores the session
  // from storage asynchronously, so the listener has to settle rather than trusting
  // whatever the first callback carries.
  private async setUser(): Promise<User> {
    return new Promise((res) => {
      const unsubscribe = this.authentication.auth.onAuthStateChanged((user) => {
        unsubscribe();

        if (user) {
          res(user);
        } else {
          logger.warn('No user is signed in');
          res({} as User);
        }
      });
    });
  }

  private getUserRef() {
    return this.db.getReference(this.user.uid);
  }
}

export default new UserDb(firestore, authentication);
