export class Point {
  constructor(public x = 0, public y = 0) {}

  getDistanceTo(origin: Point) {
    return Math.abs(this.x - origin.x) + Math.abs(this.y - origin.y);
  }
}
