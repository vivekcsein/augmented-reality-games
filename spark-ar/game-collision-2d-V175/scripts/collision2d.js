
// 2d collsiion detection  code generated by vivekcse
// lets start
import Scene from 'Scene';
import d from 'Diagnostics';
import Time from 'Time';
import Animation from 'Animation';

let gameInterval;
let gamescore = 0;

(async function () {

  const receiver = await Promise.all([
    Scene.root.findFirst('receiver'),
  ]);

  const itemList = await Promise.all([
    Scene.root.findFirst('itemList'),
    Scene.root.findFirst('Item1'),
  ]);
  const gameScoreText = await Scene.root.findFirst('gameScoreText');

  let Robj = ["",
    {
      obj: receiver[0], xLeft: -75, xRight: 75, yTop: 75, yBottom: -75,
    },
  ];

  let Tobj = [
    {
      obj: itemList[1],
      textureNum: 0,
      driver: Animation.timeDriver({ durationMilliseconds: 1000, loopCount: 1 }),
    },
  ];

  let TextureProperties = [
    { textureFrame: 1, xLeft: -50, xRight: 50, yTop: 50, yBottom: -50 },
  ];

  const setScore = (Tnum) => {
    gamescore += 1;
    gameScoreText.text = gamescore.toString();

  }

  const localCollisionDetectionFunction = (Tnum, Rnum) => {
    const textureNum = Tobj[Tnum].textureNum;
    const Robjx = Robj[Rnum].obj.transform.x.pinLastValue();
    const Robjy = Robj[Rnum].obj.transform.y.pinLastValue();
    const Tobjx = Tobj[Tnum].obj.transform.x.pinLastValue();
    const Tobjy = Tobj[Tnum].obj.transform.y.pinLastValue();
    if (
      ((Robjy + Robj[Rnum].yBottom <= Tobjy + TextureProperties[textureNum].yTop) && (Robjy + Robj[Rnum].yTop >= Tobjy + TextureProperties[textureNum].yBottom)) &&
      ((Robjx + Robj[Rnum].xLeft <= Tobjx + TextureProperties[textureNum].xRight) && (Robjx + Robj[Rnum].xRight >= Tobjx + TextureProperties[textureNum].xLeft))
    ) {
      setScore(Tnum);
    }
  }

  const gamePlay = () => {

    gameInterval = Time.setInterval(function (e) {
      if (e % 200 == 100) {
        for (let x = 0; x < Tobj.length; x++) {
          // if (Tobj[x].detectON) {
          // globalCollisionDetectionFunction(x, 1);
          localCollisionDetectionFunction(x, 1);
          // }
        }
      };

    }, 100);

  }

  gamePlay();

})();