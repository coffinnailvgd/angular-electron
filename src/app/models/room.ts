export class Room {
  constructor (
    public id: number,
    public name: string,
    public isPrivate: boolean,
    public teamMembers: Array<number>
  ) { }
}
