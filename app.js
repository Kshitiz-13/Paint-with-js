const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_HEIGHT = 500;

canvas.width = screen.width;
canvas.height = CANVAS_HEIGHT;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, screen.width, CANVAS_HEIGHT);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let isPainting = false;
let isfilling = false;

function stopPainting() {
  isPainting = false;
}

function startPainting() {
  isPainting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!isPainting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function ColorchangeChangeClickHandler(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function RangeChangeHandler(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function ModeClickHandler() {
  if (isfilling === true) {
    isfilling = false;
    mode.innerText = "Fill";
  } else {
    isfilling = true;
    mode.innerText = "Paint";
  }
}

function CanvasClickHandler() {
  if (isfilling) {
    ctx.fillRect(0, 0, screen.width, CANVAS_HEIGHT);
  }
}

function ContextMenuHandler(event) {
  event.preventDefault();
}

function SaveClickHandler() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "MY PAINTING😎";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", CanvasClickHandler);
  canvas.addEventListener("contextmenu", ContextMenuHandler);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", ColorchangeChangeClickHandler)
);

if (range) {
  range.addEventListener("input", RangeChangeHandler);
}

if (mode) {
  mode.addEventListener("click", ModeClickHandler);
}

if (saveBtn) {
  saveBtn.addEventListener("click", SaveClickHandler);
}
