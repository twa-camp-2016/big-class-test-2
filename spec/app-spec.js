const test=require("../src/app.js")
describe("formatInput",function () {
    fit("format the input",function () {
        let input=['ITEM000001', 'ITEM000001',
            'ITEM000003-3','ITEM000005-3',
            'ITEM000005','ITEM000005',
            ];
        let result=[{barcode:'ITEM000001',amount:1},
                    {barcode:'ITEM000001',amount:1},
                    {barcode:'ITEM000003',amount:3},
                    {barcode:'ITEM000005',amount:3},
                    {barcode:'ITEM000005',amount:1},
                    {barcode:'ITEM000005',amount:1}
        ];
        let temp=test.test_1(input);
        expect(temp).toEqual(result);
    });
});

describe("mergeItems",function () {
    fit("merge the items",function () {
        let input=[
            {barcode:'ITEM000001',amount:1},
            {barcode:'ITEM000003',amount:3},
            {barcode:'ITEM000005',amount:5}
        ];
        let result=[
            {barcode:'ITEM000001',name: '雪碧', unit: '瓶', price: 3.00,amount:1},
            {barcode:'ITEM000003',name: '荔枝', unit: '斤', price: 15.00,amount:3},
            {barcode:'ITEM000005',name: '方便面', unit: '袋', price: 4.50,amount:5}
        ];
        let temp=test.test_3(input);
        expect(temp).toEqual(result);
    });
});


describe("mergeItems",function () {
    fit("merge the items",function () {
        let input=[{barcode:'ITEM000001',amount:1},
            {barcode:'ITEM000001',amount:1},
            {barcode:'ITEM000003',amount:3},
            {barcode:'ITEM000005',amount:3},
            {barcode:'ITEM000005',amount:1},
            {barcode:'ITEM000005',amount:1}
        ];
        let result=[
            {barcode:'ITEM000001',amount:1},
            {barcode:'ITEM000003',amount:3},
            {barcode:'ITEM000005',amount:5}
        ];
        let temp=test.test_2(input);
        expect(temp).toEqual(result);
    });
});