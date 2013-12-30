function Bullets(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

Bullets.prototype.velX = 0;
Bullets.prototype.velY = 0;
Bullets.prototype.gravityOn = false;

Bullets.prototype.update = function (du) {
    this.setVelocity(du);

    var prevX = this.cx;
    var prevY = this.cy;
    var nextX = prevX + this.velX;
    var nextY = prevY + this.velY;

    var obs = entityManager.getObstacles();


    if(!this.collides(obs,nextX,this.cy))
    { this.cx=nextX; }

	var vertColl = this.collides(obs,this.cx,nextY);

	if(!vertColl)
    { this.cy=nextY; }
	else if(vertColl===1)
	{ this.velY=0; this.hasJump=true;}
	else
	{ this.velY=0; }
};