let boardSize = 800;
let boxSize = boardSize / 8;
let black_rook, white_rook;
let black_knight, white_knight;
let black_bishop, white_bishop;
let black_queen, white_queen;
let black_king, white_king;
let black_pawn, white_pawn;
let white_starting;
let black_starting;
let pieceinhand = false;
let pieces = [];
let coloredPositions = [];
let currentPieceColor = 'white';
let player;
let presentPieces=[],previousPieces=[];

// This is a special initialisation for king
let king;


// coloredPositions = [[0, 0], [1, 1], [2, 2]];
let white_names = [['white_rook', 'white_knight', 'white_bishop', 'white_king',
    'white_queen', 'white_bishop', 'white_knight', 'white_rook'],
['white_pawn', 'white_pawn', 'white_pawn', 'white_pawn',
    'white_pawn', 'white_pawn', 'white_pawn', 'white_pawn']];
let black_names = [['black_rook', 'black_knight', 'black_bishop', 'black_king',
    'black_queen', 'black_bishop', 'black_knight', 'black_rook'],
['black_pawn', 'black_pawn', 'black_pawn', 'black_pawn',
    'black_pawn', 'black_pawn', 'black_pawn', 'black_pawn']];
function inColPos([a, b]) {
    for (let pos of coloredPositions) {
        if (pos[0] === a && pos[1] === b) {
            return true;
        }
    }
    return false;
}
function preload() {
    black_rook = loadImage('/images/black_rook.png');
    white_rook = loadImage('/images/white_rook.png');

    black_knight = loadImage('/images/black_knight.png');
    white_knight = loadImage('/images/white_knight.png');

    black_bishop = loadImage('/images/black_bishop.png');
    white_bishop = loadImage('/images/white_bishop.png');

    black_queen = loadImage('/images/black_queen.png');
    white_queen = loadImage('/images/white_queen.png');

    black_king = loadImage('/images/black_king.png');
    white_king = loadImage('/images/white_king.png');

    black_pawn = loadImage('/images/black_pawn.png');
    white_pawn = loadImage('/images/white_pawn.png');
}
function chessBoard() {
    rectMode(CENTER);
    stroke(0);
    strokeWeight(1);
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            // (i + j) % 2 == 0 ? fill(200) : fill(55);
            if (inColPos([i, j])) {
                fill(255, 0, 0);
            } else if ((i + j) % 2 == 0) {
                fill(200);
            } else if ((i + j) % 2 == 1) {
                fill(55);
            }
            let x = (i + 0.5) * boxSize;
            let y = (j + 0.5) * boxSize;
            rect(x, y, boxSize, boxSize, 10)
        }
    }
}
function getImageByName(name) {
    for (let i in white_names) {
        for (let j in white_names[i]) {
            if (white_names[i][j] === name) {
                // console.log(white_names[i][j], white_starting[i][j]);
                return white_starting[i][j];
            }
        }
    }
    for (let i in black_names) {
        for (let j in black_names[i]) {
            if (black_names[i][j] === name) {
                return black_starting[i][j];
            }
        }
    }
}
function setup() {
    white_starting = [[white_rook, white_knight, white_bishop, white_king,
        white_queen, white_bishop, white_knight, white_rook],
    [white_pawn, white_pawn, white_pawn, white_pawn,
        white_pawn, white_pawn, white_pawn, white_pawn]];
    black_starting = [[black_rook, black_knight, black_bishop, black_king,
        black_queen, black_bishop, black_knight, black_rook],
    [black_pawn, black_pawn, black_pawn, black_pawn,
        black_pawn, black_pawn, black_pawn, black_pawn]];
    createCanvas(boardSize + 2, boardSize + 2);
    background(100);
    chessBoard();
    player = createDiv(currentPieceColor);

    // player=createP(currentPieceColor);
    // console.log(player);
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 2; j++) {
            let wx = (i + 0.5) * boxSize;
            let wy = (j + 0.5) * boxSize;
            let wpiece = new Piece(wx, wy, white_starting[j][i], white_names[j][i]);
            pieces.push(wpiece);
        }
    }
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 2; j++) {
            let bx = (i + 0.5) * boxSize;
            let by = (j + 6.5) * boxSize;
            let bpiece = new Piece(bx, by, black_starting[1 - j][i], black_names[1 - j][i]);
            pieces.push(bpiece);
        }
    }
    presentPieces=objToPos(pieces);
    // let bking=getKing('white');
    // let wking=getKing('black');
    // let temp=wking;
    // pieces[indexInPieces(wking)]=pieces[0];
    // pieces[0]=temp;

    // temp=bking;
    // pieces[indexInPieces(bking)]=pieces[1];
    // pieces[1]=temp;

    // liveOrDead('both');
    liveOrDead('white');
    // liveOrDead('black');
}
function mousePressed() {
    let posX = int(mouseX / boxSize);
    let posY = int(mouseY / boxSize);
    // console.log(posX, posY);
    for (let piece of pieces) {
        // piece.possiPos();
        piece.update();
    }
    pieceinhand = false;
    for (let piece of pieces) {
        if (piece.floating == true) pieceinhand = true;
    }

}
function draw() {
    player.height = 100;
    player.width = 200;
    player.html(currentPieceColor);
    if (frameCount % 100 == 0) {
        // player.html('black');
        player.hide();
    }
    // else if (frameCount % 50 == 0) {
    //     // player.html('white');
    //     player.unhide();
    // }
    background(100);
    chessBoard();

    for (let piece of pieces) {
        piece.show();
        // piece.update();
    }
}