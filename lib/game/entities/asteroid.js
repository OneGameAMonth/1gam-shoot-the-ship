ig.module(
  'game.entities.asteroid'
)
.requires(
  'impact.entity'
)
.defines(function() {
  EntityAsteroid = ig.Entity.extend({
    
    // Import the sprite for the ship
  	animSheet: new ig.AnimationSheet('media/images/asteroid.png', 46, 46),

  	// Set up the properties on ship
  	size: {width: 46, height:46},
  	offset: {x: 23, y: 23},

  	// Set up the physics on the ship
  	maxVel: {x: 100, y: 100},
  	friction: {x: 50, y: 50},
  	thrust: 0,
  	angle: 0,
  	rotation: 0,
  	direction: {x: 0, y: 0},

    init: function(x, y, settings) {
      this.parent(x, y, settings);

      // Set a random direction for the asteroid to move
    	this.direction.x = this.randomNumber(100, -100);
    	this.direction.y = this.randomNumber(100, -100);

    	ig.log(this.direction.x, this.direction.y)

    	// Generate a random thruster value
    	this.thrust = Math.floor(( Math.random() * 10 ) + 20 );

      // Set the animation states
      this.addAnim( 'idle', 1, [0] );
    },

    update: function(){
    	this.parent();

    	// Move the asteroid
    	this.accel.x = Math.sin( this.direction.x * Math.PI / 180 ) * this.thrust;
  		this.accel.y = - ( Math.cos( this.direction.y * Math.PI / 180 ) * this.thrust );

  		// Update the angle of the asteroid
  		this.angle += 3;

  		// Set the angle of the current animation
      this.currentAnim.angle = this.angle * ( Math.PI / 180 );

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
    },

    randomNumber: function(max, min){
    	return Math.floor(Math.random() * (max - min)) + min;
    }
  });
});