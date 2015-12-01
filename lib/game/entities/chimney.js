ig.module('game.entities.chimney').requires('impact.entity').defines(function () {

    EntityChimney = ig.Entity.extend({
        collides: ig.Entity.COLLIDES.NEVER,
        size: {x: 64, y: 80},
        checkAgainst: ig.Entity.TYPE.NONE,
        type: ig.Entity.TYPE.A,
        animSheet: new ig.AnimationSheet('media/sprites/chimney.png', 64, 80),
        owner: null,
        stuckMan: null,
        relativeOffset: {x: 50, y: -20},
        zIndex : 30,
        init: function (x, y, settings) {
            settings.owner.child = this;
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0], true);
            this.currentAnim = this.anims.idle.rewind();
            this.pos.y = this.owner.pos.y + this.relativeOffset.y;
            this.pos.x = this.owner.pos.x + this.relativeOffset.x;
            this.stuckMan = ig.game.spawnEntity(EntityStuckMan, 500, 0, {
                owner: this,
                isCurrent : this.owner.order == 0
            });
        },
        kill: function () {
            this.stuckMan.kill();
            this.parent();
        },
        update: function () {
            if (this.owner)
            {
                this.pos.y = this.owner.pos.y + this.relativeOffset.y;
                this.pos.x = this.owner.pos.x + this.relativeOffset.x;
            }
            else
            {
                this.parent();    // drops on the floor automatically when owner null
            }
        }
    });

});