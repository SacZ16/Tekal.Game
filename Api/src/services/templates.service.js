const picker = require('../services/templatePicker.service');

function templateFiller(template, arrayAssets){
  let assetsToSee = [];

  let arrAssets = arrayAssets.map((e,i) => { return { url:e, id: i }  });//[{url,id}{url,id}]

  const templateFiller = template[3];
  templateFiller.forEach((e,i) => {
    let assetId = arrAssets.filter(b => b.id === e[0]);//[{url,id},{},{}] ordenados como en el template
    assetsToSee.push(assetId); //[[{},{}]]
    assetsToSee[i].push(e[1]);
  });
  let array = []
  array.push(template[1]);
  array.push(template[0]);
  array.push(assetsToSee);
  return array;
}


module.exports = {templateFiller};
