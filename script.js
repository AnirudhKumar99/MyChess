// let whiteNames=['White-Rook','White-Knight','White-Bishop','White-Queen','White-King','White-Pawn'];
// let blackNames=['Black-Rook','Black-Knight','Black-Bishop','Black-Queen','Black-King','Black-Pawn'];


let pieceNames = ['white_rook', 'white_knight', 'white_bishop', 'white_queen', 'white_king', 'white_pawn',
    'black_rook', 'black_knight', 'black_bishop', 'black_queen', 'black_king', 'black_pawn'];

let pieceImages = {};


let game;
let whites = {};
let blacks = {};

let img;
function preload() {
    for (let name of pieceNames) {
        let [color, rank] = name.split('_');
        img = loadImage(`./images/${name}.png`);
        // console.log(color, rank)
        // img = loadImage(`./images/white_rook.png`);
        if (color == 'white') {
            whites[rank] = img;
        }
        else {
            blacks[rank] = img
        }
        pieceImages['white'] = whites;
        pieceImages['black'] = blacks;
    }
}


function mousePressed(){
    console.log(mouseX,mouseY)
    game.update(mouseX,mouseY) //mouseX and mouseY are global vars 
    // redraw()
}

function setup() {

    createCanvas(802, 802);
    background(100);
    game = new Game(width - 2);
    game.start(pieceImages);
    // image(img, 0, 0, 100, 100);
}
function draw() {

}