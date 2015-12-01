ig.module('game.entities.house').requires('impact.entity', 'plugins.tween').defines(function () {

    EntityHouse = ig.Entity.extend({
        gravityFactor: 0,
        size: {x: 200, y: 200},
        collides: ig.Entity.COLLIDES.NEVER,
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.NONE,
        animSheet: new ig.AnimationSheet('media/sprites/house.png', 200, 200),
        chimney: null,
        order: 0,
        zIndex: 20,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
            this.currentAnim = this.anims.idle.rewind();
            this.chimney = ig.game.spawnEntity(EntityChimney, 0, 0, {owner: this});
        },
        kill: function () {
            this.chimney.kill();
            this.parent();
        },
        moveToNext: function () {
            var self = this;
            if (this.chimney.stuckMan.isCurrent) {
                if (this.order == 0) {
                    ig.game.timer = new ig.Timer(ig.game.startTime);
                }
                this.chimney.stuckMan.isCurrent = false;
                this.tween({pos: {x: this.pos.x + ig.game.houseInterval * 5}}, 0.5, {
                    onComplete: function () {
                        self.kill();
                    }
                }).start();
            } else {
                if (this.order == ig.game.currentOrder) {
                    this.chimney.stuckMan.isCurrent = true;
                }
                this.tween({pos: {x: this.pos.x + ig.game.houseInterval}}, 0.1).start();
            }
        }
    });

});