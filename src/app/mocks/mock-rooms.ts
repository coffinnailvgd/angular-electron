import { Room } from '../models/room';

export const ROOMS: Room[] = [
  { id: 1, name: 'tea', isPrivate: false, teamMembers: [ 1, 2 ] },
  { id: 2, name: 'party', isPrivate: false, teamMembers: [ 3, 4 ] },
  { id: 3, name: 'relaxation', isPrivate: true, teamMembers: [ 5 ] },
  { id: 4, name: 'green', isPrivate: false, teamMembers: [ 6, 7 ] }
];
