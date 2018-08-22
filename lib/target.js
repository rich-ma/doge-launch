class Target{
  constructor(ctx, x, y, size){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.size = size;
  }

  draw(){
  const img = new Image();
  img.src ='./assets/images/goal.png';
  this.ctx.drawImage(img, this.x - this.size/2, this.y + this.size/2, this.size, this.size);
  }


}

module.exports = Target;