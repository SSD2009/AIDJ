var music = "";
var leftwristY = 0;
var leftwristX = 0;
var leftscore = 0;
var rightwristY = 0;
var rightwristX = 0;
var rightscore = 0;

function preload() {
    music = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(500, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(500, 500);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 500, 500);
    stroke("red");
    fill("red");

    if (leftscore > 0.1) {
        circle(leftwristX, leftwristY, 20);
        noleftwristY = Number(leftwristY);
        removedec = floor(noleftwristY);
        volume = removedec / 500;
        music.setVolume(volume);
        document.getElementById("sound").innerHTML = "Volume: " + volume;
    }

    if (rightscore > 0.1) {

        if (rightwristY > 0 && rightwristY <= 100) {
            music.rate(0.5);
            document.getElementById("speed").innerHTML = "Speed: 0.5x";
        }
        if (rightwristY > 100 && rightwristY <= 200) {
            music.rate(1);
            document.getElementById("speed").innerHTML = "Speed: 1x";
        }
        if (rightwristY > 200 && rightwristY <= 300) {
            music.rate(1.5);
            document.getElementById("speed").innerHTML = "Speed: 1.5x";
        }
        if (rightwristY > 300 && rightwristY <= 400) {
            music.rate(2);
            document.getElementById("speed").innerHTML = "Speed: 2x";
        }
        if (rightwristY > 400 && rightwristY <= 500) {
            music.rate(2.5);
            document.getElementById("speed").innerHTML = "Speed: 2.5x";
        }
    }
}

function playmusic() {
    music.stop();
    music.play();
    music.setVolume(1);
    music.rate(1);
}

function stopmusic() {
    music.stop();
}

function modelLoaded() {
    console.log("posenet is initialised");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftwristY = results[0].pose.leftWrist.y;
        leftwristX = results[0].pose.leftWrist.x;
        leftscore = results[0].pose.keypoints[9].score;
        rightwristY = results[0].pose.rightWrist.y;
        rightwristX = results[0].pose.rightWrist.x;
        rightscore = results[0].pose.keypoints[10].score;
    }
}