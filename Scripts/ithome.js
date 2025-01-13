let body = $response.body;
console.log(body);
let obj = JSON.parse(body);

function removeAdsFromFocusNewsData(feedContent) {
    if (feedContent.hasOwnProperty('focusNewsData')) {
        feedContent['focusNewsData'] = feedContent['focusNewsData'].filter(item => !item['isAd']);
    }
}

function removeFeedByType(feedList, type) {
    return feedList.filter(item => item['feedType'] !== type);
}

function removeFeedBySmallTags(feedList) {
    return feedList.filter(item => {
        if (!item['feedContent'].hasOwnProperty('smallTags')) return true;
        return !item['feedContent']['smallTags'].some(tag => tag.hasOwnProperty('text') && tag['text'] === '广告');
    });
}

function removeFeedByContent(feedList) {
    return feedList.filter(item => !item['feedContent'].hasOwnProperty('content') || !item['feedContent']['content'].includes('【广告】'));
}

obj['data']['list'].forEach(feed => {
    removeAdsFromFocusNewsData(feed['feedContent']);
});

obj['data']['list'] = removeFeedByType(obj['data']['list'], 10004);
obj['data']['list'] = removeFeedBySmallTags(obj['data']['list']);
obj['data']['list'] = removeFeedByContent(obj['data']['list']);

body = JSON.stringify(obj);
console.log(body);
$done(body);