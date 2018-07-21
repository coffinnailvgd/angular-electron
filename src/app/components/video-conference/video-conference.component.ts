import { Component, OnInit } from '@angular/core';
import {AudioService} from '../../providers/audio.service';
import {VideoService} from '../../providers/video.service';

@Component({
  selector: 'app-video-conference',
  templateUrl: './video-conference.component.html',
  styleUrls: ['./video-conference.component.scss']
})
export class VideoConferenceComponent implements OnInit {

  constructor(private audioService: AudioService, private videoService: VideoService) { }

  ngOnInit() {
  }

  btnAudioClick() {
    this.audioService.toggleAudio();
  }

  btnVideoClick() {
    this.videoService.toggleVideo();
  }

}
