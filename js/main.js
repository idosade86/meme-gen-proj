var canvas;

function init() {
    canvas = document.querySelector('#canvas');
    renderImgs(gImgs);
    renderPopWords();
}

function onChangeFontFam(elFont) {
    console.log(elFont);
    switch (elFont) {
        case 'impact':
            gCurrMeme.texts[gCurrTxtIdx].fontFamily = 'Impact, Charcoal, sans-serif';
            break;
        case 'lucida':
            gCurrMeme.texts[gCurrTxtIdx].fontFamily = '"Lucida Console", Monaco, monospace';
            break;
        case 'comic':
            gCurrMeme.texts[gCurrTxtIdx].fontFamily = '"Comic Sans MS", cursive, sans-serif';
            break;
    }
    // drawImage();
    renderCanvas();
}


function onInputTap() {
    document.querySelector('.all-btns').classList.add('open');
}



function onAddText(elInput) {
    updateText(elInput)
}

function onNavLine(op) {
    if (!gCurrMeme.texts.length) return;
    if (op === '-') {
        if (!gCurrTxtIdx) return;
        gCurrTxtIdx--;
    } else {
        if (gCurrTxtIdx > gCurrMeme.texts.length) return;
        gCurrTxtIdx++;
    }
    document.querySelector('.text-input').value = gCurrMeme.texts[gCurrTxtIdx].line;
    document.querySelector('.btn-color').value = gCurrMeme.texts[gCurrTxtIdx].color;
    document.querySelector('.textIdx').value = gCurrTxtIdx + 1;
}

function onAddLine() {
    createLine();
    gCurrTxtIdx = gCurrMeme.texts.length - 1;
    if (gCurrTxtIdx > 1) gCurrMeme.texts[gCurrTxtIdx].y = 150;
    document.querySelector('.text-input').value = '';
    document.querySelector('.btn-color').value = '#ffffff';
    document.querySelector('.shadow-checkbox').checked = false;
    document.querySelector('.textIdx').value = gCurrTxtIdx + 1;
}

function renderImgs(imgs) {
    var strHtmls = readImgs(imgs)
    document.querySelector('.imgs-list').innerHTML = strHtmls.join('');
}

function onDrawImg(imgId) {
    gImgId = imgId;
    gCurrMeme.texts = [];
    createLine();
    gCurrTxtIdx = 0;
    document.querySelector('.text-input').value = '';
    document.querySelector('.textIdx').value = '1';
    document.querySelector('.textIdx').innerHTML = gCurrTxtIdx + 1;
    document.querySelector('.modal-container').classList.add('open');
    renderCanvas();

}


function renderCanvas() {
    var imgClass = gImgId;
    var img = document.querySelector(`._${imgClass}`);
    drawCanvas(img);
    gCtx.drawImage(img, 0, 0, canvas.width, canvas.height);
    gCurrMeme.texts.forEach(function (text) {
        gCtx.font = text.fontSize + 'px ' + text.fontFamily;
        gCtx.shadowColor = text.shadow;
        gCtx.shadowOffsetX = text.shadowOffSetX;
        gCtx.shadowOffsetY = text.shadowOffSetY;
        gCtx.fillStyle = text.color;
        gCtx.lineWidth = 2;
        gCtx.strokeStyle = 'black';
        gCtx.textAlign = text.align;
        gCtx.fillText(text.line, text.x, text.y);
        gCtx.strokeText(text.line, text.x, text.y);
    });
}

function onTextAlign(par) {
    switch (par) {
        case 'center':
            gCurrMeme.texts[gCurrTxtIdx].align = 'center';
            gCurrMeme.texts[gCurrTxtIdx].x = canvas.width / 2;

            break;
        case 'left':
            gCurrMeme.texts[gCurrTxtIdx].align = 'left';
            gCurrMeme.texts[gCurrTxtIdx].x = 5;

            break;
        case 'right':
            gCurrMeme.texts[gCurrTxtIdx].align = 'right';
            gCurrMeme.texts[gCurrTxtIdx].x = canvas.width - 5;

            break;
    }
    // drawImage();
    renderCanvas();
}

