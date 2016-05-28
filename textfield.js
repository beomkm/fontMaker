var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var px = 16;
var py = 16;
var col = 16;
var row = 16;
var pWidth = 24;
var pHeight = 24;

var dots = new Array(row);

for(var i=0; i<row; i++) {
  dots[i] = new Array(col);
  for(var j=0; j<col; j++) {
    dots[i][j] = 0;
  }
}

canvas.addEventListener('click', onClick, false);

ctx.font="15px Consolas";

function onClick(e)
{
   var rect = canvas.getBoundingClientRect();
   var pos = mappingPos(e.clientX-rect.left, e.clientY-rect.top);
   if((pos.x >= 0 && pos.x < col) && (pos.y >= 0 && pos.y < row)) {
     dots[pos.y][pos.x] ^= 1; //toggle
     draw();
   }
}

function draw()
{

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var str = "[";

  for(var i=0; i<row; i++) {
    for(var j=0; j<col; j++) {
      if(dots[i][j] == 1) {
        str += "[" + j + "," + i + "],";
        ctx.fillStyle="#000000";
        ctx.fillRect(px+j*pWidth, py+i*pHeight, pWidth, pHeight);
      }
      else {
        ctx.fillStyle="#FFFFFF";
        ctx.fillRect(px+j*pWidth, py+i*pHeight, pWidth, pHeight);
      }
    }
  }
  drawGrid();

  str = str.substr(0, str.length-1);
  str += "]";
  document.getElementById("result").innerHTML = str;
}


function mappingPos(x, y)
{
  var pos = {x:0, y:0};
  pos.x = Math.floor((x-px)/pWidth);
  pos.y = Math.floor((y-py)/pHeight);
  return pos;
}

drawGrid();

function drawGrid() {
  for(var i=0; i<row; i++)
    for(var j=0; j<col; j++)
      ctx.rect(py+i*pHeight, px+j*pWidth, pWidth, pHeight);
  ctx.stroke();
}
