var gCtx;
var gImgId = 0;
var gCurrTxtIdx = 0;


var gImgs = [
    { id: makeId(), url: 'img/2.jpg', keywords: ['All', 'Happy'] },
    { id: makeId(), url: 'img/003.jpg', keywords: ['All', 'Determined'] },
    { id: makeId(), url: 'img/004.jpg', keywords: ['All', 'Cute'] },
    { id: makeId(), url: 'img/005.jpg', keywords: ['All', 'Cute'] },
    { id: makeId(), url: 'img/5.jpg', keywords: ['All', 'Determined'] },
    { id: makeId(), url: 'img/006.jpg', keywords: ['All', 'Cute'] },
    { id: makeId(), url: 'img/8.jpg', keywords: ['All', 'Exciting'] },
    { id: makeId(), url: 'img/img2.jpg', keywords: ['All', 'Happy'] },
    { id: makeId(), url: 'img/img4.jpg', keywords: ['All', 'Happy'] },
    { id: makeId(), url: 'img/img5.jpg', keywords: ['All', 'Surprised', 'Cute'] },
    { id: makeId(), url: 'img/img11.jpg', keywords: ['All', 'Cute'] },
    { id: makeId(), url: 'img/img12.jpg', keywords: ['All', 'Cute'] },
    { id: makeId(), url: 'img/meme1.jpg', keywords: ['All', 'Determined'] },
    { id: makeId(), url: 'img/patrick.jpg', keywords: ['All', 'Cute'] },
    { id: makeId(), url: 'img/putin.jpg', keywords: ['All', 'Exciting'] },
    { id: makeId(), url: 'img/X-Everywhere.jpg', keywords: ['All', 'Happy'] }
]



var gCurrMeme = {
    selectedImgId: gImgId,
    texts: [
        {
            line: '',
            fontFamily: 'sans-serif',
            fontSize: 40,
            color: '#ffffff',
            fontFamily: 'Impact, Charcoal, sans-serif',
            x: 10,
            y: 50,
            align: '',
            width: 0,
        }
    ]
}

var gPopularWords = [30, 16, 16, 22, 16];

function renderPopWords() {
    updatdePopularWords();
    var elPopWords = document.querySelectorAll('.popular-item');
    for (var i = 0; i < elPopWords.length; i++) {
        elPopWords[i].style.fontSize = gPopularWords[i] + "px";
    }
}

function updatdePopularWords() {
    if (!getFromStorage('Popular Words')) return;
    gPopularWords = getFromStorage('Popular Words');
}

function drawCanvas(img) {
    // canvas = document.querySelector('#canvas');
    var imgWidth = img.naturalWidth;
    var imgHeight = img.naturalHeight;
    var ratio = imgWidth / imgHeight;
    canvas.width = 500;
    canvas.height = canvas.width / ratio;
    gCtx = canvas.getContext('2d');
}

function createLine() {
    if(gCurrMeme.texts.length >= 1)
    gCurrMeme.texts.push({
        line: '',
        fontFamily: 'sans-serif',
        fontSize: 40,
        color: '#ffffff',
        fontFamily: 'Impact, Charcoal, sans-serif',
        x: (canvas.width / 2) - 50,
        y: 250,
    })
    else gCurrMeme.texts.push({
        line: '',
        fontFamily: 'sans-serif',
        fontSize: 40,
        color: '#ffffff',
        fontFamily: 'Impact, Charcoal, sans-serif',
        x: 10,
        y: 50,
    })
}


function readImgs(imgs) {
    var strHtmls = imgs.map(function (img) {
        return `
        <li onclick="onDrawImg('${img.id}')">
        <img class="_${img.id} img" src="${img.url}">
        </li>
        `
    });
    return strHtmls
}

function findImgByWord(keyword) {
    var imgs = gImgs.filter(function (img) {
        return img.keywords.some(word => {
            return word.includes(keyword);
        })
    })
    return imgs;
}


function onPopfilter(el) {
    var keyWord = el.classList[1];
    var imgs = findImgByWord(keyWord);
    return imgs;
}
function updateText(elInput) {
    var text = elInput.value;
    gCurrMeme.texts[gCurrTxtIdx].line = text;
    // drawImage(elInput.value);
    renderCanvas();
}

function getImg(imgId) {
    var img = gImgs.find(function (img) {
        return img.id === imgId;
    })
    return img;
}
