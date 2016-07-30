'use strict';


function formatTags(tags) {
  return tags.map(tag => {
    let tagPart = tag.split('-');
    return {
      barcode: tagPart[0],
      amount: parseFloat(tagPart[1]) || 1
    }
  })
}

function mergeTags(formattedTags) {
  return formattedTags.reduce((acc, cur) => {
    let found = acc.find(i => i.barcode === cur.barcode);
    if (found)
      found.amount += cur.amount;
    else
      acc.push(cur);
    return acc;
  }, [])
}


module.exports = {
  formatTags,
  mergeTags,

};