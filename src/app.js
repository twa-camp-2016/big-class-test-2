function printReceipt(cartTags) {
    let cartBarcodes = delFrame(cartTags);
    let megeredBarcodes = megerBarcode(cartBarcodes);
    let shopItems = loadAllItems();
    let promotionsBarcodes = loadPromotions();
    let cartItems = matchCartItems(megeredBarcodes,shopItems);
    let promotionsCartItems = matchPromotionsItems(cartItems,promotionsBarcodes);
    let allCartItems = calculateDiscountSubtotal(promotionsCartItems);

}
function delFrame(cartTags) {
    return cartTags.map(function (item) {
        let info = item.split("-");
        return {
            barcode: info[0],
            amount: parseInt(info[1]) || 1
        }
    });
}
function megerBarcode(cartBarcodes) {
    let megeredBarcodes = [];
    cartBarcodes.forEach(function (items) {
        let exist = megeredBarcodes.find(function (item) {
            return item.barcode === items.barcode;
        });
        if (exist) {
            exist.amount++;
        } else {
            megeredBarcodes.push(items);
        }
    });
    return megeredBarcodes;
}
function matchCartItems(megeredBarcodes,shopItems) {
    return shopItems.filter(function(item){
        return megeredBarcodes.some(function(i){
            return  item.barcode===i.barcode;
        });
    });
}
function matchPromotionsItems(cartItems,promotionsBarcodes) {
    let promotionsCartItems = [];
    promotionsBarcodes.forEach(function(element){
        cartItems.forEach(function(item){
            let exist = element.barcodes.find(function (i) {
                return i === element.barcode;
            });
            if(exist){
                promotionsCartItems.push(Object.assign({},item,{type:element.type}));
            }else{
                promotionsCartItems.push(Object.assign({},item));
            }

        });
    });
    return promotionsCartItems;
}
function calculateDiscountSubtotal(promotionsCartItems) {
    return promotionsCartItems.filter(function(item){
        if(item.type&&item.amount>=2) {
            return Object.assign({}, item, {discountSubtotal: (item.amount - item.amount % 3) * item.price});
        }else{
            return item;
        }
    });
}
function calculateSubtotal(allCartItems) {
    return allCartItems.filter(function(item){
        return Object.assign({}, item, {subtotal: item.amount * item.price});
    });
}
module.exports = {
    delFrame:delFrame,
    megerBarcode:megerBarcode,
    matchCartItems:matchCartItems,
    matchPromotionsItems:matchPromotionsItems,
    calculateDiscountSubtotal:calculateDiscountSubtotal,
    calculateSubtotal:calculateSubtotal
};
