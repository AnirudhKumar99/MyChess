class Box {
    constructor(x, y, posX, posY, al, num, size, color) {
        this.color = color;
        this.defcolor = color;
        this.size = size;
        this.x = x;
        this.y = y;
        this.al = al;//alphabet on chess board
        this.num = num;//number on chess board
        this.posX = posX;
        this.posY = posY;
        this.piece = undefined;
    }
    setClr(clr) {
        this.color = clr;
    }
    setDfltClr() {
        this.color = this.defcolor;
    }
    show() {
        // Draws a rectangle at the x and y position
        push();
        rectMode(CENTER);
        fill(this.color);
        rect(this.x, this.y, this.size, this.size, this.size / 10);
        this.showAlNum();
        // this.showPos();
        pop();
        this.showPiece();
    }
    isEmpty() {
        return (this.piece == null);
    }
    showPos() {
        textAlign(CENTER, CENTER);
        stroke(255);
        text(`${this.posX},${this.posY}`, this.x, this.y);
    }
    showAlNum() {
        textAlign(CENTER, CENTER);
        stroke(255);
        text(`${this.al},${this.num}`, this.x, this.y);
    }
    setPiece(piece) {
        // console.log(piece)
        this.piece = piece;
    }
    showPiece() {
        // Displays image subjected to the box if it exists
        let pce = this.piece;
        // console.log(pce)
        if (pce != null) {
            push();
            imageMode(CENTER);
            image(pce.img, this.x, this.y, this.size, this.size)
            pop();
        }
    }
}