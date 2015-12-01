ig.module('game.entities.snowman').requires('impact.entity').defines(function () {

    EntitySnowman = ig.Entity.extend({
        gravityFactor:0,
        size: {x: 80, y: 120},
        collides: ig.Entity.COLLIDES.NEVER,
        checkAgainst: ig.Entity.TYPE.NONE,
        animSheet: new ig.AnimationSheet('media/sprites/snowman.png', 80, 120),
        zIndex: 100,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
            this.currentAnim = this.anims.idle.rewind();
        },
    });

});