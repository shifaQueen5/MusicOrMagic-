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
    image(video,0,0,500,400);
    fill("#FF0000");
    stroke("#FF0000");
    console.log(scoreRightWrist);
    if(scoreRightWrist>0){
       circle(RightwristX,RightwristY,30);
       if(song2.isPlaying==true){
        song2.stop();
       }
       song1.play();
    }

    if(scoreLeftWrist>0){
       circle(LeftwristX,LeftwristY,30);
       if(song1.isPlaying==true){
        song1.stop();
       }
       song2.play();
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
