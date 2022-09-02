import { rows, cols, ctx} from "./common.js";

const color0 = document.getElementById('color-0');
const color1 = document.getElementById('color-1');
const color3 = document.getElementById('color-3');
const color4 = document.getElementById('color-4');
const color5 = document.getElementById('color-5');
const color6 = document.getElementById('color-6');
const color7 = document.getElementById('color-7');
const color8 = document.getElementById('color-8');

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
    ctx.fillStyle = color1.innerHTML;
  }
  else if (grid[i][j] == 3) {
    ctx.fillStyle = color3.innerHTML;
  }
  else if (grid[i][j] == 4) {
    ctx.fillStyle = color4.innerHTML;
  }
  else if(grid[i][j] == 5){
    ctx.fillStyle = color5.innerHTML;
  }
  else if (grid[i][j] == 6) {
    ctx.fillStyle = color6.innerHTML;
  }
  else if (grid[i][j] == 7) {
    ctx.fillStyle = color7.innerHTML;
  }
  else if (grid[i][j] == 8) {
    ctx.fillStyle = color8.innerHTML;
  }
  else{ 
    ctx.fillStyle = 'white'
  }
}


export function makeUnnecessaryDivInvisible() {
  color0.style = 'display: none';
  color1.style = 'display: none';
  color3.style = 'display: none';
  color4.style = 'display: none';
  color5.style = 'display: none';
  color6.style = 'display: none';
  color7.style = 'display: none';
  color8.style = 'display: none';
  
}