ig.module('game.entities.road').requires('impact.entity').defines(function () {

    EntityRoad = ig.Entity.extend({
        gravityFactor:0,
        size: {x: 320, y: 120},
        collides: ig.Entity.COLLIDES.NEVER,
        checkAgainst: ig.Entity.TYPE.NONE,
        animSheet: new ig.AnimationSheet('media/sprites/road.png', 320, 120),
        zIndex: 2,
        init: function (x, y, settings) {
            y = ig.game.height - this.size.y;
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
            this.currentAnim = this.anims.idle.rewind();
        }
    });

});