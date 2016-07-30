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
   let result = allItems.filter(function (all) {
        itemAllItems.find(function (item) {
            return item.barcode === all.barcode;
        });
    });
    return result.map(function(res){
        let thing = itemAllItems.find(function(item){
            return item.barcode === res.barcode;
        });
        return res.amount = thing.amount;
    })
}

function promotedType(promotions, cartItems) {
    let result = promotions.filter(item)
    {
        return item.type = 'BUY_TWO_GET_ONE_FREE';
    }
    let arr = result.type;
    return cartItems.map(function (item) {
        let type = arr.find(function (a) {
            return a === item.barcode;
        })
        if (type) {
            item.type = 'BUY_TWO_GET_ONE_FREE';
        } else {
            item.type = 'none';
        }
    });
}

function calculatePromotedAmount(promotedType){
    return promotedType.map(function(item){
        if(item.type === "BUY_TWO_GET_ONE_FREE"){
            item.promotedAmount = item.amount-item.amount%3
        }else{
            item.promotedAmount = item.amount;
        }
    });
}

function calculatePromotedMoney(promotedAmount)
module.exports = {
    getItemAmount: getItemAmount
}