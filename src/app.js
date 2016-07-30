

function formatBarcodes(tags) {
      return  array=tags.map(function (tag) {
           let bar=tag.split('-');
          return {
              barcode:bar[0],
              amount:parseInt(bar[1])||1
          }
      });
}


function getBarcodeAmount(allTags){
    let countBarcodes=[];
    let exist=0;
    for(let i=0;i<allTags.length;i++)
    {
        for(m of countBarcodes)
        {
            exist=(m.barcode===allTags[i].barcode);
            if(exist)
                break;
        }
        if(exist)
        {
            m.amount+=allTags[i].amount;
        }
        else
        {
            countBarcodes.push({barcode:allTags[i].barcode,amount:allTags[i].amount});
        }
    }
    return countBarcodes;

}
module.exports={formatBarcodes:formatBarcodes,
    getBarcodeAmount:getBarcodeAmount,
}