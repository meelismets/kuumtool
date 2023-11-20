export class Spot {
  id: number;
  name: string;
  volume: number;
  movement: number;
  axx: number;
  axy: number;
  simulated: boolean;

  constructor(id: number, name: string, volume: number, movement: number, axy: number, axx: number, simulated: boolean) {
    this.id = id;
    this.name = name;
    this.volume = volume;
    this.movement = movement;
    this.axx = axx;
    this.axy = axy;
    this.simulated = simulated;
  }
}
