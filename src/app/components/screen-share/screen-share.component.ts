import { Component, OnInit } from '@angular/core';
import {ScreenShareService} from '../../providers/screen-share.service';
import { desktopCapturer } from 'electron';

@Component({
  selector: 'app-screen-share',
  templateUrl: './screen-share.component.html',
  styleUrls: ['./screen-share.component.scss']
})
export class ScreenShareComponent implements OnInit {

  protected localScreenOn: boolean;
  private localScreenVideo;
  private localStream;
  private mediaStreamConstraints = {
    audio: false,
    video: {
      mandatory: {
        chromeMediaSource: 'desktop'
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
    }
  }

  startVideo() {
    const n = <any>navigator;
    n.mediaDevices.getUserMedia({audio: false,
      video: {
        mandatory: {
          chromeMediaSource: 'desktop'
        }
      }}).
    then(mediaStream => this.gotLocalMediaStream(mediaStream)).
    catch(err => this.handleLocalMediaStreamError(err));
  }

  randomThing() {
    desktopCapturer.getSources({types: ['window', 'screen']}, (error, sources) => {
      for (let i = 0; i < sources.length; ++i) {
        if (sources[i].name === 'Electron') {
          this.startVideo();
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

}

// const {desktopCapturer} = require('electron')
//
// desktopCapturer.getSources({types: ['window', 'screen']}, (error, sources) => {
//   if (error) throw error
//   for (let i = 0; i < sources.length; ++i) {
//     if (sources[i].name === 'Electron') {
//       navigator.mediaDevices.getUserMedia({
//         audio: false,
//         video: {
//           mandatory: {
//             chromeMediaSource: 'desktop',
//             chromeMediaSourceId: sources[i].id,
//             minWidth: 1280,
//             maxWidth: 1280,
//             minHeight: 720,
//             maxHeight: 720
//           }
//         }
//       })
//         .then((stream) => handleStream(stream))
//         .catch((e) => handleError(e))
//       return
//     }
//   }
// })
//
// function handleStream (stream) {
//   const video = document.querySelector('video')
//   video.srcObject = stream
//   video.onloadedmetadata = (e) => video.play()
// }
//
// function handleError (e) {
//   console.log(e)
// }
