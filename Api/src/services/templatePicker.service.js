
function picker(){
    let random = Math.round(Math.random() * 999);
    const template = require(`../assets/level_templates/template_${random}.json`);
    // const template = require(`../assets/level_templates/prueba2.json`);
    const vig = template[2].filter(e => e[1] === 'vig');
    const numberOfVigs = vig.length;

    template.unshift(numberOfVigs);
    //numberVigs, targets, no targets, array
    return template;
}


module.exports = {picker};