ig.module('game.entities.popup').requires('impact.entity').defines(function () {

    EntityPopup = ig.Entity.extend({
        size: {x: 250, y: 60},
        collides: ig.Entity.COLLIDES.NEVER,
        checkAgainst: ig.Entity.TYPE.NONE,
        zIndex: 1000,
        bgStyle: 'rgba(255,255,255,0.5)',
        clicked: null,
        text: {value: '', font: 'bold 24px 华文细黑', style: 'black'},
        init: function (x, y, settings) {
            this.parent(x, y, settings);
        },
        update: function () {
            if (this.clicked !== null) {
                if (ig.input.pressed('lbtn') && this.isMouseInside()) {
                    this.clicked();
                }
            }
        },
        draw: function () {
            var ctx = ig.system.context;
            var x = (ig.game.width - this.size.x) / 2;
            var y = this.pos.y;
            this.pos.x = x + ig.game.screen.x;
            this.pos.y = y + ig.game.screen.y;
            this.roundRect((ig.game.width - this.size.x) / 2, y, this.size.x, this.size.y, 20);
            ctx.fillStyle = this.bgStyle;
            ctx.fill();
            ctx.fillStyle = this.text.style;
            ctx.font = this.text.font;
            ctx.lineWidth = 5;
            ctx.textAlign = 'center';
            ctx.fillText(this.text.value, ig.game.width / 2, y + this.size.y / 2 + 10);
        },
        roundRect: function (x, y, w, h, r) {
            var ctx = ig.system.context;
            if (w < 2 * r) r = w / 2;
            if (h < 2 * r) r = h / 2;
            ctx.beginPath();
            ctx.moveTo(x + r, y);
            ctx.arcTo(x + w, y, x + w, y + h, r);
            ctx.arcTo(x + w, y + h, x, y + h, r);
            ctx.arcTo(x, y + h, x, y, r);
            ctx.arcTo(x, y, x + w, y, r);
            ctx.closePath();
            return ctx;
        }
    });

});