# DeepMarkit Game Kit

### Setup

Required Tools:

- Java 8
- Maven 3
- NodeJS 6.9+

Steps:

1. Install [Java 8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
    * Add it to your path.
    * Add a JAVA_HOME environment variable. Point it to your JDK directory.
2. Install [Maven 3](https://maven.apache.org/download.cgi)
    * Add it to your path
3. Install [NodeJS 6.9+](https://nodejs.org/en/)
    * Add it to your path
4. Open a command prompt or terminal shell at the directory of this package
5. Install the Node dependencies
```
    $ npm install
```
6. Install the Maven depenencies
```
    $ npm run maveninstall
```
7. Deploy the local webserver (required to run the game). The server will be set up in the "tomcat" directory of this package.
```
    $ npm run server deploy
```
8. Start the webserver. The webserver runs on port 8080.
```
    $ npm run server start
```
9. Create a new game project. This will create a new game project from a template. You will need to create a ```game id``` for your game. Remember your choice as the ```game id``` will be used later to build and launch the game.
    - Use only letters and numbers
    - Do not start with a number
    - No spaces
    - All lowercase
    - Examples: spaceinvaders, tetris, donkeykong

    Each game can have multiple skins (sets of graphics and configuration). If not specified, new game projects are pre-created with one skin called "default". This is known as the ```skin id```. It will be used later to launch the game. To change the name of the skin, add a skin id parameter to the command.
```
    $ npm run project [game id]

    -- OR --

    $ npm run project [game id] [skin id]
```
10. If working outside the DeepMarkit VPN, open the ```package.json``` file and set the value of ```forceLocalMavenArtifacts``` to ```true```. If the value is ```false```, the build will timeout and fail.
11. Build the new game project. Specify the ```game id``` to build that project. You will run this command each tme you want to build and test your project. Note: The build will take slightly longer the first time because Node dependencies will be downloaded once.
```
    $ npm run build [game id]
```
12. Launch the game. An NPM script is provided to luanch the game with the correct parameters. Use the ```game id``` you created earlier. The default ```skin id``` is _"default"_.
```
    $ npm run launch [game id] [skin id]
```

You should now see the game loading screen in your browser. When you click the "Tap To Play" button, the loader will disappear and the screen will appear black. The game is running, but there aren't any grpahics on the screen yet. Use the development tools of your browser to inspect the document and you will find an iFrame object containing a canvas. The source of the iFrame is the HTML page of your game.

###### Complete List of Commands

```npm run maveninstall```:  Installs maven dependencies. Only needs to be done once.

```npm run server deploy```: Unzips the webserver. Only needs to be done once.

```npm run server start```: Starts the webserver on port localhost:8080. Remains running until stopped.

```npm run server stop```: Stops the webserver. Will fail if the server is not running.

```npm run project <game id> <skin id>```: Creates a new blank game project from a template. Run once for each project you wish to work on. Skin Id is optional. If not specified, a skin called "default" is created.

```npm run build <game id>```: Builds the project with the specified game id and deploys it to the local webserver. Run every time you make a change that you would like to test.

```npm run launch <game id> <skin id>```: Opens the specified game using the specified skin in the default browser. This is optional but helps to ensure the correct URL is used.

---

### Important Concepts
###### Game Id and Skin Id
Every game is identified by it's "Game Id" value. Each game has one or more skins (sets of graphics and configuration used on the same codebase). Each skin is identified by it's "Skin Id". Both of these valeus must be passed to the Core framework on the launch URL.

###### Core Framework
Common Runtime application that operates interchangeable game modules. The core takes care of many things common to all games including preloading, server communication, display management, error display etc. It loads the game module into an iFrame on its page to sandbox itself and the game from each other.

###### SDK

Communication between the Core and the game module is accomplished using a JavaScript library known as the SDK that is loaded onto both the Core's index.html and the Game's index.html pages. The SDK provides several useful classes for game development. It also contains third-party libraries required by the platform (including JQuery 2, EaselJS, SoundJS, PreloadJS, and YAMLJS). These third-party libraries are available for use by the game module.

###### Bridge
The Bridge is a key object of the SDK. The Core instantiates and manages the Bridge object. At runtime, the game module obtains a reference to the object from it's parent window. Since both pages are on the same domain, this can be accomplished without crossdomain errors. The Bridge facilitates all communication to and from the Core.

###### Skins
Every game implements at least one skin. There is no limit to the number of a skins a game can contain. Skins contain no code. Instead they are simply a set of graphics and configuration used to present a different look on the same underlying code.

###### Game Customization
TODO: Write Me

###### Game Descriptors
TODO: Write Me

###### Game Library
TODO: Write Me

---

### Project Structure

This section will highlight some important files and directories of the game structure. Refer to a game project in the "projects" directory to inspect these files yourself.

```src/main/defaultgamedescriptor.json```: Describes each element of the game (files, colors and data properties). The file is used to describe what files should be preloaded as well as which elements are customizable. During the build, this file is copied and its values filled from the skin's ```gamedescriptorvalues.json``` file. By default, the defaultgamedescriptor is empty.

```src/main/graphics```: Initially an empty directory, it is intended to be the home for graphic source files such as .psd, .ai, etc.

```src/main/typescript```: The home for TypeScript source classes that will be compiled during the build. This is the source code for the game. Initially contains Main.ts and Game.ts. Main.ts is the starting point for your game. It has only a small amount of code required to create and start the game properly. The Game.ts class is where you will start writing the implementation of your game.

```src/main/webapp```: This directory contains all the static files that will be available in your game. It contains an important sub-structure of its own.

```src/main/webapp/assets```: Your game's images and sounds are stored here. It also functions as the source of the game library. The library is a more advanced topic to be discussed later.

```src/main/webapp/gamedata.json```: A small data file used to provide some metadata about the game. For now, the only important parts are the "gameId" and "orientation" keys. The "gameId" should already have been pre-filled with your game id during creation of the project. The "orientation" value indicates whether the game is intended to be played in portrait or landscape mode. Only the values "portrait" and "landscape" are allowed.

```src/main/webapp/index.html```: The page your game will be displayed on. This page is loaded as the source of an iFrame when played. It is completely under your control what content is add to the page, including script and style tags as well as DOM elements. By default, the game inserts a Canvas element on to the page at runtime (you won't see it in the static file).

```src/main/webapp/lang```: Home for translations files. By default, a single translation file for English string is included for describing game library elements to the game editor. A further discussion on translations will be provided later.

```src/main/webapp/library.json```: Describes the contents of the assets directory to the game editor. The library and editor are more advanced topic to be discussed later.

```src/main/webapp/skins```: Contains a folder for each skin in the game. The folder name matches the ```skin id``` value for the skin.

```src/main/webapp/skins/<skin id>/gamedescriptorvalues.json```: Contains values that are merged into the ```src/main/defaultgamedescriptor.json``` during the build. It describes which assets from the ```src/main/webapp/assets``` directory are assigned to each "element" of the game.

```src/main/webapp/skins/<skin id>/icon.jpg```: A poster for the game used when displaying menus. A default poster is included and intended to be overwritten with a proper image once the skin has been completed.

```src/main/webapp/skins/<skin id>/layout.json```: Every skin contains a layout.json file that is preloaded and made available to the game's code. This allows each skin a standard way to configure the layout of the elements in the game (such as x, y, scale, etc). It is empty by default and can be filled with whatever information is required by the game developer. Typically, if a game has more than one skin, the format of each layout.json is the same with differing values.

---

### deep.Bridge

The ```deep.Bridge``` object is used to communicate between the Core Framework and the Game.

#### Properties

Several objects are available through Bridge to provide the Game with important information.

##### DisplayInfo

The DisplayInfo object provides values about the current state of the display.

```deep.Bridge.DisplayInfo.ViewportWidth``` [Number]: The current width of the viewport of the container of the game's page. The game's canvas is always centered within this viewport and scaled to fill as large as possible.

```deep.Bridge.DisplayInfo.ViewportHeight``` [Number]: The current height of the viewport of the container of the game's page. The game's canvas is always centered within this viewport and scaled to fill as large as possible.

```deep.Bridge.DisplayInfo.StageWidth``` [Number]: The base width of the Game before scaling to fit the viewport. Most calculations use this value.

```deep.Bridge.DisplayInfo.StageHeight``` [Number]: The base height of the Game before scaling to fit the viewport. Most calculations use this value.

```deep.Bridge.DisplayInfo.RenderWidth``` [Number]: The actual width of the Game after scaling to fit the viewport.

```deep.Bridge.DisplayInfo.RenderHeight``` [Number]: The actual height of the Game after scaling to fit the viewport.

```deep.Bridge.DisplayInfo.RenderScale``` [Number]: The amount of scaling that has been applied to the game. With no scaling, this value is 1 (Ex: 0.5 is half size). When scaled down it will be a number between 0 and 1. When scaled up, it will be a number greater than 1 (Ex: 2 is double size).

```deep.Bridge.DisplayInfo.Orientation``` [sdk.device.Orientation]: The current orientation of the device. Values are taken from the device.Orientation enumeration.

```deep.Bridge.DisplayInfo.DevicePixelRatio``` [Number]: The device pixel ratio of the display. For most desktop monitors and laptops, the value is 1. For high DPI phones and tablets the number may be 2, 3, 4 etc.


##### GameInfo
The GameInfo object contains information about the Game

```deep.Bridge.GameInfo.GameId``` [String]: The Game Id

```deep.Bridge.GameInfo.SkinId``` [String]: The Skin Id

```deep.Bridge.GameInfo.GameDescriptor``` [sdk.data.GameDescriptor]: An interface the provides access to all the information contained in the game descptior file for the skin in play.

```deep.Bridge.GameInfo.GameOrientation``` [sdk.device.Orientation]: The orientation the game is intended to be displayed in.

```deep.Bridge.GameInfo.Lang``` [String]: The language the game is to be displayed in.

##### GameAssets
The GameAssets object provides an interface to access all assets preloaded by the Core based on the information contained in the Game Descriptor.

```deep.Bridge.GameAssets.getAsset( id:string )``` [HTML Element]: Returns the asset with the id value supplied. The id is defined in the game descriptor. Throws an error if the id does not exist.

```deep.Bridge.GameAssets.hasAsset( id:string )``` [Boolean]: Returns a value indicating if an asset with the specified id exists.

##### GameLayout

```deep.Bridge.GameLayout```: The GameLayout object is a javascript object representation of the layout.json file in the skins/<skinid> directory of the game.

##### Sound

The Sound object provides an interface for playing sounds preloaded by the Core as defined in the game descriptor.

```deep.Bridge.Sound.play( id:string, options?:object )``` [String]: Plays the specified sound. The optional options object may contain an of the properties accepted by SoundJS (The underlying sound playback engine). Documentation of the properties is [here](http://www.createjs.com/docs/soundjs/classes/PlayPropsConfig.html). The method returns an instanceId of the sound being played. This value should be retained for further interaction with the sound.

```deep.Bridge.Sound.stop( instanceId:string )```: Stops the sound with the specifed instanceId. If the sound has completed or cannot be interacted with, calls to this method will fail silently.

##### Lang

The ```deep.Bridge.Lang``` object contains all the name/value pairs defined in the game's langauge file for the language currently in play. For example, if the file contained a key of "test" with a value of "This is a test.", then deep.Bridge.Lang.test would return "This is a test.".

Note that by default, there are no language files in the game, they must be added for each language the game will support. See the localization section of these documents for further information on creating these files.

#### Methods

```deep.Bridge.sendGameReady()```: Tells the Core when the game is completely ready to be played. When called, the loading screen will be removed.

```deep.Bridge.sendGameRequest( request:sdk.messaging.AbstractGameRequest )```: Sends the provided message to the Core to be communicated ot the server. An sdk.events.GameResponseEvent will be dispatched containing the response data.

```deep.Bridge.showBigWin()```: Tells the core that the game has completed and the result is a "Big Win". A screen displaying this information is shown to the user prior to exiting the game. ***NOTE:** This method is only applicable to promo games. It is to be used instead of ```deep.Bridge.exitGame``` for these games.*

```deep.Bridge.showSmallWin()```: Tells the core that the game has completed and the result is a "Small Win". A screen displaying this information is shown to the user prior to exiting the game. ***NOTE:** This method is only applicable to promo games. It is to be used instead of ```deep.Bridge.exitGame``` for these games.*

```deep.Bridge.showLose()```: Tells the core that the game has completed and the result is a loss scenario. A screen displaying this information is shown to the user prior to exiting the game. ***NOTE:** This method is only applicable to promo games. It is to be used instead of ```deep.Bridge.exitGame``` for these games.*

```deep.Bridge.exitGame()```: Tells the Core that the game has completed playing. The Core will handling moving on to the exit state (prize claim, leaderboard display). ***Note: This method is only applicable to Social Leaderboard games. Promo games should use the ```deep.Bridge.showBigWin, deep.Bridge.showSmallWin, and deep.Bridge.showLose``` methods.*

```deep.Bridge.showError( devMessage:string, userMessage?:string )```: Tells the Core that a fatal error has occured. The devMessage parameter should provide some developer-oriented information that would help to diagnose exactly what occurred. The userMessage is optional. If provided, this message will be displayed to the user. If not provided, a default error message is displayed.

```deep.Bridge.saveGameItem( key:string, value:string )```: Saves a the value string in local storage using the specified key. This data is stored against the game id which allows it to be shared across all skins for this game.

```deep.Bridge.getGameItem( key:string )``` [String]: Retrieves the value string stored in local storage using the specified key. The key must have been previously saved using ```deep.Bridge.saveGameItem```.

```deep.Bridge.saveSkinItem( key:string, value:string )```: Saves a the value string in local storage using the specified key. This data is stored against the skin id which means it is only available for this skin of the game.

```deep.Bridge.getSkinItem( key:string )``` [String]: Retrieves the value string stored in local storage using the specified key. The key must have been previously saved using ```deep.Bridge.saveSkinItem```.


#### Events

The Core will send messages to the Game which are received using event listeners on the ```deep.Bridge``` object. Many events sent by the Core do not need to be directly handled by the game developer as the super-classes the game extends from manage them already. Only those of interest to game developers are listed here.

```sdk.events.GameResponseEvent```: Dispatched when the server has sent a response to a message sent by the game using the ```deep.Bridge.sendGameRequest``` method.

* request: The original request object that generated this response
* response: The response data object. Content varies depending on the request.

```sdk.events.ResizeEvent```: Dispatched when the game has resized. For convenience, the display information that changes when a resize occurs is provided on the event object. It is also updated in ```deep.Bridge.DisplayInfo``` before the event is dispatched. See the documentation on that object for complete details.

* renderScale: The new scale factor.
* renderWidth: The new actual width of the rendered game.
* renderHeight: The new actual height of the rendered game.
* viewportWidth: The new viewport width.
* viewportHeight: The new viewport height.


```sdk.events.OrientationChangeEvent```: Dispatched when the device orientation changes. A change in the device orientation will also generate an ```sdk.events.ResizeEvent```.

* orientation: The new orientation of the device. The value is a numeric value represented by the sdk.device.Orientation enumeration.

---

### Launch Parameters

TODO: Write Me
