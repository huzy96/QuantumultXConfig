let body = $response.body;
console.log(body);
let obj = JSON.parse(body);

for (let i = 0; i < obj['feeds'].length; i++) {
    if (obj['feeds'][i].hasOwnProperty('newAdStyle')) {
        obj['feeds'].splice(i, 1);
        i--;
    }
}

body = JSON.stringify(obj);
console.log(body);
$done(body);