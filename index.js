import {rows, cols, ctx, reso} from './src/common.js'
import { countNeighbors, make2d, color } from './src/functions.js'


let grid = make2d(rows,cols)
let anim

window.addEventListener('load', () => {
	//grid = new Array()
	grid = make2d(rows, cols)

	drawGrid();
    //anim = setInterval( () => requestAnimationFrame(animateGrid), 1000)
})

// get cursor corrdinate relative to canvas
function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    return [x, y];
}


// manualy fill or empty grid box
canvas.addEventListener('mousedown', (e) => {
    let corrdinate = getCursorPosition(canvas, e)
    let x = Math.floor(corrdinate[0]/reso);
    let y = Math.floor(corrdinate[1]/reso)
	// if dead make alive vice-versa
    if (grid[x][y] == 1){
        grid[x][y] = 0;
    }
    else { 
        grid[x][y] = 1;
    }

    drawGrid()
})

// start the animation
start.addEventListener('click', () => {
    anim = setInterval( () => requestAnimationFrame(animateGrid), 1000)
})

// pause the animation
pause.addEventListener('click', () => {
	clearInterval(anim);
	// to prevent updated grid generated by animateGrid()
	// from drawing when canvas is clicked
	drawGrid()
    
})

// draw grid while manualy filling the grid box
function drawGrid() {
    for (let i = 0; i < grid.length; i++){
		for (let j = 0; j < grid[i].length; j++){
			color(grid, i, j);
			ctx.fillRect(i*reso, j*reso, reso, reso);
			ctx.strokeRect(i*reso, j*reso, reso, reso);
        }
    }
}

function animateGrid (){

	let updatedGrid = make2d(rows, cols, true);
	let state = 0;

	for (let i = 0; i < grid.length; i++){
		for (let j = 0; j < grid[i].length; j++){

			// draw current grid
			color(grid, i, j)
			ctx.fillRect(i*reso, j*reso, reso, reso);
			ctx.strokeRect(i*reso, j*reso, reso, reso);

			// store and update grid to new-array
			state = grid[i][j]
			let neighbors = countNeighbors(grid, i, j)
			if ((state == 0 || state > 1) && neighbors == 3) {
        		updatedGrid[i][j] = 1;
      		} 
			else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
				updatedGrid[i][j] = 3;	
      		}
			else {
				// stored increased value for set color
				// of more-previous alive box
				if (state > 1) state++;
        		updatedGrid[i][j] = state
			}
		}
	}
	// for draw new grid
	grid = updatedGrid;
}

