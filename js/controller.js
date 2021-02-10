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
var gMeme = {
  selectedImgId: 0,
  selectedLineIdx: 1,
  lines: [
    { txt: ' ', size: 100, align: 'center', color: 'red', outline: 'black' },
    { txt: ' ', size: 100, align: 'center', color: 'blue', outline: 'red' },
  ],
};
var gCurrLine = gMeme.selectedLineIdx;

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
  let strHtml = gImgs.map((img) => {
    return `<div class="pic-gallery" onClick="setBackgroundImg(${img.id})"><img src="${img.url}"></div>`;
  });
  return strHtml;
}

function setBackgroundImg(pic) {
  //   console.log('pic:', pic);
  const img = new Image();
  img.src = `img/${pic}.jpg`;
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
  };
  gMeme.selectedImgId = pic;
  toggleMemsGenerator();
}

function toggleMemsGenerator() {
  let elMainContainer = document.querySelector('.memes-generator');
  elMainContainer.classList.remove('display-hide');
  let elGallery = document.querySelector('.gallery');
  elGallery.classList.add('display-hide');
}

function onChnageTextInput(textInput) {
  console.log('gMeme.lines[gCurrLine].txt:', gMeme.lines[gCurrLine].txt);
  gMeme.lines[gCurrLine].txt = textInput;
  drawText();
}

function cleanCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function drawText() {
  gCtx.lineWidth = 2;
  gCtx.strokeStyle = gMeme.lines[gCurrLine].color;
  gCtx.fillStyle = gMeme.lines[gCurrLine].outline;
  gCtx.font = gMeme.lines[gCurrLine].size + 'px' + ' Arial';
  console.log('gCtx.font:', gCtx.font);
  gCtx.textAlign = gMeme.lines[gCurrLine].align;
  let currPos = lineToPix();
  let [xPos, yPos] = currPos;
  gCtx.fillText(gMeme.lines[gCurrLine].txt, xPos, yPos);
  gCtx.strokeText(gMeme.lines[gCurrLine].txt, xPos, yPos);
}

function lineToPix() {
  let line1 = [250, 50];
  let line2 = [250, 450];
  if (gMeme.selectedLineIdx === 0) return line1;
  if (gMeme.selectedLineIdx === 1) return line2;
}
function updateRow() {
  if (gCurrLine < 0) return;
  if (gCurrLine > gMeme.lines.length) return;
  if (gCurrLine === 0) gCurrLine++;
  if (gCurrLine === 1) gCurrLine--;
  gMeme.selectedLineIdx = gCurrLine;
}
