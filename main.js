img = "";
status = "";
object = [];

function preload(){
    img = loadImage('dog_cat.jpg');
  
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    objectDetector = ml5.objectDetector('cocosd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}

function gotResult(error,result){
    if(error){
        console.log(error);
    }
    console.log(result);
    object = result;
}

function draw(){
    image(video, 0, 0, 380, 380);
    
    if (status != ""){
        r = random(255);
        g = random(255);
        b = random(255);

        objectDetector.detect(video, gotResult);
        for (i = 0; i < object.length; i++){
            document.getElementById("status").innerHTML = "Status: Object Detected";
            document.getElementById("number_of_objects").innerHTML = "number of objects are: "+object.length;
            fill(r,g,b);
            percent = floor(object[i].confidence *100);
            text(object[i].label + " " + percent +"%", object[i].x, object[i].y);
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y, object[i].width,object[i].height)
        }
    }
}