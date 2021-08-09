const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let w = 800;
let h = 800;
let reso = 40;

canvas.height = h;
canvas.width = w;
canvas.style.border = 'solid red 2px'

let cols = w/reso;
let rows = h/reso;
let grid = make2d(rows, cols);

window.addEventListener('load', () => {
	grid = make2d(rows, cols)
	//requestAnimationFrame(drawGrid);
	setInterval( () => requestAnimationFrame(drawGrid), 1000)
})

function drawGrid(){

	let updatedGrid = make2d(rows, cols, true);
	let state = 0;

	for (let i = 0; i < grid.length; i++){
		for (let j = 0; j < grid[i].length; j++){
			
			// colors
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

			ctx.fillRect(i*reso, j*reso, reso, reso);
			ctx.strokeRect(i*reso, j*reso, reso, reso);

			// if (grid[i][j] > 1){
			// 	state = 0;
			// }
			// else {
			// 	state = grid[i][j];
			// }

			state = grid[i][j]

			let neighbors = countNeighbors(grid, i, j)
			
			if ((state == 0 || state > 1) && neighbors == 3) {
        		updatedGrid[i][j] = 1;
				console.log('j')
      		} 
			else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
				updatedGrid[i][j] = 3;	
      		}
			else {
				//if (state > 1)
				if (state > 1) state++;
        		updatedGrid[i][j] = state
			}
		}
	}
	grid = updatedGrid;
}

function make2d(rows, cols, zero = false){
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

function countNeighbors(grid, x, y) {
  let sum = 0;
  let s = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {

        let row = x + i;
        let col = y + j;

	    if (row < 0 || row > rows-1 || col < 0 || col > cols - 1 || grid[row][col] > 1 ){
            s = 0;
        }
	    else s = grid[row][col]
        sum += s;
    }
  }
  if (grid[x][y] > 1) s = 0;
  else s = grid[x][y]

  sum -= s;
  return sum;
}
