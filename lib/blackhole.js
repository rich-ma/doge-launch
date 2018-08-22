class Blackhole {
  constructor(x, y, radius, gravity){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.gravity = gravity;
    this.range = radius * 1.3;
    this.applyGravity = this.applyGravity.bind(this);
  }

  applyGravity(doge, distance){
    const dx = (this.x - doge.x)/100;
    const dy = (this.y - doge.y)/100;
    // const attraction = 

  }




}