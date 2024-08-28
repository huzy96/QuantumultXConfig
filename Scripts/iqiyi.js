let body = $response.body;
console.log(body);
let obj = JSON.parse(body);

if (obj.hasOwnProperty('cards')) {
    for (let i = 0; i < obj['cards'].length; i++) {
        if (obj['cards'][i].hasOwnProperty('statistics')) {
            if (obj['cards'][i]['statistics'].hasOwnProperty('ad_type')) {
                if (obj['cards'][i]['statistics']['ad_type'] === 'focus') {
                    obj['cards'].splice(i, 1);
                    i--;
                }
            }
        }
    }
}

body = JSON.stringify(obj);
console.log(body);
$done(body);