"use strict";
/**
 * Author:      Jovane Marques - 300982100
 * Create at:   Apr 04th, 2020
 * Description: Collision manager
 *
 * Revisions:   Apr 04th, 2020 - Creation
*/
var managers;
(function (managers) {
    var Collision = /** @class */ (function () {
        function Collision() {
        }
        Collision.squaredRadiusCheck = function (object1, object2) {
            // squared radius check
            var radii = object1.halfHeight + object2.halfHeight;
            if (objects.Vector2.sqrDistance(object1.position, object2.position) < (radii * radii)) {
                if (!object2.isColliding) {
                    Collision._collisionResponse(object1, object2);
                    object2.isColliding = true;
                    return true;
                }
            }
            else {
                object2.isColliding = false;
            }
            return false;
        };
        Collision.AABBCheck = function (object1, object2) {
            var object1Offset = (!object1.isCentered) ? new objects.Vector2(0, 0) : new objects.Vector2(object1.halfWidth, object1.halfHeight);
            var object2Offset = (!object2.isCentered) ? new objects.Vector2(0, 0) : new objects.Vector2(object2.halfWidth, object2.halfHeight);
            var object1TopLeft = new objects.Vector2(object1.position.x - object1Offset.x, object1.position.y - object1Offset.y);
            var object2TopLeft = new objects.Vector2(object2.position.x - object2Offset.x, object2.position.y - object2Offset.y);
            // AABB Collision Detection
            if (object1TopLeft.x < object2TopLeft.x + object2.width &&
                object1TopLeft.x + object1.width > object2TopLeft.x &&
                object1TopLeft.y < object2TopLeft.y + object2.height &&
                object1TopLeft.y + object1.height > object2TopLeft.y) {
                if (!object2.isColliding) {
                    Collision._collisionResponse(object1, object2);
                    object2.isColliding = true;
                    return true;
                }
            }
            else {
                object2.isColliding = false;
            }
            return false;
        };
        /**
         * Helper method to assist with Collision Response
         *
         * @private
         * @static
         * @param {objects.GameObject} object1
         * @param {objects.GameObject} object2
         * @memberof Collision
         */
        Collision._collisionResponse = function (object1, object2) {
            if (object1.type === enums.GameObjectType.SHIP && object2.type === enums.GameObjectType.METEOR) {
                // console.log("Collision with Meteor!");
                var thunderSound = createjs.Sound.play("poin");
                thunderSound.volume = 0.2;
                config.Game.SCORE_BOARD.Lives -= 1;
                // check if lives falls less than 1 and then switch to END scene
                if (config.Game.LIVES < 1) {
                    config.Game.SCENE = scenes.State.END;
                }
            }
            else if (object1.type === enums.GameObjectType.BULLET && object2.type === enums.GameObjectType.METEOR) {
                if (object1.isActive) {
                    // console.log("Collision with Meteor >> Bullet!");
                    var thunderSound = createjs.Sound.play("thunder");
                    config.Game.SCORE_BOARD.Score += 100;
                    if (config.Game.SCORE > config.Game.HIGH_SCORE) {
                        config.Game.HIGH_SCORE = config.Game.SCORE;
                    }
                    thunderSound.volume = 0.2;
                    object2.rotation += 10;
                }
            }
        };
        return Collision;
    }());
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=Collision.js.map