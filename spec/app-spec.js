'use strict'
const app=require('../src/app');


describe('splitTags',function () {
    it("should split tags into two parts if it has '-' ",function () {
        let tags=[/*
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            ,'ITEM000001',
         'ITEM000003-2',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005'
        */'ITEM000001',
            'ITEM000003-2']
        let result=app.splitTags(tags);

        expect(result).toEqual([
            {
                barcode:'ITEM000001',
                count:1
            },{
            barcode:'ITEM000003',
            count:2
        }
        ])

    })
});

describe('getCount',function () {
    it("should compute items number in total",function () {
        let splitedTags=[

            {
                barcode:'ITEM000001',
                count:1
            },{
                barcode:'ITEM000003',
                count:2
            },
            {
                barcode:'ITEM000001',
                count:1
            }

        ];
        let result=app.getCount(splitedTags);
        
        expect(result).toEqual([
            {
                barcode:'ITEM000001',
                count:2
            },{
                barcode:'ITEM000003',
                count:2
            }
        ])
    })
});

describe('getType',function () {
    it("should add type after countedItems",function () {
        let countedItems=[

            {
                barcode:'ITEM000001',
                count:2
            },{
                barcode:'ITEM000003',
                count:2
            }

        ];
        let result=app.getType(countedItems);
        
        expect(result).toEqual([

            {
                barcode:'ITEM000001',
                count:2,
                type: 'BUY_TWO_GET_ONE_FREE'
                
            },{
                barcode:'ITEM000003',
                count:2,
                type:'other'
            }

        ]);
    });
});

describe('getCartItems',function () {
    it("should get cartItems information ",function () {
        let hasTypeItems=[
            {
                barcode:'ITEM000001',
                count:2,
                type: 'BUY_TWO_GET_ONE_FREE'

            },{
                barcode:'ITEM000003',
                count:2,
                type:'other'
            }
        ];
        let result=app.getCartItems(hasTypeItems);
        expect(result).toEqual([
            {
                barcode:'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                count:2,
                type: 'BUY_TWO_GET_ONE_FREE'

            },{
                barcode:'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                count:2,
                type:'other'
            }
        ])
    })
});


describe("getDiscount",function () {
    it("should get discount",function () {
        let cartItems=[
            {
                barcode:'ITEM000001',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00,
                count:3,
                type: 'BUY_TWO_GET_ONE_FREE'

            },{
                barcode:'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                count:2,
                type:'other'
            }
        ];
        let result=app.getDiscount(cartItems);
        expect(result).toEqual([
            {
                barcode:'ITEM000001',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00,
                count:3,
                type: 'BUY_TWO_GET_ONE_FREE',
                subtotal:6.00

            },{
                barcode:'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                count:2,
                type:'other',
                subtotal:30.00
            }
        ]);
    })
});

describe("getTotal",function () {
    it("should get total",function () {
        let hasSubtotal=[
            {
                barcode:'ITEM000001',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00,
                count:3,
                type: 'BUY_TWO_GET_ONE_FREE',
                subtotal:6.00

            },{
                barcode:'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                count:2,
                type:'other',
                subtotal:30.00
            }
        ];

        let result=app.getTotal(hasSubtotal);

        expect(result).toEqual(36);
    })
});


describe("getSavedMoney",function () {
    it("should get saved money",function () {
        let hasSubtotal=[
            {
                barcode:'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                count:3,
                type: 'BUY_TWO_GET_ONE_FREE',
                subtotal:6.00

            },{
                barcode:'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                count:2,
                type:'other',
                subtotal:30.00
            }
        ];

        let result=app.getSavedMoney(hasSubtotal);

        expect(result).toEqual(3);
    })
});


describe('print',function () {
    it('should print result',function () {
        let tags=[
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005'
        ];
        let result=app.print(tags);
        expect(result).toEqual('***<没钱赚商店>收据***\n'+
    '名称：雪碧，数量：5瓶，单价：3(元)，小计：12(元)\n'+
    '名称：荔枝，数量：2斤，单价：15(元)，小计：30(元)\n'+
    '名称：方便面，数量：3袋，单价：4.5(元)，小计：9(元)\n'+
    '----------------------\n'+
    '总计：51(元)\n'+
    '节省：7.5(元)\n'+
   ' **********************\n');
    });
});
