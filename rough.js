// let white_names = [['white_rook', 'white_knight', 'white_bishop', 'white_king',
//     'white_queen', 'white_bishop', 'white_knight', 'white_rook'],
// ['white_pawn', 'white_pawn', 'white_pawn', 'white_pawn',
//     'white_pawn', 'white_pawn', 'white_pawn', 'white_pawn']];
// let black_names = [['black_rook', 'black_knight', 'black_bishop', 'black_king',
//     'black_queen', 'black_bishop', 'black_knight', 'black_rook'],
// ['black_pawn', 'black_pawn', 'black_pawn', 'black_pawn',
//     'black_pawn', 'black_pawn', 'black_pawn', 'black_pawn']];
for (let x = -2; x <= 2; x++) {
    if (x == 0) continue;
    for (let y = -2; y <= 2; y++) {
        if (y == 0) continue;
        if(Math.abs(x)!=Math.abs(y))
        console.log(x, y);
    }
}