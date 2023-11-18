export class Spot {
  id: number;
  name: string;
  volume: number;
  movement: number;

  constructor(id: number, name: string, volume: number, movement: number) {
    this.id = id;
    this.name = name;
    this.volume = volume;
    this.movement = movement;
  }
}
