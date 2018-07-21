import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScreenShareService {
  private screenShareOn: boolean;

  constructor() {
    this.screenShareOn = false;
  }

  toggleScreenShare(): boolean {
    this.screenShareOn = !this.screenShareOn;
    console.log('screen share ' + this.screenShareOn);
    return this.screenShareOn;
  }
}
