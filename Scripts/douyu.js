let body = $response.body;
console.log(body);
let obj = JSON.parse(body);

if (obj.hasOwnProperty('data')) {
    if (obj['data'].hasOwnProperty('rec_card')) {
        for (let i = 0; i < obj['data']['rec_card'].length; i++) {
            if (obj['data']['rec_card'][i].hasOwnProperty('card_banner')) {
                for (let j = 0; j < obj['data']['rec_card'][i]['card_banner'].length; j++) {
                    if (obj['data']['rec_card'][i]['card_banner'][j].hasOwnProperty('ad')) {
                        obj['data']['rec_card'][i]['card_banner'].splice(j, 1);
                        j--
                    }
                }
            }
        }
    }
    if (obj['data'].hasOwnProperty('rec_cont')) {
        for (let i = 0; i < obj['data']['rec_cont'].length; i++) {
            if (obj['data']['rec_cont'][i].hasOwnProperty('ad')) {
                obj['data']['rec_cont'].splice(i, 1);
                i--;
            }
        }
    }
}

body = JSON.stringify(obj);
console.log(body);
$done(body);