var particleManager = 
{ 
	aParticles:[],
	aStyles: { default: new Style({minVel:1, maxVel:4, minRad:4, maxRad:10, shapes:["circle"], colors:["white"], fadeStyle:1, minRate:2, maxRate:10})},
	particleCount:0
}

function Style(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

particleManager.createStyle = function(name,mv,Mv,mr,Mr,aShapes,aColors,fs,mrate,Mrate)
{
	this.aStyles[name] = new Style({
		minVel: mv, 
		maxVel: Mv, 
		minRad: mr, 
		maxRad: Mr, 
		shapes: aShapes, 
		colors: aColors, 
		fadeStyle: fs, 
		minRate: mrate, 
		maxRate: Mrate
	});
}

function Particle(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

particleManager.createStyle("fire", 0, 3, 4, 10, ["circle"], ["red","orange","yellow"], 1, 5, 10);
particleManager.createStyle("dots", 0, 3, 6, 10, ["square"], ["red","green","yellow","blue"], 2, 5, 10);
particleManager.createStyle("powerups", 0, 3, 3, 6, ["circle"], ["red","orange","yellow"], 1, 3, 8);

Particle.prototype.exists = true;
Particle.prototype.alpha  = 1;
Particle.prototype.health = 1;

particleManager.addParticle = function(x, y, vx, vy, shp, r, col, fadeStyle, fadeRate)
{
	this.aParticles[this.particleCount++] = new Particle({
	    cx: x,
		cy: y,
	    xVel: vx,
	    yVel: vy,
	    radius: r,
	    shape: shp,
	    color: col,
	    fade: fadeStyle,
	    rate: fadeRate
	});
}

particleManager.addSParticle = function(x,y,style,amount,colorOverwrite)
{
	if(amount===undefined) amount=1;
	if (style===null||style===undefined)
	{var sty = this.aStyles["default"];}
	else
	{var sty = this.aStyles[style];}
	if(colorOverwrite===undefined) {col=sty.colors} else {col = colorOverwrite;}
	
	
	for(var i=0;i<amount;i++)
	{
		var vel = sty.minVel+Math.random()*(sty.maxVel-sty.minVel);
		var theta = Math.random()*2*Math.PI;
		var shape = sty.shapes[Math.floor(Math.random()*sty.shapes.length)];
		var color = col[Math.floor(Math.random()*col.length)];
		var radius = sty.minRad+Math.random()*(sty.maxRad-sty.minRad);
		var fadeRate = sty.minRate+Math.random()*(sty.maxRate-sty.minRate);
		
		this.addParticle(x,y,vel*Math.cos(theta),-vel*Math.sin(theta),shape,radius,color,sty.fadeStyle,fadeRate);
	}
}

Particle.prototype.update = function (du) {

    this.cx += this.xVel*du;
    this.cy += this.yVel*du;

	if(this.fade===1)
	{
    	this.radius-=(this.rate/10)*du;
    	if(this.radius<0){this.exists=false;}
    }
    else if(this.fade===2)
    {
    	this.alpha -= (this.rate/100)*du;
    	if(this.alpha<0){this.exists=false;}
    }
    else if(this.fade===3)
    {
    	this.health -= (this.rate/100)*du;
    	if(this.health<0){this.exists=false;}
    }
};

Particle.prototype.render = function (ctx,offsetX, offsetY) 
{
	if(!offsetX)
		offsetX=0
	if(!offsetY)
		offsetY=0
	if(this.exists){
	ctx.fillStyle = this.color;
	ctx.globalAlpha = this.alpha;
    if(this.shape==="circle"){fillCircle(ctx, this.cx-offsetX, this.cy-offsetY, this.radius);}
    if(this.shape==="square"){ctx.fillRect(this.cx-this.radius-offsetX, this.cy-this.radius-offsetY, this.radius*2, this.radius*2);}
    ctx.globalAlpha=1;
    
}};

particleManager.update = function(du)
{
	for(var i=this.particleCount-1; i>=0; i--)
	{
		if(!this.aParticles[i].exists){this.remove(i);}
		else {this.aParticles[i].update(du);}
	}
}

particleManager.render = function(ctx,offsetX, offsetY)
{
	for(var i=this.particleCount-1; i>=0; i--)
	{
		this.aParticles[i].render(ctx,offsetX, offsetY);
	}
}

particleManager.remove = function(k)
{
	for(var i=0;i<this.particleCount;i++)
	{
		if(i>k){this.aParticles[i-1]=this.aParticles[i];}
	}
	this.particleCount-=1;
}

particleManager.clear = function()
{
	particleCount=0;
}

noParticlesExist = function()
{
	return (particleCount===0);
}

function fillCircle(ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
}
