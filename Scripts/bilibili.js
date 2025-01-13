/***********************************************
 > 应用名称：墨鱼自用B站去广告脚本
 > 脚本作者：@ddgksf2013
 > 微信账号：墨鱼手记
 > 更新时间：2024-05-10
 > 通知频道：https://t.me/ddgksf2021
 > 贡献投稿：https://t.me/ddgksf2013_bot
 > 问题反馈：ddgksf2013@163.com
 > 特别提醒：如需转载请注明出处，谢谢合作！
 ***********************************************/

const version = 'V2.0.120';

let body = $response.body;
if (body) {
    console.log('Original Body:', body);

    function processResponse(urlPattern, processor) {
        if (urlPattern.test($request.url)) {
            try {
                let parsedBody = JSON.parse(body);
                processor(parsedBody);
                body = JSON.stringify(parsedBody);
            } catch (error) {
                console.log(`Error processing ${urlPattern}:`, error);
            }
            return true;
        }
        return false;
    }

    if (!processResponse(/pgc\/season\/app\/related\/recommend\?/, t => {
        t.result?.cards && (t.result.cards = t.result.cards.filter(card => card.type !== 2));
    }) &&
        !processResponse(/^https?:\/\/app\.bilibili\.com\/x\/resource\/show\/skin\?/, a => {
            delete a.data?.common_equip;
        }) &&
        !processResponse(/^https:\/\/app\.bilibili\.com\/x\/v2\/feed\/index\?/, s => {
            s.data.items = s.data.items.filter(item =>
                item.hasOwnProperty("banner_item") ?
                    item.banner_item.filter(subItem => !subItem.ad_banner) :
                    (item.hasOwnProperty("ad_info") || item.card_goto?.indexOf("ad") !== -1 || ["small_cover_v2", "large_cover_v1", "large_cover_single_v9"].includes(item.card_type))
            );
        }) &&
        !processResponse(/^https?:\/\/app\.bilibili\.com\/x\/v2\/feed\/index\/story\?/, r => {
            r.data.items = r.data.items.filter(item => !item.hasOwnProperty("ad_info") && item.card_goto?.indexOf("ad") === -1);
        }) &&
        !processResponse(/^https?:\/\/app\.bilibili\.com\/x\/v\d\/account\/teenagers\/status\?/, n => {
            n.data.teenagers_status = 0;
        }) &&
        !processResponse(/^https?:\/\/app\.bilibili\.com\/x\/resource\/show\/tab/, h => {
            if (h.data.top) {
                h.data.top = h.data.top.filter(t => t.name === "消息");
            }
        }) &&
        !processResponse(/^https?:\/\/app\.bilibili\.com\/x\/v2\/account\/mine/, v => {
            const idSet = new Set([396, 397, 398, 399, 407, 410, 402, 404, 425, 426, 427, 428, 430, 432, 433, 434, 494, 495, 496, 497, 500, 501, 2830, 3072, 3084]);
            v.data.sections_v2.forEach(section => {
                section.items = section.items.filter(item => idSet.has(item.id));
                section.button = {};
                delete section.be_up_title;
                delete section.tip_icon;
                delete section.tip_title;
                if ("创作中心" == section.title || "創作中心" == section.title) {
                    delete section.title;
                    delete section.type;
                }
            });
            delete v.data.vip_section_v2;
            delete v.data.vip_section;
            v.data.live_tip = {};
            v.data.answer = {};
            if (!v.data.vip.status) {
                v.data.vip.type = 2;
                v.data.vip.status = 1;
                v.data.vip.vip_pay_type = 1;
                v.data.vip.due_date = 466982416e4;
            }
        }) &&
        !processResponse(/^https?:\/\/api\.live\.bilibili\.com\/xlive\/app-room\/v1\/index\/getInfoByRoom/, x => {
            x.data.activity_banner_info = null;
            x.data.shopping_info = { is_show: 0 };
            x.data.new_tab_info?.outer_list && (x.data.new_tab_info.outer_list = x.data.new_tab_info.outer_list.filter(t => t.biz_id !== 33));
        }) &&
        !processResponse(/^https?:\/\/app\.bilibili\.com\/x\/resource\/top\/activity/, w => {
            w.data && (w.data.hash = "ddgksf2013", w.data.online.icon = "");
        }) &&
        !processResponse(/ecommerce-user\/get_shopping_info\?/, P => {
            P.data = {
                shopping_card_detail: {},
                bubbles_detail: {},
                recommend_card_detail: {},
                selected_goods: {},
                h5jump_popup: []
            };
        }) &&
        !processResponse(/^https?:\/\/app\.bilibili\.com\/x\/v2\/search\/square/, j => {
            j.data = {
                type: "history",
                title: "搜索历史",
                search_hotword_revision: 2
            };
        }) &&
        !processResponse(/https?:\/\/app\.bilibili\.com\/x\/v2\/account\/myinfo\?/, E => {
            if (!E.data.vip.status) {
                E.data.vip.type = 2;
                E.data.vip.status = 1;
                E.data.vip.vip_pay_type = 1;
                E.data.vip.due_date = 466982416e4;
            }
        }) &&
        !processResponse(/pgc\/page\/(bangumi|cinema\/tab\?)/, B => {
            B.result.modules.forEach(module => {
                if (module.style.startsWith("banner")) {
                    module.items = module.items.filter(item => item.link.includes("play"));
                } else if (module.style.startsWith("function")) {
                    module.items = module.items.filter(item => !item.blink.includes("bilibili.com"));
                    if ([1283, 241, 1441, 1284].includes(module.module_id)) {
                        module.items = [];
                    }
                } else if (module.style.startsWith("tip")) {
                    module.items = [];
                }
            });
        }) &&
        !processResponse(/^https:\/\/app\.bilibili\.com\/x\/v2\/splash\/list/, R => {
            if (R.data && R.data.list) {
                for (let splash of R.data.list) {
                    splash.duration = 0;
                    splash.begin_time = 2240150400;
                    splash.end_time = 2240150400;
                }
            }
        }) &&
        !processResponse(/^https:\/\/api\.live\.bilibili\.com\/xlive\/app-interface\/v2\/index\/feed/, obj => {
            obj.data.card_list.forEach(card => {
                if (card.card_type === 'banner_v1') {
                    card.card_data.banner_v1.list = card.card_data.banner_v1.list.filter(banner => banner.ad_transparent_content === null);
                }
            });
        })
    ) {
        // 如果没有匹配任何case，默认返回空对象
        $done({});
    }
}

console.log('Modified Body:', body);
$done({ body });