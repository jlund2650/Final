 // Create the state that will contain the whole game
var mainState = { 

    preload: function() {
        
        // preload the assets
        game.load.image('player', 'assets/player.png');
        game.load.image('wall', 'assets/wall.png');
	   game.load.image('coin', 'assets/coin.png');
	   game.load.image('enemy', 'assets/enemy.png');   

    },

    create: function() {  

    // Set the background 
	game.stage.backgroundColor = '#4fa1b9';

	// Start the Arcade physics system (for movements and collisions)
	game.physics.startSystem(Phaser.Physics.ARCADE);

	// Add the physics engine to all game objects
	game.world.enableBody = true;
        
    //Create the scoring system
    scoreText = this.add.text(16, 500, 'score: 0', { fontSize: '32px', fill: '#000' });
        
	// Variable to detect the arrow keys
	this.cursor = game.input.keyboard.createCursorKeys();

	// Create the player 
	this.player = game.add.sprite(80, 100, 'player');

	// Add gravity 
	this.player.body.gravity.y = 600;
	
    // Create 3 groups that will contain the objects
	this.walls = game.add.group();
	this.coins = game.add.group();
	this.enemies = game.add.group();

	// Design the level. x = wall, o = coin, ! = lava.
	var level = [

    	'oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo',
        '!   !!           !!          !             !!          !!                 !!!              o',
        '!   !!           !!          !             !!          !!                 !!!              o',
        '!   !!           !!          !             !!                                              o',
        '!                            !                                                             o',
        '!                            !                         *                                   o',
        '!                                                                         *                o',
        '!                           *                      ooooooo                oooo              o',
        '!                                                                  *                       o',
        '!      *                               *                                            *      o',
        '!                                                                                          o',
        '!                                                       *       ooo                        o',
        '!                            !!                 !!             !!                          o',
        '!*                 *       * !!            *    !!             !!                     *    o',
        '!                                                                                          o',
        '!                            *                         ooo                                 o',
        '!                                                                              ooo         o',                               
        '!                  ooooooooooooooooo                                                       o',
        '!                                              ooo                                         o',
        '!                                                                                          o',
        '!                       *                                                                  o',
        '!                                                                                      *   o',
        'oooooooooooooooo!!!ooooooooooooo!!!!!!!!!!!ooooooooooooooooooooooooooo!!!!!!!!!!!!!!oooooooo'

	];
	
    // Create the level 
	for (var i = 0; i < level.length; i++) {
            for (var j = 0; j < level[i].length; j++) {

        // Create a wall and add it to the 'walls' group
        if (level[i][j] === 'o') {
            var wall = game.add.sprite(30+20*j, 30+20*i, 'wall');
            this.walls.add(wall);
            wall.body.immovable = true; 
        }
        // Create a coin and add it to the 'coins' group
        else if (level[i][j] === '*') {
            var coin = game.add.sprite(30+20*j, 30+20*i, 'coin');
            this.coins.add(coin);
        }
        // Create an enemy and add it to the 'enemies' group
        else if (level[i][j] === '!') {
            var enemy = game.add.sprite(30+20*j, 30+20*i, 'enemy');
            this.enemies.add(enemy);
            }
        }
		}
    },

    update: function() {
        // Make the player and the walls collide
        game.physics.arcade.collide(this.player, this.walls);

        // Call the 'takeCoin' function when the player takes a coin
	game.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null, this);

	// Call the 'restart' function when the player touches the enemy
	game.physics.arcade.overlap(this.player, this.enemies, this.restart, null, this);	
        
        // Turn keyboard inputs into player movement
        if (this.cursor.left.isDown){ 
    	this.player.body.velocity.x = -300;
        }
	else if (this.cursor.right.isDown){ 
        this.player.body.velocity.x = 300;
        }
	else{ 
        this.player.body.velocity.x = 0;
        }
        if (this.cursor.up.isDown && this.player.body.touching.down){ 
        this.player.body.velocity.y = -450;
        }
                
    },
        // Function to kill a coin		
        takeCoin: function(player, coin) {
            coin.kill();
            score += 10;
            scoreText.setText('Score: ' + score);
	},

	// Function to restart the game
	restart: function() {
            game.state.start('main');
            score = 0;
        }
};
// Create variables for scoring system
var score = 0;
var scoretext;
// Initialize the game 
var game = new Phaser.Game(1920, 600);  
game.state.add('main', mainState);  
game.state.start('main');