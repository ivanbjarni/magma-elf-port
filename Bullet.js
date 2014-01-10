function Bullet(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

Bullet.prototype.velX = 0;
Bullet.prototype.velY = 0;
Bullet.prototype.lifetime = 120;
Bullet.prototype.gravityOn = false;

Bullet.prototype.update = function (du) {
    this.cx += this.velX*du;
	this.cy += this.velY*du;
	
	this.lifetime -= du;
	
	if(this.lifetime<0)
	{return "die";}
};

Bullet.prototype.render = function (ctx,offsetX,offsetY) {
    var rx = Math.floor(this.cx - offsetX);
    var ry = Math.floor(this.cy - offsetY);

    //this.sprite.drawCentredAt(ctx, rx ,ry);
	ctx.fillStyle = "black";
	ctx.fillRect(rx,ry, 5, 5);
};