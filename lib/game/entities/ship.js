ig.module(
  'game.entities.ship'
)
.requires(
  'impact.entity',
  'game.entities.bullet'
)
.defines(function() {
  EntityShip = ig.Entity.extend({

  	// Import the sprite for the ship
  	animSheet: new ig.AnimationSheet('media/images/ship.png', 12, 18),

  	// Set up the properties on ship
  	size: {width: 12, height:18},
  	offset: {x: 6, y: 9},

  	// Set up the physics on the ship
  	friction: {x: 50, y: 50},
  	thrust: 100,
  	angle: 0,


    init: function(x, y, settings) {
      this.parent(x, y, settings);

      // Set the animation states
      this.addAnim( 'idle', 1, [0] );
    },

    update: function() {
			this.parent();

    	// Rotates the ship left and right
    	if( ig.input.state('left') ){
    		this.angle -= 6;
    	} else if( ig.input.state('right') ){
    		this.angle += 6;
    	}

      // Accelerates the ship forward
    	if( ig.input.state('accelerate') ){
    		this.accel.x = Math.sin( this.angle * Math.PI / 180 ) * this.thrust;
    		this.accel.y = - ( Math.cos( this.angle * Math.PI / 180 ) * this.thrust );
    	} else {
    		this.accel.x = 0;
    		this.accel.y = 0;
    	}

      // Set the angle of the current animation
      this.currentAnim.angle = this.angle * ( Math.PI / 180 );

    	// Teleports the ship to a new location
    	if( ig.input.released('teleport') ){
        this.pos.x = Math.floor(( Math.random() * ig.system.width ) + 1 );
        this.pos.y = Math.floor(( Math.random() * ig.system.height )+ 1 );
    	}

    	// Fires a bullet
    	if( ig.input.released('shoot') ){
        ig.game.spawnEntity(EntityBullet, this.pos.x, this.pos.y, {angle: this.currentAnim.angle});
    	}

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