import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loggedIn = false;

  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit() {
  }

  btnLoginClick() {
    const username = (<HTMLInputElement>document.getElementById('username')).value;
    const password = (<HTMLInputElement>document.getElementById('password')).value;
    this.authService.login(username, password).
      subscribe(
        loggedIn => this.loggedIn = loggedIn
    );
    if (this.loggedIn) {
      this.router.navigateByUrl('/team-select');
    } else {
      this.router.navigateByUrl('');
    }
  }

  btnSignupClick() {
    this.router.navigateByUrl('/signup');
  }
}
