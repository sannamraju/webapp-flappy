// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var score = 0; // score of the game
var labelScore; // label updater for score variable
//var posX = 0;// position x of click event
//var posY = 0;// position y of click event
var labelPos;// label updater for position variables
var player;
var gapStart;
var pipes = [];
/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
  //game.load.image("BillCipher", "../assets/BillCipherSprite.png");// loading image
  game.load.image("BillCipher", "../assets/BillCipherSprite.png");
  game.load.audio("score", "../assets/point.ogg");// loading sounds
  game.load.image("pipeBlock","../assets/pipe.png");// pipe image

}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
  game.stage.setBackgroundColor("#00FBC6"); // set the background colour of the scene
  //game.add.text(10,350,"Welcome", {font: "40px Ostrich Sans"});//sets text for welcome frame
  //game.input.onDown.add(spaceHandler);//calls spaceHandler method when click is registered
  game.input                          // calls spaceHandler method when space press is registered
    .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    .onDown.add(spaceHandler);
  game.input
    .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    .onDown.add(playerJump);
  labelScore = game.add.text(20,20,"0");//labelsScore position
  //labelPos = game.add.text(40,20, posX + ", " + posY);// updating information
  //changeScore();
  //changeScore();
  player = game.add.sprite(100, 200, "BillCipher");
    game.physics.arcade.enable(player);
    player.body.gravity.y = 400;
  /*game.input
    .keyboard.addKey(Phaser.Keyboard.RIGHT) // code block describing movement
    .onDown.add(moveRight);
  game.input
    .keyboard.addKey(Phaser.Keyboard.LEFT)
    .onDown.add(moveLeft);
  game.input
    .keyboard.addKey(Phaser.Keyboard.UP)
    .onDown.add(moveUp);
  game.input
    .keyboard.addKey(Phaser.Keyboard.DOWN)
    .onDown.add(moveDown);*/
  generatePipe();  //calls the generatePipe function
  game.physics.startSystem(Phaser.Physics.ARCADE);
  var pipeInterval = 1.75 * Phaser.Timer.SECOND;
game.time.events.loop(
    pipeInterval,
    generatePipe
);
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update()
{
  game.physics.arcade.overlap(player, pipes, gameOver);
  if (player.body.y >= 350)
  {
    gameOver();
  }
}

function gameOver()
{
  registerScore(score);
  game.state.restart();
}
/*
function clickHandler(event)//clickHandler method definition
{
  posX = event.x;// value declaration of posX and posY
  posY = event.y;

  labelPos.setText(posX.toString() + ", " + posY.toString()); // updates event coordinates
}
*/
function spaceHandler()
{
  game.sound.play("score");//calls the "score" noise to play

}

function changeScore()// method to update score
{
  score++;
  labelScore.setText(score.toString());
}
/*
function moveRight() //moving functions
{
  player.x += 10;
}

function moveLeft()
{
  player.x += -10;
}

function moveUp()
{
  player.y += -10;
}

function moveDown()
{
  player.y += 10;
}
*/
function generatePipe(){
    var gapStart = game.rnd.integerInRange(1, 5);
    for (var i=0; i<8; i++)
    {
        if(i != gapStart && i != gapStart + 1)
        {
            addPipeBlock(750, i*50);
        }
    }
    changeScore();
}

function addPipeBlock(x, y)
{
  var block = game.add.sprite(x, y, "pipeBlock");
  pipes.push(block);
  game.physics.arcade.enable(block);
  block.body.velocity.x = -200;
}

function playerJump()
{
  player.body.velocity.y = -200;
}
