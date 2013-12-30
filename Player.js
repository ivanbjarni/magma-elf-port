function Player(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
    console.log("made player");
}

Player.prototype.halfWidth = 12;
Player.prototype.halfHeight = 12;
Player.prototype.speed = 4;
Player.prototype.velX = 0;
Player.prototype.velY = 0;
Player.prototype.hasJump = 1;
Player.prototype.jumpSpeed = 7;
Player.prototype.scaleX = 1;
Player.prototype.slots = [];
Player.prototype.slotSelected = 1;

Player.prototype.update = function (du) {
    this.setVelocity(du);

    if(this.USE) 
    //{ this.slots[this.slotSelected].useItem(this);}

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

Player.prototype.setVelocity = function(du)
{
	if(Math.abs(this.velX)<1){this.velX=0}else{this.velX *=0.85;}

	if (g_keys[this.GO_UP]&&this.hasJump) 
	 { this.velY = -this.jumpSpeed * du; this.hasJump = false;}
	else if(g_keys[this.GO_UP])
	 { this.velY -= this.jumpSpeed/80*du;}
    if (g_keys[this.GO_RIGHT]) 
     { this.velX = this.speed * du; this.scaleX=-1;}
    if (g_keys[this.GO_LEFT]) 
     { this.velX = -this.speed * du; this.scaleX=1;}

 	this.velY += 0.3*du;
}

Player.prototype.collides = function(array,nextX,nextY)
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

Player.prototype.collidesWith = function(obj,nextX,nextY)
{
	if( (Math.abs(nextX-obj.cx)<this.halfWidth+obj.halfWidth) &&
		(Math.abs(nextY-obj.cy)<this.halfHeight+obj.halfHeight) )
	{
		if(obj.cy>nextY) { return 1; }
		return 2;
	}
	return 0;
}

Player.prototype.renderUI = function(ctx)
{
	ctx.save();

	ctx.lineWidth = 2;

	for(var i=0; i<10; i++)
	{
		ctx.strokeRect(g_canvas.width/2-28*5+i*28,g_canvas.height-24,24,24);
	}

	ctx.restore();
};

Player.prototype.render = function (ctx,offsetX,offsetY) {
	var rx = Math.floor(this.cx - offsetX);
	var ry = Math.floor(this.cy - offsetY);

	this.sprite.drawCentredAt(ctx, rx ,ry,0,this.scaleX);
	this.renderUI(ctx);
};

Player.prototype.getX = function()
{return this.cx;}
Player.prototype.getY = function()
{return this.cy;}

Player.prototype.useItem = function(nr){
	entityManager.addBullet({
    		cx : this.cx,
    		cy : this.cy,
    		type : slots[this.slotSelected]
    });
}
