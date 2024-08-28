let body = $response.body;
if (body) {
    console.log(body);
    switch (!0) {
        case /^https:\/\/gmart\.creditcard\.ecitic\.com\/citiccard\/yp-market-web-ocp\/v2\/content\/page\/recAd/.test($request.url):
            try {
                let obj = JSON.parse(body);
                if (obj.hasOwnProperty('data')) {
                    for (let i = 0; i < obj['data'].length; i++) {
                        if (obj['data'][i].hasOwnProperty('items')) {
                            for (let j = 0; j < obj['data'][i]['items'].length; j++) {
                                if (obj['data'][i]['items'][j].hasOwnProperty('advertiseDesc')) {
                                    if (obj['data'][i]['items'][j]['advertiseDesc'] === "友鱼首页弹屏广告") {
                                        obj['data'][i]['items'].splice(i, 1);
                                        i--;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            catch (i) {
                console.log("bilibili recommend:" + i);
            }
            break;
        case /^https:\/\/gmart\.citiccardcdn\.citicbank\.com\/citiccard\/yp-market-web-ocp\/v2\/content\/v3.0\/home/.test($request.url):
            try {
                let obj = JSON.parse(body);
                if (obj.hasOwnProperty('recAdItemList')) {
                    for (let i = 0; i < obj['recAdItemList'].length; i++) {
                        if (obj['recAdItemList'][i].hasOwnProperty('items')) {
                            for (let j = 0; j < obj['recAdItemList'][i]['items'].length; j++) {
                                if (obj['recAdItemList'][i]['items'][j].hasOwnProperty('advertiseDesc')) {
                                    if (obj['recAdItemList'][i]['items'][j]['advertiseDesc'] === "友鱼首页弹屏广告") {
                                        obj['recAdItemList'][i]['items'].splice(i, 1);
                                        i--;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            catch (i) {
                console.log("bilibili recommend:" + i);
            }
            break;
        default:
            $done({})
    }
    console.log(body);
    $done({
        body
    })
} else $done({});