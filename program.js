var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var ctx2 = canvas2.getContext("2d");

var px = 16;
var py = 16;
var col = 16;
var row = 16;
var pWidth = 24;
var pHeight = 24;

var isMouseDown = false;
var isDrawing;

var dots = new Array(row);
var dots2 = new Array(row);

var textSize = 300;
var textX = 0;
var textY = 0;

for(var i=0; i<row; i++) {
  dots[i] = new Array(col);
  dots2[i] = new Array(col);
  for(var j=0; j<col; j++) {
    dots[i][j] = false;
    dots2[i][j] = false;
  }
}

canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mousemove', onMouseMove, false);
canvas.addEventListener('contextmenu', onContextMenu, false);

tf1.addEventListener('change', onTextChange, false);
btn1.addEventListener('click', onBtnClick, false);
btn2.addEventListener('click', onBtnClick, false);
btn3.addEventListener('click', onBtnClick, false);
btn4.addEventListener('click', onBtnClick, false);
btn5.addEventListener('click', onBtnClick, false);
btn6.addEventListener('click', onBtnClick, false);
btn7.addEventListener('click', onBtnClick, false);

drawGrid();


function onMouseDown(e)
{
  var rect = canvas.getBoundingClientRect();
  var pos = mappingPos(e.clientX-rect.left, e.clientY-rect.top);
  isMouseDown = true;
  if(e.button == 0)
    isDrawing = true;
  else
    isDrawing = false;
  onMouseMove(e);
}

function onMouseUp(e)
{
  isMouseDown = false;
}

function onMouseMove(e)
{
  if(!isMouseDown) return;
  var rect = canvas.getBoundingClientRect();
  var pos = mappingPos(e.clientX-rect.left, e.clientY-rect.top);
  if((pos.x >= 0 && pos.x < col) && (pos.y >= 0 && pos.y < row)) {
    dots[pos.y][pos.x] = isDrawing;
    draw(pos.x, pos.y, dots[pos.y][pos.x]);
  }
  else {
    isMouseDown = false;
  }
}

function onContextMenu(e)
{
  e.preventDefault();
}

function onBtnClick(e)
{
  if(e.target.id == "btn1")
    textSize += 10;
  else if(e.target.id == "btn2")
    textSize -= 10;
  else if(e.target.id == "btn3")
    textY -= 10;
  else if(e.target.id == "btn4")
    textY += 10;
  else if(e.target.id == "btn5")
    textX -= 10;
  else if(e.target.id == "btn6")
    textX += 10;
  else if(e.target.id == "btn7") {
    copyArray(dots, dots2);
    for(var i=0; i<row; i++)
      for(var j=0; j<col; j++)
        draw(j, i, dots[i][j]);
  }
  drawText();
  drawPixel();

}

function onTextChange(e)
{
  drawText();
  drawPixel();
}

function copyArray(dest, src)
{
  for(var i=0; i<row; i++) {
    for(var j=0; j<col; j++) {
      dest[i][j] = src[i][j];
    }
  }
}

function drawPixel()
{
  var img = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
  var pixels = img.data;
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

  for(var i=0; i<row; i++) {
    for(var j=0; j<col; j++) {
      var filled = 0;
      for(var k=0; k<pHeight; k++) {
        for(var l=0; l<pWidth; l++) {
          if(pixels[((i*pHeight+k)*canvas2.width + (j*pWidth+l))*4+3] == 255) {
            filled += 1;
          }//end if
        }//end for l
      }//end for k
      if(filled >= pHeight*pWidth/2) {
        dots2[i][j] = true;
        ctx2.fillStyle="#000000";
        ctx2.fillRect(j*pWidth, i*pHeight, pWidth, pHeight);
      }//end if
      else {
        dots2[i][j] = false;
      }
    }//end for j
  }//end for i
}

function drawText()
{
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  ctx2.font= "bold " + textSize + "px 맑은 고딕";
  ctx2.textBaseline = "top";
  ctx2.fillText(tf1.value, textX, textY);
}


function draw(x, y, isFill)
{
  if(isFill) {
    ctx.fillStyle="#000000";
    ctx.fillRect(px+x*pWidth, py+y*pHeight, pWidth, pHeight);
  }
  else {
    ctx.fillStyle="#FFFFFF";
    ctx.fillRect(px+x*pWidth, py+y*pHeight, pWidth, pHeight);
    ctx.rect(px+x*pWidth, py+y*pHeight, pWidth, pHeight);
    ctx.stroke();
  }

  var str = "[";

  for(var i=0; i<row; i++) {
    for(var j=0; j<col; j++) {
      if(dots[i][j]) {
        str += "[" + j + "," + i + "],";
      }
    }
  }

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

function drawGrid() {
  for(var i=0; i<row; i++)
    for(var j=0; j<col; j++)
      ctx.rect(py+i*pHeight, px+j*pWidth, pWidth, pHeight);
  ctx.stroke();
}
