'use strict';
const fixture = require('./fixture.js');
const app = require('../src/app');
describe('format barcode', function () {
    it('get formatted barcode', function () {
        let tags = [
            'ITEM000000',
            'ITEM000000',
            'ITEM000000',
            'ITEM000000',
            'ITEM000000',
            'ITEM000002-2',
            'ITEM000006',
            'ITEM000006',
            'ITEM000006'
        ];
        let expected = [{
            barcode: 'ITEM000000',
            amount: 1
        }, {
            barcode: 'ITEM000000',
            amount: 1
        }, {
            barcode: 'ITEM000000',
            amount: 1
        }, {
            barcode: 'ITEM000000',
            amount: 1
        }, {
            barcode: 'ITEM000000',
            amount: 1
        }, {
            barcode: 'ITEM000002',
            amount: 2
        }, {
            barcode: 'ITEM000006',
            amount: 1
        }, {
            barcode: 'ITEM000006',
            amount: 1
        }, {
            barcode: 'ITEM000006',
            amount: 1
        }
        ];
        expect(app.formatBarcode(tags)).toEqual(expected);
    });
});
describe('merBarcode', function () {
    it('get the only barcode', function () {
        let barcode = [{
            barcode: 'ITEM000000',
            amount: 1
        }, {
            barcode: 'ITEM000000',
            amount: 1
        }, {
            barcode: 'ITEM000000',
            amount: 1
        }, {
            barcode: 'ITEM000000',
            amount: 1
        }, {
            barcode: 'ITEM000000',
            amount: 1
        }, {
            barcode: 'ITEM000002',
            amount: 2
        }, {
            barcode: 'ITEM000006',
            amount: 1
        }, {
            barcode: 'ITEM000006',
            amount: 1
        }, {
            barcode: 'ITEM000006',
            amount: 1
        }];
        let expected = [{
            barcode: 'ITEM000000',
            amount: 5
        }, {
            barcode: 'ITEM000002',
            amount: 2
        }, {
            barcode: 'ITEM000006',
            amount: 3
        }];
        expect(app.mergerBarcode(barcode)).toEqual(expected);
    });
});
describe('get cartItems', function () {
    it('all cartItems', function () {
        let barcodeItems = [{
            barcode: 'ITEM000000',
            amount: 5
        }, {
            barcode: 'ITEM000002',
            amount: 2
        }, {
            barcode: 'ITEM000006',
            amount: 3
        }];
        let expected = [{
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00,
            amount: 5
        }, {
            barcode: 'ITEM000002',
            name: '苹果',
            unit: '斤',
            price: 5.5,
            amount: 2
        }, {
            barcode: 'ITEM000006',
            name: '羽毛球',
            unit: '个',
            price: 1.00,
            amount: 3
        }];
        expect(app.getCartItems(barcodeItems, fixture.loadAllItems())).toEqual(expected);
    });
});

describe('get before total', function () {
    it("total", function () {
        let cartItems = [{
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00,
            amount: 5
        }, {
            barcode: 'ITEM000002',
            name: '苹果',
            unit: '斤',
            price: 5.5,
            amount: 2
        }, {
            barcode: 'ITEM000006',
            name: '羽毛球',
            unit: '个',
            price: 1.00,
            amount: 3
        }];
        let expected = 29;
        expect(app.getBeforeTotal(cartItems)).toEqual(expected);
    });
});

describe('get subTotal', function () {
    it('subTotal', function () {
        let cartItems = [{
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00,
            amount: 5
        }, {
            barcode: 'ITEM000002',
            name: '苹果',
            unit: '斤',
            price: 5.5,
            amount: 2
        }, {
            barcode: 'ITEM000006',
            name: '羽毛球',
            unit: '个',
            price: 1.00,
            amount: 3
        }];
        let expected = [{
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00,
            amount: 5,
            type: 'BUY_TWO_GET_ONE_FREE',
            subTotal: 12
        }, {
            barcode: 'ITEM000002',
            name: '苹果',
            unit: '斤',
            price: 5.5,
            amount: 2,
            subTotal: 11
        }, {
            barcode: 'ITEM000006',
            name: '羽毛球',
            unit: '个',
            price: 1.00,
            amount: 3,
            subTotal: 3
        }];
        expect(app.getSubTotal(cartItems, fixture.loadPromotions())).toEqual(expected);
    });
});

describe("get total", function () {
    it('total', function () {
        let subTotalItems = [{
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00,
            amount: 5,
            type: 'BUY_TWO_GET_ONE_FREE',
            subTotal: 12
        }, {
            barcode: 'ITEM000002',
            name: '苹果',
            unit: '斤',
            price: 5.5,
            amount: 2,
            subTotal: 11
        }, {
            barcode: 'ITEM000006',
            name: '羽毛球',
            unit: '个',
            price: 1.00,
            amount: 3,
            subTotal: 3
        }];
        let expected = 26;
        expect(app.getTotal(subTotalItems)).toEqual(expected);
    });
});

describe('print', function () {
    it("print", function () {
        let subTotalItems = [{
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00,
            amount: 5,
            type: 'BUY_TWO_GET_ONE_FREE',
            subTotal: 12
        }, {
            barcode: 'ITEM000002',
            name: '苹果',
            unit: '斤',
            price: 5.5,
            amount: 2,
            subTotal: 11
        }, {
            barcode: 'ITEM000006',
            name: '羽毛球',
            unit: '个',
            price: 1.00,
            amount: 3,
            subTotal: 3
        }];
        let beforeTotal = 29, total = 26;
        let expected = `
----------------------------------------
名称：可口可乐 数量：5瓶 单价：3元 小计：12元
名称：苹果 数量：2斤 单价：5.5元 小计：11元
名称：羽毛球 数量：3个 单价：1元 小计：3元
----------------------------------------
总计：26元
节省：3元`;
        expect(app.print(subTotalItems, beforeTotal, total)).toEqual(expected);
    });
});