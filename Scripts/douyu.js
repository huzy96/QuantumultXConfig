let body = $response.body;
console.log(body);
let obj = JSON.parse(body);

function removeAdsFromArray(array, key) {
    return array.filter(item => !item[key]);
}

function removeAdsFromRecCard(recCard) {
    return recCard.map(card => {
        if (card.card_banner) {
            card.card_banner = removeAdsFromArray(card.card_banner, 'ad');
        }
        return card;
    });
}

if (obj.data) {
    if (obj.data.rec_card) {
        obj.data.rec_card = removeAdsFromRecCard(obj.data.rec_card);
    }
    if (obj.data.rec_cont) {
        obj.data.rec_cont = removeAdsFromArray(obj.data.rec_cont, 'ad');
    }
}

body = JSON.stringify(obj);
console.log(body);
$done(body);