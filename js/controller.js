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
var gMeme= ({
    selectedImgId: 1,
    selectedLineIdx: 1,
    lines: [{ txt: 'I never eat Falafel', size: 20, align: 'left', color: 'red' }],
  });

function init() {
  gCanvas = document.querySelector('#my-canvas');
  gCtx = gCanvas.getContext('2d');
  renderGallery();
}
function renderGallery() {
  let strHtml = getPicGallery();
  console.log('strHtml:', strHtml);
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
  console.log('pic:', pic);
  const img = new Image();
  img.src = `img/${pic}.jpg`;
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
  };
  toggleMemsGenerator();
}

function toggleMemsGenerator() {
  let elMainContainer = document.querySelector('.memes-generator');
  elMainContainer.classList.remove('display-hide');
  let elGallery = document.querySelector('.gallery');
  elGallery.classList.add('display-hide');
}
function drawText(text, x=250, y=50) {
    console.log(text)
    gCtx.lineWidth = 2
    gCtx.strokeStyle = document.querySelector('input.fill-txt').value
    gCtx.fillStyle = document.querySelector('input.outline-color-txt').value
    gCtx.font = '40px Arial'
    gCtx.textAlign = 'center'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}