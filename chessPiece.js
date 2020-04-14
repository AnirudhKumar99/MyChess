function lookAt(x, y, piece) {
    // console.log(x, y);
    // for (let piece of pieces) {
    //     if (piece.posX == x && piece.posY == y) {
    //         return false;
    //     }
    // }
    for (let pos of piece.possiblePositions) {
        if (x === pos[0] && y === pos[1]) {
            return true;
        }
    }
    return false;
}
// function posiInArr()
function liveOrDead(color) {
    if (color !== 'both') {
        for (let piece of pieces) {
            if (piece.pieceColor === color)
                piece.alive = true;
            else
                piece.alive = false;
        }
    }
}
function inThisArray(arr, ele) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][0] == ele[0] && arr[i][1] == ele[1]) {
            return true;
        }
    }
    return false;
}
function indexInThisArray(arr, ele) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][0] == ele[0] && arr[i][1] == ele[1]) {
            return i;
        }
    }
    return -1;
}
function indexInPieces(piece) {
    for (let p in pieces) {
        if (pieces[p].posX == piece.posX && pieces[p].posY == piece.posY) {
            return (p);
        }
    }
}
function pieceAt(x, y) {
    for (let piece of pieces) {
        if (piece.posX == x && piece.posY == y) {
            return piece;
        }
    }
}
function getKing(color) {
    for (let piece of pieces) {
        if (piece.piecePower === 'king' && piece.pieceColor !== color) {
            return piece;
        }
    }
}
function remDupes(arr) {
    let temp = arr;
    for (let i = 0; i < arr.length; i++) {
        for (let j = temp.length - 1; j >= 0; j--) {
            // console.log(arr[i],temp[j])
            if (arr[i][0] == temp[j][0] && arr[i][1] == temp[j][1] && i !== j) {
                temp.splice(j, 1);
            }
        }
    }
    return temp;
}
function checkChange(prev,pres){
    console.log('checking change');
    if (prev.length!==pres.length){
        console.log('Not equal');
        return true;
    }
    else{
        console.log('Equal');
        // console.log(prev,pres);
        for(let i=0;i<prev.length;i++){
            // console.log(prev[i].x,pres[i].x, prev[i].y,pres[i].y);
            console.log(prev[i][0],pres[i][0],prev[i][1],pres[i][1])
            if (prev[i][0]!==pres[i][0] || prev[i][1]!==pres[i][1]){
                return true;
            }
        }
        return false;
    }
}
function objToPos(pieces){
    let arr=[];
    for(let piece of pieces){
        arr.push([piece.x,piece.y]);
    }
    return arr;
}
class Piece {
    constructor(x, y, image, pieceName) {
        this.x = x;
        this.y = y;
        this.posX = int(x / boxSize);
        this.posY = int(y / boxSize);
        this.image = image;
        this.pieceName = pieceName;
        let name = pieceName.split('_');
        this.pieceColor = name[0];
        this.piecePower = name[1];
        this.floating = false;
        this.possiblePositions = [];
        this.KIngllingPositions = [];
        this.alive = true;
        if (this.piecePower === 'king') {
            this.oppositionPositions = [];
        }

    }
    show() {
        // console.log('here')
        // this.possiPos();
        imageMode(CENTER);
        // imageBackground(255,0,0);
        image(this.image, this.x, this.y, boxSize, boxSize);
    }
    update() {
        if (this.alive) {// this.possiPos();
            let mX = int(mouseX / boxSize);
            let mY = int(mouseY / boxSize);
            // console.log(mX,mY);
            // console.log(this.posX,this.posY);
            if (this.posX === mX && this.posY === mY && !pieceinhand) {
                // console.log(this.pieceName + ' floating');
                // pieceAt(mX,mY).possiPos();
                // this.possiPos();
                if (!this.floating) { 
                    previousPieces=[...presentPieces];
                    console.log(previousPieces);
                    this.y -= 20;
                    this.possiPos();
                    coloredPositions = this.possiblePositions;
                    this.floating = true;
                    console.log(this.pieceName+' lifted up');
                }
                // else {
                //     this.floating = false;
                //     this.y += 20;
                //     console.log('Here');
                    // presentPieces=pieces;
                    // if(checkChange(previousPieces,presentPieces)){
                    //     console.log('Changed');
                    //     if(currentPieceColor=='white'){
                    //         currentPieceColor='black';
                    //     }else if (currentPieceColor=='black'){
                    //         currentPieceColor='white';
                    //     }
                    //     liveOrDead(currentPieceColor);
                    // }
                //     // console.log(this.pieceName+' placed down');
                // }
            }
            // else if ((this.posX !== mX || this.posY !== mY) && this.floating) {
            else if (this.floating) {
                // console.log('here3')
                let possible = lookAt(mX, mY, this);
                if (possible) {
                    if (pieceAt(mX, mY) !== undefined &&
                        pieceAt(mX, mY).pieceColor != this.pieceColor) {
                        pieces.splice(indexInPieces(pieceAt(mX, mY)), 1);
                    }
                    this.x = (mX + 0.5) * boxSize;
                    this.y = (mY + 0.5) * boxSize;
                    this.posX = mX;
                    this.posY = mY;
                    this.possiPos();
                    coloredPositions = [];
                    this.floating = false;
                    console.log(this.pieceName+' placed down');
                    presentPieces=objToPos(pieces);
                    console.log(presentPieces);
                    console.log(checkChange(previousPieces,presentPieces));
                    if(checkChange(previousPieces,presentPieces)){
                        console.log('Changed');
                        if(currentPieceColor=='white'){
                            currentPieceColor='black';
                        }else if (currentPieceColor=='black'){
                            currentPieceColor='white';
                        }
                        liveOrDead(currentPieceColor);
                    }

                    if (this.pieceName === 'white_pawn' && this.posY == 7) {
                        let power = prompt('Enter which piece   rook   knight   bishop   queen');
                        console.log('white' + power, typeof ('white' + power));
                        // pieces.push(new Piece(this.x, this.y,
                        //     getImageByName('white_' + power), 'white' + power));
                        // pieces.pop(this);
                        this.pieceName = 'white_' + power;
                        this.piecePower = power;
                        this.image = getImageByName('white_' + power);

                    } else if (this.pieceName === 'black_pawn' && this.posY == 0) {
                        let power = prompt('Enter which piece   rook   knight   bishop   queen');
                        // pieces.push(new Piece(this.x, this.y,
                        //     getImageByName('black_' + power), 'black_' + power));
                        // pieces.pop(this);
                        this.pieceName = 'black_' + power;
                        this.piecePower = power;
                        this.image = getImageByName('black_' + power);
                    }
                }
            }
        }
    }
    possiPos() {
        // console.log('possiPos for ', this.pieceName);
        // console.log(this);
        this.possiblePositions = [];
        this.possiblePositions.push([this.posX, this.posY]);
        // let tempx = this.posX;
        // let tempy = this.posY;
        switch (this.piecePower) {
            case 'pawn':
                // console.log('pawn');
                if (this.pieceColor === 'white') {
                    this.KIngllingPositions.push([this.posX + 1, this.posY + 1]);
                    this.KIngllingPositions.push([this.posX - 1, this.posY + 1]);
                    // console.log('white');
                    if (pieceAt(this.posX, this.posY + 1) === undefined) {
                        this.possiblePositions.push([this.posX, this.posY + 1])

                        if (this.posY === 1) {
                            if (pieceAt(this.posX, 3) === undefined) {
                                this.possiblePositions.push([this.posX, 3])
                            }
                        }
                    }
                    // else {
                    if (
                        pieceAt(this.posX + 1, this.posY + 1) !== undefined &&
                        pieceAt(this.posX + 1, this.posY + 1).pieceColor === 'black') {
                        this.possiblePositions.push([this.posX + 1, this.posY + 1]);
                    }
                    if (
                        pieceAt(this.posX - 1, this.posY + 1) !== undefined &&
                        pieceAt(this.posX - 1, this.posY + 1).pieceColor === 'black') {
                        this.possiblePositions.push([this.posX - 1, this.posY + 1]);
                    }
                    // if (this.posY == 7) {
                    //     // alert('end');
                    //     let power = prompt('Enter which piece   rook   knight   bishop   queen');
                    //     pieces.pop(this);
                    //     pieces.push(new Piece(this.x, this.y,
                    //         getImageByName('white_' + power), 'white_' + power))
                    // }
                    // }
                } else if (this.pieceColor === 'black') {
                    this.KIngllingPositions.push([this.posX + 1, this.posY - 1]);
                    this.KIngllingPositions.push([this.posX - 1, this.posY - 1]);
                    // console.log('white');
                    if (pieceAt(this.posX, this.posY - 1) === undefined) {
                        this.possiblePositions.push([this.posX, this.posY - 1])

                        if (this.posY === 6) {
                            if (pieceAt(this.posX, 4) === undefined) {
                                this.possiblePositions.push([this.posX, 4])
                            }
                        }
                    }
                    // else {
                    if (pieceAt(this.posX + 1, this.posY - 1) !== undefined &&
                        pieceAt(this.posX + 1, this.posY - 1).pieceColor === 'white') {
                        this.possiblePositions.push([this.posX + 1, this.posY - 1]);
                    }
                    if (pieceAt(this.posX - 1, this.posY - 1) !== undefined &&
                        pieceAt(this.posX - 1, this.posY - 1).pieceColor === 'white') {
                        this.possiblePositions.push([this.posX - 1, this.posY - 1]);
                    }
                    // if (this.posY == 0) {
                    //     // alert('end');
                    //     let power = prompt('Enter which piece   rook   knight   bishop   queen');
                    //     pieces.pop(this);
                    //     pieces.push(new Piece(this.x, this.y,
                    //         getImageByName('black_' + power), 'black_' + power))
                    // }
                    // }
                }
                king = getKing(this.pieceColor);
                // console.log(king.possiblePositions);
                let pawnTemp = this.KIngllingPositions;
                this.KIngllingPositions = [];
                for (let pos of king.possiblePositions) {
                    if (inThisArray(pawnTemp, pos)) {
                        this.KIngllingPositions.push(pos);
                    }
                }
                break;
            case 'rook':
                for (let p = this.posX + 1; p < 8; p++) {
                    if (pieceAt(p, this.posY) === undefined) {
                        this.possiblePositions.push([p, this.posY]);
                    }
                    else if (pieceAt(p, this.posY).pieceColor !== this.pieceColor) {
                        this.possiblePositions.push([p, this.posY]); break;
                    }
                    else
                        break;
                } for (let p = this.posX - 1; p >= 0; p--) {
                    if (pieceAt(p, this.posY) === undefined) {
                        this.possiblePositions.push([p, this.posY]);
                    }
                    else if (pieceAt(p, this.posY).pieceColor !== this.pieceColor) {
                        this.possiblePositions.push([p, this.posY]); break;
                    }
                    else
                        break;
                } for (let p = this.posY + 1; p < 8; p++) {
                    if (pieceAt(this.posX, p) === undefined) {
                        this.possiblePositions.push([this.posX, p]);
                    }
                    else if (pieceAt(this.posX, p).pieceColor !== this.pieceColor) {
                        this.possiblePositions.push([this.posX, p]); break;
                    }
                    else
                        break;
                } for (let p = this.posY - 1; p >= 0; p--) {
                    if (pieceAt(this.posX, p) === undefined) {
                        this.possiblePositions.push([this.posX, p]);
                    }
                    else if (pieceAt(this.posX, p).pieceColor !== this.pieceColor) {
                        this.possiblePositions.push([this.posX, p]); break;
                    }
                    else
                        break;
                }
                king = getKing(this.pieceColor);
                // console.log(king.possiblePositions);
                for (let pos of king.possiblePositions) {
                    if (inThisArray(this.possiblePositions, pos)) {
                        this.KIngllingPositions.push(pos);
                    }
                }
                break;
            case 'bishop':
                for (let px = this.posX + 1, py = this.posY - 1; (px < 8 && py >= 0); px++ , py--) {
                    if (pieceAt(px, py) === undefined) {
                        this.possiblePositions.push([px, py]);
                    }
                    else if (pieceAt(px, py).pieceColor !== this.pieceColor) {
                        this.possiblePositions.push([px, py]); break;
                    }
                    else
                        break;
                }
                for (let px = this.posX - 1, py = this.posY - 1; (px > 0 && py >= 0); px-- , py--) {
                    if (pieceAt(px, py) === undefined) {
                        this.possiblePositions.push([px, py]);
                    }
                    else if (pieceAt(px, py).pieceColor !== this.pieceColor) {
                        this.possiblePositions.push([px, py]); break;
                    }
                    else
                        break;
                }
                for (let px = this.posX - 1, py = this.posY + 1; (px >= 0 && py < 8); px-- , py++) {
                    if (pieceAt(px, py) === undefined) {
                        this.possiblePositions.push([px, py]);
                    }
                    else if (pieceAt(px, py).pieceColor !== this.pieceColor) {
                        this.possiblePositions.push([px, py]); break;
                    }
                    else
                        break;
                }
                for (let px = this.posX + 1, py = this.posY + 1; (px < 8 && py < 8); px++ , py++) {
                    if (pieceAt(px, py) === undefined) {
                        this.possiblePositions.push([px, py]);
                    }
                    else if (pieceAt(px, py).pieceColor !== this.pieceColor) {
                        this.possiblePositions.push([px, py]); break;
                    }
                    else
                        break;
                }
                king = getKing(this.pieceColor);
                for (let pos of king.possiblePositions) {
                    if (inThisArray(this.possiblePositions, pos)) {
                        this.KIngllingPositions.push(pos);
                    }
                }
                break;
            case 'knight':
                let px, py;
                // let pos = [];
                for (let x = -2; x <= 2; x++) {
                    if (x == 0) continue;
                    for (let y = -2; y <= 2; y++) {
                        if (y == 0) continue;
                        if (Math.abs(x) != Math.abs(y)) {
                            // console.log(x, y);
                            px = this.posX + x;
                            py = this.posY + y;
                        }
                        if (pieceAt(px, py) === undefined) {
                            this.possiblePositions.push([px, py]);
                        }
                        else if (pieceAt(px, py).pieceColor !== this.pieceColor) {
                            this.possiblePositions.push([px, py]);
                        }
                    }
                }
                king = getKing(this.pieceColor);
                for (let pos of king.possiblePositions) {
                    if (inThisArray(this.possiblePositions, pos)) {
                        this.KIngllingPositions.push(pos);
                    }
                }
                break;
            case 'queen':
                for (let p = this.posX + 1; p < 8; p++) {
                    if (pieceAt(p, this.posY) === undefined) {
                        this.possiblePositions.push([p, this.posY]);
                    }
                    else if (pieceAt(p, this.posY).pieceColor !== this.pieceColor) {
                        this.possiblePositions.push([p, this.posY]); break;
                    }
                    else
                        break;
                } for (let p = this.posX - 1; p >= 0; p--) {
                    if (pieceAt(p, this.posY) === undefined) {
                        this.possiblePositions.push([p, this.posY]);
                    }
                    else if (pieceAt(p, this.posY).pieceColor !== this.pieceColor) {
                        this.possiblePositions.push([p, this.posY]); break;
                    }
                    else
                        break;
                } for (let p = this.posY + 1; p < 8; p++) {
                    if (pieceAt(this.posX, p) === undefined) {
                        this.possiblePositions.push([this.posX, p]);
                    }
                    else if (pieceAt(this.posX, p).pieceColor !== this.pieceColor) {
                        this.possiblePositions.push([this.posX, p]); break;
                    }
                    else
                        break;
                } for (let p = this.posY - 1; p >= 0; p--) {
                    if (pieceAt(this.posX, p) === undefined) {
                        this.possiblePositions.push([this.posX, p]);
                    }
                    else if (pieceAt(this.posX, p).pieceColor !== this.pieceColor) {
                        this.possiblePositions.push([this.posX, p]); break;
                    }
                    else
                        break;
                }
                for (let px = this.posX + 1, py = this.posY - 1; (px < 8 && py >= 0); px++ , py--) {
                    if (pieceAt(px, py) === undefined) {
                        this.possiblePositions.push([px, py]);
                    }
                    else if (pieceAt(px, py).pieceColor !== this.pieceColor) {
                        this.possiblePositions.push([px, py]); break;
                    }
                    else
                        break;
                }
                for (let px = this.posX - 1, py = this.posY - 1; (px >= 0 && py >= 0); px-- , py--) {
                    if (pieceAt(px, py) === undefined) {
                        this.possiblePositions.push([px, py]);
                    }
                    else if (pieceAt(px, py).pieceColor !== this.pieceColor) {
                        this.possiblePositions.push([px, py]); break;
                    }
                    else
                        break;
                }
                for (let px = this.posX - 1, py = this.posY + 1; (px >= 0 && py < 8); px-- , py++) {
                    if (pieceAt(px, py) === undefined) {
                        this.possiblePositions.push([px, py]);
                    }
                    else if (pieceAt(px, py).pieceColor !== this.pieceColor) {
                        this.possiblePositions.push([px, py]); break;
                    }
                    else
                        break;
                }
                for (let px = this.posX + 1, py = this.posY + 1; (px < 8 && py < 8); px++ , py++) {
                    if (pieceAt(px, py) === undefined) {
                        this.possiblePositions.push([px, py]);
                    }
                    else if (pieceAt(px, py).pieceColor !== this.pieceColor) {
                        this.possiblePositions.push([px, py]); break;
                    }
                    else
                        break;
                }
                king = getKing(this.pieceColor);
                for (let pos of king.possiblePositions) {
                    if (inThisArray(this.possiblePositions, pos)) {
                        this.KIngllingPositions.push(pos);
                    }
                }
                break;
            case 'king':
                for (let px = -1; px <= 1; px++) {
                    for (let py = -1; py <= 1; py++) {
                        let ppx = this.posX + px;
                        let ppy = this.posY + py;
                        if (pieceAt(ppx, ppy) === undefined) {
                            this.possiblePositions.push([ppx, ppy]);
                        }
                        else if (pieceAt(ppx, ppy).pieceColor !== this.pieceColor) {
                            this.possiblePositions.push([ppx, ppy]); break;
                        }
                    }
                }
                this.oppositionPositions = [];
                for (let piece of pieces) {
                    // if (piece.piecePower==='king'){
                    //     continue
                    // }
                    // see below if lost
                    if (piece.pieceColor !== this.pieceColor) {
                        if (piece.piecePower !== 'king') {
                            piece.possiPos();  
                            if (piece.KIngllingPositions.length>0){
                            console.log(piece.pieceName,piece.posX,piece.posY);
                            console.log(piece.posX,piece.posY);}
                        }
                        else{
                            piece.KIngllingPositions=piece.possiblePositions;
                        }
                        piece.KIngllingPositions = remDupes(piece.KIngllingPositions);
                            // console.log(piece.KIngllingPositions);

                            for (let pos of piece.KIngllingPositions) {
                                this.oppositionPositions.push(pos);
                            }

                    }
                    // console.log(this.oppositionPositions);
                }
                // console.log(pieces);
                this.oppositionPositions = remDupes(this.oppositionPositions);
                console.log(this.oppositionPositions);
                // for (let posi in this.possiblePositions) {
                for (let posi = this.possiblePositions.length - 1; posi >= 0; posi--) {
                    // console.log(this.possiblePositions[posi]);
                    // console.log(inThisArray(this.oppositionPositions, this.possiblePositions[posi]))
                    if (inThisArray(this.oppositionPositions, this.possiblePositions[posi])) {
                        console.log(this.possiblePositions[posi])
                        this.possiblePositions.splice(posi, 1);
                    }
                }
                console.log(this.possiblePositions);

                break;
            default:
                break;
            // default:
            // console.log('here');
            // break;

        }
    }
}






