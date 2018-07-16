import { Injectable } from '@angular/core';
import { Team } from '../models/team';
import { TEAMS } from '../mocks/mock-teams';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private selectedTeam: Team;

  constructor(private authService: AuthService) { }

  getTeams(): Observable<Team[]> {
    const userTeam = this.authService.getUser();
    return of(TEAMS.filter(team => team.id === userTeam.teams[0])); // TODO: make this return an actual array
  }

  setTeam(team: Team) {
    this.selectedTeam = team;
  }

  getSelectedTeam() {
    return this.selectedTeam;
  }
}
