/***********************************************
> 应用名称：爱奇艺去广告脚本
> 脚本作者：huzy96
> 更新时间：2025-04-06
> 特别提醒：如需转载请注明出处，谢谢合作！
***********************************************/

const version = "V1.0.0";

let body = $response.body;
if (body) {
  console.log("原始JSON: " + body);
  switch (!![]) {
    case /https:\/\/cards\.iqiyi\.com\/views_home\/3\.0\/qy_home/.test($request.url):
      try {
        let obj = JSON.parse(body);
        if (obj.cards) {
          for (let i = obj.cards.length - 1; i >= 0; i--) {
            if (obj.cards[i]?.statistics?.ad_type === 'focus') {
              obj.cards.splice(i, 1);
            }
          }
        }
        body = JSON.stringify(obj);
      } catch (s) {
        console.log("首页去广告: " + s);
      }
      break;
    case /https:\/\/cards\.iqiyi\.com\/waterfall\/3\.0\/feed/.test($request.url):
      try {
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
      } catch (s) {
        console.log("瀑布流页面去广告: " + s);
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
