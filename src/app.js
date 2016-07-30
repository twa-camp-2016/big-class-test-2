function getItemAmount(barcodes) {
    return barcodes.map(function (barcode) {
        let exist = barcode.split('-');
        return {
            barcode: exist[0],
            amount: parseFloat(exist[1]) || 1
        }
    })
}
function getAllItemAmount(itemAmount) {
    return itemAmount.reduce(function (cur, old) {
        let exist = cur.find(function (item) {
            return item.barcode === old.barcode;
        });
        if (exist) {
            exist.amount += old.amount;
        } else {
            cur.push(old);
        }
        return cur;
    }, [])
}

function getCartItems(itemAllItems, allItems) {
    let items =  allItems.filter(function (all) {
        return itemAllItems.find(function (item) {
            return item.barcode === all.barcode;
        });
    });
}

function addAmount(cartitems,itemAllItems){
    cartitems.map(function(item){
        let result = 
    })
}

function promotedType(promotions, cartItems) {
    let result = promotions.filter(item){
        return item.type = 'BUY_TWO_GET_ONE_FREE';
    }
    let arr = result.type;
    return cartItems.map(function(item){
        let type = arr.find(function(a){
            return a === item.barcode;
        })
        if(type){
            item.type = 'BUY_TWO_GET_ONE_FREE';
        }else{
            item.type = 'none';
        }
    });
}

function calculatePromotedAmount(promotedType,)

module.exports = {
    getItemAmount: getItemAmount
}