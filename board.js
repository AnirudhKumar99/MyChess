class Board {
    constructor(x, y, size) {
        // Consists of all the boxes on the game board
        this.x = x;
        this.y = y;
        this.size = size;
        this.createBoard();
    }
    show() {
        for (let row of this.board) {
            for (let box of row) {
                box.show();
            }
        }
    }

    createBoard() {
        // Creates a 2d array of boxes on the board with the given offset
        let names = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        let bS = this.size / 8; //Size of each box
        let xOff = this.x;
        let yOff = this.y;
        let clr = color(255);
        this.board = [];
        for (let i = 0; i < 8; i++) {
            let col = [];
            for (let j = 0; j < 8; j++) {
                clr = color(150 - 100 * (((i + j) % 2)));//Sets black and white alternatively to the boxes
                let x = xOff + ((i + 0.5) * bS);
                let y = yOff + ((j + 0.5) * bS);
                // console.log(i, j, x, y);
                let box = new Box(x, y, i, j, names[7 - i], j + 1, bS, clr);
                box.color = clr;
                col.push(box);
            }
            this.board.push(col);
        }
    }
    getBoxPos(x, y) {
        // Returns the position of the box in which the x and y vals exist
        let bS = this.size / 8; //Size of each box
        let px = Math.floor(x / bS)
        let py = Math.floor(y / bS);
        return [px, py];
    }
    getBoxByPos(px, py) {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let box = this.board[i][j];
                if (box.posX == px && box.posY == py) {
                    return box;
                }
            }
        }
    }
    getBoxByAlNum(al, num) {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let box = this.board[i][j];
                if (box.al == al && box.num == num) {
                    return box;
                }
            }
        }
    }
    // setImages(pieceImages){
    // let ranks=['rook','knight','bishop','queen','king','pawn'];
    // let clrs=['whites','blacks'];
    //     for (let i=0;i<3;i++){
    //         this.board[i][7-i].setPiece()
    //     }
    // }
}