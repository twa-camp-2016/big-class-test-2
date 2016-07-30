"use strict"

const fn = require('../src/app')

describe('formateBarcode', function () {
    it('should return formatedBarcodes', function () {
        let tags = [
            'ITEM000001',
            'ITEM000003-2'
        ];
        let expected = [
            {
                barcode: 'ITEM000001',
                count: 1
            }, {
                barcode: 'ITEM000003',
                count: 2
            }
        ];
        let result = fn.formateBarcode(tags);

        expect(result).toEqual(expected);
    });
});

describe('mergeBarcode', function () {
   it('should return mergedBarcodes', function () {
      let barcodes = [
          {
              barcode: 'ITEM000001',
              count: 1
          }, {
              barcode: 'ITEM000001',
              count: 2
          }
      ];
       let expected = [
           {
               barcode: 'ITEM000001',
               count: 3
           }
       ];
       let result = fn.mergedBarcode(barcodes);

       expect(result).toEqual(expected);
   });
});


describe('getItemsInfo', function () {
    it('should return itemsInfo', function () {
       let allItems = [];
    });
});



