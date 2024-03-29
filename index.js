import {rows, cols, ctx, reso, pause, canvas} from './src/common.js'
import { countNeighbors, make2d, color, makeUnnecessaryDivInvisible } from './src/functions.js'


let grid = make2d(rows,cols)
let updatedGrid = make2d(rows, cols, true)
let anim
let startNotClicked = true
let pauseNotClicked = true

ctx.strokeStyle = '#989898';

const color0 = document.getElementById('color-0');
const color1 = document.getElementById('color-1');
const color3 = document.getElementById('color-3');
const color4 = document.getElementById('color-4');
const color5 = document.getElementById('color-5');
const color6 = document.getElementById('color-6');
const color7 = document.getElementById('color-7');
const color8 = document.getElementById('color-8');


window.addEventListener('load', () => {
	//grid = new Array()
	grid = make2d(rows, cols)

	drawGrid();
    //anim = setInterval( () => requestAnimationFrame(animateGrid), 1000)
})

// get cursor corrdinate relative to canvas
function getCursorPosition(canvas, event, touch = false) {
    let rect = canvas.getBoundingClientRect()
	let x,y
	if (touch){
		x = event.touches[0].clientX - rect.left
    	y = event.touches[0].clientY - rect.top
	}
	else{
		x = event.clientX - rect.left
    	y = event.clientY - rect.top
	}
    return [x, y];
}

let touched = false;

canvas.addEventListener('touchstart', (e) => {
	touched = true;
    let corrdinate = getCursorPosition(canvas, e, true)
    let x = Math.floor(corrdinate[0]/reso);
    let y = Math.floor(corrdinate[1]/reso)
	// console.log(x)
	// if dead make alive vice-versa
    if (grid[x][y] == 1){
        grid[x][y] = 0;
    }
    else { 
        grid[x][y] = 1;
    }
	drawGrid()	
})

canvas.addEventListener('touchmove', (e) => {
	if (touched) {
    	let corrdinate = getCursorPosition(canvas, e, true)
    	let x = Math.floor(corrdinate[0]/reso);
    	let y = Math.floor(corrdinate[1]/reso)
		// if dead make alive
	    if (grid[x][y] != 1){
        	grid[x][y] = 1;
		}

		drawGrid()
    }	
})

canvas.addEventListener('touchend', (e)=> {
	//prevent mousedown to fire in mobile
	e.preventDefault()
	touched = false
})

let mousePressed = false;

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
	mousePressed = true;

	drawGrid()
})

canvas.addEventListener('mousemove', (e) => {
	if (mousePressed) {
    	let corrdinate = getCursorPosition(canvas, e)
    	let x = Math.floor(corrdinate[0]/reso);
    	let y = Math.floor(corrdinate[1]/reso)
		// if dead make alive
	    if (grid[x][y] != 1){
        	grid[x][y] = 1;
		}

		drawGrid()
    }
	
})

canvas.addEventListener('mouseup', ()=> {
	mousePressed = false
})


// start the animation
start.addEventListener('click', () => {
	if (startNotClicked){
    	anim = setInterval( () => requestAnimationFrame(animateGrid), 1000)
		startNotClicked = false
	}
	pauseNotClicked = true
})

// pause the animation
pause.addEventListener('click', () => {
	if (pauseNotClicked){
		clearInterval(anim);
		// to prevent updated grid generated by animateGrid()
		// from drawing when canvas is clicked
		drawGrid()
		pauseNotClicked = false
	}
	startNotClicked = true;
})

clear.addEventListener('click', () => {
	grid = make2d(rows, cols, true)
	drawGrid();
	clearInterval(anim)
	startNotClicked = true;
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

	updatedGrid = make2d(rows, cols, true);
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


document.getElementById('color-green').addEventListener('click', () =>{
	color1.innerHTML = '#103d10';
	color3.innerHTML = '#2fb62f';
	color4.innerHTML = '#49d049';
	color5.innerHTML = '#71da71';
	color6.innerHTML = '#9ae59a';
	color7.innerHTML = '#c2efc2';
	color8.innerHTML = '#ebfaeb';

	makeUnnecessaryDivInvisible();
});

document.getElementById('color-black').addEventListener('click', () =>{
	color1.innerHTML = 'black';
	color3.innerHTML = 'rgb(128,128,128)';
	color4.innerHTML = 'rgb(169,169,169)';
	color5.innerHTML = 'rgb(192,192,192)';
	color6.innerHTML = 'rgb(211,211,211)';
	color7.innerHTML = 'rgb(220,220,220)';
	color8.innerHTML = 'rgb(245,245,245)';

	makeUnnecessaryDivInvisible();
});

document.getElementById('color-three').addEventListener('click', () =>{
	color1.innerHTML = '#4d2600';
	color3.innerHTML = '#e67300';
	color4.innerHTML = '#ff8c1a';
	color5.innerHTML = '#ffa64d';
	color6.innerHTML = '#ffbf80';
	color7.innerHTML = '#ffd9b3';
	color8.innerHTML = '#fff2e6';

	makeUnnecessaryDivInvisible();
});


document.getElementById('color-four').addEventListener('click', () =>{
	color1.innerHTML = '#004d4d';
	color3.innerHTML = '#00e6e6';
	color4.innerHTML = '#4dffff';
	color5.innerHTML = '#4dffff';
	color6.innerHTML = '#80ffff';
	color7.innerHTML = '#b3ffff';
	color8.innerHTML = '#e6ffff';

	makeUnnecessaryDivInvisible();
});
