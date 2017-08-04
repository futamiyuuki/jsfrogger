// dimensions
const canvas_width = 505;
const canvas_height = 606;
const tile_width = 101;
const tile_height = 83;
const height_gap = 27;

// helper functions
const isCharInBound = (x, y) => {
    return x >= 0 && x < canvas_width && y >= -height_gap && y <= tile_height * 5 - height_gap;
};

const getRandomEnemyHeight = () => {
    return (~~(Math.random() * 3) + 1) * tile_height - height_gap
};

const getRandomEnemySpeed = () => {
    return Math.floor(Math.random() * 400) + 100;
};

// Enemies our player must avoid
const Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if(this.x > canvas_width) {
        this.x = -tile_width;
        this.y = getRandomEnemyHeight();
        this.speed = getRandomEnemySpeed();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    //this.speed = speed;
    this.sprite = 'images/char-boy.png';
    //this.sprite = 'images/enemy-bug.png';
}

Player.prototype.update = function() {
    
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(dir) {
    let nx = this.x, ny = this.y;
    switch(dir) {
        case 'left':
            nx -= tile_width;
            break;
        case 'right':
            nx += tile_width;
            break;
        case 'up':
            ny -= tile_height;
            break;
        case 'down':
            ny += tile_height;
            break;
        default:
            console.log('invalid input' + dir);
    }
    if(isCharInBound(nx, ny)) {
        this.x = nx;
        this.y = ny;
        if(this.y === -height_gap) {
            this.y = tile_height * 5 - height_gap;
            ++score;
        }
    } else { console.log('out of bounds - x:' + this.x + ' y:' + this.y); }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let score = 0;
const initial_enemy = new Enemy(-tile_width, getRandomEnemyHeight(), getRandomEnemySpeed());
const allEnemies = [initial_enemy];
const player = new Player(tile_width * 2, tile_height * 5 - height_gap, 50);


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
