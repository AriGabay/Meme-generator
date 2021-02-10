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
var fontSize = 60;
var yStart = 80;
var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    { txt: ' ', align: 'center', color: 'red', outline: 'black', yPos: yStart },
    { txt: ' ', align: 'center', color: 'blue', outline: 'red', yPos: yStart + 100 },
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
  let strHtml = gImgs.map((img) => {
    return `<div class="pic-gallery" onClick="setBackgroundImg(${img.id})"><img src="${img.url}"></div>`;
  });
  return strHtml;
}

function toggleMemsGenerator() {
  let elMainContainer = document.querySelector('.memes-generator');
  elMainContainer.classList.remove('display-hide');
  let elGallery = document.querySelector('.gallery');
  elGallery.classList.add('display-hide');
}
function setBackgroundImg(pic) {
  const img = new Image();
  img.src = `img/${pic}.jpg`;
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
  };
  gMeme.selectedImgId = pic;
  toggleMemsGenerator();
}

function cleanCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function onChnageTextInput(textInput) {
  if (!textInput) return;
  gMeme.lines[gMeme.selectedLineIdx].txt = textInput;
  drawText();
}

function drawText() {
  const { outline, align, txt, yPos, color } = gMeme.lines[gMeme.selectedLineIdx];
  gCtx.lineWidth = 2;
  gCtx.strokeStyle = color;
  gCtx.fillStyle = outline;
  gCtx.font = fontSize + 'px' + ' Arial';
  gCtx.textAlign = align;
  gCtx.fillText(txt, 250, yPos);
  gCtx.strokeText(txt, 250, yPos);
}

function changeLine() {
  console.log(gMeme.selectedLineIdx);
  if (gMeme.selectedLineIdx >= gMeme.lines.length - 1) {
    gMeme.selectedLineIdx = 0;
  } else {
    gMeme.selectedLineIdx = gMeme.selectedLineIdx + 1;
  }
}
// function updateRow() {
//   if (gMeme.selectedLineIdx < 1) return;
//   if (gMeme.selectedLineIdx > gMeme.lines.length) return;
//   if (gMeme.selectedLineIdx === 1) gMeme.selectedLineIdx++;
//   if (gMeme.selectedLineIdx > 1 && gMeme.selectedLineIdx <= gMeme.lines.length) gMeme.selectedLineIdx--;
//   gMeme.selectedLineIdx = gMeme.selectedLineIdx;
// }
function addLine() {
  const [lastLine] = gMeme.lines.slice(-1);
  console.table(lastLine);
  gMeme.lines.push({ txt: '', size: 80, align: 'center', color: 'black', outline: 'red', yPos: lastLine.yPos + 100 });
  gMeme.selectedLineIdx = gMeme.lines.length - 1;
}
function increaseFont() {
    if(fontSize>=200)return
    fontSize += 10;
}
function decreaseFont() {
    if(fontSize<=10)return
  fontSize -= 10;
}
