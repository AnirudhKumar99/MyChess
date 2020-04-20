class Game {
    constructor(size) {
        this.size = size;
        this.pieces = [];
        this.gameBoard = new Board(1, 1, this.size);

        this.src = null;
        this.dest = null;
        this.floating = false;
    }
    start(pieceImages) {
        this.createPieces(pieceImages)
        this.setPieces();
        this.players = [];
        this.players.push(new Player('white'));
        this.players.push(new Player('black'));
        this.currentPlayer = this.getPlayer('white');
        this.currentPlayer.isTurn = true;
        // this.currentPlayer = 'white';
        this.playerTurn = 'white';
        this.setPlayerPieces();
        this.gameBoard.show();

    }
    setPlayerPieces() {
        let wBoxes = [], bBoxes = [];
        for (let col of this.gameBoard.board) {
            for (let box of col) {
                if (box.piece != undefined) {
                    if (box.piece.clr == 'white') wBoxes.push(box);
                    else if (box.piece.clr == 'black') bBoxes.push(box)
                }
            }
        }
        this.getPlayer('white').setPlayerBoxes(wBoxes);
        this.getPlayer('black').setPlayerBoxes(bBoxes);
        // console.log(wBoxes, bBoxes)
    }
    getPlayer(clr) {
        for (let plyr of this.players) {
            if (plyr.clr == clr) return plyr;
        }
    }
    getPieceByProps(clr, rank) {
        // console.log('getting piece by props')
        for (let piece of this.pieces) {
            if (piece.clr == clr && piece.rank == rank) {
                return piece;
            }
        }
    }
    createPieces(pieceImages) {
        let clrs = ['white', 'black'];
        for (let clr of clrs) {
            // for (let i = 0; i < 2; i++) {
            this.pieces.push(new Rook(pieceImages[clr]['rook'], 'rook', clr));
            this.pieces.push(new Knight(pieceImages[clr]['knight'], 'knight', clr));
            this.pieces.push(new Bishop(pieceImages[clr]['bishop'], 'bishop', clr));
            this.pieces.push(new Queen(pieceImages[clr]['queen'], 'queen', clr));
            this.pieces.push(new King(pieceImages[clr]['king'], 'king', clr));
            // }
            // for (let i = 0; i < 8; i++) {
            this.pieces.push(new Pawn(pieceImages[clr]['pawn'], 'pawn', clr));
            // }
        }
    }
    setPieces() {
        this.gameBoard.board[0][7].setPiece(new Rook(pieceImages['black']['rook'], 'rook', 'black'));
        this.gameBoard.board[1][7].setPiece(new Knight(pieceImages['black']['knight'], 'knight', 'black'));
        this.gameBoard.board[2][7].setPiece(new Bishop(pieceImages['black']['bishop'], 'bishop', 'black'));
        this.gameBoard.board[3][7].setPiece(new King(pieceImages['black']['king'], 'king', 'black'));
        this.gameBoard.board[4][7].setPiece(new Queen(pieceImages['black']['queen'], 'queen', 'black'));
        this.gameBoard.board[5][7].setPiece(new Bishop(pieceImages['black']['bishop'], 'bishop', 'black'));
        this.gameBoard.board[6][7].setPiece(new Knight(pieceImages['black']['knight'], 'knight', 'black'));
        this.gameBoard.board[7][7].setPiece(new Rook(pieceImages['black']['rook'], 'rook', 'black'));

        this.gameBoard.board[0][0].setPiece(new Rook(pieceImages['white']['rook'], 'rook', 'white'));
        this.gameBoard.board[1][0].setPiece(new Knight(pieceImages['white']['knight'], 'knight', 'white'));
        this.gameBoard.board[2][0].setPiece(new Bishop(pieceImages['white']['bishop'], 'bishop', 'white'));
        this.gameBoard.board[3][0].setPiece(new King(pieceImages['white']['king'], 'king', 'white'));
        this.gameBoard.board[4][0].setPiece(new Queen(pieceImages['white']['queen'], 'queen', 'white'));
        this.gameBoard.board[5][0].setPiece(new Bishop(pieceImages['white']['bishop'], 'bishop', 'white'));
        this.gameBoard.board[6][0].setPiece(new Knight(pieceImages['white']['knight'], 'knight', 'white'));
        this.gameBoard.board[7][0].setPiece(new Rook(pieceImages['white']['rook'], 'rook', 'white'));

        for (let i = 0; i < 8; i++) {
            this.gameBoard.board[i][1].setPiece(new Pawn(pieceImages['white']['pawn'], 'pawn', 'white'))
            this.gameBoard.board[i][6].setPiece(new Pawn(pieceImages['black']['pawn'], 'pawn', 'black'))
        }

    }
    posInPossiblePositions(pos) {
        for (let posi of this.possiblePositions) {
            if (posi[0] == pos[0] && posi[1] == pos[1]) {
                return true;
            }
        }
        return false;
    }

    getPossiblePositions(box) {
        let currPiece = box.piece;
        // console.log('currPiece')
        // console.log(currPiece)
        if (currPiece != undefined && currPiece.clr == this.playerTurn)
            return currPiece.possiblePositions(this, box, this.playerTurn);
        return [];

    }
    highlightPossiblePositions() {
        // if(this.possiblePositions.length>0)
        for (let pos of this.possiblePositions) {
            let box = this.gameBoard.getBoxByAlNum(pos[0], pos[1]);
            box.color = color(255, 0, 0);
        }
    }
    unHighlightPossiblePositions() {
        for (let pos of this.possiblePositions) {
            let box = this.gameBoard.getBoxByAlNum(pos[0], pos[1]);
            box.setDfltClr();
        }
    }
    makeMove(src, dest) {
        // if (src[0] != dest[0] && src[1] != dest[1]) {
        let source = this.gameBoard.getBoxByAlNum(src[0], src[1]);
        let destination = this.gameBoard.getBoxByAlNum(dest[0], dest[1]);
        source.piece.notMoved = false;
        destination.piece = source.piece;
        source.piece = null;
        this.changePlayer();
        this.unHighlightPossiblePositions();
        this.setPlayerPieces();
        // this.gameBoard.show();

        // }
    }
    status() {
        for (let r of this.gameBoard.board) {
            for (let b of r) {
                if (b.piece != null) {
                    console.log(b.piece.clr, b.piece.rank, b.piece.notMoved)
                }
            }
        }
    }
    changePlayer() {
        let clr = this.currentPlayer.clr == 'white' ? 'black' : 'white';
        this.currentPlayer.isTurn = false;
        this.currentPlayer = this.getPlayer(clr);
        this.currentPlayer.isTurn = true;
        this.playerTurn = clr;
    }

    update(x, y) {
        let [boxX, boxY] = this.gameBoard.getBoxPos(x, y);
        let box = this.gameBoard.getBoxByPos(boxX, boxY);
        console.log(this.playerTurn);
        let src, dest;
        if (box.piece != undefined || this.currentPlayer.inHand) {

            [src, dest] = this.currentPlayer.choice(this, box);
            // console.log(src, dest)
            if (src != undefined && dest != undefined)
                this.makeMove(src, dest);
        }
        // this.changePlayer();
        this.gameBoard.show();
        // console.log(this.gameBoard.getBoxByPos(boxX, boxY))
        // console.log(src)
        // console.log(this.possiblePositions, this.src, this.dest);
    }

}