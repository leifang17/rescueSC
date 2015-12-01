ig.module('game.entities.snowman').requires('impact.entity').defines(function () {

    EntitySnowman = ig.Entity.extend({
        gravityFactor:0,
        size: {x: 100, y: 150},
        collides: ig.Entity.COLLIDES.NEVER,
        checkAgainst: ig.Entity.TYPE.NONE,
        animSheet: new ig.AnimationSheet('media/snowman.png', 100, 150),
        zIndex: 25,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
            this.currentAnim = this.anims.idle.rewind();
        },
    });

});