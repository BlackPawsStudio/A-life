// import { addRule, createParticlesGroup, update } from './aiEngine';
import { setValues } from './addPanel';
import { update } from './aiEngine';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

window.onload = () => {
  if (window.innerHeight > window.innerWidth) {
    canvas.width = window.innerWidth - 10;
    canvas.height = window.innerWidth - 10;
  } else {
    canvas.width = window.innerHeight - 10;
    canvas.height = window.innerHeight - 10;
  }
  document.body.height = window.innerHeight;
  setValues();
  update();
};
