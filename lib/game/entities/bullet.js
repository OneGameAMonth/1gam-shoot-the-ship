ig.module(
  'game.entities.bullet'
)
.requires(
  'impact.entity'
)
.defines(function() {

  EntityBullet = ig.Entity.extend({

  	// Import the sprite for the ship
  	animSheet: new ig.AnimationSheet('media/images/bullet.png', 4, 4),

  	// Set up the properties on ship
  	size: {width: 4, height:4},
  	offset: {x: 2, y: 2},

  	// Set up the physics on the ship
  	friction: {x: 50, y: 50},
  	thrust: 100,
    
    init: function(x, y, settings) {
      this.parent(x, y, settings);

      ig.log(x, y, settings);

      // Set the animation states
      this.addAnim( 'idle', 1, [0] );
    },

    update: function(){
    	this.parent();

    	// Set up the screen wrapping for the entity
			if(this.pos.x > ig.system.width + this.offset.x){
				this.pos.x = 0 - this.offset.x;
			} else if(this.pos.x < 0 - this.size.width) {
				this.pos.x = ig.system.width + this.offset.x;
			} else if(this.pos.y > ig.system.height + this.offset.y){
				this.pos.y = 0 - this.offset.y;
			} else if(this.pos.y < 0 - this.offset.y) {
				this.pos.y = ig.system.height + this.offset.y;
			}
    }
  });
});