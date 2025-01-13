let body = $response.body;
console.log(body);
let obj = JSON.parse(body);

if (obj.cards) {
    for (let i = obj.cards.length - 1; i >= 0; i--) {
        if (obj.cards[i]?.statistics?.ad_type === 'focus') {
            obj.cards.splice(i, 1);
        }
    }
}

body = JSON.stringify(obj);
console.log(body);
$done(body);