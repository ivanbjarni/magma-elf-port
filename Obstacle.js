// A generic constructor which accepts an arbitrary descriptor object
function Obstacle(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
    this.sprite =  this.sprite || g_sprites.block1;
}


Obstacle.prototype.halfWidth = 12;
Obstacle.prototype.halfHeight = 12;
Obstacle.prototype.isDoor = false;

Obstacle.prototype.update = function (du) {
    return "obs";
};

Obstacle.prototype.render = function (ctx,offsetX,offsetY) {
    var rx = Math.floor(this.cx - offsetX);
    var ry = Math.floor(this.cy - offsetY);

    this.sprite.drawCentredAt(ctx, rx ,ry);
};

Obstacle.prototype.getX = function()
{return this.cx;}
Obstacle.prototype.getY = function()
{return this.cy;}