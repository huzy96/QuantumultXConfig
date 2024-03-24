let body = $response.body;
console.log(body)
let obj = JSON.parse(body);

if (obj.hasOwnProperty('data')) {
    for (let i = 0; i < obj['data'].length; i++) {
        if (obj['data'][i].hasOwnProperty('newAdStyle')) {
            obj['data'].splice(i, 1);
            i--;
        }
    }
}

body = JSON.stringify(obj);
console.log(body);
$done(body);