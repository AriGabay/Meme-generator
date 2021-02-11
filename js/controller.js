'use-strict';
var img;
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
  {
    id: 8,
    url: 'img/8.jpg',
    keywords: ['feeling', 'funy'],
  },
  {
    id: 9,
    url: 'img/9.jpg',
    keywords: ['feeling', 'funy'],
  },
];
function init() {
  gCanvas = document.querySelector('#my-canvas');
  gCtx = gCanvas.getContext('2d');
  renderGallery();
}

function startCursor() {
  startCursorInterval();
}

function endCursor() {
  stopCursorInterval();
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
  return strHtml.join('');
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
  chnageTextInput(textInput);
  resetDraw();
}

function drawText(line) {
  const { outline, align, txt, yPos, color, fontSize, fontFamily } = line;
  gCtx.lineWidth = 2;
  gCtx.strokeStyle = outline;
  gCtx.fillStyle = color;
  gCtx.font = fontSize + 'px ' + fontFamily;
  gCtx.textAlign = align;
  gCtx.fillText(txt, gCanvas.width / 2, yPos);
  gCtx.strokeText(txt, gCanvas.width / 2, yPos);
}

function onChangeLine() {
  changeLine();
  updateLineDisplay();
}

function onAddLine() {
  addLine();
}
function onIncreaseFont() {
  increaseFont();
  resetDraw();
}
function onDecreaseFont() {
  decreaseFont();
  resetDraw();
}
function onSetColorFill(inputColor) {
  setColorFill(inputColor);
  resetDraw();
}
function onSetColorOutline(inputColor) {
  setColorOutline(inputColor);
  resetDraw();
}

function onTextAlign(pos) {
  textAlign(pos);
  resetDraw();
}

function onChangeFontFamily(font) {
  changeFontFamily(font);
  resetDraw();
}

function onCleanText() {
  cleanText();
  resetDraw();
}
function onMoveLine(diff) {
  moveLine(diff);
}

function updateLineDisplay() {
  document.querySelector('.show-line-number span').innerText = gMeme.selectedLineIdx;
}
function onClickLinkGallery() {
  let elMemesGen = document.querySelector('.memes-generator');
  let isHideMainContainer = elMemesGen.classList.contains('display-hide');
  let elGallery = document.querySelector('.gallery');
  let isHideGallery = elGallery.classList.contains('display-hide');
  if (!isHideMainContainer) elMemesGen.classList.add('display-hide');
  if (isHideGallery) elGallery.classList.remove('display-hide');
}
function onClickLinkMems() {
  let elMemesGen = document.querySelector('.memes-generator');
  let elGallery = document.querySelector('.gallery');
  let isHideMemesGen = elMemesGen.classList.contains('display-hide');
  let isHideGallery = elGallery.classList.contains('display-hide');
  if (!isHideGallery) elGallery.classList.add('display-hide');
  if (isHideMemesGen) elMemesGen.classList.remove('display-hide');
}
function downloadImg(elLink) {
  var imgContent = gCanvas.toDataURL('image/jpeg');
  elLink.href = imgContent;
}

function toggleMenu() {
  const elMenu = document.querySelector('.mobile-menu');
  if (elMenu.classList.contains('display-hide')) {
    elMenu.classList.remove('display-hide');
  }else {
    elMenu.classList.add('display-hide');
  }
}

function withMenuToggle(func) {
  toggleMenu();
  if (func) {
    func();
  }
}
