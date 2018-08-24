const Util = require("./util");

class Dogeball {
  constructor(ctx){
    // this.getPos();
    this.ctx = ctx;
    this.clicked = false;
    this.lineX = 0;
    this.lineY = 0;
    this.x = 15;
    this.y = 700;
    this.dy = 0;
    this.dx = 0;
    this.vel = null;
    this.acc = null;
    this.dir = null;
    this.win = false;
    this.winImg = new Image();
    this.winImg.src = `./assets/images/dogepartySmall.png`;
    this.gravityImg = new Image();
    this.gravityImg.src = `./assets/images/dogeplsSmall.png`;
    this.img = new Image();
    this.img.src = `./assets/images/dogedayumSmall.png`;

    this.shoot = this.shoot.bind(this);
    this.reset = this.reset.bind(this);
    this.draw = this.draw.bind(this);
  }


  draw(win, gravity){
    if(this.clicked){
      this.drawLine();
    }
    let img;
    if(win){
     img = this.winImg;
    } else if(gravity){
      img = this.gravityImg;
    } else {
      img = this.img;
    }
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
    this.vel = Util.distance(50, 750, this.lineX, this.lineY);
    this.dy = (750 - this.lineY)/60;
    this.dx = (50 - this.lineX)/60;
    this.angle = Util.angle360([50, 750], [this.lineX, this.lineY]);
  }

  reset(){
    this.x = 15;
    this.y = 700;
    this.dy = 0;
    this.dx = 0;
    this.vel = 0;
    this.angle = 0;
    this.dir = null;
    this.acc = 0;
  }


}

module.exports = Dogeball;