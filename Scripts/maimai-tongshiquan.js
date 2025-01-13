let body = $response.body;
console.log('Original Body:', body);

let obj = JSON.parse(body);

function removeAds(array) {
    if (!array) return [];
    return array.filter(item => !item?.newAdStyle);
}

obj.lst = removeAds(obj.lst);
obj.comments?.lst && (obj.comments.lst = removeAds(obj.comments.lst));

body = JSON.stringify(obj);
console.log('Modified Body:', body);
$done(body);