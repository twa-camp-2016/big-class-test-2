/*global describe,require*/
const  links=require('../src/app');
describe('getItems',function () {
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
            {barcode: 'ITEM000005', amount: 1}]
        let result=links.getItems(inputs);
        expect(result).toEqual(expected);
    });
});

describe('getItemsAmount',function () {
    it('it should print items amount', function () {
        let inputs=[{barcode: 'ITEM000001', amount: 1},
            {barcode: 'ITEM000001', amount: 1},
            {barcode: 'ITEM000001', amount: 1},
            {barcode: 'ITEM000001', amount: 1},
            {barcode: 'ITEM000001', amount: 1},
            {barcode: 'ITEM000003', amount: 2},
            {barcode: 'ITEM000005', amount: 1},
            {barcode: 'ITEM000005', amount: 1},
            {barcode: 'ITEM000005', amount: 1}];
        let expected=[{barcode: 'ITEM000001', amount: 5},
            {barcode: 'ITEM000003', amount: 2},
            {barcode: 'ITEM000005', amount: 3}];
        let result=links.getItemsAmount(inputs);
        expect(result).toEqual(expected);
    });
});
