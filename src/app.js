const info=require('../spec/fixture.js')
function  formatInput(input) {
    return input.map(function (tags) {
        let temp=tags.split('-');
        return {
            barcode:temp[0],
            amount:parseInt(temp[1]) | 1
        };
    });
}
function mergeItems(items) {
    let temp=items.filter(function(tags,index) {
           return items.indexOf(tags.barcode) ==items[index].barcode;
    });
    console.log(temp);
    return temp.map(function (tag) {
        items.map(function (elem) {
            if(tag===elem)
                temp.amount+=temp.amount;
        });
    });
}

function mergeCartItemsInfo(cartItems) {
        let allItems=loadAllItems();
        let cartItemsInfo=[];
        cartItems.map(function (tags) {
            let temp=allItems.find(function (elem) {
                return tag.barcode===elem.barcode;
            });
            return cartItemsInfo.push(Object.assign({},temp,{count:tag.count}));
        });
    return cartItemsInfo;
}

module.exports={
        test_1:formatInput,
        test_2:mergeItems,
        test_3:mergeCartItemsInfo
};