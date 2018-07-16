import { Injectable } from '@angular/core';
import { TeamService } from './team.service';
import { ROOMS } from '../mocks/mock-rooms';
import { Observable, of } from 'rxjs';
import { Room } from '../models/room';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private rooms: Array<Room>;
  private selectedRoom: Room;

  constructor(public teamService: TeamService, private authService: AuthService) { }

  getRooms(): Observable<Room[]> {
    this.rooms = new Array();
    for (const roomId of this.teamService.getSelectedTeam().rooms) {
      this.rooms.push(ROOMS.find(room => room.id === roomId));
    }
    return of(this.rooms);
  }

  selectRoom(room: Room): void {
    this.selectedRoom = room;
    this.addToRoom(room);
  }

  getSelectedRoom(): Room {
    return this.selectedRoom;
  }

  private addToRoom(room: Room): void {
    const id: number = room.id;
    ROOMS.find(room => room.id === id).teamMembers.push(this.authService.user.id);
    console.log(room);
  }
}
