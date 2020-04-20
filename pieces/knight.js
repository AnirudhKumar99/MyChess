class Knight extends Piece {
    constructor(img, rank, clr) {
        super(img);
        this.rank = rank;
        this.clr = clr;
    }
    possiblePositions(game, currBox, currPlyr, kingProb = false) {
        let board = game.gameBoard;

        let positions = [];
        // let [al, num] = [currBox.al, currBox.num];
        let [px, py] = [currBox.posX, currBox.posY];
        // if (!kingProb)
            positions.push([currBox.al, currBox.num]);
        for (let i = -1; i < 2; i += 2) {
            for (let j = -1; j < 2; j += 2) {
                let ppx, ppy;
                let box;
                [ppx, ppy] = [px + (-2 * i), py + (-1 * j)];
                if (0 <= ppx && ppx <= 7 && 0 <= ppy && ppy <= 7) {
                    box = board.getBoxByPos(ppx, ppy);
                    // console.log(ppx, ppy);
                    let [al, num] = [box.al, box.num]
                    if (this.isPossible(box, currPlyr)) positions.push([al, num]);
                    if (box.isEmpty() && this.isKillable(box, currPlyr)) this.killablePositions.push([al, num]);

                }

                [ppx, ppy] = [px + (-1 * i), py + (-2 * j)];
                if (0 <= ppx && ppx <= 7 && 0 <= ppy && ppy <= 7) {
                    box = board.getBoxByPos(ppx, ppy);
                    // console.log(ppx, ppy);
                    let [al, num] = [box.al, box.num]
                    if (this.isPossible(box, currPlyr)) positions.push([al, num]);
                    if (box.isEmpty() && this.isKillable(box, currPlyr)) this.killablePositions.push([al, num]);

                }
            }
        }
        return positions;
    }
    // isPossible(box, currPlyr) {
    //     console.log(currPlyr);
    //     if(box.piece!=undefined)console.log(box.piece)
    //     // if (!box) return false;
    //     // if(box.isEmpty())return true;
    //     // else if()
    //     return (box.isEmpty() || box.piece.clr !== currPlyr);
    // }
}