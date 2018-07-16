import { Component, OnInit } from '@angular/core';
import {RoomService} from '../../providers/room.service';
import {TeamMember} from '../../models/team-member';
import {Room} from '../../models/room';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  private teamMembers: Array<TeamMember>;
  protected room: Room;

  constructor(public roomService: RoomService) { }

  ngOnInit() {
    this.teamMembers = new Array<TeamMember>();
    this.room = this.roomService.getSelectedRoom();
  }
}
