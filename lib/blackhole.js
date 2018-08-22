const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

class Blackhole {
  constructor(ctx, x, y, mass, radius, gravity){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.gravity = radius;
    this.mass = mass;
    this.range = radius * 1.5;
    this.draw();
    this.applyGravity = this.applyGravity.bind(this);
  }

  draw(){
    const img = new Image();
    img.src ='./assets/images/blackhole.png';
    this.ctx.drawImage(img, this.x-this.radius/2, this.y-this.radius/2, this.radius*2, this.radius*2);
  }

  applyGravity(doge, distance){
    const force = this.gravity*(this.mass)/(Math.pow(distance, 2));
    const dx = (this.x - doge.x)/100 * force;
    const dy = (this.y - doge.y)/100 * force;
    doge.dy -= dy;
    doge.dx -= dx;
  }




}


module.exports = Blackhole;