import { Component, OnInit } from '@angular/core';
import {ScreenShareService} from '../../providers/screen-share.service';
import { desktopCapturer } from 'electron';

@Component({
  selector: 'app-screen-share',
  templateUrl: './screen-share.component.html',
  styleUrls: ['./screen-share.component.scss']
})
export class ScreenShareComponent implements OnInit {

  public localScreenOn: boolean;
  private localScreenVideo;
  private localStream;
  private mediaStreamConstraints = {
    audio: false,
    video: {
      mandatory: {
        chromeMediaSource: 'desktop',
        minWidth: 200,
        maxWidth: 200,
        minHeight: 150,
        maxHeight: 150
      }
    }
  };


  constructor(private screenShareService: ScreenShareService) { }

  ngOnInit() {
    this.localScreenOn = false;
  }

  btnScreenShareClick() {
    this.localScreenOn = this.screenShareService.toggleScreenShare();
    if (this.localScreenOn) {
      this.startVideo();
    } else {
      this.stopShare();
    }
  }

  startVideo() {
    const n = <any>navigator;

    desktopCapturer.getSources({types: ['window', 'screen']}, (error, sources) => {
      if (error) {
        throw error;
      }
      for (let i = 0; i < sources.length; ++i) {
        console.log('source:' + sources[i].name);
        if (sources[i].name === 'Entire screen' || sources[i].name === 'Screen 1') {
          n.mediaDevices.getUserMedia({
            audio: false,
            video: {
              mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: sources[i].id,
                minWidth: 400,
                maxWidth: 600,
                minHeight: 300,
                maxHeight: 400
              }
            }
          }).
          then(mediaStream => this.gotLocalMediaStream(mediaStream)).
          catch(err => this.handleLocalMediaStreamError(err));
        }
      }
    });
  }

  gotLocalMediaStream(mediaStream) {
    this.localScreenVideo = document.getElementById('localScreenShare');
    this.localStream = mediaStream;
    this.localScreenVideo.srcObject = mediaStream;
    this.localScreenVideo.play();
  }

  handleLocalMediaStreamError(err) {
    console.log('navigator.getUserMedia error: ', err);
  }

  stopShare() {
    const stream = this.localScreenVideo.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(function(track) {
      console.log('stopping: ' + track.name);
      track.stop();
    });
  }

}
