'use-strict';
var gCanvas;
var gCtx;
var yStart = 80;
let defaultFontSize = 60;
var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: ' ',
      fontSize: defaultFontSize,
      align: 'center',
      color: 'red',
      outline: 'black',
      yPos: yStart,
      fontFamily: 'Impact',
    },
  ],
};

function changeLine() {
  if (gMeme.selectedLineIdx >= gMeme.lines.length - 1) {
    gMeme.selectedLineIdx = 0;
  } else {
    gMeme.selectedLineIdx = gMeme.selectedLineIdx + 1;
  }
}

function addLine() {
  const [lastLine] = gMeme.lines.slice(-1);
  gMeme.lines.push({
    txt: '',
    fontSize: defaultFontSize,
    align: 'center',
    color: 'black',
    outline: 'red',
    yPos: lastLine.yPos + 100,
    fontFamily: 'Impact',
  });
  gMeme.selectedLineIdx = gMeme.lines.length - 1;
}
function increaseFont() {
  const line = gMeme.lines[gMeme.selectedLineIdx];
  if (line.fontSize >= 200) return;
  if (defaultFontSize >= 200) return;
  line.fontSize += 10;
  defaultFontSize += 10;
}
function decreaseFont() {
  const line = gMeme.lines[gMeme.selectedLineIdx];
  if (line.fontSize <= 10) return;
  if (defaultFontSize <= 10) return;
  line.fontSize -= 10;
  defaultFontSize -= 10;
}
function setColorFill(inputColor) {
  const line = gMeme.lines[gMeme.selectedLineIdx];
  line.color = inputColor;
}
function setColorOutline(inputColor) {
  const line = gMeme.lines[gMeme.selectedLineIdx];
  line.outline = inputColor;
}
function textAlign(pos) {
  console.log('pos:', pos);
  const line = gMeme.lines[gMeme.selectedLineIdx];
  console.log('line.align :', line.align);
  line.align = pos;
  console.log('line.align :', line.align);
}
function changeFontFamily(font) {
  gMeme.lines[gMeme.selectedLineIdx].fontFamily = font;
}
function cleanText() {
  gMeme.lines.splice(gMeme.selectedLineIdx, 1);
}
function chnageTextInput(textInput) {
  gMeme.lines[gMeme.selectedLineIdx].txt = textInput;
}
function moveLine(diff) {
  if (!diff) {
    if (gMeme.lines[gMeme.selectedLineIdx].yPos + gMeme.lines[gMeme.selectedLineIdx].fontSize / 2 === gCanvas.height)
      return;
    gMeme.lines[gMeme.selectedLineIdx].yPos += 10;
    resetDraw();
  }
  if (diff) {
    if (gMeme.lines[gMeme.selectedLineIdx].y - gMeme.lines[gMeme.selectedLineIdx].fontSize === 0) return;
    console.log('hiiii');
    gMeme.lines[gMeme.selectedLineIdx].yPos -= 10;
    resetDraw();
  }
}

