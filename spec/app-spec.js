const app=require('../src/app.js');
describe("divideItems",function () {
    it("should return the divided items",function () {
        let inputs=[
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2.5',
            'ITEM000005',
            'ITEM000005-2',
        ];
        let result=app.dividedItems(inputs);
        let expected=[ { barcode: 'ITEM000001', count: 1 },
        { barcode: 'ITEM000001', count: 1 },
        { barcode: 'ITEM000001', count: 1 },
        { barcode: 'ITEM000001', count: 1 },
        { barcode: 'ITEM000001', count: 1 },
        { barcode: 'ITEM000003', count: 2.5 },
        { barcode: 'ITEM000005', count: 1 },
        { barcode: 'ITEM000005', count: 2 } ];
        expect(result).toEqual(expected);
    });
});
describe("computeItems",function () {
    it("should return the compute items",function () {
        let input=[ { barcode: 'ITEM000001', count: 1 },
            { barcode: 'ITEM000001', count: 1 },
            { barcode: 'ITEM000001', count: 1 },
            { barcode: 'ITEM000001', count: 1 },
            { barcode: 'ITEM000001', count: 1 },
            { barcode: 'ITEM000003', count: 2.5 },
            { barcode: 'ITEM000005', count: 1 },
            { barcode: 'ITEM000005', count: 2 } ];
        let result=app.computeItems(input);
        let expected=[ { barcode: 'ITEM000001', amount: 5 },
            { barcode: 'ITEM000003', amount: 1 },
            { barcode: 'ITEM000005', amount: 3 } ];
        expect(result).toEqual(expected);
    });
});

describe("generateItems",function () {
    it("should return the generateItems",function () {
        let input1=[ { barcode: 'ITEM000000', name: '可口可乐', unit: '瓶', price: 3 },
            { barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3 },
            { barcode: 'ITEM000002', name: '苹果', unit: '斤', price: 5.5 },
            { barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15 },
            { barcode: 'ITEM000004', name: '电池', unit: '个', price: 2 },
            { barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.5 } ];
        let input2=[ { barcode: 'ITEM000001', amount: 5 },
            { barcode: 'ITEM000003', amount: 1 },
            { barcode: 'ITEM000005', amount: 3 } ];
        let result=app.generateItems(input2,input1);
        let expected=[{barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3,amount:5},
            {barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15,amount:1},
            {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.5,amount:3}];
        expect(result).toEqual(expected);

    });
})


describe("computeSubtotal",function () {
    it("should return the itemsSubtotal",function () {
        let input1=[{barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3,amount:5},
            {barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15,amount:1},
            {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.5,amount:3}];
        let input2=
        [{
            type: 'BUY_TWO_GET_ONE_FREE',
            barcodes: [
                'ITEM000000',
                'ITEM000001',
                'ITEM000005'
            ]
        }
        ];
        let result=app.computeSubtotal(input1,input2);
        let expected=[{barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3,amount:5,subtotal:12,save:3},
            {barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15,amount:1,subtotal:15,save:0},
            {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.5,amount:3,subtotal:9,save:4.5}];
        expect(result).toEqual(expected);
    });
});


describe("computeTotal",function () {
    it("should return the total and save",function () {
        let itemsSubtotal=[{barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3,amount:5,subtotal:12,save:3},
            {barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15,amount:1,subtotal:15,save:0},
            {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.5,amount:3,subtotal:9,save:4.5}];
        let result=app.computeTotal(itemsSubtotal);
        let expected=[36,7.5];
        expect(result).toEqual(expected);
    });
});

describe("print",function () {
    it("print",function () {
        let itemsSubtotal=[{barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3,amount:5,subtotal:12,save:3},
            {barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15,amount:1,subtotal:15,save:0},
            {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.5,amount:3,subtotal:9,save:4.5}];
        let input=[36,7.5];
        let result=app.print(itemsSubtotal,input);
        let expected=`***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：1斤，单价：15.00(元)，小计：15.00(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：36.00(元)
节省：7.50(元)
**********************`.trim();
        expect(result).toEqual(expected);
    });
});

describe('pos', () => {


    it('should print text', () => {

        const tags = [
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2.5',
            'ITEM000005',
            'ITEM000005-2',
        ];


        let result=app.printReceipt(tags);

        const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：1斤，单价：15.00(元)，小计：15.00(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：36.00(元)
节省：7.50(元)
**********************`.trim();

        expect(result).toEqual(expectText);
    });
});