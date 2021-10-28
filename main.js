status = "";
objects = [];

function preload(){

}

function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "STATUS : Detecting Object";
    var input = document.getElementById("o_name").value;
}

function modelLoaded(){
    console.log('Model Loaded');
    status = true;
}

function draw(){
    image(video, 0, 0, 480, 380);
    if(status != ""){
        objectDetector.detect(video , gotResults);
        for(i=0;i<objects.length; i++){
            document.getElementById("status").innerHTML = "STATUS : Detected Object";
            fill('#FF0000');
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke('FF0000');
            rect(objects[i].x , objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == input){
            videoLiveView.stop();
            objectDetector.detect(gotResults);
            document.getElementById("status").innerHTML = "Object Mentioned Found";
            var synth = window.speechSynthesis;
            speakData = "Object Mentioned Found" ;
            var utterThis = new SpeechSynthesisUtterance(speakData);
            synth.speak();
            } else{
                document.getElementById("status").innerHTML = "Object Mentioned Not Found";
            }
            
        }
    }
}
function gotResults(error , results){
    if(error){
        console.error(error);
    } else {
        console.log(results);
        objects= results;
    }
}
