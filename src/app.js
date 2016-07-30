'use strict';
function separateTags(tags) {
    return tags.map(function (tag) {
        let info = tag.split('-');
        return {
            barcode:info[0],
            count:parseFloat(info[1]) ||1
        }
    });
}

module.exports = {separateTags:separateTags};



































