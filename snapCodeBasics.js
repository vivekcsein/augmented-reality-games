//sign function 
function sign() { if (Math.floor(Math.random() * 2) == 1) { return 1; } else return -1; }

// other side of script

global.posOBJ;
global.PosOBJX = 0;
global.posOBJY = -14;
global.OBJ = script.getTransform();
posOBJ = OBJ.getLocalPosition();


// all type of objects

// @input Component.ScreenTransform screenTransform
//@input Component.Head headpos
// @input Component.Image TextureMat
//@input Asset.Texture textureImage
//@input Asset.Texture[] textureImageElement
//@input Component.Text Text2d

//// for Image change on Material
script.TextureMat.mainPass.baseTex = script.textureImage

var tapON = false;
var instON = false;
var instReplayON = false;

var timer = 0;
var timeMS = 0;
var timeS = 0;

var timeSPrevious = 0; timeSCurrent = 0; var gameTime = 0;

global.delayedEvent = script.createEvent("DelayedCallbackEvent");

global.Tapevent = script.createEvent("TapEvent");

global.updateEvent = script.createEvent("UpdateEvent");

delayedEvent.bind(function (eventData) {

});
delayedEvent.reset(1);


Tapevent.bind(onTapped);
function onTapped(eventData) {

    if (tapON == true) {
        tapON = false;

        if (instON == true) {
            instON = false;
            script.startText.enabled = false;
        }

        if (instReplayON == true) {
            instReplayON = false;
            script.startAgainText.enabled = false;
        }
    }
}

global.transformGround = script.getTransform();
global.headTransform = script.headpos.getTransform();

updateEvent.enabled = false;

function TimerRun() {

    updateEvent.bind(function (eventData) {

        if (gameON == true) {

            timer += (eventData.getDeltaTime());
            timeS = Math.floor(timer);
            timeSPrevious = timeSCurrent;
            timeSCurrent = timeS;
            if (timeSCurrent == timeSPrevious) {

            }
            else {
                // function to execute in each 1 seconds
                timeSecondFunction();
            }
            GameRun();
        }
    });
}

function countdownFunction() {

    script.countdown3.enabled = true;
    script.countdown2.enabled = false;
    script.countdown1.enabled = false;

    delayedEventcountdown.bind(function (eventData) {
        script.countdown3.enabled = false;
        script.countdown2.enabled = true;
        script.countdown1.enabled = false;

        delayedEventcountdown.bind(function (eventData) {
            script.countdown3.enabled = false;
            script.countdown2.enabled = false;
            script.countdown1.enabled = true;

            delayedEventcountdown.bind(function (eventData) {
                script.countdown3.enabled = false;
                script.countdown2.enabled = false;
                script.countdown1.enabled = false;
                GameON = true;
                ThrowON = true;
                updateEvent.enabled = true;
                TimerRun();
            });
            delayedEventcountdown.reset(1);
        });
        delayedEventcountdown.reset(1);
    });
    delayedEventcountdown.reset(1);
}

var Robj = ["",
    { xLeft: 20, xRight: 20, yTop: 20, yBottom: 20 },
];

var Tobj = ["",
    { xLeft: 20, xRight: 20, yTop: 20, yBottom: 20 },
];

function onCollide(i, j) {

    var RobjX = posFootball.x;
    var RobjY = posFootball.y;
    var TobjX = posGoalPost.x;
    var TobjY = posGoalPost.y;

    if (((RobjX - Robj[i].xLeft <= TobjX + Tobj[j].xRight) && (RobjX + Robj[i].xRight >= TobjX - Tobj[j].xLeft)) && ((RobjY + Robj[i].yTop >= TobjY - Tobj[j].yBottom) && (RobjY - Robj[i].yBottom <= TobjY + Tobj[j].yTop))) {
        // scoreCount(i);
    }
}

function scoreCount(i) {
    score++;
    script.Text2d.text = score.toString();

}


for (let i = 1; i < 180; i++) {
    console.log(Math.sin((Math.PI / 180) * i))

}


delayedEvent.bind(function (eventData) {

});
delayedEvent.reset(1);

//custom trigger
//for response with first input trigger name & second inout to run any function
global.behaviorSystem.addCustomTriggerResponse("START_GAME", startGame);

//sent custom trigger with trigger name
global.behaviorSystem.sendCustomTrigger("game_start");


script.createEvent("CameraFrontEvent").bind(function () {

});

script.createEvent("CameraBackEvent").bind(function () {

});

// run a targetObject through tween dynamically
// time = 1000 in milliseconds can be vary; change position -5 to 5 with anything
// infinity for inifnite loop & 0 for only once in repeat

// @input SceneObject targetObject
Sinusoidal

var easing = global.tweenManager.getTweenEasingType("Sinusoidal", global.tweenManager.getSwitchedEasingType("OUT"));

global.objRun = new TWEEN.Tween({ t: 0 }).to({ t: 1 }, 1000)
    .delay(2000)
    .easing(easing)
    .onUpdate(function (obj) {
        script.targetObject.getTransform().setLocalPosition(vec3.lerp(new vec3(-5, 0, 0), new vec3(5, 0, 0), obj.t));
    });
