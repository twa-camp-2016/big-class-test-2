'use strict';

const method=require('../src/app');

describe('getCartItems',function () {
    it('getCartItems',function () {
        let input=['ITEM003-2'];
        let result=method.getCartItems(input);
        expect(result).toEqual([{barcode:'ITEM003',amount:2}]);
    })
})

describe('calAmountItems',function () {
    it ('calAmountItems',function () {
        let input=[{barcode:'ITEM003',amount:2},
            {barcode:'ITEM001',amount:1}
            ,{barcode:'ITEM001',amount:1}];
        let result=method.calAmountItems(input);
        expect(result).toEqual([{barcode:'ITEM003',amount:2},
            {barcode:'ITEM001',amount:2}]);
    })
})

describe('matchPromotionType',function () {
    it('matchPromotionType',function () {
        let input=[{barcode:'ITEM003',amount:2},
            {barcode:'ITEM001',amount:2}];
        let input1=[
            {
                type: 'BUY_TWO_GET_ONE_FREE',
                barcodes: [
                    'ITEM000',
                    'ITEM001',
                    'ITEM005'
                ]
            }
        ];
        let result=method.matchPromotionType(input,input1);
        expect(result).toEqual([{barcode:'ITEM003',amount:2,type:''},
            {barcode:'ITEM001',amount:2,type:'BUY_TWO_GET_ONE_FREE'}]);
    })
})

describe('matchAllItems',function () {
    it ('matchAllItems',function () {
        let input=[{barcode:'ITEM003',amount:2,type:''}];
        let input1=[
            {
                barcode: 'ITEM000',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00
            },
            {
                barcode: 'ITEM001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00
            },
            {
                barcode: 'ITEM002',
                name: '苹果',
                unit: '斤',
                price: 5.50
            },
            {
                barcode: 'ITEM003',
                name: '荔枝',
                unit: '斤',
                price: 15.00
            },
            {
                barcode: 'ITEM004',
                name: '电池',
                unit: '个',
                price: 2.00
            },
            {
                barcode: 'ITEM005',
                name: '方便面',
                unit: '袋',
                price: 4.50
            }
        ];
        let result= method.matchAllItems(input,input1)
            expect(result).toEqual([{barcode:'ITEM003',amount:2,type:'',
                name: '荔枝',
                unit: '斤',
                price: 15.00}]);
    })
})

describe('calSavingList',function () {
    it('calSavingList',function () {
        let input=[{
            barcode:'ITEM003',
            amount:2,
            type:'',
            name: '荔枝',
            unit: '斤',
            price: 15.00},
            {
            barcode: 'ITEM005',
                type:'BUY_TWO_GET_ONE_FREE',
                amount:3,
            name: '方便面',
            unit: '袋',
            price: 4.50
        }];
        let result=method.calSavingList(input);
        expect(result).toEqual([{
            barcode:'ITEM003',
            amount:2,
            type:'',
            name: '荔枝',
            unit: '斤',
            price: 15.00,
            saving:0
        },
            {
                barcode: 'ITEM005',
                type:'BUY_TWO_GET_ONE_FREE',
                amount:3,
                name: '方便面',
                unit: '袋',
                price: 4.50,
                saving:4.50
            }])
    })
})


describe('calSubtotalList',function () {
    it('calSubtotalList', function () {
        let input = [{
            barcode: 'ITEM003',
            amount: 2,
            type: '',
            name: '荔枝',
            unit: '斤',
            price: 15.00,
            saving: 0
        },
            {
                barcode: 'ITEM005',
                type: 'BUY_TWO_GET_ONE_FREE',
                amount: 3,
                name: '方便面',
                unit: '袋',
                price: 4.50,
                saving: 4.50
            }];
        let result = method.calSubtotalList(input);
        expect(result).toEqual([{
            barcode: 'ITEM003',
            amount: 2,
            type: '',
            name: '荔枝',
            unit: '斤',
            price: 15.00,
            saving: 0,
            subtotal: 30.00
        },
            {
                barcode: 'ITEM005',
                type: 'BUY_TWO_GET_ONE_FREE',
                amount: 3,
                name: '方便面',
                unit: '袋',
                price: 4.50,
                saving: 4.50,
                subtotal: 9.00
            }]);
    })
})

describe('calTotal',function () {
    it ('calTotal',function () {
        let input=[{
            barcode: 'ITEM003',
            amount: 2,
            type: '',
            name: '荔枝',
            unit: '斤',
            price: 15.00,
            saving: 0,
            subtotal: 30.00
        },
            {
                barcode: 'ITEM005',
                type: 'BUY_TWO_GET_ONE_FREE',
                amount: 3,
                name: '方便面',
                unit: '袋',
                price: 4.50,
                saving: 4.50,
                subtotal: 9.00
            }];
        let result=method.calTotal(input);
        expect(result).toEqual(39.00);
    })
})

describe('calWholeSaving',function () {
    it ('calWholeSaving',function () {
        let input=[{
            barcode: 'ITEM003',
            amount: 2,
            type: '',
            name: '荔枝',
            unit: '斤',
            price: 15.00,
            saving: 0,
            subtotal: 30.00
        },
            {
                barcode: 'ITEM005',
                type: 'BUY_TWO_GET_ONE_FREE',
                amount: 3,
                name: '方便面',
                unit: '袋',
                price: 4.50,
                saving: 4.50,
                subtotal: 9.00
            }];
        let result=method.calWholeSaving(input);
        expect(result).toEqual(4.50);
    })
})