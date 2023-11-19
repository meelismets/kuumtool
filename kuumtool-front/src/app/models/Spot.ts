export class Spot {
  id: number;
  name: string;
  volume: number;
  movement: number;
  axx: number;
  axy: number;

  constructor(id: number, name: string, volume: number, movement: number, axy: number, axx: number) {
    this.id = id;
    this.name = name;
    this.volume = volume;
    this.movement = movement;
    this.axx = axx;
    this.axy = axy;
  }
}
