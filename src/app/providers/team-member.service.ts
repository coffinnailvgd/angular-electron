import { Injectable } from '@angular/core';
import { TeamMember } from '../models/team-member';
import { TEAMMEMBERS } from '../mocks/mock-team-members';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamMemberService {
  constructor() { }

  teamMembers: Array<TeamMember>;

  getTeamMember(ids: number[]): Observable<TeamMember[]> {
    this.teamMembers = new Array<TeamMember>();
    for (const teamMemberId of ids) {
      this.teamMembers.push(TEAMMEMBERS.find(teamMember => teamMember.id === teamMemberId));
    }
    return of(this.teamMembers);
  }
}
