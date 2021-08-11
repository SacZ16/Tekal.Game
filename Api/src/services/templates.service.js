

import videosURL from '../../assets/videosurl'; //videos que sacamos del csv
// Selecciona un template al azar

var random = Math.round(Math.random() * 999)
// const template = require(`../assets/level_templates/template_${random}.json`)[2];

const template = require('../assets/level_templates/prueba.json');
const templateFill = template[2];
// Sacamos los videos unicos

// const filler = template[0] && template.filter(e => e[1] === 'filler')
// const vig = template[0] && template.filter(e => e[1] === 'vig')
// const target = templateFill[0] && templateFill.filter(e => e[1] === 'target')

// const totalVideos = filler.length + vig.length + target.length // videos que nos tienen que mandar

const videos= template[0] + template[1];

// 

const arrVideos = videosURL.map((e, i) => Object.create({}, {
  id: { value: i },
  url: { value: e },
//   padre: {value: p}
}))


// [{id:1,url:"https://drive.google.com/uc?id=1IRBWqelfK8nlulE1N0pSJ7p-gZIBH1_n"},type: "vig"]
let videosToSee = [] // array nuevo
templateFill.map(e => {
  videosToSee.push(arrVideos.filter(b => b.id === e[0]))
  videosToSee[videosToSee.length - 1].category = e[1]
});

const target = template[0];
videosToSee.unshift(target);

console.log(videosToSee)
console.log(template)