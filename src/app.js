/*global module*/

function getItems(tags) {
    return tags.map(tag=> {
        let temp = tag.split('-');
        return {
            barcode: temp[0],
            amount: parseFloat(temp[1]) || 1
        }
    });
}

function getItemsAmount(items) {
   let itemsAmount=[];
    for(let item of items){
     let exit=itemsAmount.find(function (temp) {
         return item.barcode===temp.barcode;
        });
     if(exit){
         exit.itemsAmount+=item.itemsAmount;
     }
     else{
       itemsAmount.push(Object.assign({},item));
     }
    }
   return itemsAmount;
}

function getCartItems(itemsAmount) {

}

module.exports={getItems:getItems,
               getItemsAmount:getItemsAmount,
               getCartItems:getCartItems}

