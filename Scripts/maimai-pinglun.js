let body = $response.body;
console.log(body);
let obj = JSON.parse(body);

function removeAds(array) {
    if (!array) return;
    for (let i = array.length - 1; i >= 0; i--) {
        if (array[i]?.newAdStyle) {
            array.splice(i, 1);
        }
    }
}

removeAds(obj.lst);
removeAds(obj.comments?.lst);

body = JSON.stringify(obj);
console.log(body);
$done(body);