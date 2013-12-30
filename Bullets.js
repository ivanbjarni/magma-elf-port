function Bullet(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

Bullet.prototype.velX = 0;
Bullet.prototype.velY = 0;
Bullet.prototype.gravityOn = false;

Bullet.prototype.update = function (du) {
    
};

Bullet.prototype.render = function (ctx,offsetX,offsetY) {
    var rx = Math.floor(this.cx - offsetX);
    var ry = Math.floor(this.cy - offsetY);

    this.sprite.drawCentredAt(ctx, rx ,ry);
};