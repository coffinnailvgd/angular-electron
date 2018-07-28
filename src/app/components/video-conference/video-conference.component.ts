import { Component, OnInit } from '@angular/core';
import {AudioService} from '../../providers/audio.service';
import {VideoService} from '../../providers/video.service';

@Component({
  selector: 'app-video-conference',
  templateUrl: './video-conference.component.html',
  styleUrls: ['./video-conference.component.scss']
})
export class VideoConferenceComponent implements OnInit {

  private localStream;
  private mediaStreamConstraints = {
    video: {
      mandatory: {
        minWidth: 200,
        maxWidth: 200,
        minHeight: 150,
        maxHeight: 150
      }
    }
  };
  private localVideo;
  public localVideoOn: boolean;
  private localAudioOn: boolean;

  constructor(private audioService: AudioService, private videoService: VideoService) { }

  ngOnInit() {
    this.localVideoOn = false;
    this.localAudioOn = false;
  }

  btnAudioClick() {
    this.audioService.toggleAudio();
  }

  btnVideoClick() {
    this.localVideoOn = this.videoService.toggleVideo();
    if (this.localVideoOn) {
      this.startLocalVideo();
    } else {
      this.stopVideo();
    }
  }

  private startLocalVideo() {
    const n = <any>navigator;
    n.mediaDevices.getUserMedia(this.mediaStreamConstraints).
      then(mediaStream => this.gotLocalMediaStream(mediaStream)).
      catch(err => this.handleLocalMediaStreamError(err));
  }

  gotLocalMediaStream(mediaStream) {
    this.localVideo = document.getElementById('localVideo');
    this.localStream = mediaStream;
    this.localVideo.srcObject = mediaStream;
    console.log('ABOUT TO CALL PLAY IN LOCAL VIDEO');
    this.localVideo.play();
  }

  stopVideo() {
    const stream = this.localVideo.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(function(track) {
      console.log('stopping: ' + track.name);
      track.stop();
    });
  }

  handleLocalMediaStreamError(err) {
    console.log('navigator.getUserMedia error: ', err);
  }

}
