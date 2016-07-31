const num = require("../src/app.js");
describe('', function () {
    it('', function () {
        let input = ['10001-1.5', '10002', '10003'];
        let expected = [{barcode: '10001', amount: 1.5}, {barcode: '10002', amount: 1}, {barcode: '10003', amount: 1}];
        expect(num.getItemAmounts(input)).toEqual(expected);

    })
})
describe("getAllItemAmounts", function () {
    it("", function () {
        let inputs = [{barcode: '10001', amount: 1.5}, {barcode: '10002', amount: 1}, {barcode: '10001', amount: 1}];
        let outputs = num.getAllItemAmounts(inputs);
        let expected = [{barcode: '10001', amount: 2.5}, {barcode: '10002', amount: 1}];
        expect(outputs).toEqual(expected);
    })
})
describe("get cart item ", function () {
    it('', function () {
        let inputs1 = [{barcode: "10001", amount: 2}];
        let inputs2 = [{barcode: '10001', name: '苹果', price: 3.5, unit: '斤'}, {
            barcode: '10002',
            name: '啤酒',
            price: 6,
            unit: '瓶'
        }];
        let expected = [{barcode: '10001', name: "苹果", price: 3.5, unit: '斤', amount: 2}];
        expect(num.getCartItems(inputs1, inputs2)).toEqual(expected);
    })
})
describe("get promoted type", function () {
    it("", function () {
        let inputs1 = [
            {
                type: 'BUY_TWO_GET_ONE_FREE',
                barcodes: [
                    '10000',
                    '10001',
                    '10005'
                ]
            }
        ];
        let inputs2 = [{barcode: "10001", name: "苹果", price: 3.5, unit: "斤", amount: 2}, {
            barcode: "10002",
            name: "啤酒",
            price: 6,
            unit: "瓶",
            amount: 3
        }];
        let expected = [{
            barcode: "10001",
            name: "苹果",
            price: 3.5,
            unit: "斤",
            amount: 2,
            type: "BUY_TWO_GET_ONE_FREE"
        }, {
            barcode: "10002",
            name: "啤酒",
            price: 6,
            unit: "瓶",
            amount: 3,
            type: "none"
        }];
        expect(num.promotedType(inputs1, inputs2)).toEqual(expected);
    });
});

describe("get promoted amount", function () {
    it("", function () {
        let inputs = [{barcode: "10001", name: "苹果", price: 3.5, unit: "斤", amount: 4, type: "BUY_TWO_GET_ONE_FREE"}, {
            barcode: "10002",
            name: "啤酒",
            price: 6,
            unit: "瓶",
            amount: 3,
            type: "none"
        }];
        let expected = [{
            barcode: "10001",
            name: "苹果",
            price: 3.5,
            unit: "斤",
            amount: 4,
            type: "BUY_TWO_GET_ONE_FREE",
            promotedAmount: 3
        }, {
            barcode: "10002",
            name: "啤酒",
            price: 6,
            unit: "瓶",
            amount: 3,
            type: "none",
            promotedAmount: 3
        }];
        expect(num.calculatePromotedAmount(inputs)).toEqual(expected);
    })
})
describe("calculate promoted money", function () {
    it("", function () {
        let inputs = [{
            barcode: "10001",
            name: "苹果",
            price: 3.5,
            unit: "斤",
            amount: 4,
            type: "BUY_TWO_GET_ONE_FREE",
            promotedAmount: 3
        }, {
            barcode: "10002",
            name: "啤酒",
            price: 6,
            unit: "瓶",
            amount: 3,
            type: "none",
            promotedAmount: 3
        }];
        let expected = [{
            barcode: "10001",
            name: "苹果",
            price: 3.5,
            unit: "斤",
            amount: 4,
            type: "BUY_TWO_GET_ONE_FREE",
            promotedAmount: 3,
            promotedMoney:10.5
        }, {
            barcode: "10002",
            name: "啤酒",
            price: 6,
            unit: "瓶",
            amount: 3,
            type: "none",
            promotedAmount: 3,
            promotedMoney:18
        }];
        expect(num.calculatePromotedMoney(inputs)).toEqual(expected);
    });
});

describe("calculate subtotal",function(){
    it("",function(){
        let inputs = [{
            barcode: "10001",
            name: "苹果",
            price: 3.5,
            unit: "斤",
            amount: 4,
            type: "BUY_TWO_GET_ONE_FREE",
            promotedAmount: 3,
            promotedMoney:10.5
        }, {
            barcode: "10002",
            name: "啤酒",
            price: 6,
            unit: "瓶",
            amount: 3,
            type: "none",
            promotedAmount: 3,
            promotedMoney:18
        }];
        let expected = [{
            barcode: "10001",
            name: "苹果",
            price: 3.5,
            unit: "斤",
            amount: 4,
            type: "BUY_TWO_GET_ONE_FREE",
            promotedAmount: 3,
            promotedMoney:10.5,
            subTotal:14
        }, {
            barcode: "10002",
            name: "啤酒",
            price: 6,
            unit: "瓶",
            amount: 3,
            type: "none",
            promotedAmount: 3,
            promotedMoney:18,
            subTotal:18
        }];
        expect(num.calculateSubTotal(inputs)).toEqual(expected);
    });
});
describe("calculate total",function(){
    it("",function(){
        let inputs = [{
            barcode: "10001",
            name: "苹果",
            price: 3.5,
            unit: "斤",
            amount: 4,
            type: "BUY_TWO_GET_ONE_FREE",
            promotedAmount: 3,
            promotedMoney:10.5,
            subTotal:14
        }, {
            barcode: "10002",
            name: "啤酒",
            price: 6,
            unit: "瓶",
            amount: 3,
            type: "none",
            promotedAmount: 3,
            promotedMoney:18,
            subTotal:18
        }];
        let expected = 28.5;
        expect(num.calculateTotal(inputs)).toEqual(expected);
    });
});
describe("calculate promoted total money",function(){
    it("",function(){
        let inputs1 = [{
            barcode: "10001",
            name: "苹果",
            price: 3.5,
            unit: "斤",
            amount: 4,
            type: "BUY_TWO_GET_ONE_FREE",
            promotedAmount: 3,
            promotedMoney:10.5,
            subTotal:14
        }, {
            barcode: "10002",
            name: "啤酒",
            price: 6,
            unit: "瓶",
            amount: 3,
            type: "none",
            promotedAmount: 3,
            promotedMoney:18,
            subTotal:18
        }];
        let inputs2 = 28.5;
        let expected = 3.5;
        expect(num.calculatePromotedTotalMoney(inputs1,inputs2)).toEqual(expected);
    })
})