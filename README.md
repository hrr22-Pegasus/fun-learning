# fun-learning
Games that are both fun and educational


Steps to run our application
  1. npm install
  2. seed database by running [node seedDB/seed.js] from the root of the repo
  3. start the server with [nodemon server/server.js] or [node server/server.js] from the root of the repo
  4. go to localhost:1339, you should be redirected to the login page. You can also access the page by going to localhost:1339/#/login
  5. We recommend you use username "SK" and password, "1234" for initial testing purposes.

Functionality not yet added
  1. Authentication, an idea for authentication would be to use JWT. Something like Auth0 probably wouldn't work because of the amount of information a new user will need to put in.
  2. The ability to only display analytics for teachers.
  3. A way to verify that a user is an admin/teacher. (ties in with authentication)
  4. Give teachers an interface that enables them to add custom tests for the games. Each game sets the "tests" at the beginning of its level1 file, these can be replaced with a call to the database.

Notes on using Phaser
  1. Anytime you want to send or receive data from the database with Phaser you need to add a function to the prototype of the GameState you need to make the call in. This can be done in the controller for that game. You can find examples of this in game.js.
  2. When building the phaser game almost everything can be added as a property to the game itself, this makes it easy to access in any of your functions. An example being a games score, [this.game.score] as opposed to just [this.score]. This method removes having to worry about creating closures for your functions.
  3. If your game is appearing on pages where it shouldn't it is probably because the game canvas is being loaded at the wrong time. The easiest way to get around this problem is just to create a new controller for each game.
  4. Images need to be loaded in the Preload GameState or they may not be displayed correctly.

Notes on Router
  1. The router currently does not use a request-handler file, most of the code is in place to make the switch, we just didn't have enough time to test the changes.

Notes on Sanitize and $sanitize
  1. Sanitize is an express middleware for defending against xss attacks, it only works on primitive values from what I have found so if you need to sanitze an object you have to iterate over each key and generate a new object with the sanitized inputs.
  2. $Sanitize is a built in Angular method that sanitizes model inputs in your controller, I belive the same principles metioned above apply here.

Note on Current Stage of Authentication
  1. Currently we are just checking the password and username entered to see if they match a document in our database, we are not using any hashing algorithims to protect our users information.

General Notes
  1. All the images used by the games are located in the assets folder.
  2. All the game controllers are located in game.js.
  3. Some of the naming is inconsistent for game1, it could be either "game" or "game1". The naming for game2 and game3 is consistent.
  4. If you have questions about specific games, Ryan Perry made game 1, Jesse Hill made game 2 and Samy Kebaish made game 3.


Phaser Game (html structure and rendering):
  1. game.html ==>  this is the html file that you link to your app.js file
                    this is also where you will name a <div id=game-canvas></div> element with an id that will be referenced in the creation of the game

  2. var game = new Phaser.Game(width, height, Phaser.Canvas, "game-canvas")
                    places this object in the "game-canvas" div tag


Phaser Game (Game file structure):
  1. /entities ==>  classes of objects to be used within the game. ADD SRC TO "index.html"
                    these objects can then be called and used in the /states files

  2. /states ==>  the different states of the game that will be called/triggered in series and
                  trigger the next state of the game

  3. GameState flow: Boot ==> Preload ==> MainMenu ==> Level1 ==> GameOver
                     each state is triggered by the command game.state.start("GAMESTATE_NAME")

Phaser GameState Object:
  GameState =
    {
      Boot: Object,
      Preload: Object,
      MainMenu: Object,
      Level1: Object
    }

Whithin each GameState (using Level1 as an example):
  GameState =
    {
      Level1:
        {
          preload: function(){};
          create: function(){};
          update: function(){};
        }
    }

Each state will run the "preload" function first, the "create" function once, immediately after, and the "update" function constantly. You aren't required to use all three of these in each state if you dont need it (more on that later);

Boot: This exists almost solely as a "best practice" for when code becomes more complex down the road. For this project the Boot gamestate is not necessary

Preload: This is the state where you should import any objects and associate them with a "key" that will be refered to later when they are instantiated. Think of this as setting up a library of objects from which *Any object you instantiate throughout your game should live*

MainMenu: The last line of Preload should trigger the MainMenu state (to make sure preload has finished loading assets before mainMenu starts). The main purpose of the MainMenu is to offer a buffer screen between loading the game and when the user wants to actually start playing. There should be a function in this state that triggers the Level1 state after a user event.

Level1: This is where your game logic should live. You shouldn't need a "preload" function within this because all assets that are preloaded will have already been done before in the serparately desginated "preload" state. Looking online you'll see many games just do the full:
preload ==> create ==> update cycle in one file. Breaking it out allows for modularity throughout your games which becomes useful in troubleshooting as games get more and more complex (trust us!)

Level1 - create: This code will only run once, but you will instantiate all of the objects you need that you preloaded in the preload state.

Level1 - update: This is the code that runs on a loop (I believe 60 fps). Here's where you will put logic such as the following:
  IF *two objects overlap* THEN *do callback*
  For all children of [GROUP], IF *they're alive* THEN *move
    them towards player
  IF *keyboard event happens* THEN *check keyboard event vs
    answer*
Any conditionals here will esentially be always listened-for











