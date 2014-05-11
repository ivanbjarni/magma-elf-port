var entityManager = 
{
	viewX : 100,
	viewY : 100,
	updateRadius : 500,
	player : undefined, 
	enemies : [],
	items : [],
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

entityManager.addItem = function(descr)
{
	this.items[this.items.length]=new Item(descr);
}

entityManager.addBullet = function(descr)
{
	this.bullets[this.bullets.length]=new Bullet(descr);
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
	for(var i=0; i<this.enemies.length; i++)
	{
		if( distSq( this.enemies[i].cx,  this.enemies[i].cy,  this.viewX,  this.viewY) < Math.pow(this.updateRadius,2) )
		{
			var status = this.enemies[i].update(du);
			if(status==="die") {this.enemies.splice(i,1);}
		}
	}
	for(var i=0; i<this.items.length; i++)
	{
		if( distSq( this.items[i].cx,  this.items[i].cy,  this.viewX,  this.viewY) < Math.pow(this.updateRadius,2) )
		{
			var status = this.items[i].update(du);
			if(status==="die") {this.items.splice(i,1);}
		}
	}
	for(var i=0; i<this.bullets.length; i++)
	{
		if( distSq( this.bullets[i].cx,  this.bullets[i].cy,  this.viewX,  this.viewY) < Math.pow(this.updateRadius,2) )
		{
			var status = this.bullets[i].update(du);
			if(status==="die") {this.bullets.splice(i,1);}
		}
	}

	particleManager.update(du);

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
	for(var i=0; i<this.enemies.length; i++)
	{
		if( distSq( this.enemies[i].cx,  this.enemies[i].cy,  this.viewX,  this.viewY) < Math.pow(this.updateRadius,2) )
		{
			this.enemies[i].render(ctx,this.viewX-g_canvas.width/2,this.viewY-g_canvas.height/2);
		}
	}
	for(var i=0; i<this.items.length; i++)
	{
		if( distSq( this.items[i].cx,  this.items[i].cy,  this.viewX,  this.viewY) < Math.pow(this.updateRadius,2) )
		{
			this.items[i].render(ctx,this.viewX-g_canvas.width/2,this.viewY-g_canvas.height/2);
		}
	}
	for(var i=0; i<this.bullets.length; i++)
	{
		if( distSq( this.bullets[i].cx,  this.bullets[i].cy,  this.viewX,  this.viewY) < Math.pow(this.updateRadius,2) )
		{
			this.bullets[i].render(ctx,this.viewX-g_canvas.width/2,this.viewY-g_canvas.height/2);
		}
	}
	particleManager.render(ctx,this.viewX-g_canvas.width/2,this.viewY-g_canvas.height/2);
	this.player.render(ctx,this.viewX-g_canvas.width/2,this.viewY-g_canvas.height/2);

};

entityManager.getObstacles = function()
{return this.obstacles;}

entityManager.getEnemies = function()
{return this.enemies;}

entityManager.clear = function()
{
	this.viewX = 100;
	this.viewY = 100;
	this.updateRadius = 500;
	this.player = undefined;
	this.enemies = [];
	this.items = [];
	this.obstacles = [];
	this.bullets = [];
}