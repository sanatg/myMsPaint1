var drawing = [];
var currentDrawing = [];
var isDrawing = false;
var database;
var Username;



function setup(){
    canvas = createCanvas(700,500);
    database = firebase.database();
    canvas.mousePressed(startDrawing);
    canvas.mouseReleased(endDrawing);   
    canvas.parent('canvascontainer');
    var saveButton = select('#saveButton');
    saveButton.mousePressed(saveDrawing);
   // Username = createInput("Name");
    var clearButton = select('#clearButton');
    clearButton.mousePressed(clearDrawing);

}

 function startDrawing(){
    //console.log(firebase);
     isDrawing = true;
     currentDrawing = [];
     drawing.push(currentDrawing);
}

function endDrawing(){
  isDrawing = false;
}

function draw(){
    background(0);
  
    if(isDrawing){
        var canva = {
     
        x: mouseX,
        y: mouseY
     }
    currentDrawing.push(canva);
}

stroke("white");
strokeWeight(5);
noFill();
 
for(var i = 0; i<drawing.length; i++ ){
    var path = drawing[i];
    beginShape(); 
    for(var s = 0; s<path.length; s++ ){
        vertex(path[s].x,path[s].y)
    }
        endShape();
    }
}

function saveDrawing(){
    var ref = database.ref('drawing');
    var data = {
       data : drawing
    }
    ref.push(data);

}
function clearDrawing(){
    drawing = [];
}