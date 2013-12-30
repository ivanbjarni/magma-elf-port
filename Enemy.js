// A generic constructor which accepts an arbitrary descriptor object
function Enemy(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
    this.sprite =  this.sprite || g_sprites.enemy1;
}

Enemy.prototype.halfWidth = 12;
Enemy.prototype.halfHeight = 12;
Enemy.prototype.velX = 0;
Enemy.prototype.velY = 0;
Enemy.prototype.speed = 2;
Enemy.prototype.isFlying = false;
Enemy.prototype.hp = 100;
Enemy.prototype.scale=1;

Enemy.prototype.update = function (du) {
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
	{ this.velY=0;}
	else
	{ this.velY=0; }

	if(this.velX<0){ this.scale = 1; }
	else { this.scale = -1; }
};

Enemy.prototype.setVelocity = function(du)
{
	this.velX = -sgn(this.cx-entityManager.player.cx)*du*this.speed;
 	if(this.isFlying){ this.velY = -sgn(this.cy-entityManager.player.cy)*du*this.speed;}
 	else{ this.velY += 0.3*du; }
	
}

Enemy.prototype.collides = function(array,nextX,nextY)
{
	for(var i=0; i<array.length;i++)
	{
		var coll = this.collidesWith(array[i],nextX,nextY);
		if(coll)
			{return coll;}
	}
	if(heightmap.curve(nextX-this.halfWidth)<nextY+this.halfHeight){return 1;}
	if(heightmap.curve(nextX+this.halfWidth)<nextY+this.halfHeight){return 1;}
	return 0;
}

Enemy.prototype.collidesWith = function(obj,nextX,nextY)
{
	if( (Math.abs(nextX-obj.cx)<this.halfWidth+obj.halfWidth) &&
		(Math.abs(nextY-obj.cy)<this.halfHeight+obj.halfHeight) )
	{
		if(obj.cy>nextY) { return 1; }
		return 2;
	}
	return 0;
}

Enemy.prototype.render = function (ctx,offsetX,offsetY) {
    var rx = Math.floor(this.cx - offsetX);
    var ry = Math.floor(this.cy - offsetY);

    this.sprite.drawCentredAt(ctx, rx ,ry,0,this.scale);
};

Enemy.prototype.getX = function()
{return this.cx;}
Enemy.prototype.getY = function()
{return this.cy;}