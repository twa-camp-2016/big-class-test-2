function formatTags(tags) {
    return tags.map(c=> {
        let temp = c.split('-');
        return {
            barcode: temp[0],
            amount: Number(temp[1]) || 1
        };
    });
}
module.exports = {
    formatTags: formatTags
};