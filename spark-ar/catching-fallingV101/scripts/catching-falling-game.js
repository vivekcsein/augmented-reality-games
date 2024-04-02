// catching -falling game created by vivekcse for spark ar version 175

// const Scene = require('Scene');
// const d = require('Diagnostics');
// const Time = require('Time');
// const Animation = require('Animation');
// const MS = require('Materials');
// const TS = require('Textures');
// const TG = require('TouchGestures');
// const FT = require('FaceTracking');
// const FG = require('FaceGestures');
// const INS = require('Instruction');
// const CameraInfo = require('CameraInfo');

//es module import
import Scene, { root } from 'Scene';
import d from 'Diagnostics';
import Time, { setInterval, clearInterval } from 'Time';
import Animation from 'Animation';
import MS, { findFirst } from 'Materials';
import TS, { findFirst as _findFirst } from 'Textures';
import TG, { onTap } from 'TouchGestures';
import FT from 'FaceTracking';
import FG from 'FaceGestures';
import INS, { bind } from 'Instruction';
import { getAudioPlaybackController } from 'Audio';
import CameraInfo, { captureDevicePosition } from 'CameraInfo';
import Reactive from 'Reactive';
import NativeUI from 'NativeUI';

const face = FT.face(0);

let screenON = false;
let tapON = false;
let gameON = false;
let StartUION = false;
let RepeatModeON = false;
let blinkModeON = false;
let mouthOpenON = false;

let gameInterval, startTimeout;
let gamescore = 0;
let gametime = 30;

const itemPosX_arr = [-140, 60, 0, 60, 140]

CameraInfo.captureDevicePosition.monitor().subscribe(function (e) {
  if (e.newValue !== "BACK") {
    // if (e.newValue === "BACK") {
  } else {
    camerapos();
  }
});
camerapos();
function camerapos() {
  let cameraflip = Time.setInterval(() => {
    let isBackCam = CameraInfo.captureDevicePosition.eq("BACK").pinLastValue();
    //remove ! from isBackCam to make back camera usage
    if (!isBackCam) {
      Time.clearInterval(cameraflip);
      screenON = true;
      INS.bind(false, "flip_camera");
      INS.bind(true, 'tap_to_start');
      Time.setTimeout(() => {
        INS.bind(false, 'tap_to_start');
      }, 4000);
    } else {
      screenON = false;
      INS.bind(true, "flip_camera");
    }
  }, 100);
}

