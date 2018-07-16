import {TeamMember} from './team-member';

export class User extends TeamMember{
  constructor(
    public id: number,
    public username: string,
    public email: string,
    public teams?: Array<number>
  ) {
    super(id, username);
  }
}

