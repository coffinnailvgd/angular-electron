import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

import { User } from '../models/user';

import { TEAMMEMBERS } from '../mocks/mock-team-members';
import { TeamMember } from '../models/team-member';
import {T} from '@angular/core/src/render3';

@Injectable()
export class AuthService {
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;
  public user: User;

  // login(username: string, password: string): Observable<boolean> {
  //   console.log('just called login from auth service');
  //   this.user = new User(username, username);
  //   return of(true).pipe(
  //     delay(1000),
  //     tap(val => this.isLoggedIn = true)
  //   );
  // }

  login(username: string, password: string): Observable<boolean> {
    this.user = new User(100, username, 'test@mail.com', [ 1 ]);
    TEAMMEMBERS.push(new TeamMember(this.user.id, this.user.username));
    return of(true).pipe(
      tap(val => this.isLoggedIn = true)
    );
  }

  getUser(): User {
    return this.user;
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
