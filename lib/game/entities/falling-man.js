ig.module('game.entities.falling-man').requires('impact.entity', 'plugins.box2d.entity').defines(function () {

    EntityFallingMan = ig.Box2DEntity.extend({
        collides: ig.Entity.COLLIDES.NEVER,
        checkAgainst: ig.Entity.TYPE.NONE,
        type: ig.Entity.TYPE.NONE,
        size: {x: 30, y: 120},
        zIndex: 1,
        animSheet: new ig.AnimationSheet('media/sprites/stuck-man.png', 150, 300, 0.5),
        manType: 0,
        isFlying: false,
        isBlowing: false,
        maxVel: {x: 10000, y: 10000},
        init: function (x, y, settings) {
            settings.angle = 30;
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [this.getManType(settings.manType)], true);
            this.setScale(0.5, 0.5);
            this.body.SetAngularVelocity((Math.random() - 0.5) * 5);

        },
        flyAway: function () {
            this.isFlying = true;
        },
        blowAway: function () {
            this.isBlowing = true;
        },
        handleMovementTrace: function (res) {
            console.log('cc');
            if (this.isBlowing) {
                console.log('cc');
                this.pos.x += this.vel.x * ig.system.tick;
                this.pos.y += this.vel.y * ig.system.tick;
            } else {
                this.parent();
            }
        },
        update: function () {
            if (this.isFlying) {
                this.body.ApplyImpulse(new Box2D.Common.Math.b2Vec2(300 - this.pos.x, -300 - Math.random() * 200), this.body.GetPosition());
                if (this.pos.y < -this.size.y) {
                    this.kill();
                    this.isFlying = false;
                }
            } else if (this.isBlowing) {
                this.body.ApplyImpulse(new Box2D.Common.Math.b2Vec2(Math.random() > 0.5 ? -1000 : 1000, -1000), this.body.GetPosition());
                if (this.pos.y < -this.size.y) {
                    this.kill();
                    this.isBlowing = false;
                }
            }
            this.parent();
        },
        getManType: function (type) {
            switch (type) {
                case 0:
                    return 0;
                case 1:
                    return 2;
                case 2:
                    return 4;
                case 3:
                    return 6;
                default :
                    return 0;
            }
        }
    });

});