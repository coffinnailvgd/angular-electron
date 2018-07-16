import { Component, OnInit } from '@angular/core';
import {Team} from '../../models/team';
import {TeamService} from '../../providers/team.service';
import {Router} from '@angular/router';
import {AuthService} from '../../providers/auth.service';

@Component({
  selector: 'app-team-select',
  templateUrl: './team-select.component.html',
  styleUrls: ['./team-select.component.scss']
})
export class TeamSelectComponent implements OnInit {

  teams: Array<Team>;
  selectedTeam: Team;

  constructor(private router: Router, public authService: AuthService, private teamService: TeamService) { }

  ngOnInit() {
    this.showTeams();
  }

  showTeams() {
    this.teamService.getTeams().
      subscribe(teams => this.teams = teams)
    console.log(this.teams);
  }

  onSelectedTeam(team: Team): void {
    this.selectedTeam = team;
    this.teamService.setTeam(this.selectedTeam);
  }

  btnOKClick() {
    this.router.navigateByUrl('');
  }
}
