import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audioOn: boolean;

  constructor() {
    this.audioOn = false;
  }

  toggleAudio(): boolean {
    this.audioOn = !this.audioOn;
    return this.audioOn;
  }
}
