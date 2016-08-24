var words = document.getElementsByClassName('rword');
var wordArray = [];
var currentWord = 0;
words[currentWord].style.opacity = 1;
for (var i = 0; i < words.length; i++) { splitLetters(words[i]); }

function changeWord() {
    var cw = wordArray[currentWord];
    var nw = currentWord == words.length - 1 ? wordArray[0] : wordArray[currentWord + 1];
    for (var i = 0; i < cw.length; i++) { animateLetterOut(cw, i, cw.length); }
    for (var i = 0; i < nw.length; i++) { nw[i].className = 'letter behind';
        nw[0].parentElement.style.opacity = 1;
        animateLetterIn(nw, i, nw.length); }
    currentWord = (currentWord == wordArray.length - 1) ? 0 : currentWord + 1;
}

function animateLetterOut(cw, i, num) { setTimeout(function() { cw[i].className = 'letter out'; }, (num - i) * 80); }

function animateLetterIn(nw, i, num) { setTimeout(function() { nw[i].className = 'letter in'; }, 340 + ((num - i) * 80)); }

function splitLetters(word) {
    var content = word.innerHTML;
    word.innerHTML = '';
    var letters = [];
    for (var i = 0; i < content.length; i++) {
        var letter = document.createElement('span');
        letter.className = 'letter';
        letter.innerHTML = content.charAt(i);
        word.appendChild(letter);
        letters.push(letter); }
    wordArray.push(letters);
}
changeWord();
setInterval(changeWord, 4000);

function show() {
    $(".search").addClass('active');
    setTimeout(function() {
        document.getElementById("search").focus();
    }, 300);
}
function hide() {
    $(".search").removeClass('active');
}

$(document).ready(function() {
    $(".loader").fadeOut();
    setTimeout(function () {
        $('.container.animated').velocity('transition.slideUpIn');
    }, 400);
    setTimeout(function () {
        document.getElementsByTagName('footer')[0].style.opacity='1';
    }, 410);
    // Go to top plugin
    $.goup();
})