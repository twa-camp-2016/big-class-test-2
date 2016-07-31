/*global describe,require*/
const links = require('../src/app');
describe('getItems', function () {
    it('it should print items amount', function () {
        let inputs = ['ITEM000001', 'ITEM000001', 'ITEM000001', 'ITEM000001',
            'ITEM000001', 'ITEM000003-2', 'ITEM000005', 'ITEM000005', 'ITEM000005'];
        let expected = [{barcode: 'ITEM000001', amount: 1},
            {barcode: 'ITEM000001', amount: 1},
            {barcode: 'ITEM000001', amount: 1},
            {barcode: 'ITEM000001', amount: 1},
            {barcode: 'ITEM000001', amount: 1},
            {barcode: 'ITEM000003', amount: 2},
            {barcode: 'ITEM000005', amount: 1},
            {barcode: 'ITEM000005', amount: 1},
            {barcode: 'ITEM000005', amount: 1}];
        let result = links.getItems(inputs);
        expect(result).toEqual(expected);
    });
});

describe('getItemsAmount', function () {
    it('it should print items amount', function () {
        let inputs = [{barcode: 'ITEM000001', amount: 1},
            {barcode: 'ITEM000001', amount: 1},
            {barcode: 'ITEM000001', amount: 1},
            {barcode: 'ITEM000001', amount: 1},
            {barcode: 'ITEM000001', amount: 1},
            {barcode: 'ITEM000003', amount: 2},
            {barcode: 'ITEM000005', amount: 1},
            {barcode: 'ITEM000005', amount: 1},
            {barcode: 'ITEM000005', amount: 1}];
        let expected = [{barcode: 'ITEM000001', amount: 5},
            {barcode: 'ITEM000003', amount: 2},
            {barcode: 'ITEM000005', amount: 3}];
        let result = links.getItemsAmount(inputs);
        expect(result).toEqual(expected);
    });
});

describe('getCartItems', function () {
    it('it should print items amount', function () {
        let inputs = [{barcode: 'ITEM000001', amount: 5},
            {barcode: 'ITEM000003', amount: 2},
            {barcode: 'ITEM000005', amount: 3}];
        let expected = [{
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
            amount: 5
        }, {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00,
            amount: 2
        }, {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50,
            amount: 3
        }];
        let result = links.getCartItems(inputs);
        expect(result).toEqual(expected);
    });
});
describe('calculateOriginalSubtotal', function () {
    it('it should print items amount', function () {
        let inputs = [{
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
            amount: 5
        }, {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00,
            amount: 2
        }, {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50,
            amount: 3
        }];
        let expected = [{
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
            amount: 5,
            originalSubtotal: 15
        }, {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00,
            amount: 2,
            originalSubtotal: 30
        }, {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50,
            amount: 3,
            originalSubtotal: 13.5
        }];
        let result = links.calculateOriginalSubtotal(inputs);
        expect(result).toEqual(expected);
    });
});

describe('getCartItemsPromotion()', function () {
    it('it should print items promotion', function () {
        let inputs = [{
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
            amount: 5,
            originalSubtotal: 15
        }, {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00,
            amount: 2,
            originalSubtotal: 30
        }, {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50,
            amount: 3,
            originalSubtotal: 13.5
        }];
        let expected = [{
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
            amount: 5,
            originalSubtotal: 15,
            type: 'BUY_TWO_GET_ONE_FREE'
        }, {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00,
            amount: 2,
            originalSubtotal: 30,
        }, {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50,
            amount: 3,
            originalSubtotal: 13.5,
            type: 'BUY_TWO_GET_ONE_FREE'
        }];
        let result = links.getCartItemsPromotion(inputs);
        expect(result).toEqual(expected);
    });
});

describe('calculateSubtotal()()', function () {
    it('it should print items subtotal with promotion', function () {
        let inputs = [{
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
            amount: 5,
            originalSubtotal: 15,
            type: 'BUY_TWO_GET_ONE_FREE'
        }, {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00,
            amount: 2,
            originalSubtotal: 30,
        }, {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50,
            amount: 3,
            originalSubtotal: 13.5,
            type: 'BUY_TWO_GET_ONE_FREE'
        }];
        let expected=[{
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
            amount: 5,
            originalSubtotal: 15,
            type: 'BUY_TWO_GET_ONE_FREE',
            subtotal: 12
        }, {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00,
            amount: 2,
            originalSubtotal: 30,
            subtotal: 30,
        }, {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50,
            amount: 3,
            originalSubtotal: 13.5,
            type: 'BUY_TWO_GET_ONE_FREE',
            subtotal: 9
        }];
        let result = links.calculateSubtotal(inputs);
        expect(result).toEqual(expected);
    });
});
