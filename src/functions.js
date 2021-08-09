import { rows, cols, ctx} from "./common.js";

// count live box around box
export function countNeighbors(grid, x, y) {
    let sum = 0;
    let s = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let row = x + i;
            let col = y + j;
            // if coordinates are out of grid or have values for color
            if (row < 0 || row > rows-1 || col < 0 || col > cols - 1 || grid[row][col] > 1 ){
                s = 0;
            }
            else s = grid[row][col]
            sum += s;
      }
    }

    //remove self count
    if (grid[x][y] > 1) s = 0;
    else s = grid[x][y]
    sum -= s;
    return sum;
}

// make a 2d Array of all element zero or
// all element contains random values of 0 and 1
export function make2d(rows, cols, zero = false){
	let arr = new Array(rows);
	for (let i=0; i<rows; i++){
		arr[i] = new Array(cols)
		for (let j=0; j<cols; j++){
			if (zero) arr[i][j] = 0;
			else
				arr[i][j] = Math.floor(Math.random() * 2);
		}
	}
	return arr;
}

// set different colors for different box
// to show see the the previous alive box
// grid containg vale greater then 1 is for colors
export function color (grid, i, j){
  if(grid[i][j] == 1){
    ctx.fillStyle = 'black'
  }
  else if (grid[i][j] == 3) {
    ctx.fillStyle = `rgb(
      128,
      128,
      128
      )`	
  }
  else if (grid[i][j] == 4) {
    ctx.fillStyle = `rgb(
      169,
      169,
      169
      )`
  }
  else if(grid[i][j] == 5){
    ctx.fillStyle = `rgb(
      192,
      192,
      192
    )`
  }
  else if (grid[i][j] == 6) {
    ctx.fillStyle = `rgb(
      211,
      211,
      211
      )`	
  }
  else if (grid[i][j] == 7) {
    ctx.fillStyle = `rgb(
      220,
      220,
      220
      )`	
  }
  else if (grid[i][j] == 8) {
    ctx.fillStyle = `rgb(
      245,
      245,
      245
      )`	
  }
  else{ 
    ctx.fillStyle = 'white'
  }
}