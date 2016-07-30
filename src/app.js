'use strict';
/*let tags = [
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000003-2',
    'ITEM000005',
    'ITEM000005',
    'ITEM000005'
];*/

module.exports = {
    parseTags : parseTags,
    mergeBarcode : mergeBarcode
};

function parseTags(tags)
{
    return tags.map(function(tag){
        let tagPart = tag.split("-");
        return {barcode: tagPart[0],amount: parseFloat(tagPart[1]) || 1 };
    })
}

function mergeBarcode(parsedTags)
{
    return parsedTags.reduce(function(pre,cur){
        let existItem = pre.find(function(item){
            return  item.barcode === cur.barcode;
        });

        if (existItem)
        {
            existItem.amount += cur.amount;
        }
        else
        {
            pre.push(cur);
        }
        return pre;
    },[])
}

function getCartItems(mergedBarcode,allItems)
{
    let cartItems=[];
 return mergedBarcode.map(function(item1){
        allItems.find(function(item2){
           if( item1.barcode === item2.barcode)
            return cartItems.push(Object.assign({},item2,{amount: item1.amount}));
        });
});
}

function getCartItemsType(PromotionItems,cartItems)
{
    let cartItemsType=[];


}


