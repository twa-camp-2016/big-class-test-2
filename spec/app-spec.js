'use strict'
const app = require('../src/app');

describe('formatBarcodes', function () {
    it('should return formatedBarcodes with barcode and amount', function () {
        let test = ['item0001', 'item0002-2'];
        let expected = [{barcode: 'item0001', amount: 1}, {barcode: 'item0002', amount: 2}];
        let result = app.formatBarcodes(test);
        expect(result).toEqual(expected);
    });
});

describe('mergeBarcodes', function () {
    it('should return mergedBarcodes', function () {
        let test = [
            {barcode: 'item0001', amount: 1},
            {barcode: 'item0001', amount: 1},
            {
                barcode: 'item0002',
                amount: 2
            }];
        let result = app.mergeBarcodes(test);
        let expected = [{barcode: 'item0001', amount: 2}, {barcode: 'item0002', amount: 2}];
        expect(result).toEqual(expected);
    });
});

describe('getCarItems', function () {
    it('should return cartItems', function () {
        let mergedBarcodes = [{barcode: 'ITEM000000', amount: 2}, {barcode: 'ITEM000001', amount: 2}];
        let allItems = [
            {
                barcode: 'ITEM000000',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00
            },
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00
            },
            {
                barcode: 'ITEM000002',
                name: '苹果',
                unit: '斤',
                price: 5.50
            }];
        let expected = [{

            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00,
            amount: 2
        }, {

            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
            amount: 2
        }];
        let result = app.getCartItems(mergedBarcodes, allItems);
        expect(result).toEqual(expected);
    });
});

describe('getSubSaveMoney', function () {
    it('should return cartItems with subSaveMoney', function () {
        let cartItems = [{

            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00,
            amount: 3
        }, {

            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
            amount: 2
        }];
        let allPromotions = [{
            type: 'BUY_TWO_GET_ONE_FREE',
            barcodes: [
                'ITEM000000',
                'ITEM000001',
                'ITEM000005'
            ]
        }];
        let expected = [{

            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00,
            amount: 3,
            subSaveMoney: 3.00
        }, {

            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
            amount: 2,
            subSaveMoney: 0
        }]
        let result = app.getSubSaveMoney(cartItems, allPromotions);
        expect(result).toEqual(expected);
    });
});

describe('getsubtotal', function () {
    it('should return cartItems with subTotal', function () {
        let test = [{

            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00,
            amount: 3,
            subSaveMoney: 3.00
        }, {

            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
            amount: 2,
            subSaveMoney: 0
        }];
        let expected = [{

            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00,
            amount: 3,
            subSaveMoney: 3.00,
            subTotal: 9
        }, {

            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
            amount: 2,
            subSaveMoney: 0,
            subTotal: 6
        }];
        let result = app.getSubTotal(test);
        expect(result).toEqual(expected);
    });
});

describe('getTotalAndSaveMoney', function () {
    it('should return total and saveMoney', function () {
        let test = [{

            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00,
            amount: 3,
            subSaveMoney: 3.00,
            subTotal: 9
        }, {

            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
            amount: 2,
            subSaveMoney: 0,
            subTotal: 6
        }];
        let expected = {total: 12, saveMoney: 3};
        let result = app.getTotalAndSaveMoney(test);
        expect(result).toEqual(expected);
    });
});

describe('print', function () {
    it('should return string', function () {
        let detailedCartItems = [{

            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00,
            amount: 3,
            subSaveMoney: 3.00,
            subTotal: 9
        }, {

            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
            amount: 2,
            subSaveMoney: 0,
            subTotal: 6
        }];
        let totalAndSaveMoney = {total: 12, saveMoney: 3};
        let result = app.print(detailedCartItems, totalAndSaveMoney);
        let expected = `***<没钱赚商店>***收据
名称:可口可乐,数量:3瓶,单价:3元,小计:6
名称:雪碧,数量:2瓶,单价:3元,小计:6
--------------
总计:12(元)
节省:3(元)`;
        expect(result).toEqual(expected);
    });
});

