class King extends Piece {
    constructor(img, rank, clr) {
        super(img);
        this.rank = rank;

        this.clr = clr;
    }

    possiblePositions(game, currBox, currPlyr, KingProb = false) {
        let board = game.gameBoard;

        let positions = [];
        let [px, py] = [currBox.posX, currBox.posY];

        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                let [ppx, ppy] = [px, py];
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
                        // cond = false;
                    }
                }
            }
        }
        if (!KingProb)
            this.removeCheckPositions(game, currBox, currPlyr, positions);
        positions.push([currBox.al, currBox.num]);
        // this.addCastlingPositions();
        console.log(positions)
        return positions;
    }

    // addCastlingPositions(currBox,positions){
    //     if(currBox.piece.clr=='white'){
    //         if(currBox.piece.notMoved==true)
    //     }
    // }

    removeCheckPositions(game, currBox, currPlyr, positions) {
        console.log(positions)
        let oppPlyr = currPlyr == 'white' ? 'black' : 'white';
        let oppBxes = game.getPlayer(oppPlyr).playerBoxes;
        for (let box of oppBxes) {
            // console.log(box.piece.rank)
            let danPos;

            if (box.piece.rank == 'king') {
                // console.log('king piece');
                positions.push([box.al, box.num])
                danPos = box.piece.possiblePositions(game, box, oppPlyr, true);
            }
            else if (box.piece.rank == 'pawn') {
                // console.log('pawn piece');
                // positions.push([box.al, box.num]);
                danPos = box.piece.possiblePositions(game, box, oppPlyr, true);
                danPos = box.piece.killablePositions;
            }
            else {
                // console.log('other piece');
                // positions.push([box.al, box.num]);
                danPos = box.piece.possiblePositions(game, box, oppPlyr, true);
            }
            for (let dBox of danPos) {
                // console.log(dBox)
                for (let i = positions.length - 1; i >= 0; i--) {
                    let pos = positions[i];
                    if (pos[0] == dBox[0] && pos[1] == dBox[1]) {
                        console.log(pos[0], pos[1], box.piece.rank, box.piece.clr)
                        positions.splice(i, 1);
                    }
                }
            }
            // if (abs(currBox.posX - box.posX) <= 1 && abs(currBox.posY - box.posY) <= 1) {
            //     console.log(currBox.posX, box.posX, currBox.posY, box.posY)
            //     positions.push([box.al, box.num]);
            // }
            // positions.push([box.al, box.num]);
        }

    }

}