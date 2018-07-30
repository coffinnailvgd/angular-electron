import { Component, OnInit } from '@angular/core';
import {RoomService} from '../../providers/room.service';
import {TeamMember} from '../../models/team-member';
import {Room} from '../../models/room';
import {AuthService} from '../../providers/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  private teamMembers: Array<TeamMember>;
  public room: Room;

  constructor(private roomService: RoomService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (!this.authService.isLoggedIn) {
      this.router.navigateByUrl('/login');
    } else {
      this.teamMembers = new Array<TeamMember>();
      this.room = this.roomService.getSelectedRoom();
    }
  }
}