function changeFontSize(op) {
    if (op === '+') {
        gCurrMeme.texts[gCurrTxtIdx].fontSize += 5;
    } else {
        gCurrMeme.texts[gCurrTxtIdx].fontSize -= 5;
    }
    var fontSize = gCurrMeme.texts[gCurrTxtIdx].fontSize;
    gCurrMeme.texts[gCurrTxtIdx].fontSize = fontSize;
    // drawImage();
    renderCanvas();
}

function onColorChange(elColorInput) {
    var color = elColorInput.value;
    gCurrMeme.texts[gCurrTxtIdx].color = color;
    // drawImage();
    renderCanvas();
}

function onBackhomePage() {
    document.querySelector('.modal-container').classList.remove('open');
    document.querySelector('.all-btns').classList.remove('open');
    clearMeme();
}

function clearMeme() {
    gCurrMeme.texts.forEach(function (text) {
        text.line = '';
    });
}

function onDescriptionfilter(ev) {
    ev.preventDefault();
    var keyWord = document.querySelector('.filter-list-input').value
    var imgs = findImgByWord(keyWord);
    renderImgs(imgs);
}

function changeTextXPos(elBtnId) {
    if (elBtnId === 'left') gCurrMeme.texts[gCurrTxtIdx].x -= 5;
    else gCurrMeme.texts[gCurrTxtIdx].x += 5;
    renderCanvas();
}

function changeTextYPos(elBtnId) {
    if (elBtnId === 'up') gCurrMeme.texts[gCurrTxtIdx].y -= 5;
    else gCurrMeme.texts[gCurrTxtIdx].y += 5;
    renderCanvas();
}


function controlTextShadow() {
    var checkBox = document.querySelector('.shadow-checkbox');

    if (checkBox.checked) {
        gCurrMeme.texts[gCurrTxtIdx].shadow = '#ffffff';
        gCurrMeme.texts[gCurrTxtIdx].shadowOffSetX = 1;
        gCurrMeme.texts[gCurrTxtIdx].shadowOffSetY = 2;
        gCurrMeme.texts[gCurrTxtIdx].shadowBlur = 2;
        document.querySelector('.shadow').classList.add('checked');

    }
    else {
        gCurrMeme.texts[gCurrTxtIdx].shadow = '';
        gCurrMeme.texts[gCurrTxtIdx].shadowOffSetX = 0;
        gCurrMeme.texts[gCurrTxtIdx].shadowOffSetY = 0;
        gCurrMeme.texts[gCurrTxtIdx].shadowBlur = 0;
        document.querySelector('.shadow').classList.remove('checked');
    }
    // drawImage();
    renderCanvas();
}

function onDeleteline() {
    var elInput = document.querySelector('.text-input');
    gCurrMeme.texts.splice(gCurrTxtIdx, 1);
    elInput.value = '';
    // drawImage();
    renderCanvas();
}

function openNav() {
    var nav = document.querySelector('.mobile-nav');
    var page = document.querySelector('.page');
    if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        page.classList.remove('screen');
        document.querySelector('.hambunger').innerText = '☰';
    } else {
        nav.classList.add('open');
        page.classList.add('screen');
        document.querySelector('.hambunger').innerText = '✖';
    }
}

function closeNav() {
    var nav = document.querySelector('.mobile-nav');
    var page = document.querySelector('.page');
    nav.classList.remove('open');
    page.classList.remove('screen');
    document.querySelector('.page span').innerText = '';
}

function downloadCanvas(elLink) {
    elLink.href = canvas.toDataURL();
    elLink.download = 'my_paint.jpg';
}


function onPopWord(elWord, el) {
    gPopularWords[elWord]++
    saveToStorage('Popular Words', gPopularWords)
    var imgs = onPopfilter(el);
    renderImgs(imgs);
}



function sendInfo() {
    var userEmail = $(".user-email").val();
    var userSubject = $(".user-subject").val();
    var userText = $(".user-text").val();

    $(".user-email").val('');
    $(".user-type").val('');
    $(".user-text").val('');

    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=idokestin@gmail.com&su=${userSubject}&body=${userText}`, '_blank');

}

