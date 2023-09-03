import { AuthProvider, User } from 'firebase/auth';
import firestore from './Firestore';
import authentication, { IAuth } from './Auth';

import { IUser, DEFAULT_USER } from '../../interfaces/user';
import logger from '../../utils/logger';

const USERS_COLLECTION = 'users';

class UserDb implements IAuth {
  private db: firestore;
  private authentication: authentication;
  private user: User;

  constructor(DB: typeof firestore, Authentication: typeof authentication) {
    this.db = new DB(USERS_COLLECTION);
    this.authentication = new Authentication();
    this.user = {} as User;
  }

  get isUserAuth() {
    return !!this.authentication.auth.currentUser;
  }

  public async init() {
    this.authentication.init();
    this.user = await this.setUser();
  }

  public save(user: Partial<IUser>) {
    const ref = this.getUserRef();
    this.db.save(ref, user);
  }

  public async signin(provider: AuthProvider) {
    await this.authentication.signin(provider);
  }

  public async signout() {
    await this.authentication.signout();
  }

  public async getUser(): Promise<IUser | undefined> {
    try {
      if (!this.user.uid) {
        await this.init();
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

  private async setUser(): Promise<User> {
    return new Promise((res) => {
      this.authentication.auth.onAuthStateChanged((user) => {
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
