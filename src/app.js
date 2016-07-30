
const load=require('../spec/fixture');

function splitTags(tags) {
    let splitedTags=[];
    splitedTags=tags.map((tag)=>{
        let arr=tag.split('-');
        return {
            barcode:arr[0],
            count:parseFloat(arr[1])||1
        }
    });

    return splitedTags;
}

function getCount(formatedTags) {
    let countedItems = [];
    countedItems = formatedTags.reduce(function (cur, newArr) {
        let exist = cur.find(function (item) {
            return item.barcode === newArr.barcode;
        });
        if (!exist) {
            exist = Object.assign({}, newArr, {count: 0});
            cur.push(exist);
        }
        exist.count += newArr.count;
        return cur;
    }, []);

    return countedItems;
}


module.exports={
 splitTags:splitTags,
    getCount:getCount
};