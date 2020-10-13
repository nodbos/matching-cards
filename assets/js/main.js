const squareHeight = 200;
const squareWidth = 200;
const squareGap = 10;
const column = 4;
const row = 3;

const highlight = createjs.Graphics.getRGB(255, 0, 0);
const stage = new createjs.Stage('myCanvas');

let squarePlacement = [];
let genOnce = false;
let tileChecked;
let temp;

randomDoubleColor();

for (i = 0; i < squarePlacement.length; i++) {
    const color = randomColor();
    const square = drawSquare(color);
    square['color'] = square.graphics._fill.style;
    square.graphics._fill.style = 'rgb(140, 136, 136)';
    square.x =
        (squareWidth + squareGap) * (squarePlacement[i] % column);
    square.y =
        (squareHeight + squareGap) *
        Math.floor(squarePlacement[i] / column);
    stage.addChild(square);
    square.addEventListener('click', handleOnPress);
    stage.update();
}

function handleOnPress(e) {
    const tile = e.target;
    tile.graphics
        .beginFill(tile.color)
        .rect(5, 5, squareHeight, squareWidth);
    tile.mouseEnabled = false;
    if (!!tileChecked === false) {
        tileChecked = tile;
    } else {
        stage.mouseChildren = false;
        tile.graphics
            .beginFill(tile.color)
            .rect(5, 5, squareHeight, squareWidth);
        setTimeout(function () {
            if (
                tileChecked.color === tile.color &&
                tileChecked !== tile
            ) {
                tileChecked.visible = false;
                tile.visible = false;
            } else {
                tile.graphics
                    .beginFill('rgb(140, 136, 136)')
                    .rect(5, 5, squareHeight, squareWidth);
                tileChecked.graphics
                    .beginFill('rgb(140, 136, 136)')
                    .rect(5, 5, squareHeight, squareWidth);
            }
            tile.mouseEnabled = true;
            tileChecked.mouseEnabled = true;
            stage.mouseChildren = true;
            tileChecked = null;
            stage.update();
        }, 1000);
    }
    stage.update();
}

function randomDoubleColor() {
    for (let i = 0; i < column * row; i++) {
        squarePlacement.push(i);
    }
    squarePlacement = shuffleArray(squarePlacement);
    return squarePlacement;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function drawSquare() {
    const color = randomColor();
    const graphics = new createjs.Graphics()
        .setStrokeStyle(5)
        .beginStroke('rgba(20,20,20,1)');
    if (!genOnce) {
        graphics
            .beginFill(color)
            .rect(5, 5, squareHeight, squareWidth);
        temp = color;
        genOnce = true;
    } else {
        graphics
            .beginFill(temp)
            .rect(5, 5, squareHeight, squareWidth);
        genOnce = false;
    }
    const shape = new createjs.Shape(graphics);
    return shape;
}

function randomColor() {
    const num1 = Math.floor(Math.random() * 255);
    const num2 = Math.floor(Math.random() * 255);
    const num3 = Math.floor(Math.random() * 255);
    return 'rgba(' + num1 + ',' + num2 + ',' + num3 + ',1)';
}