// if (piece.pieceColor !== this.pieceColor) {
//     if (piece.piecePower !== 'king') {
//         // console.log(piece.pieceName,piece.posX,piece.posY);
//         // console.log(piece.posX,piece.posY);
//         piece.possiPos();
//         // console.log(piece.KIngllingPositions);
//         /*This takes pawns as a special case;
//         if (piece.piecePower === 'pawn') {
//             // console.log(piece.KIngllingPositions)
//             // console.log(piece.pieceName +' here')
//             for (let pos of piece.KIngllingPositions) {
//                 this.oppositionPositions.push(pos);
//             }
//         } else {
//             for (let pos of piece.possiblePositions) {
//                 this.oppositionPositions.push(pos);
//             }
//         }*/
//         // this.oppositionPositions.concat(piece.possiblePositions);
//         //This is a new case for all pieces
//         piece.KIngllingPositions = remDupes(piece.KIngllingPositions);
//         // console.log(piece.KIngllingPositions);

//         for (let pos of piece.KIngllingPositions) {
//             this.oppositionPositions.push(pos);
//         }
//     }
//     // This part is tricky
//     // pawns and kings are killing me

//     /*
//     if (piece.pieceName==='black_pawn' && piece.posY==6){
//         let index=indexInThisArray(this.oppositionPositions,[piece.posX,4]);
//         if(index!=-1){
//             this.oppositionPositions.splice(index,1);
//         }
//     }
//     if (piece.pieceName==='white_pawn' && piece.posY==6){
//         let index=indexInThisArray(this.oppositionPositions,[piece.posX,3]);
//         if(index!=-1){
//             this.oppositionPositions.splice(index,1);
//         }
//     }*/
//     // Really tricky


//     // else {
//     //     // console.log(piece);
//     //     this.oppositionPositions.concat(piece.possiblePositions);
//     // }
//     // console.log(piece);
//     // console.log(this.oppositionPositions);
// }





/*
working piece (it works)
if (piece.pieceColor !== this.pieceColor) {
                        if (piece.piecePower !== 'king') {
                            // console.log(piece.pieceName,piece.posX,piece.posY);
                            // console.log(piece.posX,piece.posY);
                            piece.possiPos();
                            piece.KIngllingPositions = remDupes(piece.KIngllingPositions);
                            // console.log(piece.KIngllingPositions);

                            for (let pos of piece.KIngllingPositions) {
                                this.oppositionPositions.push(pos);
                            }
                        }
                    }
*/