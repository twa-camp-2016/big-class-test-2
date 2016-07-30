
function despiteItemsAmount(barcodes) {
    return barcodes.map(function (item) {
        let info = item.split(" - ");
        return {
            barcode: info[0],
            amount: parseFloat(info[1]) || 1
        };
    });
}


function mergeItemAmount(despitedItem) {
    return despitedItem.reduce(function (cur, old) {
        let existItem = cur.find(function (item) {
            return item.barcode === old.barcode;
        });
        if (existItem) {
            existItem.amount += old.amount;
        }
        else {
            cur.push(old);
        }
        return cur;
    }, []);
}
function matchCartItems(itemAmounts,allItems){
    return itemAmounts.map(function(object){
        let array = allItems.find(function(item){
            return item === object.barcode;
        }) ;
        return object.push(array);
    });
}
function mergePromoteTypes(cartItems,allPromotions){
    return cartItems.forEach(function(object){
        let merges = allPromotions.barcode.find(function(pro){
            return object.barcode === pro;
        });
        return object.push(allPromotions.type);
    });
}
function calculateSubtotals(promotedTypes){
    return promotedTypes.map(function(object){
        return object.push(object.amount*object.price);
    });
}
function calculateAlltotals(subtotals){
    return subtotals =
}

