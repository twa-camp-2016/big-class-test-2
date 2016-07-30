
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