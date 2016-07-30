/*global module*/

function getItemsAmount(tage) {
    return tage.map(tag=> {
        let temp = tag.split('-');
        return {
            barcode: temp[0],
            amount: parseFloat(temp[1]) || 1
        }
    });
}

module.exports={getItemsAmount:getItemsAmount}