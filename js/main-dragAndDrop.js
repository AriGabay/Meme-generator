var gLine;
var gStartPos;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
function initDragAndDrop() {
  resizeCanvas();
  gLine = createLine();
  addListeners();
  setBackgroundImg(img);
  drawText();
  resetDraw();
}

function createLine() {
  console.log(gMeme.lines[gMeme.selectedLineIdx]);
  return gMeme.lines[gMeme.selectedLineIdx];
}

function addListeners() {
  addMouseListeners();
  addTouchListeners();
  window.addEventListener('resize', () => {
    resizeCanvas();
    setBackgroundImg(img);
  });
}

function addMouseListeners() {
  gCanvas.addEventListener('mousemove', onMove);

  gCanvas.addEventListener('mousedown', onDown);

  gCanvas.addEventListener('mouseup', onUp);
}

function addTouchListeners() {
  gCanvas.addEventListener('touchmove', onMove);

  gCanvas.addEventListener('touchstart', onDown);

  gCanvas.addEventListener('touchend', onUp);
}

function onDown(ev) {
  const pos = getEvPos(ev);
  if (!isCirlceClicked(pos)) return;
  gLine.isDragging = true;
  gStartPos = pos;
  document.body.style.cursor = 'grabbing';
}

function onMove(ev) {
  if (gLine.isDragging) {
    const pos = getEvPos(ev);
    const dy = pos.y - gStartPos.y;
    console.log('gLine:', gLine);
    gLine.yPos += dy;
    gStartPos = pos;
    setBackgroundImg(img);
    resetDraw();
  }
}

function onUp() {
  gLine.isDragging = false;
  document.body.style.cursor = 'grab';
}

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container');
  gCanvas.width = elContainer.offsetWidth;
  gCanvas.height = elContainer.offsetHeight;
  setBackgroundImg(img);
}

function getEvPos(ev) {
  var pos = {
    y: ev.offsetY,
  };
  if (gTouchEvs.includes(ev.type)) {
    ev.preventDefault();
    ev = ev.changedTouches[0];
    pos = {
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    };
  }
  return pos;
}

function isCirlceClicked(clickedPos) {
  const posY = gLine.yPos;
  const distance = Math.sqrt((posY - clickedPos.y) ** 2);
  return distance <= gLine.yPos;
}

function drawArc(x, y, size = 60, color = 'blue') {
  gCtx.beginPath();
  gCtx.lineWidth = '6';
  gCtx.arc(x, y, size, 0, 2 * Math.PI);
  gCtx.strokeStyle = 'white';
  gCtx.stroke();
  gCtx.fillStyle = color;
  gCtx.fill();
}
