import { addRule, createParticlesGroup, rules } from './aiEngine';

export let isPause = false;

const colorInput = document.getElementById('color_input');
const numberInput = document.getElementById('number_input');
const addBtn = document.getElementById('add');
const groupsCont = document.getElementById('groups');
const rulesCont = document.getElementById('rules');
const pauseBtn = document.getElementById('pause');
const randomBtn = document.getElementById('random');

let color = '';
let number = 0;
const groups = [];

export const setValues = () => {
  color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  colorInput.value = color;
  number = Math.floor(Math.random() * 600);
  numberInput.value = number;
};

colorInput.addEventListener('input', (e) => {
  color = e.target.value;
});

numberInput.addEventListener('input', (e) => {
  number = e.target.value;
  if (e.target.value > 1000) {
    number = 1000;
    numberInput.value = 1000;
  }
  if (e.target.value < 0) {
    number = 0;
    numberInput.value = 0;
  }
});

addBtn.addEventListener('click', () => {
  const group = createParticlesGroup(number, color, 5, groups.length);
  groups.push(group);
  setValues();
  groupsCont.innerHTML = '';
  groups.forEach((el) => {
    groupsCont.innerHTML += `
      <div class="group" style="background: ${el.particles[0].color}">
        <label style="color: ${el.particles[0].color}">${el.particles.length}</label>
      </div>
      `;
    addRule(group, el, Math.random() * (2 + 2) - 2);
    if (group.name !== el.name) {
      addRule(el, group, Math.random() * (2 + 2) - 2);
    }
  });
  rulesCont.innerHTML = '';
  rules.forEach((el) => {
    rulesCont.innerHTML += `
      <div>
        <div class="rules_info"> 
          <div class="rules_object" style="background:${el.from.particles[0].color}"></div>
          <label class="rules_display">${Math.round(el.g * 1000) / 1000}</label>
          <div class="rules_object" style="background:${el.to.particles[0].color}"></div>
        </div>
        <input
          class="g_input"
          type="range"
          min="-2"
          max="2"
          value="${el.g}"
          step="0.001"
        />
      </div>`;
  });
  const rulesSetup = document.getElementsByClassName('g_input');
  const rulesDisplay = document.getElementsByClassName('rules_display');
  for (let i = 0; i < rulesSetup.length; i++) {
    rulesSetup[i].addEventListener('input', (e) => {
      rules[i].g = e.target.value;
      rulesDisplay[i].innerHTML = Math.round(rules[i].g * 1000) / 1000;
    });
  }
});

pauseBtn.addEventListener('click', () => {
  isPause = !isPause;
  pauseBtn.innerHTML = isPause ? 'Continue' : 'Pause';
});

randomBtn.addEventListener('click', () => {
  const rulesDisplay = document.getElementsByClassName('rules_display');
  const rulesSetup = document.getElementsByClassName('g_input');
  rules.forEach((el, id) => {
    el.g = Math.random() * (2 + 2) - 2;
    rulesDisplay[id].innerHTML = Math.round(el.g * 1000) / 1000;
    rulesSetup[id].value = el.g;
  })
})