'use strict';
const app = require('../src/app.js');

describe('formatTags test',function(){
    it('type one test',function(){
        let input = [
            'ITEM000001',
            'ITEM000003-2',
            'ITEM000005',
            'ITEM000005'
        ];
        let result = app.formatTags(input);
        expect(result).toEqual( [
            {
                barcode:'ITEM000001',
                amount:1
            },
            {
                barcode:'ITEM000003',
                amount:2
            },
            {
                barcode:'ITEM000005',
                amount:1
            },
            {
                barcode:'ITEM000005',
                amount:1
            }]);
    });
});

describe('mergeBarcodes test',function(){
    it('type one test',function(){
        let input = [
            {
                barcode:'ITEM000001',
                amount:1
            },
            {
                barcode:'ITEM000003',
                amount:2
            },
            {
                barcode:'ITEM000005',
                amount:1
            },
            {
                barcode:'ITEM000005',
                amount:1
            }];
        let result = app.mergeBarcodes(input);
        expect(result).toEqual([
            {
                barcode:'ITEM000001',
                amount:1
            },
            {
                barcode:'ITEM000003',
                amount:2
            },
            {
                barcode:'ITEM000005',
                amount:2
            }]);
    });
});
describe('matchProType test',function(){
    it('type one test',function(){
        let input1 = [{
            barcode:'ITEM000001',
            amount:1
        },
            {
                barcode:'ITEM000003',
                amount:2
            },
            {
                barcode:'ITEM000005',
                amount:2
            }];
        let input2 =[
            {
                type: 'BUY_TWO_GET_ONE_FREE',
                barcodes: [
                    'ITEM000000',
                    'ITEM000001',
                    'ITEM000005'
                ]
            }
        ];
        let result = app.matchProType(input1,input2);
        expect(result).toEqual([{
            barcode:'ITEM000001',
            amount:1,
            type:'BUY_TWO_GET_ONE_FREE'
        },
            {
                barcode:'ITEM000003',
                amount:2,
                type:'-1'

            },
            {
                barcode:'ITEM000005',
                amount:2,
                type:'BUY_TWO_GET_ONE_FREE'
            }]);
    });
});
describe('getCartItems test',function(){
    it('type one test',function(){
        let proItems = [{
            barcode:'ITEM000001',
            amount:1,
            type:'BUY_TWO_GET_ONE_FREE'
        },
            {
                barcode:'ITEM000003',
                amount:2,
                type:'-1'

            },
            {
                barcode:'ITEM000005',
                amount:2,
                type:'BUY_TWO_GET_ONE_FREE'
            }];
        let allItems = [
            {
                barcode: 'ITEM000000',
                name: '¿É¿Ú¿ÉÀÖ',
                unit: 'Æ¿',
                price: 3.00
            },
            {
                barcode: 'ITEM000001',
                name: 'Ñ©±Ì',
                unit: 'Æ¿',
                price: 3.00
            },
            {
                barcode: 'ITEM000002',
                name: 'Æ»¹û',
                unit: '½ï',
                price: 5.50
            },
            {
                barcode: 'ITEM000003',
                name: 'ÀóÖ¦',
                unit: '½ï',
                price: 15.00
            },
            {
                barcode: 'ITEM000004',
                name: 'µç³Ø',
                unit: '¸ö',
                price: 2.00
            },
            {
                barcode: 'ITEM000005',
                name: '·½±ãÃæ',
                unit: '´ü',
                price: 4.50
            }
        ];
        let result = app.getCartItems(proItems,allItems);
        expect(result).toEqual([{
            barcode:'ITEM000001',
            name: 'Ñ©±Ì',
            unit: 'Æ¿',
            price: 3.00,
            amount:1,
            type:'BUY_TWO_GET_ONE_FREE'
        },
            {
                barcode:'ITEM000003',
                name: 'ÀóÖ¦',
                unit: '½ï',
                price: 15.00,
                amount:2,
                type:'-1'

            },
            {
                barcode:'ITEM000005',
                name: '·½±ãÃæ',
                unit: '´ü',
                price: 4.50,
                amount:2,
                type:'BUY_TWO_GET_ONE_FREE'
            }]);
    });
});
describe('total test',function(){
    it('type one test',function(){
        let input =[{
            barcode:'ITEM000001',
            name: 'Ñ©±Ì',
            unit: 'Æ¿',
            price: 3.00,
            amount:1,
            type:'BUY_TWO_GET_ONE_FREE',
            subtotal:3
        },
            {
                barcode:'ITEM000003',
                name: 'ÀóÖ¦',
                unit: '½ï',
                price: 15.00,
                amount:2,
                type:'-1',
                subtotal:30

            },
            {
                barcode:'ITEM000005',
                name: '·½±ãÃæ',
                unit: '´ü',
                price: 4.50,
                amount:2,
                type:'BUY_TWO_GET_ONE_FREE',
                subtotal:9
            }];
        let result = app.total(input);
        expect(result).toEqual(42);
    });
});
describe('getPromotions',function(){
    fit('',function(){

        let result = app.getPromotions(4,8);
        expect(result).toEqual(4);
    });
});
describe('',function(){
    it('',function(){
        let input = '';
        let result = '';
        expect(result).toEqual();
    });
});

describe('',function(){
    it('',function(){
        let input = '';
        let result = '';
        expect(result).toEqual();
    });
});