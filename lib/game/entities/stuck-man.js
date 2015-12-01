ig.module('game.entities.stuck-man').requires('impact.entity').defines(function () {

    EntityStuckMan = ig.Entity.extend({
        collides: ig.Entity.COLLIDES.NEVER,
        size: {x: 64, y: 128},
        checkAgainst: ig.Entity.TYPE.NONE,
        type: ig.Entity.TYPE.A,
        animSheet: new ig.AnimationSheet('media/sprites/man.png', 64, 128),
        owner: null,
        isStuck: true,
        zIndex: 10,
        manType: 0,
        isCurrent: false,
        triggerRange: 1,
        dragLimit: {upper: -30, lower: 30},
        relativeOffset: {x: 5, y: -70},
        maxVel: {x: 10000, y: 10000},
        init: function (x, y, settings) {
            settings.manType = settings.isCurrent ? 0 : null;
            if (settings.manType == null) {
                var random = Math.random() * 100;
                if (random < 15) {
                    settings.manType = 3;
                } else if (random > 97) {
                    settings.manType = 2;
                } else if (random > 92) {
                    settings.manType = 1;
                } else {
                    settings.manType = 0;
                }
            }
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [ig.game.getManType(settings.manType)], true);
            this.currentAnim = this.anims.idle.rewind();
        },
        update: function () {
            if (this.owner && this.isStuck) {
                this.pos.y = this.owner.pos.y + this.relativeOffset.y;
                this.pos.x = this.owner.pos.x + this.relativeOffset.x;
            } else if (this.pos.y < -this.size.y) {
                this.disappear();
            } else {
                this.parent();    // drops on the floor automatically when owner null
            }
            if (this.isCurrent) {
                this.dragAndDrop();
            }

        },
        drag: function (x, y) {
            this.detach();
            this.pos.x = this.owner.pos.x + this.relativeOffset.x;
            var min = this.posOrigin.y + this.dragLimit.upper;
            var max = this.posOrigin.y + this.dragLimit.lower;
            this.pos.y = y >= max ? max : (y <= min ? min : y);
        },
        drop: function (x, y) {
            if (this.pos.y >= this.posOrigin.y + this.triggerRange) {
                this.fall();
            } else if (this.pos.y < this.posOrigin.y - this.triggerRange) {
                this.launch();
            } else {
                this.reAttach();
            }
        },
        launch: function () {
            if (this.manType == 0) {
                this.isStuck = true;
            } else {
                this.gravityFactor = -500;
                ig.game.moveNext();
            }

        },
        fall: function () {
            if (this.manType == 3) {
                this.kill();
                ig.game.score = 0;
                ig.game.blow();
            } else {
                if (this.manType == 1 || this.manType == 2) {
                    ig.game.addBonusTime(this.manType);
                }
                ig.game.score++;
                this.kill();
                ig.game.moveNext();
                ig.game.createFallingMan(this.manType);
            }

        },
        disappear: function () {
            ig.game.removeEntity(this);
            ig.game.createFallingMan(this.manType);
        },
        detach: function () {
            this.isStuck = false;
        },
        reAttach: function () {
            this.isStuck = true;
        }
    });

});