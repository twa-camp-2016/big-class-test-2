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
        let allItems = [{
            barcode: 'ITEM000000',
            name: '¿É¿Ú¿ÉÀÖ',
            unit: 'Æ¿',
            price: 3.00
        }];
        let mergedBarcode = [
            {
                barcode: 'ITEM000000',
                count: 1
            }
            ];
        let expected = [
            {
                barcode: 'ITEM000000',
                name: '¿É¿Ú¿ÉÀÖ',
                unit: 'Æ¿',
                price: 3.00,
                count: 1
            }
        ];
        let result = fn.getItemsInfo(allItems, mergedBarcode);

        expect(result).toEqual(expected);
    });
});

describe('calculate', function () {
   it('should return subtoaledItem', function () {
       let itemsInfo = [
           {
               barcode: 'ITEM000000',
               name: '¿É¿Ú¿ÉÀÖ',
               unit: 'Æ¿',
               price: 3.00,
               count: 1
           },
           {
               barcode: 'ITEM000001',
               name: 'Ñ©±Ì',
               unit: 'Æ¿',
               price: 3.00,
               count: 1
           }
       ];
       let expected = [
           {
               barcode: 'ITEM000000',
               name: '¿É¿Ú¿ÉÀÖ',
               unit: 'Æ¿',
               price: 3.00,
               count: 1,
               subtotal: 3
           },
           {
               barcode: 'ITEM000001',
               name: 'Ñ©±Ì',
               unit: 'Æ¿',
               price: 3.00,
               count: 2,
               subtotal: 6
           }
       ];
       let result = fn.calculateSubotal(itemsInfo);

       expect(result).toEqual(expected);
   })
});

describe('calculate', function () {
   it('should return total', function () {
       let subtotaledItem = [
           {
               barcode: 'ITEM000000',
               name: '¿É¿Ú¿ÉÀÖ',
               unit: 'Æ¿',
               price: 3.00,
               count: 1,
               subtotal: 3
           },
           {
               barcode: 'ITEM000001',
               name: 'Ñ©±Ì',
               unit: 'Æ¿',
               price: 3.00,
               count: 2,
               subtotal: 6
           }
       ];
       let expected = 9;
       let result = fn.calculateTotal(subtotaledItem);

       expect(result).toEqual(expected);
   })
});

describe('getPromotionsIds', function () {
   it('should return promotions ids', function () {
       let promotions = [
           {
               type: 'BUY_TWO_GET_ONE_FREE',
               barcodes: [
                   'ITEM000000',
                   'ITEM000001',
                   'ITEM000005'
               ]
           }
       ];
       let expected = [
           'ITEM000000',
           'ITEM000001',
           'ITEM000005'
       ];
       let result = fn.getPromotionsIds(promotions);

       expect(result).toEqual(expected);
   })
});

describe('calculatePromotion',function () {
   it('should return promotiedItems', function () {
       let promotionedId = [
           'ITEM000000',
           'ITEM000001',
           'ITEM000005'
       ];
       let subtotaledItem = [{
           barcode: 'ITEM000001',
           name: 'Ñ©±Ì',
           unit: 'Æ¿',
           price: 3.00,
           count: 3,
           subtotal: 9
       }];
       let expected = [
           {
               barcode: 'ITEM000001',
               name: 'Ñ©±Ì',
               unit: 'Æ¿',
               price: 3.00,
               count: 3,
               subtotal: 9,
               save: 3,
               savedSubtotal: 6
           }
       ];
       let result = fn.calculatePromotion(subtotaledItem,promotionedId)

       expect(result).toEqual(expected);
   })
});

