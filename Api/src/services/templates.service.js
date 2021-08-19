const picker = require('../services/templatePicker.service');

function templateFiller(template, arrayAssets){
  let assetsToSee = [];

  let arrAssets = arrayAssets.map((e,i) => { return { url:e, id: i+1 }  });
  //[{url,id}{url,id}]

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

function templateInfo(array){
  let vigs = array[0];
  let targets = array[1];
  let noTargets = array[2];

  let newArray = [];
  newArray.push(vigs);
  newArray.push(targets);
  newArray.push(noTargets);

  return newArray;
}


module.exports = {templateFiller, templateInfo};
