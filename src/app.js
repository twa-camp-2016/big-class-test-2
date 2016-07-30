
const load=require('../spec/fixture');

function splitTags(tags) {
    let result=[];
    result=tags.map((tag)=>{
        let arr=tag.split('-');
        return {
            barcode:arr[0],
            count:parseFloat(arr[1])||1
        }
    });

    return result;
}


module.exports={
 splitTags:splitTags   
}