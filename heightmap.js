var heightmap = 
{ 
	type: "curve",
	curve: function(x){if(x<0){x=0};return Math.pow(x*0.2,1.2)+20;},
	fillCol: "#00AA00",
	strokeCol: "#003300"
};

heightmap.initCurve=function()
{
	this.curve=function(x)
	{
		if(x<50){return 20;}
		if(x<100){return 0;}
		if(x<180){return 40;}
		return -20;
	}
};

heightmap.render = function(ctx,dx)
{
	var vx = entityManager.viewX;
	var vy = entityManager.viewY;
	var c = g_canvas.width/2;
	var ch = g_canvas.height/2;
	var xx=-dx;
	var steps= c*2/dx+2;

	ctx.save();

	ctx.beginPath();
	ctx.moveTo(-dx,ch*2.1);
	for (var i = -1; i < steps-1; i++) 
	{
		xx=i*dx;
		yy=this.curve(xx-c+vx)-vy+ch;
		ctx.lineTo(xx,yy);
	}
	ctx.lineTo(c*2+dx,ch*2.1);
	ctx.closePath();

	ctx.fillStyle = this.fillCol;
	ctx.strokeStyle = this.strokeCol;
	ctx.lineWidth = 3;
	ctx.fill();
	ctx.stroke();

	ctx.restore();
};