'use strict'
const posv1 = require('./../src/posv1.js');
const fixture = require('./fixture.js');
describe("formatItems", function () {
    it("should return format", function () {
        let input = ["ITEM000003-2"];
        let result = posv1.formatItems(input);
        expect(result).toEqual([{barcode: 'ITEM000003', amount: 2}]);
    })
})

describe("mergeItems", function () {
    it("should return mergeItems", function () {
        let input = [{barcode: 'ITEM000003', amount: 2}];
        let result = posv1.mergeItems(input);
        expect(result).toEqual([{barcode: 'ITEM000003', amount: 2}]);
    })
})

describe("getCartItems", function () {
    it("should match cartItems", function () {
        let input = [{barcode: 'ITEM000003', amount: 2}];
        let result = posv1.getCartItems(input, fixture.loadAllItems());
        expect(result).toEqual([{
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00,
            amount: 2
        }]);
    })
})
describe("calculateSubtotal", function () {
    it("should calculate subtotal", function () {
        let input = [{
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00,
            amount: 2
        }];
        let result = posv1.calculateSubtotal(input);
        expect(result).toEqual([{
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00,
            amount: 2,
            subtotal: 30
        }]);
    })
})
describe("calculateSaving", function () {
    it("should calculateSaving", function () {
        let input = [{
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00,
            amount: 2,
            subtotal: 30
        }];
        let result = posv1.calculateSaving(input, fixture.loadPromotions());
        expect(result).toEqual([{
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00,
            amount: 2,
            subtotal: 30,
            saving: 0
        }]);
    })

    it("should calculateSaving", function () {
        let input = [{
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
            amount:3,
            subtotal:9.00
        }];
        let result = posv1.calculateSaving(input, fixture.loadPromotions());
        expect(result).toEqual([{
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
            amount:3,
            subtotal:9.00,
            saving:3.00
        }]);
    })
});

describe("getNewSubtotal", function () {
    it("return neew subtotal", function () {
        let input = [{
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00,
            amount: 2,
            subtotal: 30,
            saving: 0
        }];
        let result = posv1.getNewSubtotal(input);
        expect(result).toEqual([{
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00,
            amount: 2,
            subtotal: 30,
            saving: 0
        }]);
    })
})

describe("getTotal", function () {
    it("return total", function () {
        let input = [{
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00,
            amount: 2,
            subtotal: 30,
            saving: 0
        }];
        let result = posv1.getTotal(input);
        expect(result).toEqual(30);
    })
})
describe("getAllSaving", function () {
    it("return total", function () {
        let input = [{
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00,
            amount: 2,
            subtotal: 30,
            saving: 0
        }];
        let result = posv1.getAllSaving(input);
        expect(result).toEqual(0);
    })
})
describe("print",function () {
    it("should return receipt",function () {
            let input=[{
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                amount: 2,
                subtotal: 30,
                saving: 0
            }];

            let result=posv1.print(30,0,input);
            expect(result).toEqual(
                "***<没钱赚商店>收据***"+'\n'+
            "名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)"+ '\n'+
            "----------------------"+ '\n'+
            "总计：30.00(元)"+ '\n'+
            "节省：0.00(元)" +'\n'+
            "**********************"
        );
    })
})
