ig.module('game.entities.road').requires('impact.entity').defines(function () {

    EntityRoad = ig.Entity.extend({
        gravityFactor:0,
        size: {x: 600, y: 200},
        collides: ig.Entity.COLLIDES.NEVER,
        checkAgainst: ig.Entity.TYPE.NONE,
        animSheet: new ig.AnimationSheet('media/road.png', 600, 200),
        zIndex: 2,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
            this.currentAnim = this.anims.idle.rewind();
        },
    });

});