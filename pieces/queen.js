class Queen extends Piece {
    constructor(img, rank, clr) {
        super(img);
        this.clr = clr;
        this.rank = rank;

    }

    possiblePositions(game, currBox, currPlyr, kingProb = false) {
        let board = game.gameBoard;

        let positions = [];
        let [px, py] = [currBox.posX, currBox.posY];
        // if (!kingProb)
            positions.push([currBox.al, currBox.num]);

        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                let [ppx, ppy] = [px, py];
                let cond = true;
                // console.log(i, j)
                while (cond) {
                    ppx += i; ppy += j;
                    // console.log('ppx,ppy:', ppx, ppy)
                    // let [ppx, ppy] = [px + (d * i), py + (d * j)];
                    if (this.test(ppx, ppy)) {
                        let box = board.getBoxByPos(ppx, ppy);
                        if (box.isEmpty()) {
                            positions.push([box.al, box.num]);
                        }
                        else if (box.piece.clr != currPlyr) {
                            positions.push([box.al, box.num]);
                            this.killablePositions.push([box.al, box.num])
                            cond = false;
                        }
                        else if (box.piece.clr == currPlyr && kingProb) {
                            this.inKingsGrasp(currPlyr, box);
                            cond = false;
                        }
                        else cond = false;
                    }
                    else {
                        cond = false;
                    }
                }
            }
        }
        return positions;
    }
}