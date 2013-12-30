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
		if(x<-700){return -230;}
		if(x<-600){return -180;}
		if(x<-500){return -130;}
		if(x<-400){return -80;}
		if(x<-300){return -30;}
		if(x<-50){return 30;}
		if(x<50){return 20;}
		if(x<100){return 0;}
		if(x<180){return -800;}
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
	var steps= c*2/dx;

	ctx.save();

	ctx.beginPath();
	ctx.moveTo(-10*dx,ch*2.1);
	for (var i = -10; i < steps+10; i++) 
	{
		xx=i*dx;
		yy=this.curve(xx-c+vx)-vy+ch;
		ctx.lineTo(xx,yy);
	}
	ctx.lineTo(c*2+10*dx,ch*2.1);
	ctx.closePath();

	ctx.fillStyle = this.fillCol;
	ctx.strokeStyle = this.strokeCol;
	ctx.lineWidth = 3;
	ctx.fill();
	ctx.stroke();

	ctx.restore();
};