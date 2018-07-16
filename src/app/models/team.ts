export class Team {
  constructor (
    public id: number,
    public name: string,
    public teamMembers: Array<number>,
    public rooms: Array<number>
  ) { }
}
