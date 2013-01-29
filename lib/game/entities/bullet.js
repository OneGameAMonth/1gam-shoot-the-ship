ig.module(
  'game.entities.bullet'
)
.requires(
  'impact.entity'
)
.defines(function() {

  EntityBullet = ig.Entity.extend({
    
    init: function(x, y, settings) {
      this.parent(x, y, settings);
      
    }
  });
});