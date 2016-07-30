'use strict';


function formatTags(tags) {
  return tags.map( tag => {
    let tagPart = tag.split('-');
    return {
      barcode: tagPart[0],
      amount: parseFloat(tagPart[1]) || 1
    }
  })
}


module.exports = {
  formatTags,
};