let ctx;
let canvas;
document.addEventListener("DOMContentLoaded", () => {
    canvas = document.querySelector('canvas');
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    ctx = canvas.getContext("2d");
});

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']


