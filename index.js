const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');
let drawingHistory = [];
const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let thickness = 5;
let startX;
let startY;

toolbar.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

toolbar.addEventListener('change', e => {
    if(e.target.id === 'stroke') {
        ctx.strokeStyle = e.target.value;
    }

    if(e.target.id === 'thickness') {
        thickness = e.target.value;
    }
    
});
////////////////////////////////

toolbar.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawingHistory = [];
    }

    if (e.target.id === 'undo') {
        undo();
    }
});

/////////////////////////////////////////////////////////
const draw = (e) => {
    if(!isPainting) {
        return;
    }

    ctx.lineWidth = thickness;
    ctx.lineCap = 'round';

    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
    ctx.stroke();
}

canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
});

canvas.addEventListener('mouseup', e => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);


function undo(){

if(drawingHistory.length>1){

    drawingHistory.pop();
    ctx.putImageData(drawingHistory[drawingHistory.length - 1], 0, 0);
}  else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawingHistory = [];

}
}