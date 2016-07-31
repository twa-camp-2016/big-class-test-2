'use strict';
function formatBarcode(tags) {
    let tag;
    return tags.map((item)=> {
        tag = item.split('-');
        return {
            barcode: tag[0],
            amount: parseInt(tag[1]) || 1
        }
    });
}

function mergerBarcode(barcode) {
    return barcode.reduce(function (cur, newObj) {
        let existItem = cur.find(function (item) {
            return item.barcode === newObj.barcode;
        });
        if (existItem) {
            existItem.amount += newObj.amount;
        }
        else {
            cur.push(newObj);
        }
        return cur;
    }, []);
}

function getCartItems(barcodeItems, allItems) {
    return barcodeItems.map((itemB)=> {
        let exist = allItems.find((itemA)=>itemA.barcode === itemB.barcode);
        if (exist) {
            Object.assign(exist, {amount: itemB.amount});
            return exist;
        }
    });
}

function getBeforeTotal(cartItems) {
    let total = 0;
    cartItems.forEach((item)=>total += item.price * item.amount);
    return total;
}

function getSubTotal(cartItems, promotions) {
    let typeItems = [];
    typeItems = cartItems.map((itemC)=> {
        promotions.forEach((itemP)=> {
            let exist = itemP.barcodes.find((item)=>item === itemC.barcode);
            if (exist) {
                Object.assign(itemC, {type: itemP.type});
            }
        });
        return itemC;
    });

    return typeItems.map((ele)=> {
        if (ele.type === 'BUY_TWO_GET_ONE_FREE') {
            Object.assign(ele, {subTotal: ele.price * (ele.amount - parseInt(ele.amount / 3))});

        } else {
            Object.assign(ele, {subTotal: ele.price * ele.amount});
        }
        return ele;
    });
}

function getTotal(subTotalItems) {
    let total = 0;
    subTotalItems.forEach((item)=>total += item.subTotal);
    return total;
}

function print(subTotalItems, beforeTotal, total) {
    let string = '\n----------------------------------------\n';
    subTotalItems.forEach((item)=> {
        string += '名称：' + item.name + ' 数量：' + item.amount + item.unit + ' 单价：' + item.price + '元 小计：' + item.subTotal + '元\n';
    });
    return string += '----------------------------------------\n总计：' + total + '元\n节省：' + (beforeTotal - total) + '元';
}

module.exports = {
    formatBarcode: formatBarcode,
    mergerBarcode: mergerBarcode,
    getCartItems: getCartItems,
    getBeforeTotal: getBeforeTotal,
    getSubTotal: getSubTotal,
    getTotal: getTotal,
    print: print
};


