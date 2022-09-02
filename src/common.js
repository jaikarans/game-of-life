export const canvas = document.getElementById('canvas');
export const start = document.getElementById('start');
export const ctx = canvas.getContext('2d')
export const pause = document.getElementById('pause')

export let w = 6000;
export let h = 6000;
export let reso = 30;


canvas.height = h;
canvas.width = w;
canvas.style.border = 'solid red 2px'

export let cols = w/reso;
export let rows = h/reso;
