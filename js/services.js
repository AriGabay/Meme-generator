'use-strict';
var gCanvas;
var gCtx;
var yStart = 80;
let defaultFontSize = 60;
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
  {
    id: 10,
    url: 'img/10.jpg',
    keywords: ['feeling', 'funy'],
  },
  {
    id: 11,
    url: 'img/11.jpg',
    keywords: ['feeling', 'funy'],
  },
  {
    id: 12,
    url: 'img/12.jpg',
    keywords: ['tv', ],
  },
  {
    id: 13,
    url: 'img/13.jpg',
    keywords: ['movies', ],
  },
  {
    id: 14,
    url: 'img/14.jpg',
    keywords: ['movies', ],
  },
  {
    id: 15,
    url: 'img/15.jpg',
    keywords: ['movies', ],
  },
  {
    id: 16,
    url: 'img/16.jpg',
    keywords: ['movies', ],
  },
  {
    id: 17,
    url: 'img/17.jpg',
    keywords: ['putin', ],
  },
  {
    id: 18,
    url: 'img/18.jpg',
    keywords: ['movies', ],
  },
];
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
