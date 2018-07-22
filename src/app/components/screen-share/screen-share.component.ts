import { Component, OnInit } from '@angular/core';
import {ScreenShareService} from '../../providers/screen-share.service';

@Component({
  selector: 'app-screen-share',
  templateUrl: './screen-share.component.html',
  styleUrls: ['./screen-share.component.scss']
})
export class ScreenShareComponent implements OnInit {

  protected localScreenOn: boolean;

  constructor(private screenShareService: ScreenShareService) { }

  ngOnInit() {
    this.localScreenOn = false;
  }

  btnScreenShareClick() {
    this.localScreenOn = this.screenShareService.toggleScreenShare();
  }

}
