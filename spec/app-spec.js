const num = require("../src/app.js");
describe('',function(){
    it('',function(){
        let input = [10001-1.5,10002,1003];
        let expected = [{barcode:10001,amount:1.5},{barcode:10002,amount:1},{barcode:10003,amount:1}];
        expect(num.getItemAmount(input)).toEqual(expected);

    })
})
