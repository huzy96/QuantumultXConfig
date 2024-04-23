let body = $response.body;
console.log(body)
let obj = JSON.parse(body);

if (obj.hasOwnProperty('lst')) {
    for (let i = 0; i < obj['lst'].length; i++) {
        if (obj['lst'][i].hasOwnProperty('newAdStyle')) {
            obj['lst'].splice(i, 1);
            i--;
        }
    }
}

if (obj.hasOwnProperty('comments')) {
    if (obj['comments'].hasOwnProperty('lst')) {
        for (let i = 0; i < obj['comments']['lst'].length; i++) {
            if (obj['comments']['lst'][i].hasOwnProperty('newAdStyle')) {
                obj['comments']['lst'].splice(i, 1);
                i--;
            }
        }
    }
}

body = JSON.stringify(obj);
console.log(body);
$done(body);
