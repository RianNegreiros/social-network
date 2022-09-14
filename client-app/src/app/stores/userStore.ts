import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { store } from "./store";
import { history } from '../..';

export default class UserStore {
  user: User | null = null;
  facebookAccessToken: string | null = null;
  facebookLoading = false;
  refreshTokenTimeout: any;

  constructor() {
    makeAutoObservable(this)
  }

  get isLogggedIn() {
    return !!this.user;
  }

  login = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.login(creds);
      store.commonStore.setToken(user.token);
      this.startRefreshTokenTimer(user);
      runInAction(() => this.user = user);
      history.push('/activities');
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  }

  logout = () => {
    store.commonStore.setToken(null);
    window.localStorage.removeItem('jwt');
    this.user = null;
    history.push('/');
  }

  getUser = async () => {
    try {
      const user = await agent.Account.current();
      store.commonStore.setToken(user.token);
      runInAction(() => this.user = user);
      this.startRefreshTokenTimer(user);
    } catch (error) {
      console.log(error);
    }
  }

  register = async (creds: UserFormValues) => {
    try {
        await agent.Account.register(creds);
        history.push(`/account/registerSuccess?email=${creds.email}`);
        store.modalStore.closeModal();
    } catch (error) {
        throw error;
    }
}

  setImage = (image: string) => {
    if (this.user) this.user.image = image;
}

  setDisplayName = (name: string) => {
    if (this.user) this.user.displayName = name;
  }

  getFacebookLoginStatus = async () => {
    window.FB.getLoginStatus(response => {
      if (response.status === 'connected') {
        this.facebookAccessToken = response.authResponse.accessToken;
      }
    })
  }

  facebookLogin = () => {
    this.facebookLoading = true;
    const apiLogin = (accessToken: string) => {
      agent.Account.facebookLogin(accessToken).then(user => {
        store.commonStore.setToken(user.token);
        this.startRefreshTokenTimer(user);
        runInAction(() => {
          this.user = user;
          this.facebookLoading = false;
        })
        history.push('/activities')
      }).catch(error => {
        console.log(error);
        runInAction(() => this.facebookLoading = false);
      })
    }
    if (this.facebookAccessToken) {
      apiLogin(this.facebookAccessToken)
    } else {
      window.FB.login(response => {
        apiLogin(response.authResponse.accessToken);
      }, {scope: 'public_profile,email'})
    }
  }

  refreshToken = async () => {
    this.stopRefreshTokenTimer();
    try {
      const user = await agent.Account.refreshToken();
      runInAction(() => this.user = user);
      store.commonStore.setToken(user.token);
      this.startRefreshTokenTimer(user);
    } catch (error) {
      console.log(error);
    }
  }

  private startRefreshTokenTimer(user: User) {
    const jwtToken = JSON.parse(Buffer.from(user.token.split('.')[1], 'base64').toString());
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}