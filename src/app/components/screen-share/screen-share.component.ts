import { Component, OnInit } from '@angular/core';
import {ScreenShareService} from '../../providers/screen-share.service';

@Component({
  selector: 'app-screen-share',
  templateUrl: './screen-share.component.html',
  styleUrls: ['./screen-share.component.scss']
})
export class ScreenShareComponent implements OnInit {

  constructor(private screenShareService: ScreenShareService) { }

  ngOnInit() {
  }

  btnScreenShareClick() {
    this.screenShareService.toggleScreenShare();
  }

}
