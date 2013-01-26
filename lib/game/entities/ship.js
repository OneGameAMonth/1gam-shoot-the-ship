ig.module(
  'game.entities.ship'
)
.requires(
  'impact.entity'
)
.defines(function() {
  EntityShip = ig.Entity.extend({

  	// Import the sprite for the ship
  	animSheet: new ig.AnimationSheet('media/images/ship/ship.png', 11, 13),

  	// Set up the properties on ship
  	size: {width: 11, height:13},
  	offset: {x: 5, y: 6},

  	// Set up the physics on the ship
  	maxVel: {x: 100, y: 100},
  	friction: {x: 300, y: 300},
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
    		this.angle -= 3;
    	} else if( ig.input.state('right') ){
    		this.angle += 3;
    	}

    	// Accelerates the ship forward
    	if( ig.input.state('accelerate') ){
    		this.accel.x = Math.sin( this.angle * Math.PI / 180 ) * this.thrust;
    		this.accel.y = - ( Math.cos( this.angle * Math.PI / 180 ) * this.thrust );
    	} else {
    		this.accel.x = 0;
    		this.accel.y = 0;
    	}

    	this.currentAnim.angle = this.angle*(Math.PI/180);

    	// Teleports the ship to a new location
    	if( ig.input.state('teleport') ){
    		ig.log("TELEPORT");
    	}

    	// Fires a bullet
    	if( ig.input.state('shoot') ){
    		ig.log("SHOOT");
    	}

    	// Set up the screen wrapping for the entity
			if(this.pos.x > ig.system.width){
				this.pos.x = - this.size.width;
			} else if(this.pos.x < 0 - this.size.width) {
				this.pos.x = ig.system.width;
			}

			if(this.pos.y > ig.system.height){
				this.pos.y = - this.size.height;
			} else if(this.pos.y < 0 - this.size.height) {
				this.pos.y = ig.system.height;
			}
    }
  });
});