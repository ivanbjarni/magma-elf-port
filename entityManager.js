var entityManager = 
{
	viewX : 100,
	viewY : 100,
	updateRadius : 500,
	player : undefined, 
	objects : []
}

entityManager.setPlayer = function(descr)
{
	this.player = new Player(descr);
}

entityManager.add = function(obj)
{
	this.objects[this.objects.length]=obj;
}

entityManager.update = function(du) 
{
	if(this.player !== undefined)
	{
		this.viewX = this.player.getX();
		this.viewY = this.player.getY();
	}

	this.obstacles=[];
	for(var i=0; i<this.objects.length; i++)
	{
		if( distSq( this.objects[i].cx,  this.objects[i].cy,  this.viewX,  this.viewY) < Math.pow(this.updateRadius,2) )
		{
			var status = this.objects[i].update(du);
			if(status==="die") {this.objects.splice(i,1);}
			else if(status==="obs"){this.obstacles.push(this.objects[i]);}
		}
	}

	this.player.update(du);
};

entityManager.render = function(ctx) 
{
	for(var i=0; i<this.objects.length; i++)
	{
		if( distSq( this.objects[i].cx,  this.objects[i].cy,  this.viewX,  this.viewY) < Math.pow(this.updateRadius,2) )
		{
			this.objects[i].render(ctx,this.viewX-g_canvas.width/2,this.viewY-g_canvas.height/2);
		}
	}
	this.player.render(ctx,this.viewX-g_canvas.width/2,this.viewY-g_canvas.height/2);
};

entityManager.getObstacles = function()
{return this.obstacles;}