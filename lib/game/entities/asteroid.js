ig.module(
  'game.entities.asteroid'
)
.requires(
  'impact.entity'
)
.defines(function() {
  EntityAsteroid = ig.Entity.extend({
    
    // Import the sprite for the ship
  	animSheet: new ig.AnimationSheet('media/images/ship/asteroid.png', 11, 13),

    init: function(x, y, settings) {
      this.parent(x, y, settings);
      
    }
  });
});