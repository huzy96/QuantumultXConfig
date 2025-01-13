let body = $response.body;
console.log('Original Body:', body);
let obj = JSON.parse(body);

if (obj.feeds) {
    for (let i = obj.feeds.length - 1; i >= 0; i--) {
        if (obj.feeds[i]?.newAdStyle) {
            obj.feeds.splice(i, 1);
        }
    }
}

body = JSON.stringify(obj);
console.log('Modified Body:', body);
$done(body);