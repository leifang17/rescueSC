ig.module('game.main').requires('impact.game', 'impact.font', 'game.entities.popup', 'game.entities.road', 'game.entities.snowman', 'game.entities.house', 'game.entities.chimney', 'game.entities.stuck-man', 'game.entities.falling-man', 'game.levels.main', 'plugins.empika.game_utilities', 'plugins.empika.entity_utilities', 'plugins.box2d.game', 'plugins.scale').defines(function () {
    var width = 600;
    var height = 900;
    MyGame = ig.Box2DGame.extend({
        width: width, height: height, gravity: 500, // All entities are affected by this
        currentOrder: 0, houseInterval: 240, score: 0, startTime: 20, timer: null, // Load a font
        font: new ig.Font('media/04b03.font.png'), clearColor: '#1b2026',

        init: function () {
            this.loadLevel(LevelMain);
            //this.screen.x = 0;
            //this.screen.y = height - window.innerHeight;
            ig.input.initMouse();
            ig.input.bind(ig.KEY.MOUSE1, 'lbtn');
            this.initBackground();
            this.resetGame();
        },

        loadLevel: function (data) {
            this.parent(data);
            for (var i = 0; i < this.backgroundMaps.length; i++) {
                this.backgroundMaps[i].preRender = true;
            }
        },

        update: function () {
            // Update all entities and BackgroundMaps
            this.parent();
        },

        draw: function () {
            // Draw all entities and BackgroundMaps
            this.parent();
            var ctx = ig.system.context;
            ctx.fillStyle = 'white';
            ctx.font = "bold 48px 幼圆";
            ctx.textAlign = 'left';
            ctx.lineWidth = 5;
            var scoreText = (this.score < 10 ? ' ' + this.score : this.score) + ' 个';
            ctx.fillText(scoreText, 20, 80);
            ctx.textAlign = 'right';
            if (this.timer !== null) {
                var leftTime = -this.timer.delta();
                if (leftTime <= 0) {
                    ctx.fillText("0.00", 580, 80);
                    this.timer = null;
                    this.gameOver();
                } else {
                    ctx.fillText(leftTime.toFixed(2), 580, 80);
                }
            }
        }, addBonusTime: function (bonusTime) {
            this.timer.set(-this.timer.delta() + bonusTime);
        }, resetGame: function () {
            this.currentOrder = 0;
            this.score = 0;
            this.timer = null;
            var houses = this.getEntitiesByType('EntityHouse');
            for (var i = houses.length - 1; i >= 0; i--) {
                houses[i].kill();
            }
            var fallingMen = this.getEntitiesByType('EntityFallingMan');
            for (i = fallingMen.length - 1; i >= 0; i--) {
                fallingMen[i].flyAway();
            }
            for (i = 0; i < 3; i++) {
                this.initHouse(i);
            }
        }, gameOver: function () {
            this.timer && this.timer.pause();
            var houses = this.getEntitiesByType('EntityHouse');
            for (var i = houses.length - 1; i >= 0; i--) {
                houses[i].chimney.stuckMan.isCurrent = false;
            }
            var self = this;
            var scoreMsg = ig.game.spawnEntity(EntityPopup, 0, 120, {
                text: {value: "你救了 " + ig.game.score + ' 个圣诞老人'}
            });
            var restartButton = ig.game.spawnEntity(EntityPopup, 0, 300, {
                size: {x: 150, y: 60}, text: {value: "重玩", style: "red"}, clicked: function () {
                    scoreMsg.kill();
                    restartButton.kill();
                    self.resetGame();
                }
            });
        }, initBackground: function () {
            ig.game.spawnEntity(EntityRoad, this.screen.x, height - 200 + 1);
            ig.game.spawnEntity(EntitySnowman, this.screen.x + 430, height - 250);

        }, initHouse: function (order) {
            var pos = 2 - order + ig.game.currentOrder;
            ig.game.spawnEntity(EntityHouse, ig.game.houseInterval * pos - 220, height - 360, {order: order});
            ig.game.sortEntitiesDeferred();
        }, createFallingMan: function (manType) {
            ig.game.spawnEntity(EntityFallingMan, 250 + parseInt(Math.random() * 100), -200, {manType: manType});
            ig.game.sortEntitiesDeferred();
        }, moveNext: function () {
            ig.game.currentOrder++;
            var houses = this.getEntitiesByType('EntityHouse');
            for (var i = houses.length - 1; i >= 0; i--) {
                houses[i].moveToNext(houses[i]);
            }
            ig.game.initHouse(ig.game.currentOrder + 2);
        }, blow: function () {
            this.gameOver();
            var fallingMen = this.getEntitiesByType('EntityFallingMan');
            for (var i = fallingMen.length - 1; i >= 0; i--) {
                fallingMen[i].blowAway();
            }
        }
    });

    if (ig.ua.iPad) {
        ig.Sound.enabled = false;
    } else if (ig.ua.mobile) {
        ig.Sound.enabled = false;
    }

    if (ig.ua.iPad) {
        ig.Sound.enabled = false;
        ig.main('#canvas', MyGame, 60, width, height, 1);
    } else if (ig.ua.mobile) {
        ig.Sound.enabled = false;
        ig.main('#canvas', MyGame, 60, width, height, 1);
    } else {
        ig.main('#canvas', MyGame, 60, width, height, 1);
    }
});
