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
    console.log(body);
    switch (!0) {
        case /pgc\/season\/app\/related\/recommend\?/.test($request.url):
            try {
                let t = JSON.parse(body);
                t.result?.cards?.length && (t.result.cards = t.result.cards.filter(t => 2 != t.type));
                body = JSON.stringify(t);
            } catch (i) {
                console.log("bilibili recommend:" + i);
            }
            break;
        case /^https?:\/\/app\.bilibili\.com\/x\/resource\/show\/skin\?/.test($request.url):
            try {
                let a = JSON.parse(body);
                delete a.data?.common_equip;
                body = JSON.stringify(a);
            } catch (e) {
                console.log("bilibili skin:" + e);
            }
            break;
        case /^https:\/\/app\.bilibili\.com\/x\/v2\/feed\/index\?/.test($request.url):
            try {
                let s = JSON.parse(body);
                let l = [];
                for (let o of s.data.items)
                    if (!o.hasOwnProperty("banner_item")) {
                        if (!(!o.hasOwnProperty("ad_info") && -1 === o.card_goto?.indexOf("ad") && ["small_cover_v2", "large_cover_v1", "large_cover_single_v9"].includes(o.card_type))) continue;
                        else l.push(o);
                    } else {
                        let m = [];
                        for (let item of o.banner_item) {
                            if (item.hasOwnProperty("ad_banner")) continue;
                            else m.push(item)
                        }
                        o.banner_item = m;
                        l.push(o);
                    }
                s.data.items = l;
                body = JSON.stringify(s);
            } catch (d) {
                console.log("bilibili index:" + d);
            }
            break;
        case /^https?:\/\/app\.bilibili\.com\/x\/v2\/feed\/index\/story\?/.test($request.url):
            try {
                let r = JSON.parse(body);
                let b = [];
                for (let p of r.data.items) {
                    p.hasOwnProperty("ad_info") || -1 !== p.card_goto.indexOf("ad") || b.push(p);
                }
                r.data.items = b;
                body = JSON.stringify(r);
            } catch (c) {
                console.log("bilibili Story:" + c);
            }
            break;
        case /^https?:\/\/app\.bilibili\.com\/x\/v\d\/account\/teenagers\/status\?/.test($request.url):
            try {
                let n = JSON.parse(body);
                n.data.teenagers_status = 0;
                body = JSON.stringify(n);
            } catch (y) {
                console.log("bilibili teenagers:" + y);
            }
            break;
        case /^https?:\/\/app\.bilibili\.com\/x\/resource\/show\/tab/.test($request.url):
            try {
                let u = new Set([177, 178, 179, 181, 102, 104, 106, 486, 488, 489]);
                let h = JSON.parse(body);
                if (h.data.top) {
                    let m = h.data.top.filter(function checkItem(t) {
                        if (t.name && t.name === "消息") {
                            t.pos = 1;
                            return true;
                        } else {
                            return false;
                        }
                    });
                    h.data.top = m;
                }
                if (h.data.bottom) {
                    let m = h.data.bottom.filter(t => u.has(t.id));
                    h.data.bottom = m;
                }
                body = JSON.stringify(h);
            } catch (g) {
                console.log("bilibili tabprocess:" + g);
            }
            break;
        case /^https?:\/\/app\.bilibili\.com\/x\/v2\/account\/mine/.test($request.url):
            try {
                let v = JSON.parse(body),
                    $ = new Set([396, 397, 398, 399, 407, 410, 402, 404, 425, 426, 427, 428, 430, 432, 433, 434, 494, 495, 496, 497, 500, 501, 2830, 3072, 3084]);
                v.data.sections_v2.forEach((t, i) => {
                    let a = t.items.filter(t => $.has(t.id));
                    v.data.sections_v2[i].items = a;
                    v.data.sections_v2[i].button = {};
                    delete v.data.sections_v2[i].be_up_title;
                    delete v.data.sections_v2[i].tip_icon;
                    delete v.data.sections_v2[i].tip_title;
                    ("创作中心" == v.data.sections_v2[i].title || "創作中心" == v.data.sections_v2[i].title) && (delete v.data.sections_v2[i].title, delete v.data.sections_v2[i].type)
                });
                delete v.data.vip_section_v2;
                delete v.data.vip_section;
                v.data.hasOwnProperty("live_tip") && (v.data.live_tip = {});
                v.data.hasOwnProperty("answer") && (v.data.answer = {});
                v.data.vip.status || (v.data.vip_type = 2, v.data.vip.type = 2, v.data.vip.status = 1, v.data.vip.vip_pay_type = 1, v.data.vip.due_date = 466982416e4);
                body = JSON.stringify(v);
            } catch (_) {
                console.log("bilibili mypage:" + _)
            }
            break;
        case /^https?:\/\/api\.live\.bilibili\.com\/xlive\/app-room\/v1\/index\/getInfoByRoom/.test($request.url):
            try {
                let x = JSON.parse(body);
                x.data.activity_banner_info = null;
                x.data?.shopping_info && (x.data.shopping_info = {
                    is_show: 0
                });
                x.data?.new_tab_info?.outer_list && x.data.new_tab_info.outer_list.length && (x.data.new_tab_info.outer_list = x.data.new_tab_info.outer_list.filter(t => 33 != t.biz_id));
                body = JSON.stringify(x);
            } catch (k) {
                console.log("bilibili live broadcast:" + k);
            }
            break;
        case /^https?:\/\/app\.bilibili\.com\/x\/resource\/top\/activity/.test($request.url):
            try {
                let w = JSON.parse(body);
                w.data && (w.data.hash = "ddgksf2013", w.data.online.icon = "");
                body = JSON.stringify(w);
            } catch (O) {
                console.log("bilibili right corner:" + O);
            }
            break;
        case /ecommerce-user\/get_shopping_info\?/.test($request.url):
            try {
                let P = JSON.parse(body);
                P.data && (P.data = {
                    shopping_card_detail: {},
                    bubbles_detail: {},
                    recommend_card_detail: {},
                    selected_goods: {},
                    h5jump_popup: []
                });
                body = JSON.stringify(P);
            } catch (W) {
                console.log("bilibili shopping info:" + W);
            }
            break;
        case /^https?:\/\/app\.bilibili\.com\/x\/v2\/search\/square/.test($request.url):
            try {
                let j = JSON.parse(body);
                j.data = {
                    type: "history",
                    title: "搜索历史",
                    search_hotword_revision: 2
                };
                body = JSON.stringify(j);
            } catch (q) {
                console.log("bilibili hot search:" + q);
            }
            break;
        case /https?:\/\/app\.bilibili\.com\/x\/v2\/account\/myinfo\?/.test($request.url):
            try {
                let E = JSON.parse(body);
                E.data.vip.status || (E.data.vip.type = 2, E.data.vip.status = 1, E.data.vip.vip_pay_type = 1, E.data.vip.due_date = 466982416e4);
                body = JSON.stringify(E);
            } catch (z) {
                console.log("bilibili 1080p:" + z);
            }
            break;
        case /pgc\/page\/(bangumi|cinema\/tab\?)/.test($request.url):
            try {
                let B = JSON.parse(body);
                B.result.modules.forEach(t => {
                    t.style.startsWith("banner") && (t.items = t.items.filter(t => -1 != t.link.indexOf("play")));
                    t.style.startsWith("function") && (t.items = t.items.filter(t => -1 == t.blink.indexOf("bilibili.com")), [1283, 241, 1441, 1284].includes(t.module_id) && (t.items = []));
                    t.style.startsWith("tip") && (t.items = [])
                });
                body = JSON.stringify(B);
            } catch (I) {
                console.log("bilibili fanju:" + I);
            }
            break;
        case /^https:\/\/app\.bilibili\.com\/x\/v2\/splash\/list/.test($request.url):
            try {
                let R = JSON.parse(body);
                if (R.data && R.data.list) {
                    for (let S of R.data.list) {
                        S.duration = 0;
                        S.begin_time = 2240150400;
                        S.end_time = 2240150400;
                    }
                }
                body = JSON.stringify(R);
            } catch (T) {
                console.log("bilibili openad:" + T);
            }
            break;
        case /^https:\/\/api\.live\.bilibili\.com\/xlive\/app-interface\/v2\/index\/feed/.test($request.url):
            try {
                let A = JSON.parse(body);
                A.data && A.data.card_list && (A.data.card_list = A.data.card_list.filter(t => "banner_v1" != t.card_type));
                body = JSON.stringify(A);
            } catch (C) {
                console.log("bilibili xlive:" + C);
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