import { imgDB } from './imgDB.js';

let currentImg = document.getElementById('currentImg');
let imgLocation = 'imgs/';
let currentIndex = 0;
let mainImgTitle = document.getElementById('imgTitle');
let imgDesc = document.getElementById('imgDesc');
let pagination = document.querySelectorAll('.pagination');
let thumbImgs = document.querySelectorAll('.thumbImg');
let thumbs = document.querySelectorAll('.thumbnail');
let selectedTriangles = document.querySelectorAll('.triangle-up');

function setCurrentImg(index) {
    currentImg.setAttribute('src', imgLocation + imgDB[index].src);
    mainImgTitle.textContent = imgDB[index].title;
    imgDesc.textContent = imgDB[index].description;
}

function fillThumbs() {
    thumbImgs.forEach((thumbImg, indexT) => {
        thumbImg.setAttribute('src', imgLocation + imgDB[indexT].src);
    })
}

function previousImage() {
    (currentIndex == 0) ? currentIndex = imgDB.length - 1 : currentIndex--;
    setCurrentImg(currentIndex);
    markSelected(thumbs[currentIndex]);
}

function nextImage() {
    (currentIndex == imgDB.length - 1) ? currentIndex = 0 : currentIndex++;
    setCurrentImg(currentIndex);
    markSelected(thumbs[currentIndex]);
}

function markSelected(thumb) {
    let selected = document.querySelector('.selected');
    selected.classList.remove('selected');
    thumb.classList.add('selected');
    let selectedTriangle;
    selectedTriangles.forEach(function (triangle) {
        if (!triangle.classList.contains('hidden')) {
            selectedTriangle = triangle;
        }
    })
    selectedTriangle.classList.add('hidden');
    selectedTriangles[currentIndex].classList.remove('hidden');
}

document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    if (keyName === 'ArrowLeft') {
        previousImage();
    }
    if (keyName === 'ArrowRight') {
        nextImage();
    }
});

pagination.forEach((arrow) => {
    arrow.addEventListener("click", () => {
        if (arrow.classList.contains('previous')) {
            previousImage();
        } else {
            nextImage();
        }
    });
})

thumbs.forEach((thumb, thumbIndex) => {
    thumb.addEventListener("click", () => {
        currentIndex = thumbIndex;
        setCurrentImg(currentIndex);
        markSelected(thumb);
    });

    // thumbs hover-->show title - todo
    // thumb.addEventListener("mouseover", function (event) {
    //     event.target.style.backgroundColor = "orange";
    // });

    // thumb.addEventListener("mouseleave", function (event) {
    //     event.target.style.backgroundColor = "white";
    // });
})

setCurrentImg(currentIndex);
fillThumbs();
