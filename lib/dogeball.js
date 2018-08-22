const Util = require("./util");

class Dogeball {
  constructor(ctx){
    // this.getPos();
    this.ctx = ctx;
    this.clicked = false;
    this.lineX = 0;
    this.lineY = 0;
    this.x = 0;
    this.y = 700;
    this.dy = 0;
    this.dx = 0;
    this.vel = null;
    this.acc = null;
    this.dir = null;

    this.shoot = this.shoot.bind(this);
     
  }

  draw(){
    if(this.clicked){
      this.drawLine();
    }
    const img = new Image();
    img.src ='./assets/images/dogeball.png';
    this.ctx.drawImage(img, this.x, this.y, 75, 75);

  }

  drawLine(){
    this.ctx.beginPath();
    this.ctx.moveTo(50, 750);
    this.ctx.lineTo(this.lineX, this.lineY);
    this.ctx.strokeStyle='#fff';
    this.ctx.lineWidth = 3;
    this.ctx.stroke();
  }

  updatePos(){
    this.y -= this.dy;
    this.x -= this.dx;
   }

  shoot(){
    this.velocity = Util.distance(50, 750, this.lineX, this.lineY)/20;
    this.dy = (750 - this.lineY)/100;
    this.dx = (50 - this.lineX)/100;
    console.log(this.dy, this.dx)
    this.angle = Util.angle360([50, 750], [this.lineX, this.lineY]);
  }


}

module.exports = Dogeball;