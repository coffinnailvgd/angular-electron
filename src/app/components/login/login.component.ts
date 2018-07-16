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
      this.router.navigateByUrl('/login');
    }
  }

  btnSignupClick() {
    this.router.navigateByUrl('/signup');
  }
}


// <button (click)="login()"  *ngIf="!authService.isLoggedIn">Login</button>
// <button (click)="logout()" *ngIf="authService.isLoggedIn">Logout</button>

// import { Component } from '@angular/core';
// import { Router,
// NavigationExtras } from '@angular/router';
// import { AuthService } from './auth.service';
//
// @Component({
//   template: `
//     <h2>LOGIN</h2>
//     <p>{{message}}</p>
//     <p>
//       <button (click)="login()"  *ngIf="!authService.isLoggedIn">Login</button>
//       <button (click)="logout()" *ngIf="authService.isLoggedIn">Logout</button>
//     </p>`
// })
// export class LoginComponent {
//   message: string;
//
//   constructor(public authService: AuthService, public router: Router) {
//     this.setMessage();
//   }
//
//   setMessage() {
//     this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
//   }
//
//   login() {
//     this.message = 'Trying to log in ...';
//
//     this.authService.login().subscribe(() => {
//       this.setMessage();
//       if (this.authService.isLoggedIn) {
//         // Get the redirect URL from our auth service
//         // If no redirect has been set, use the default
//         let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin';
//
//         // Set our navigation extras object
//         // that passes on our global query params and fragment
//         let navigationExtras: NavigationExtras = {
//           queryParamsHandling: 'preserve',
//           preserveFragment: true
//         };
//
//         // Redirect the user
//         this.router.navigate([redirect], navigationExtras);
//       }
//     });
//   }
//
//   logout() {
//     this.authService.logout();
//     this.setMessage();
//   }
// }
