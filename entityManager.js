var entityManager = 
{
	viewX : 100,
	viewY : 100,
	updateRadius : 500,
	player : undefined, 
	enemies : [],
	obstacles : [],
	bullets : []
}

entityManager.setPlayer = function(descr)
{
	this.player = new Player(descr);
}

entityManager.addObstacle = function(descr)
{
	this.obstacles[this.obstacles.length]=new Obstacle(descr);
}

entityManager.addEnemy = function(descr)
{
	this.enemies[this.enemies.length]=new Enemy(descr);
}

entityManager.update = function(du) 
{
	if(this.player !== undefined)
	{
		this.viewX = this.player.getX();
		this.viewY = this.player.getY();
	}

	for(var i=0; i<this.obstacles.length; i++)
	{
		if( distSq( this.obstacles[i].cx,  this.obstacles[i].cy,  this.viewX,  this.viewY) < Math.pow(this.updateRadius,2) )
		{
			var status = this.obstacles[i].update(du);
			if(status==="die") {this.obstacles.splice(i--,1);}
		}
	}

	this.player.update(du);
};

entityManager.render = function(ctx) 
{
	for(var i=0; i<this.obstacles.length; i++)
	{
		if( distSq( this.obstacles[i].cx,  this.obstacles[i].cy,  this.viewX,  this.viewY) < Math.pow(this.updateRadius,2) )
		{
			this.obstacles[i].render(ctx,this.viewX-g_canvas.width/2,this.viewY-g_canvas.height/2);
		}
	}
	this.player.render(ctx,this.viewX-g_canvas.width/2,this.viewY-g_canvas.height/2);
};

entityManager.getObstacles = function()
{return this.obstacles;}