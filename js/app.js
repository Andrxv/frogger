// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;
    this.y = 0;
    this.w = 50; //width
    this.h = 10; //height
    this.sp = Math.floor(Math.random()* 6) //speed of enemies
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.collisions = function(object) {
    return (this.x < object.x + object.w  && this.x + this.w  > object.x &&
        this.y < object.y + object.h && this.y + this.h > object.y); 
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (move_x * dt * this.sp);
    if(this.x > 450){
        this.x = 0;
    }
    
    if(this.collisions(player)){
        player.reset();
    }
    
};


var move_x = 100;
var move_y = 100;

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    Enemy.call(this);
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 420;
};

Player.prototype = Object.create(Enemy.prototype);
Player.prototype.reset = function(){
    this.x = 200;
    this.y = 420;
}

Player.prototype.update = function(dt) {
    if(this.y < 10){
        player.reset();
    }
    
};
Player.prototype.handleInput = function(movement) {
    switch(movement){
        case 'left':
            if(this.x > 0){
                this.x -= move_x;
            }
            break;
        case 'right':
            if(this.x < 400){
                this.x += move_x;
            }
            break;
        case 'up':
            if(this.y > 10){
                this.y -= move_y;
            }
            break;
        case 'down':
            if(this.y <420){
                this.y += move_y;
            }
            break;
    }
    
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for(var i = 1; i < 4; i ++){
    var enemy = new Enemy();
    enemy.x = i * move_x;
    enemy.y = i * move_y/1.25;
    allEnemies.push(enemy);
 
};

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
