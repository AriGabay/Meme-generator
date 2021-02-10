'use-strict';
var gCanvas;
var gCtx;
var gImgs = [
  {
    id: 1,
    url: 'img/1.jpg',
    keywords: ['trump'],
  },
  {
    id: 2,
    url: 'img/2.jpg',
    keywords: ['animals'],
  },
  {
    id: 3,
    url: 'img/3.jpg',
    keywords: ['animals'],
  },
  {
    id: 4,
    url: 'img/4.jpg',
    keywords: ['animals'],
  },
  {
    id: 5,
    url: 'img/5.jpg',
    keywords: ['feeling', 'angry'],
  },
  {
    id: 6,
    url: 'img/6.jpg',
    keywords: ['feeling'],
  },
  {
    id: 7,
    url: 'img/7.jpg',
    keywords: ['feeling', 'funy'],
  },
];
let defaultFontSize = 60;
var yStart = 80;
let img;
var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    { txt: ' ', fontSize: defaultFontSize, align: 'center', color: 'red', outline: 'black', yPos: yStart },
    { txt: ' ', fontSize: defaultFontSize, align: 'center', color: 'blue', outline: 'red', yPos: yStart + 100 },
  ],
};
function init() {
  gCanvas = document.querySelector('#my-canvas');
  gCtx = gCanvas.getContext('2d');
  renderGallery();
}
function renderGallery() {
  let strHtml = getPicGallery();
  let elGallery = document.querySelector('.gallery');
  elGallery.innerHTML = strHtml;
}

function getPicGallery() {
  let strHtml = gImgs.map((image) => {
    return `<div class="pic-gallery" onClick="toggleMemesGenerator(${image.id})"><img src="${image.url}"></div>`;
  });
  return strHtml;
}

function toggleMemesGenerator(imgId) {
  let elMainContainer = document.querySelector('.memes-generator');
  elMainContainer.classList.remove('display-hide');
  let elGallery = document.querySelector('.gallery');
  elGallery.classList.add('display-hide');
  gMeme.selectedImgId = imgId;
  img = new Image();
  img.src = `img/${imgId}.jpg`;
  img.onload = () => {
    setBackgroundImg(img);
  };
}
function setBackgroundImg(image) {
  gCtx.drawImage(image, 0, 0, gCanvas.width, gCanvas.height);
}

function cleanCanvas() {
  gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function resetDraw() {
  cleanCanvas();
  setBackgroundImg(img);
  gMeme.lines.forEach((meme) => {
    drawText(meme);
  });
}

function onChnageTextInput(textInput) {
  if (!textInput) return;
  gMeme.lines[gMeme.selectedLineIdx].txt = textInput;
  resetDraw();
}

function drawText(line) {
  const { outline, align, txt, yPos, color, fontSize } = line;
  gCtx.lineWidth = 2;
  gCtx.strokeStyle = color;
  gCtx.fillStyle = outline;
  gCtx.font = fontSize + 'px' + ' Arial';
  gCtx.textAlign = align;
  gCtx.fillText(txt, 250, yPos);
  gCtx.strokeText(txt, 250, yPos);
}

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
  });
  gMeme.selectedLineIdx = gMeme.lines.length - 1;
}
function increaseFont() {
  const line = gMeme.lines[gMeme.selectedLineIdx];
  if (line.fontSize >= 200 ) return;
  if (defaultFontSize >= 200) return;
  line.fontSize += 10;
  defaultFontSize += 10;
  resetDraw();
}
function decreaseFont() {
  const line = gMeme.lines[gMeme.selectedLineIdx];
  if (line.fontSize <= 10) return;
  if (defaultFontSize <= 10) return;
  line.fontSize -= 10;
  defaultFontSize -= 10;
  resetDraw();
}
