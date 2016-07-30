
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
                name: '可口可乐',
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
})