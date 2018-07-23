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
  private mediaStreamConstraints = { video: true, };
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
    this.redoVideo();
  }

  private redoVideo() {
    navigator.mediaDevices.getUserMedia(this.mediaStreamConstraints).
      then(mediaStream => this.gotLocalMediaStream(mediaStream)).
      catch(err => this.handleLocalMediaStreamError(err));
  }

  gotLocalMediaStream(mediaStream) {
    this.localVideo = document.getElementById('localVideo');
    this.localStream = mediaStream;
    this.localVideo.srcObject = mediaStream;
    this.localVideo.play();
  }

  handleLocalMediaStreamError(err) {
    console.log('navigator.getUserMedia error: ', err);
  }

}
