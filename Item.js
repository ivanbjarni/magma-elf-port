// A generic constructor which accepts an arbitrary descriptor object
function Item(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
    this.sprite =  this.sprite || g_sprites.gemerald;
}

Item.prototype.halfWidth = 12;
Item.prototype.halfHeight = 12;
Item.prototype.velX = 0;
Item.prototype.velY = 0;
Item.prototype.speed = 2;
Item.prototype.isFlying = false;
Item.prototype.behaviour = "following"; //can also be backAndForth
Item.prototype.hp = 100;
Item.prototype.scale=1;
Item.prototype.maxHeightDiff = 7;

Item.prototype.update = function (du) {
    this.setVelocity(du);

    var prevX = this.cx;
    var prevY = this.cy;
    var nextX = prevX + this.velX;
    var nextY = prevY + this.velY;

    var obs = entityManager.getObstacles();


    if(!this.collides(obs,nextX,this.cy))
    	this.cx=nextX;
    else
    	for(var p=1; p<this.maxHeightDiff; p++)
    		if(!this.collides(obs,nextX,this.cy-p))
    		{ this.cx=nextX; this.cy=this.cy-p; break;}

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

Item.prototype.setVelocity = function(du)
{
	 this.velY += 0.3*du; 
}

Item.prototype.collides = function(array,nextX,nextY)
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

Item.prototype.collidesWith = function(obj,nextX,nextY)
{
	if( (Math.abs(nextX-obj.cx)<this.halfWidth+obj.halfWidth) &&
		(Math.abs(nextY-obj.cy)<this.halfHeight+obj.halfHeight) )
	{
		if(obj.cy>nextY) { return 1; }
		return 2;
	}
	return 0;
}

Item.prototype.render = function (ctx,offsetX,offsetY) {
    var rx = Math.floor(this.cx - offsetX);
    var ry = Math.floor(this.cy - offsetY);

    this.sprite.drawCentredAt(ctx, rx ,ry,0,this.scale);
};

Item.prototype.getX = function()
{return this.cx;}
Item.prototype.getY = function()
{return this.cy;}