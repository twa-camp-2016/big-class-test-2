/*global require,describe,it,toEqual,expect*/
const test = require("../src/app.js")
const info = require('./fixture.js');
describe("formatInput", function () {
    it("format the input", function () {
        let input = ['ITEM000001', 'ITEM000001',
            'ITEM000003-3', 'ITEM000005-3',
            'ITEM000005', 'ITEM000005',
        ];
        let result = [{barcode: 'ITEM000001', amount: 1},
            {barcode: 'ITEM000001', amount: 1},
            {barcode: 'ITEM000003', amount: 3},
            {barcode: 'ITEM000005', amount: 3},
            {barcode: 'ITEM000005', amount: 1},
            {barcode: 'ITEM000005', amount: 1}
        ];
        let temp = test.test_1(input);
        expect(temp).toEqual(result);
    });
});

describe("mergeItems", function () {
    it("merge the items", function () {
        let input = [
            {barcode: 'ITEM000001', amount: 1},
            {barcode: 'ITEM000001', amount: 1},
            {barcode: 'ITEM000003', amount: 3},
            {barcode: 'ITEM000005', amount: 3},
            {barcode: 'ITEM000005', amount: 1},
            {barcode: 'ITEM000005', amount: 1}
        ];
        let result = [
            {barcode: 'ITEM000001', amount: 2},
            {barcode: 'ITEM000003', amount: 3},
            {barcode: 'ITEM000005', amount: 5}
        ];
        let temp = test.test_2(input);
        expect(temp).toEqual(result);
    });
});

describe("mergeCartItems", function () {
    it("merge the items infomation", function () {
        let input = [
            {barcode: 'ITEM000001', amount: 1},
            {barcode: 'ITEM000003', amount: 3},
            {barcode: 'ITEM000005', amount: 5}
        ];
        let result = [
            {barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3.00, amount: 1},
            {barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15.00, amount: 3},
            {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.50, amount: 5}
        ];
        let allItems = info.loadAllItems();
        let temp = test.test_3(input, allItems);
        expect(temp).toEqual(result);
    });
});
describe("getSubtotal", function () {
    it("get sub total", function () {
        let input = [
            {barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3.00, amount: 1},
            {barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15.00, amount: 3},
            {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.50, amount: 5}
        ];
        let result = [
            {barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3.00, amount: 1, subtotal: 3.00},
            {barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15.00, amount: 3, subtotal: 45.00},
            {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.50, amount: 5, subtotal: 22.50}

        ];
        let temp = test.test_4(input);
        expect(temp).toEqual(result);
    });
});


describe("mergePromotion", function () {
    it("get sub total", function () {
        let input = [
            {barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3.00, amount: 1, subtotal: 3.00},
            {barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15.00, amount: 3, subtotal: 45.00},
            {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.50, amount: 5, subtotal: 22.50}

        ];
        let result = [
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount: 1,
                subtotal: 3.00,
                type: 'BUY_TWO_GET_ONE_FREE'
            },
            {barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15.00, amount: 3, subtotal: 45.00},
            {
                barcode: 'ITEM000005',
                name: '方便面',
                unit: '袋',
                price: 4.50,
                amount: 5,
                subtotal: 22.50,
                type: 'BUY_TWO_GET_ONE_FREE'
            }

        ];
        let promotion = info.loadPromotions();
        let temp = test.test_5(input, promotion);
        expect(temp).toEqual(result);
    });
});

describe("getSubsave", function () {
    it("get sub save", function () {
        let input = [
            {
                barcode: 'ITEM000001', name: '雪碧', unit: '瓶',
                price: 3.00, amount: 1, subtotal: 3.00, type: 'BUY_TWO_GET_ONE_FREE'
            },
            {
                barcode: 'ITEM000003', name: '荔枝', unit: '斤',
                price: 15.00, amount: 3, subtotal: 45.00
            },
            {
                barcode: 'ITEM000005', name: '方便面', unit: '袋',
                price: 4.50, amount: 5, subtotal: 22.50, type: 'BUY_TWO_GET_ONE_FREE'
            }

        ];

        let result = [
            {
                barcode: 'ITEM000001', name: '雪碧', unit: '瓶',
                price: 3.00, amount: 1, subtotal: 3.00, type: 'BUY_TWO_GET_ONE_FREE', subSave: 0
            },
            {
                barcode: 'ITEM000003', name: '荔枝', unit: '斤',
                price: 15.00, amount: 3, subtotal: 45.00, subSave: 0
            },
            {
                barcode: 'ITEM000005', name: '方便面', unit: '袋',
                price: 4.50, amount: 5, subtotal: 22.50, type: 'BUY_TWO_GET_ONE_FREE', subSave: 4.50
            }

        ];
        let temp = test.test_6(input);
        expect(temp).toEqual(result);
    });
});

describe("getTotal", function () {
    it("get all information", function () {
        let input = [
            {
                barcode: 'ITEM000001', name: '雪碧', unit: '瓶',
                price: 3.00, amount: 1, subtotal: 3.00, type: 'BUY_TWO_GET_ONE_FREE', subSave: 0
            },
            {
                barcode: 'ITEM000003', name: '荔枝', unit: '斤',
                price: 15.00, amount: 3, subtotal: 45.00, subSave: 0
            },
            {
                barcode: 'ITEM000005', name: '方便面', unit: '袋',
                price: 4.50, amount: 5, subtotal: 22.50, type: 'BUY_TWO_GET_ONE_FREE', subSave: 4.5
            }

        ];
        let result = [
            {name: '雪碧', unit: '瓶', price: 3.00, amount: 1, subtotal: 3.00},
            {name: '荔枝', unit: '斤', price: 15.00, amount: 3, subtotal: 45.00},
            {name: '方便面', unit: '袋', price: 4.50, amount: 5, subtotal: 18.00},
            {
                allSave: 4.50,
                total: 66.00
            }
        ];
    let temp = test.test_7(input);
    expect(temp).toEqual(result);
});
});
