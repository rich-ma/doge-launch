class Line {
  constructor(options){
    this.mouseX = 0;
    this.mouseY = 0;
    this.draw(options.ctx);
    this.dogeX = 0;
    this.dogeY = 0;

  }

  draw(ctx){
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(100, 100);
    ctx.stroke();
  }




}