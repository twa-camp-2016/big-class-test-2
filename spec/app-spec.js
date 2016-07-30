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
    })
})