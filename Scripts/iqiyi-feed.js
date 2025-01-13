let body = $response.body;
console.log(body);
let obj = JSON.parse(body);

function removeAd(card) {
    if (!card.hasOwnProperty('blocks')) return;

    for (let [index, block] of card.blocks.entries()) {
        if (block.hasOwnProperty('buttons')) {
            for (let button of block.buttons) {
                if (button.actions?.click_event?.data?.pop_content?.includes('屏蔽此广告')) {
                    card.blocks.splice(index, 1);
                    return true; // 找到并移除后退出
                }
            }
        }
    }
}

if (obj.hasOwnProperty('cards')) {
    for (let card of obj.cards) {
        if (removeAd(card)) break; // 移除一个广告后退出循环
    }
}

body = JSON.stringify(obj);
console.log(body);
$done(body);