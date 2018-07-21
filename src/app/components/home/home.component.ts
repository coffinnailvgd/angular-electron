import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../providers/auth.service';
import { RoomService } from '../../providers/room.service';
import { Room } from '../../models/room';
import {TeamService} from '../../providers/team.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  rooms: Array<Room>;
  constructor(
    private router: Router,
    private authService: AuthService,
    private roomService: RoomService,
    private teamService: TeamService) { }
  selectedRoom: Room;
  teamname: string;

  ngOnInit() {
    if (!this.authService.isLoggedIn) {
      this.router.navigateByUrl('/login');
    } else {
      this.getRooms();
      this.teamname = this.teamService.getSelectedTeam().name;
    }
  }

  getRooms() {
    this.roomService.getRooms().
      subscribe(rooms => this.rooms = rooms);
  }

  onSelectedRoom(room) {
    this.roomService.selectRoom(room);
    this.router.navigateByUrl('/room');
  }
}
