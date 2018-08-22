class Line {
  constructor(options){
    this.mouseX = 0;
    this.mouseY = 0;
    this.draw(options.ctx);
  }

  draw(ctx){
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(100, 100);
    ctx.stroke();
  }
}