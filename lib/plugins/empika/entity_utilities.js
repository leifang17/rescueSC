/*
 Plugin Name: HTML Button
 Plugin URI: https://github.com/empika/ImpactJS-Plugins
 Description: Bind HTML buttons to ordinary mouse clicks (mouseup, mousedown, click)
 Version: 0.2
 Revision Date: 20-05-2012
 Requires: ImpactJS
 Author: Edward Parris
 Author URI: http://www.nixonmcinnes.co.uk/people/edward/
 Changelog
 ---------
 0.2: Namespace the plugin.
 0.1: Initial release.
 */

ig.module('plugins.empika.entity_utilities').requires('impact.entity', 'impact.input').defines(function () {
    ig.Entity.inject({

        posDelta: {x: 0, y: 0}, posOrigin: {x: 0, y: 0}, is_clicked: false,

        isMouseInside: function () {
            var entities = ig.game.entitiesUnderMouse();
            for (var i = 0; i < entities.length; i++) {
                if (this == entities[i]) {
                    return true;
                }
            }
            return false;
        },

        dragAndDrop: function () {
            var mouse_x = ig.input.mouse.x;
            var mouse_y = ig.input.mouse.y;
            var is_clicked = this.is_clicked;
            if (is_clicked && ig.input.state('lbtn')) {
                this.drag(mouse_x - this.posDelta.x, mouse_y - this.posDelta.y);
            } else if (is_clicked) {
                this.is_clicked = false;
                this.drop(mouse_x - this.posDelta.x, mouse_y - this.posDelta.y);
            } else if (ig.input.pressed('lbtn') && this.isMouseInside()) {
                this.posDelta.x = mouse_x - this.pos.x;
                this.posDelta.y = mouse_y - this.pos.y;
                this.posOrigin.x = this.pos.x;
                this.posOrigin.y = this.pos.y;
                this.is_clicked = true;
            } else {
                this.is_clicked = false;
            }
        },
        drag: function () {

        },
        drop: function () {

        }

    });
});