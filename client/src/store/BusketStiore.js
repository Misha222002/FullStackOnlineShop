import { makeAutoObservable } from "mobx";

export default class BasketStore {
  constructor() {
    this._devices = {};
    this._isLoading = false;
    makeAutoObservable(this);
  }

  setDevices(devices) {
    this._devices = devices;
  }

  setIsLoading(bool) {
    this._isLoading = bool;
  }

  get devices() {
    return this._devices;
  }
  get isLoading() {
    return this._isLoading;
  }
}
