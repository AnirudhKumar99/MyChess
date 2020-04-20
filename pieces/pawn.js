class Pawn extends Piece {
    constructor(img, rank, clr) {
        super(img);

        this.rank = rank;
        this.clr = clr;
    }
    getAdjPos(currPos) {
        adjPos = [];
        if (this.clr == 'white') {
            adjPos.push()
        }
    }

    posToAlNum(board, ppx, ppy) {
        let box = board.getBoxByPos(ppx, ppy)
        return [box.al, box.num];
    }
    isKillable(box, currPlyr) {
        // console.log(box, currPlyr);
        if (box.piece != undefined)
            // console.log(box.piece);
            return (box.piece.clr !== currPlyr);
    }
    possiblePositions(game, currBox, currPlyr) {
        let board = game.gameBoard;

        let positions = [];
        let [px, py] = [currBox.posX, currBox.posY];
        positions.push([currBox.al, currBox.num]);

        if (currPlyr == 'white') {
            let [ppx, ppy] = [px, py + 1];
            if (this.test(ppx, ppy))
                if (board.getBoxByPos(ppx, ppy).isEmpty())
                    positions.push(this.posToAlNum(board, ppx, ppy));

            [ppx, ppy] = [px, py + 2];
            if (this.test(ppx, ppy))

                if (this.notMoved && board.getBoxByPos(ppx, ppy).isEmpty())
                    positions.push(this.posToAlNum(board, ppx, ppy));

            [ppx, ppy] = [px + 1, py + 1];
            if (this.test(ppx, ppy)) {
                if (this.isKillable(board.getBoxByPos(ppx, ppy), currPlyr))
                    positions.push(this.posToAlNum(board, ppx, ppy));
                let box = board.getBoxByPos(ppx, ppy);
                this.killablePositions.push([box.al, box.num]);
            }

            [ppx, ppy] = [px - 1, py + 1];
            if (this.test(ppx, ppy)) {
                if (this.isKillable(board.getBoxByPos(ppx, ppy), currPlyr))
                    positions.push(this.posToAlNum(board, ppx, ppy));
                let box = board.getBoxByPos(ppx, ppy);
                this.killablePositions.push([box.al, box.num]);
            }
        }
        else {
            let [ppx, ppy] = [px, py - 1];
            if (this.test(ppx, ppy))
                if (board.getBoxByPos(ppx, ppy).isEmpty())
                    positions.push(this.posToAlNum(board, ppx, ppy));

            [ppx, ppy] = [px, py - 2];
            if (this.test(ppx, ppy))
                if (this.notMoved && board.getBoxByPos(ppx, ppy).isEmpty())
                    positions.push(this.posToAlNum(board, ppx, ppy));

            [ppx, ppy] = [px + 1, py - 1];
            if (this.test(ppx, ppy)) {
                if (this.isKillable(board.getBoxByPos(ppx, ppy), currPlyr))
                    positions.push(this.posToAlNum(board, ppx, ppy));
                let box = board.getBoxByPos(ppx, ppy);
                this.killablePositions.push([box.al, box.num]);
            }

            [ppx, ppy] = [px - 1, py - 1];
            if (this.test(ppx, ppy)) {
                if (this.isKillable(board.getBoxByPos(ppx, ppy), currPlyr))
                    positions.push(this.posToAlNum(board, ppx, ppy));
                let box = board.getBoxByPos(ppx, ppy);
                this.killablePositions.push([box.al, box.num]);
            }
        }
        return positions;
    }

}