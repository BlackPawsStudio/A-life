import { addRule, createParticlesGroup, rules } from './aiEngine';

const colorInput = document.getElementById('color_input');
const numberInput = document.getElementById('number_input');
const addBtn = document.getElementById('add');
const groupsCont = document.getElementById('groups');
const rulesCont = document.getElementById('rules');

let color = '';
let number = 0;
const groups = [];

export const setValues = () => {
  color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  colorInput.value = color;
  number = Math.floor(Math.random() * 1000);
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
  // console.log(particles)
  groupsCont.innerHTML = '';
  groups.forEach((el) => {
    groupsCont.innerHTML += `
      <div class="group" style="background: ${el.particles[0].color}">
        <label style="color: ${el.particles[0].color}">${el.name} ${el.particles.length}</label>
      </div>
      `;
    addRule(group, el, 0);
    if (group.name !== el.name) {
      addRule(el, group, 0)
    }
  });
  rulesCont.innerHTML = '';
  rules.forEach(el => {
    rulesCont.innerHTML += `
      <div>
        <label>${el.from.name}</label>
        <input
          class="g_input"
          type="range"
          min="-2"
          max="2"
          value="0"
          step="0.001"
        />
        <label>${el.to.name}</label>
      </div>`;
  });
  const rulesSetup = document.getElementsByClassName('g_input');
  for (let i = 0; i < rulesSetup.length; i++) {
    rulesSetup[i].addEventListener('input', (e) => {
      rules[i].g = e.target.value;
    })
  }
});

// gInput.addEventListener('input', (e) => {
//   g = e.target.value;
//   gDisplay.innerHTML = g;
// });

// const changeSelects = () => {
//   selectFrom.innerHTML = '';
//   selectTo.innerHTML = '';
//   groups.forEach((el, id) => {
//     selectFrom.innerHTML += `
//     <option value="${id}">${el.name}</option>`;
//     selectTo.innerHTML += `
//     <option value="${id}">${el.name}</option>`;
//   });
// };

// ruleBtn.addEventListener('click', () => {
//   const from = groups[selectFrom.value];
//   const to = groups[selectTo.value];
//   addRule(from, to, g);
//   rulesCont.innerHTML = '';
//
// });
