import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../providers/auth.service';
import { RoomService } from '../../providers/room.service';
import { Room } from '../../models/room';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  rooms: Array<Room>;
  constructor(private router: Router, public authService: AuthService, private roomService: RoomService) { }
  selectedRoom: Room;

  ngOnInit() {
    if (!this.authService.isLoggedIn) {
      this.router.navigateByUrl('/login');
    } else {
      this.getRooms();
    }
  }

  getRooms() {
    this.roomService.getRooms().
      subscribe(rooms => this.rooms = rooms);
    console.log(this.rooms);
  }

  onSelectedRoom(room) {
    this.roomService.selectRoom(room);
    this.router.navigateByUrl('/room');
  }
}
