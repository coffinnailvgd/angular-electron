import { Component, OnInit, Input } from '@angular/core';
import { Room } from '../../models/room';
import {TeamMemberService} from '../../providers/team-member.service';
import {TeamMember} from '../../models/team-member';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss']
})

export class RoomDetailsComponent implements OnInit {
  @Input() room: Room;
  teamMembers: Array<TeamMember>;

  constructor(private teamMemberService: TeamMemberService) { }

  ngOnInit() {
    this.teamMembers = new Array<TeamMember>();
    this.getRoomTeamMembers();
  }

  getRoomTeamMembers() {
    if (this.room != null) {
      this.teamMemberService.getTeamMember(this.room.teamMembers).subscribe(teamMembers => this.teamMembers = teamMembers);
      console.log(this.teamMembers);
      }
    }
}
