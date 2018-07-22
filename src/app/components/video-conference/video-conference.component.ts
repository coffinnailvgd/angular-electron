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
  private localVideo = document.querySelector('video');
  private localVideoOn: boolean;
  private audioOn: boolean;

  constructor(private audioService: AudioService, private videoService: VideoService) { }

  ngOnInit() {
    this.redoVideo();
    this.localVideoOn = true;
    this.audioOn = true;
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
    then(function (stream) {
      const video = document.querySelector('video');
      video.src = window.URL.createObjectURL(stream);
      video.onloadedmetadata = function(e) {
        video.play();
      };
    })
      .catch(function (err) {
        console.log(err.name + ': ' + err.message);
      });
  }

  // gotLocalMediaStream(mediaStream) {
  //   this.localStream = mediaStream;
  //   this.localVideo.srcObject = mediaStream;
  // }
  //
  // handleLocalMediaStreamError(error) {
  //   console.log('navigator.getUserMedia error: ', error);
  // }

}
