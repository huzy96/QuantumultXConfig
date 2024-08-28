let body = $response.body;
console.log(body);
let obj = JSON.parse(body);

if (obj.hasOwnProperty('data')) {
    if (obj['data'].hasOwnProperty('nodes')) {
        for (let i = 0; i < obj['data']['nodes'].length; i++) {
            if (obj['data']['nodes'][i].hasOwnProperty('nodes')) {
                for (let j = 0; j < obj['data']['nodes'][i]['nodes'].length; j++) {
                    if (obj['data']['nodes'][i]['nodes'][j].hasOwnProperty('data')) {
                        if (obj['data']['nodes'][i]['nodes'][j]['data'].hasOwnProperty('componentId')) {
                            if (obj['data']['nodes'][i]['nodes'][j]['data']['componentId'] === "tpp_banner_loop") {
                                if (obj['data']['nodes'][i]['nodes'][j].hasOwnProperty('nodes')) {
                                    for (let k = 0; k < obj['data']['nodes'][i]['nodes'][j]['nodes'].length; k++) {
                                        if (obj['data']['nodes'][i]['nodes'][j]['nodes'][k].hasOwnProperty('data')) {
                                            if (obj['data']['nodes'][i]['nodes'][j]['nodes'][k]['data'].hasOwnProperty('exposeTrackingUrlList')) {
                                                obj['data']['nodes'][i]['nodes'][j]['nodes'].splice(k, 1);
                                                k--;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

body = JSON.stringify(obj);
console.log(body);
$done(body);