(async function () {

  const gameScreens = await Promise.all([
    Scene.root.findFirst('gameUIScreen'),
    Scene.root.findFirst('gamePlayScreen'),
    Scene.root.findFirst('gameOverScreen'),
  ]);

  const receiver = await Promise.all([
    Scene.root.findFirst('receiver'),
  ]);

  const itemList = await Promise.all([
    //root item list
    Scene.root.findFirst('itemList'),
    //items
    Scene.root.findFirst('Item1'),
    Scene.root.findFirst('Item2'),
    Scene.root.findFirst('Item3'),
    Scene.root.findFirst('Item4'),
    Scene.root.findFirst('Item5'),
    //child
    Scene.root.findFirst('itemChild1'),
    Scene.root.findFirst('itemChild2'),
    Scene.root.findFirst('itemChild3'),
    Scene.root.findFirst('itemChild4'),
    Scene.root.findFirst('itemChild5'),
    // material items
    MS.findFirst("itemChildMat1"),
    MS.findFirst("itemChildMat2"),
    MS.findFirst("itemChildMat3"),
    MS.findFirst("itemChildMat4"),
    MS.findFirst("itemChildMat5"),

  ]);

  const itemTextures = await Promise.all([
    TS.findFirst("itemTexture1"),
    TS.findFirst("itemTexture2"),
    TS.findFirst("itemTexture3"),
    TS.findFirst("itemTexture4"),
  ]);


  const gamePlayScreenUI = await Promise.all([
    Scene.root.findFirst('gameCounterText'),
    Scene.root.findFirst('gameScoreText'),
    Scene.root.findFirst('gameTimeText'),
    // ui screen backgrounds
    Scene.root.findFirst('gameScoreShow'),
    Scene.root.findFirst('gameTimerShow'),
    Scene.root.findFirst('gameCounterUI'),
  ]);
  const [gameCounterText, gameScoreText, gameTimeText, ...gameplayui] = gamePlayScreenUI;

  // reciever object
  let Robj = ["",
    {
      obj: receiver[0], xLeft: -10, xRight: 10, yTop: 10, yBottom: -10,
    },
  ];

  let TextureProperties = [
    { textureFrame: 1, xLeft: -5, xRight: 5, yTop: 10, yBottom: -10 },
    { textureFrame: 2, xLeft: -5, xRight: 5, yTop: 10, yBottom: -10 },
    { textureFrame: 3, xLeft: -5, xRight: 5, yTop: 10, yBottom: -10 },
    { textureFrame: 4, xLeft: -5, xRight: 5, yTop: 10, yBottom: -10 },
  ];

  // items to be collect from receiver
  let Tobj = ["",
    {
      obj: itemList[1],
      child: itemList[5 + 1],
      mat: itemList[10 + 1],
      detectON: false,
      textureNum: 0,
      driver: Animation.timeDriver({ durationMilliseconds: 1000, loopCount: 1 }),
      xLeft: -10, xRight: 10, yTop: 10, yBottom: -10,
      rotationX: 0, rotationY: 0, rotationZ: 0,
      posX: 0, posY: 0, posZ: 0
    },
    {
      obj: itemList[2],
      child: itemList[5 + 2],
      mat: itemList[10 + 2],
      detectON: false,
      textureNum: 0,
      driver: Animation.timeDriver({ durationMilliseconds: 1000, loopCount: 1 }),
      xLeft: -10, xRight: 10, yTop: 10, yBottom: -10,
      rotationX: 0, rotationY: 0, rotationZ: 0,
      posX: 0, posY: 0, posZ: 0
    },
    {
      obj: itemList[3],
      child: itemList[5 + 3],
      mat: itemList[10 + 3],
      detectON: false,
      textureNum: 0,
      driver: Animation.timeDriver({ durationMilliseconds: 1000, loopCount: 1 }),
      xLeft: -10, xRight: 10, yTop: 10, yBottom: -10,
      rotationX: 0, rotationY: 0, rotationZ: 0,
      posX: 0, posY: 0, posZ: 0
    },
    {
      obj: itemList[4],
      child: itemList[5 + 4],
      mat: itemList[10 + 4],
      detectON: false,
      textureNum: 0,
      driver: Animation.timeDriver({ durationMilliseconds: 1000, loopCount: 1 }),
      xLeft: -10, xRight: 10, yTop: 10, yBottom: -10,
      rotationX: 0, rotationY: 0, rotationZ: 0,
      posX: 0, posY: 0, posZ: 0
    },
    {
      obj: itemList[5],
      child: itemList[5 + 5],
      mat: itemList[10 + 5],
      detectON: false,
      textureNum: 0,
      driver: Animation.timeDriver({ durationMilliseconds: 1000, loopCount: 1 }),
      xLeft: -10, xRight: 10, yTop: 10, yBottom: -10,
      rotationX: 0, rotationY: 0, rotationZ: 0,
      posX: 0, posY: 0, posZ: 0
    },

  ];

  const gameScreenShow = (num) => {
    for (let x = 0; x < gameScreens.length; x++) {
      if (x == num) {
        gameScreens[x].hidden = false;
      } else {
        gameScreens[x].hidden = true;
      }
    }
  }

  const getTextureScore = (num) => {
    let score = 0;
    if (num == 0) {
      score = 20;
    }
    else if (num == 4 | 5) {
      score = -5;
    } else {
      score = 10;
    }
    return score;
  }

  const gameReset = () => {
    gametime = 30;
    gamescore = 0;
    gameItemThrownCount = 0;
    gameScoreText.text = gamescore.toString();
    gameTimeText.text = gametime.toString();
  }
  // throw items
  let gameItemThrownCount = 0;
  const gameItemThrow = () => {
    if (gameON) {
      gameItemThrownCount++;
      if (gameItemThrownCount % 6 == 0) {
        gameItemThrownCount = 1
      }
      const animSampler = Animation.samplers.linear(0, 1200);
      Tobj[gameItemThrownCount].driver = Animation.timeDriver({ durationMilliseconds: 3000, loopCount: 1, });
      Tobj[gameItemThrownCount].obj.transform.y = Animation.animate(Tobj[gameItemThrownCount].driver, animSampler);

      Tobj[gameItemThrownCount].posX = itemPosX_arr[Math.floor(Math.random() * itemPosX_arr.length)];
      Tobj[gameItemThrownCount].obj.transform.x = Tobj[gameItemThrownCount].posX

      Tobj[gameItemThrownCount].textureNum = Math.floor(Math.random() * itemTextures.length);
      Tobj[gameItemThrownCount].mat.diffuse = itemTextures[Tobj[gameItemThrownCount].textureNum];
      // start driver to animate items from top to bottom
      Tobj[gameItemThrownCount].driver.reset();
      Tobj[gameItemThrownCount].driver.start();
    }
  }

  const receiverItemBoundaries = () => {
    if (Robj[1].obj.transform.x.pinLastValue() > 150) {
      Robj[1].obj.transform.x = face.cameraTransform.x.mul(0).add(150);
    }
    else if (Robj[1].obj.transform.x.pinLastValue() < -150) {
      Robj[1].obj.transform.x = face.cameraTransform.x.mul(0).add(-150);
    }
    else {
      Robj[1].obj.transform.x = face.cameraTransform.x.mul(-2000).add(50);
    }
  }

  const setScore = (Tnum) => {
    gamescore += getTextureScore(Tnum);
    gameScoreText.text = gamescore.toString();

  }

  const localCollisionDetectionFunction = (i) => {
    let j = 0;
    let c = Tobj[i].textureNum;
    let Robjx = Robj[j].obj.transform.x.pinLastValue();
    let Robjy = Robj[j].obj.transform.y.pinLastValue();
    let Tobjx = Tobj[i].obj.transform.x.pinLastValue();
    let Tobjy = Tobj[i].obj.transform.y.pinLastValue();

    if (((Robjx + Robj[j].xLeft <= Tobjx + TextureProperties[c].xRight) && (Robjx + Robj[j].xRight >= Tobjx + TextureProperties[c].xLeft)) && ((Robjy + Robj[j].yTop >= Tobjy + TextureProperties[c].yBottom) && (Robjy + Robj[j].yBottom <= Tobjy + TextureProperties[c].yTop))) {
      setScore(i);
    }
  }

  const gamePlay = () => {
    // game interval for timer running on 100 ms

    gameInterval = Time.setInterval(function (e) {

      if (e % 1000 == 0) {
        if (gametime == 0) {
          if (gameON) {
            Time.clearInterval(gameInterval);
            gameOverScreen();
          }
        } else {
          gametime--;
          if (gametime < 10) {
            gameTimeText.text = ("0" + gametime.toString());
          }
          else {
            gameTimeText.text = (gametime.toString());
          }
        }
      }

      if (e % 800 == 0) {
        gameItemThrow();
      }

      if (e % 200 == 100) {
        receiverItemBoundaries();
        for (let x = 0; x < Tobj.length; x++) {
          if (Tobj[x].detectON) {
            // globalCollisionDetectionFunction(x, 1);
            localCollisionDetectionFunction(x, 1);
          }
        }
      };

    }, 100);

  }
  const gameUIScreen = () => {
    gameScreenShow(0);
  }

  const gamePlayScreen = () => {
    gameScreenShow(1);
  }
  const gameOverScreen = () => {
    gameScreenShow(2)
  }

  const gamePlayStart = () => {
    StartUION = false;
    gameON = true;
    INS.bind(false, 'tap_to_start');
    gamePlayScreen();
    // gamePlay();
  }

  //counter function for couting 3,2,1 before start playing game
  // const gameCounterText = await Scene.root.findFirst('gameCounterText');
  const gameCounterScreen = () => {
    gameCounterText.hidden = false;
    gameCounterText.text = "3";
    gamePlayStart()
    Time.setTimeout(() => {
      gameCounterText.text = "2";
      Time.setTimeout(() => {
        gameCounterText.text = "1";
        Time.setTimeout(() => {
          gameCounterText.text = "Let's go";
          Time.setTimeout(() => {
            gameCounterText.hidden = true;
            // gamePlayStart();
            gamePlay();
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }

  const gameStart = () => {
    gameON = false;
    tapON = true;
    StartUION = true;
    gameReset();
    gameUIScreen();

    // comment one of the both 1 or 2
    //1
    // game play start after 4 seconds of UI or instructions
    startTimeout = Time.setTimeout(() => {
      // gamePlayStart();
      gameCounterScreen();
    }, 4000);

    //either countdown start for game
    //2
    // gameCounterScreen();
  }
  gameStart();

  TG.onTap().subscribe(function (gesture) {
    if (screenON && tapON && !gameON && !RepeatModeON) {
      d.log("start")
      Time.clearTimeout(startTimeout);
      gameCounterScreen();
    }
    else if (screenON && !gameON && RepeatModeON) {
      Time.clearTimeout(startTimeout);
      gameReset();
      gameCounterScreen();
    }
  });

})();