import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private videoOn: boolean;

  constructor() {
    this.videoOn = false;
  }

  toggleVideo(): boolean {
    this.videoOn = !this.videoOn;
    return this.videoOn;
  }
}
