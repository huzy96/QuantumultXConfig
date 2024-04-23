let body = $response.body;
console.log(body);
let obj = JSON.parse(body);

for (let i = 0; i < obj['data']['list'].length; i++) {
    if (obj['data']['list'][i]['feedContent'].hasOwnProperty('focusNewsData')) {
        for (let j = 0; j < obj['data']['list'][i]['feedContent']['focusNewsData'].length; j++) {
            if (obj['data']['list'][i]['feedContent'].hasOwnProperty('focusNewsData')) {
                if (obj['data']['list'][i]['feedContent']['focusNewsData'][j].hasOwnProperty('isAd')) {
                    if (obj['data']['list'][i]['feedContent']['focusNewsData'][j]['isAd'] === true) {
                        obj['data']['list'][i]['feedContent']['focusNewsData'].splice(j, 1);
                        j--
                        continue
                    }
                }
            }
        }
        continue
    }
    if (obj['data']['list'][i]['feedType'] === 10004) {
        obj['data']['list'].splice(i, 1);
        i--;
        continue
    }
    if (obj['data']['list'][i]['feedContent'].hasOwnProperty('smallTags')) {
        let isDone = false
        for (let j = 0; j < obj['data']['list'][i]['feedContent']['smallTags'].length; j++) {
            if (obj['data']['list'][i]['feedContent']['smallTags'][j].hasOwnProperty('text') && obj['data']['list'][i]['feedContent']['smallTags'][j]['text'] === '广告') {
                obj['data']['list'].splice(i, 1)
                i--
                isDone = true
                break
            }
        }
        if (isDone === true) {
            continue
        }
    }
    if (obj['data']['list'][i]['feedContent'].hasOwnProperty('content') && obj['data']['list'][i]['feedContent']['content'].includes('【广告】')) {
        obj['data']['list'].splice(i, 1);
        i--;
    }
}

body = JSON.stringify(obj);
console.log(body);
$done(body);
