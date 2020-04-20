class Piece {
    constructor(img) {
        this.img = img;
        this.notMoved = true;
        this.killablePositions = [];
    }
    setDims(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }
    show() {
        // Displays the image of the piece at given position
        image(this.img, this.x, this.y, this.size, this.size);
    }
    isPossible(box, currPlyr) {
        // console.log(currPlyr);
        // if (box.piece != undefined) console.log(box.piece)
        // if (!box) return false;
        // if(box.isEmpty())return true;
        // else if()
        return (box.isEmpty() || this.isKillable(box, currPlyr));
    }
    isKillable(box, currPlyr) {
        // console.log(box, currPlyr);
        if (box.piece != undefined)
            // console.log(box.piece);
            return (box.piece.clr !== currPlyr);
    }
    // possiblePositions(){}
    test(ppx, ppy) {
        return (0 <= ppx && ppx <= 7 && 0 <= ppy && ppy <= 7)
    }

    inKingsGrasp(currPlyr, box) {
        console.log('king grasp')
        let oClr = currPlyr == 'white' ? 'black' : 'white'
        let oKing = game.getPlayer(oClr).getBoxByRank('king')
        console.log(oKing)
        let [px, py] = [oKing.posX, oKing.posY];
        let [ppx, ppy] = [box.posX, box.posY];
        if (abs(px - ppx) <= 1 && abs(py - ppy) <= 1) {
            this.killablePositions.push([box.al, box.num])
        }
    }
}