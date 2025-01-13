let body = $response.body;
if (body) {
    console.log(body);

    function removeAdItems(obj, key, advertiseDesc) {
        if (obj.hasOwnProperty(key)) {
            obj[key] = obj[key].map(item => {
                if (item.hasOwnProperty('items')) {
                    item.items = item.items.filter(subItem => subItem.advertiseDesc !== advertiseDesc);
                }
                return item;
            }).filter(item => item.items && item.items.length > 0);
        }
    }

    try {
        let obj = JSON.parse(body);
        switch (!0) {
            case /^https:\/\/gmart\.creditcard\.ecitic\.com\/citiccard\/yp-market-web-ocp\/v2\/content\/page\/recAd/.test($request.url):
                removeAdItems(obj, 'data', "友鱼首页弹屏广告");
                break;
            case /^https:\/\/gmart\.citiccardcdn\.citicbank\.com\/citiccard\/yp-market-web-ocp\/v2\/content\/v3.0\/home/.test($request.url):
                removeAdItems(obj, 'recAdItemList', "友鱼首页弹屏广告");
                break;
            default:
                $done({});
        }
        body = JSON.stringify(obj);
    } catch (e) {
        console.log("Error processing response: " + e);
    }
}

console.log(body);
$done({ body });