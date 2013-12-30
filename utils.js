// =====
// UTILS
// =====

function clearCanvas(ctx) {
    //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    var sky=ctx.createLinearGradient(0,0,0,g_canvas.height);
	sky.addColorStop(0,"blue");
	sky.addColorStop(1,"#3388FF");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function fillCircle(ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
}

function fillBox(ctx, x, y, w, h, style) {
    var oldStyle = ctx.fillStyle;
    ctx.fillStyle = style;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = oldStyle;
}

function distSq(x1,y1,x2,y2)
{
	return Math.pow(x1-x2,2)+Math.pow(y1-y2,2);
}

function sgn(x)
{
    if(x<0){return -1;}
    if(x>0){return  1;}
    return 0;
}

function myMod(n,m)
{
    return ((n % m) + m) % m;
}
