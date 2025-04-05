/***********************************************
> 应用名称：脉脉去广告脚本
> 脚本作者：huzy96
> 更新时间：2025-04-06
> 特别提醒：如需转载请注明出处，谢谢合作！
***********************************************/

const version = "V1.0.0";

let body = $response.body;
if (body) {
  console.log("原始JSON: " + body);
  switch (!![]) {
    case /https:\/\/h3\.open\.taou\.com\/maimai\/gossip\/v3\/company_circle_feeds/.test($request.url):
      try {
        let obj = JSON.parse(body);
        function removeAds(array) {
          if (!array) return [];
          return array.filter(item => !item?.newAdStyle);
        }
        obj.lst = removeAds(obj.lst);
        obj.comments?.lst && (obj.comments.lst = removeAds(obj.comments.lst));
        body = JSON.stringify(obj);
      } catch (s) {
        console.log("公司圈帖子去广告: " + s);
      }
      break;
    case /https:\/\/h3\.open\.taou\.com\/maimai\/(feed\/v6\/feed_detail_comment|gossip\/v3\/gossip_detail_comment)/.test($request.url):
      try {
        let obj = JSON.parse(body);
        function removeAds(array) {
          if (!array) return;
          for (let i = array.length - 1; i >= 0; i--) {
            if (array[i]?.newAdStyle) {
              array.splice(i, 1);
            }
          }
        }
        removeAds(obj.lst);
        removeAds(obj.comments?.lst);
        body = JSON.stringify(obj);
      } catch (s) {
        console.log("评论区去广告: " + s);
      }
      break;
    case /https:\/\/h3\.open\.taou\.com\/maimai\/feed\/v5\/focus_feed/.test($request.url):
      try {
        let obj = JSON.parse(body);
        if (obj.feeds) {
          for (let i = obj.feeds.length - 1; i >= 0; i--) {
            if (obj.feeds[i]?.newAdStyle) {
              obj.feeds.splice(i, 1);
            }
          }
        }
        body = JSON.stringify(obj);
      } catch (s) {
        console.log("推荐页去广告: " + s);
      }
      break;
    default:
      $done({});
      break;
  }
  console.log("处理后JSON: " + body);
  $done({ body: body });
} else {
  $done({});
}