objRun.start();
objRun.repeat("Infinity")
global.tweenManager.setTweenLoopType(objRun, 2);     // for pingpong



function run(num) {

    var initialX = script.obj[num].getTransform().getLocalPosition().x;
    var initialY = script.obj[num].getTransform().getLocalPosition().y;
    var initialZ = script.obj[num].getTransform().getLocalPosition().z;

    var initialRotX = script.obj[num].getTransform().setLocalRotation().x;
    var initialRotY = script.obj[num].getTransform().setLocalRotation().y;
    var initialRotZ = script.obj[num].getTransform().setLocalRotation().z;

    var finalRotX = initialRotX;
    var finalRotY = initialRotY;
    var finalRotZ = initialRotZ + 90;

    var finalX = initialX;
    var finalY = initialY;
    var finalZ = initialZ + 40;

    var objMove = new TWEEN.Tween({ t: 0 })
        .to({ t: 1 }, 1000)
        .onUpdate(
            function (obj) {
                script.obj[num].getTransform().setLocalPosition(vec3.lerp(new vec3(initialX, initialY, initialZ), new vec3(finalX, finalY, finalZ), obj.t));
                script.obj[num].getTransform().setLocalRotation(quat.slerp(quat.fromEulerVec(
                    new vec3(initialRotX, initialRotY, initialRotZ).uniformScale(Math.PI / 180.0)), quat.fromEulerVec(
                        new vec3(finalRotX, finalRotY, finalRotZ).uniformScale(Math.PI / 180.0)), obj.t));
            });
    objMove.start();


    // var objMove = new TWEEN.Tween({ t: 0 }).to({ t: 1 }, 1000).onUpdate(function (obj) {
    //     script.surface[num].getTransform().setLocalPosition(vec3.lerp(new vec3(initialX, initialY, initialZ), new vec3(finalX, finalY, finalZ), obj.t));
    // });
    // objMove.start();

}

//rotation

var tweenM = new TWEEN.Tween({ t: 0 })
    .to({ t: 1 }, 1000)
    .onUpdate(
        function (obj) {
            // transform.setLocalPosition(vec3.lerp(new vec3(0, 0, 0), new vec3(0, 0, 0), obj.t));
            transform.setLocalRotation(quat.slerp(quat.fromEulerVec(new vec3(0, 0, 0).uniformScale(Math.PI / 180.0)), quat.fromEulerVec(new vec3(90, 0, 0).uniformScale(Math.PI / 180.0)), obj.t));
        });
tweenM.start();


//object spwan

function spawnObject(vec3) {
    //creating a copy of the prefab   
    var newObj = script.objectPrefab.instantiate(script.getSceneObject().getParent());
    var dumyMat = script.baseMate1.clone();
    dumyMat.mainPass.baseTex = script.fallElement[rand(0, script.fallElement.length)];
    //    newObj.getComponent("Component.Image").clearMaterials();
    //    newObj.getComponent("Component.Image").addMaterial(dumyMat);  
    //    myScreenPos.x = myScreenPos.x + 0;
    //    myScreenPos.y = myScreenPos.y + 0; 
    //    var newObjPosition = new vec3(myScreenPos.x, myScreenPos.y,-100);

    //   script.newObj.getComponent().getTransform().setLocalScale(newObjSize)

    script.sceneObj.getTransform().setLocalPosition(vec3)
    //    var objScreenTransform = newObj.getComponent("Component.ScreenTransform");
    //    objScreenTransform.anchors.setCenter(newObjPosition);
}


//tap in world

//@input Component.Camera camera
//@input SceneObject worldObj
var placeField = true;
script.createEvent("TapEvent").bind(function (eventData) {

    if (placeField) {
        var screenposition = eventData.getTapPosition();
        var worldpoint = script.camera.screenSpaceToWorldSpace(new vec2(eventData.getTapPosition().x, eventData.getTapPosition().y), 200);
        worldpoint.y = -15;
        script.worldObj.getTransform().setWorldPosition(worldpoint);
        placeField = false;
    }
});


//alpha code

var currColor = script.box.getComponents("Component.MaterialMeshVisual")[0].getMaterial(0).getPass(0).baseColor;
currColor.w = 0;
script.box.getComponents("Component.MaterialMeshVisual")[0].getMaterial(0).getPass(0).baseColor = currColor;

// add touch on image
global.touchNum = -1;
// add touch component on image
function addTouchComponent(num) {
   var touchComponent = arrIcon[num].createComponent("Component.TouchComponent")
   arrIcon[num].createComponent("Component.ScriptComponent").createEvent("TapEvent").bind(function triggerFunction() {
       touchNum = num;
   });
}


// phsyics collsion
//    script.collisionOBJ.getComponent("Physics.ColliderComponent").onCollisionEnter
//onCollisionStay
//onCollisionExit
script.collisionOBJ.getComponent("Physics.BodyComponent").onCollisionEnter.add(function (e) {
    if (e.collision.collider.isSame(collisionItem.getComponent("Physics.ColliderComponent"))) {
        print("x")
        return true;
    }
});
