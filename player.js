class Player {
    constructor(clr) {
        this.clr = clr;
        this.playerBoxes = [];
        this.isTurn = false;
        this.inHand = false;
        this.inCheck=false;
        this.src = [];
        this.dest = [];
    }
    setPlayerBoxes(playerBoxes) {
        this.playerBoxes = playerBoxes;
    }
    getBoxByRank(rank) {
        for (let bx of this.playerBoxes) {
            if (bx.piece.rank == rank) {
                // console.log('rec2');
                return bx;
            }
        }
    }
    choice(game, box) {
        // console.log(this.playerBoxes)
        let currBox = box;
        let path = [];
        // console.log(this.inHand);
        if (!this.inHand) {
            console.log('here1')
            this.src = [currBox.al, currBox.num];
            if (currBox.piece != undefined && currBox.piece.clr == this.clr)
                this.inHand = true;
            game.possiblePositions = game.getPossiblePositions(currBox);
            game.highlightPossiblePositions();

        }
        else {
            this.dest = [currBox.al, currBox.num];
            console.log(game.possiblePositions);
            if (game.posInPossiblePositions(this.dest)) {
                console.log('here2');
                this.inHand = false;
                if (this.dest[0] == this.src[0] && this.dest[1] == this.src[1]) {
                    console.log('here3');
                    this.inHand = false;
                    game.unHighlightPossiblePositions();
                }
                else {
                    path = [[...this.src], [...this.dest]];
                    this.src = [];
                    this.dest = [];
                }
            }
            // game.unHighlightPossiblePositions();
        }
        console.log(this.inHand);
        game.gameBoard.show();
        // dest = ['c', 3];
        // return [this.src, this.dest]
        return path;
    }
    // checkCheck(){

    // }
}