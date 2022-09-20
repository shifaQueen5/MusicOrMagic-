song1 = "";
song2 = "";
function preload(){
    song1 = loadSound("money_jiggle_jiggle.mp3");
    song2 = loadSound("loco_by_itzy.mp3");
}
function setup(){
    canvas = createCanvas(500,400);
    canvas.position(500,200);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);
}
function modelLoaded(){
    console.log("Posenet is Initialized");
}
function draw(){
    image(video,0,0,600,530);

    fill("#00ff00");
    stroke("#ff0000");

    song1 = song1.isPlaying();
    console.log(song1);

    song2 = song2.isPlaying();
    console.log(song2);

    if(scoreLeftWrist > 0.2){
        circle(LeftwristX,LeftwristY,20);
        song2.stop();
        if(song1 == false){
            song1.play();
        }
        else{
            console.log("Song Name: My Money Don't Jiggle Jiggle");
            document.getElementById("song_id").innerHTML = "Song Name: My Money Don't Jiggle Jiggle";
        }
    }

    if(scoreRightWrist > 0.2){
        circle(RightwristX,RightwristY,20);
        song1.stop();
        if(song2 == false){
            song2.play();
        }
        else{
            console.log("Song Name: LOCO by Itzy");
            document.getElementById("song_id").innerHTML = "Song Name: LOCO by Itzy";
        }
    }
}
function gotPoses(results){
    console.log(results);
    if (results.length > 0){
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    scoreRightWrist = results[0].pose.keypoints[10].score;
    LeftwristX = results[0].pose.leftWrist.x;
    LeftwristY = results[0].pose.leftWrist.y;
    RightwristX = results[0].pose.rightWrist.x;
    RightwristY = results[0].pose.rightWrist.y;
}
}
