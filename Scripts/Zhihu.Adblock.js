const version = "V1.0.75";

let body = $response["body"];

if (body) {
  switch (!![]) {
    case /appview\/v2\/answer/["test"]($request["url"]):
      try {
      } catch (e) {
        console.log("zhihu appview_v2_answer" + e);
      }
      break;
    case /com\/moments_v3/["test"]($request["url"]):
      try {
        let obj = JSON.parse(body);
        (obj["data"] = obj["data"]["filter"](
          (o) =>
            !(
              o["type"] == "pin_publish_entry" ||
              o["type"] == "recommend_user_card_list"
            )
        )),
          (body = JSON.stringify(obj));
      } catch (e) {
        console.log("zhihu user-credit" + e);
      }
      break;
    case /notifications\/v3/["test"]($request["url"]):
      try {
        let obj = JSON.parse(body),
          newItems = [];
        for (let item of obj["data"]) {
          if (item["detail_title"] === "官方帐号消息") {
            let unread_count = item["unread_count"];
            unread_count > 0x0
              ? (item["content"]["text"] = "未读消息" + unread_count + "条")
              : (item["content"]["text"] = "全部消息已读"),
              (item["is_read"] = !![]),
              (item["unread_count"] = 0x0),
              newItems["push"](item);
          } else item["detail_title"] !== "活动助手" && newItems["push"](item);
        }
        (obj["data"] = newItems), (body = JSON.stringify(obj));
      } catch (e) {
        console.log("zhihu notifications" + e);
      }
      break;
    case /user-credit\/basis/["test"]($request["url"]):
      try {
        let obj = JSON.parse(body);
        (obj["credit_basis"]["total_score"] = 0x3e6),
          (body = JSON.stringify(obj));
      } catch (e) {
        console.log("zhihu user-credit" + e);
      }
      break;
    case /bazaar\/vip_tab\/modules/["test"]($request["url"]):
      try {
        let obj = JSON.parse(body);
        (obj["data"] = obj["data"]["filter"](
          (o) =>
            !(
              o["type"] == "FCT14A" ||
              o["type"] == "FCT06A" ||
              o["type"] == "FCT07A"
            )
        )),
          (body = JSON.stringify(obj));
      } catch (e) {
        console.log("zhihu\x20vip_tab\x20modules" + e);
      }
      break;
    case /questions\/\d+\/feeds/["test"]($request["url"]):
      try {
        body = body["replace"](/ad_info"/g, 'ddgksf2013"');
      } catch (e) {
        console.log("zhihu questions" + e);
      }
      break;
    case /next-data/["test"]($request["url"]):
      try {
        let obj = JSON.parse(body),
          items = [];
        for (let item of obj["data"]["data"]) {
          if (item["resource_type"] == "normal") {
            if (item["data"]?.["link_cards"]) item["data"]["link_cards"] = [];
            items["push"](item);
          }
        }
        (obj["data"]["data"] = items), (body = JSON.stringify(obj));
      } catch (e) {
        console.log("zhihu next-data" + e);
      }
      break;
    case /next-render/["test"]($request["url"]):
      try {
        let obj = JSON.parse(body),
          items = [];
        for (let item of obj["data"]) {
          if (item["type"] == "answer") {
            if (item["ad_info"]?.["data"]) delete item["ad_info"];
            items["push"](item);
          }
        }
        (obj["data"] = items), (body = JSON.stringify(obj));
      } catch (e) {
        console.log("zhihu next-render" + e);
      }
      break;
    case /bazaar\/vip_tab\/header/["test"]($request["url"]):
      try {
        let obj = JSON.parse(body);
        (obj["vip_icon"] = {
          day_url:
            "https://pic1.zhimg.com/v2-4812630bc27d642f7cafcd6cdeca3d7a_r.png",
          night_url:
            "https://pic1.zhimg.com/v2-c9686ff064ea3579730756ac6c289978_r.png",
        }),
          (obj["vip_tip"] = {
            jump_url: "https://t.me/ddgksf2021",
            text: "免费享5000w+优质内容",
            color_text: { text: "", color: "" },
          }),
          (obj["button"] = null),
          (body = JSON.stringify(obj));
      } catch (e) {
        console.log("zhihu vip_tab header" + e);
      }
      break;
    case /topstory\/hot-lists/["test"]($request["url"]):
      try {
        let obj = JSON.parse(body);
        (obj["data"]["data"] = obj["data"]["data"]["filter"](
          (o) => !o["promotion_extra"]
        )),
          (body = JSON.stringify(obj));
      } catch (e) {
        console.log("zhihu hot-lists" + e);
      }
      break;
    case /topstory\/recommend/["test"]($request["url"]):
      try {
        let obj = JSON.parse(body);
        const propsToDelete = [
          "TikTok",
          "副业",
          "赚钱",
          "挣钱",
          "自媒体",
          "运营",
          "电商",
          "剪辑",
          "公众号",
          "失业",
          "收益",
          "稿费",
          "天赚了",
          "存款",
          "兼职",
        ];
        let items = [];
        for (let item of obj["data"]) {
          if (
            item["hasOwnProperty"]("ad") ||
            item["promotion_extra"] != null ||
            item["type"] == "feed_advert" ||
            item["extra"]?.["type"] == "pin" ||
            item["extra"]?.["type"] == "Training"
          )
            continue;
          else {
            if (
              item["type"] == "common_card" &&
              item["extra"]?.["type"] == "zvideo"
            ) {
              let videoUrl =
                  item["common_card"]["feed_content"]["video"][
                    "customized_page_url"
                  ],
                videoID = videoUrl["match"](/[?&]videoID=(\d+)/)[0x1];
              videoID &&
                (item["common_card"]["feed_content"]["video"]["id"] = videoID),
                items["push"](item);
            } else {
              if (
                item["type"] == "common_card" &&
                item["common_card"]?.["feed_content"]?.["video"]?.["id"]
              ) {
                let search = '"feed_content":{"video":{"id":',
                  str = $response["body"]["substring"](
                    $response["body"]["indexOf"](search) + search["length"]
                  ),
                  videoID = str["substring"](0x0, str["indexOf"](","));
                (item["common_card"]["feed_content"]["video"]["id"] = videoID),
                  items["push"](item);
              } else {
                if (
                  item["common_card"]?.["feed_content"]?.["title"]?.[
                    "panel_text"
                  ]
                ) {
                  var find = ![];
                  propsToDelete["forEach"]((o) => {
                    item["common_card"]["feed_content"]["title"]["panel_text"][
                      "includes"
                    ](o) && (find = !![]);
                  }),
                    !find && items["push"](item);
                } else items["push"](item);
              }
            }
          }
        }
        obj["data"] = items;
        for (let i = 0x0; i < obj["data"]["length"]; i++) {
          obj["data"][i]["offset"] = i + 0x1;
        }
        body = JSON.stringify(obj);
      } catch (e) {
        console.log("zhihu recommend" + e);
      }
      break;
    case /unlimited\/go\/my_card/["test"]($request["url"]):
      try {
        let obj = JSON.parse(body);
        (obj["title"] = "盐选会员"),
          (obj["button_text"] = "已开通"),
          (obj["card_jump_url"] = ""),
          (obj["jump_url"] = ""),
          (body = JSON.stringify(obj));
      } catch (e) {
        console.log("zhihu\x20people" + e);
      }
      break;
    case /people\/self/["test"]($request["url"]):
      try {
        let obj = JSON.parse(body);
        (obj["vip_info"]["is_vip"] = !![]),
          (obj["vip_info"]["vip_icon"] = {
            url: "https://pic1.zhimg.com/v2-4812630bc27d642f7cafcd6cdeca3d7a_r.png",
            night_mode_url:
              "https://pic1.zhimg.com/v2-c9686ff064ea3579730756ac6c289978_r.png",
          }),
          (obj["vip_info"]["entrance"] = {
            icon: {
              url: "https://pic1.zhimg.com/v2-5b7012c8c22fd520f5677305e1e551bf.png",
              night_mode_url:
                "https://pic1.zhimg.com/v2-e51e3252d7a2cb016a70879defd5da0b.png",
            },
            title: "我的盐选会员",
            expires_day: "2039-12-24",
            sub_title: null,
            button_text: "你好，知乎！",
            jump_url: "zhihu://vip/purchase",
            button_jump_url: "zhihu://vip/purchase",
            sub_title_new: null,
            identity: "svip",
          }),
          (obj["vip_info"]["entrance_new"] = {
            left_button: {
              title: "精选会员内容",
              description: "为您严选好内容",
              jump_url: "zhihu://market/home",
            },
            right_button: {
              title: "我的盐选会员",
              description: "畅享 10w+ 优质内容",
              jump_url: "zhihu://vip/my",
            },
          }),
          (obj["vip_info"]["entrance_v2"] = {
            title: "我的盐选会员",
            sub_title: "畅享 10w+ 优质内容",
            jump_url: "zhihu://vip/my",
            button_text: "查看权益",
          }),
          (body = JSON.stringify(obj));
      } catch (e) {
        console.log("zhihu\x20people" + e);
      }
      break;
    case /commercial_api\/real_time_launch/["test"]($request["url"]):
      try {
        body = body["replace"](
          /img_play_duration\\":\d+/g,
          'img_play_duration": 0'
        )["replace"](/launch_timeout\\":\d+/g, 'launch_timeout": 0');
      } catch (e) {
        console.log("zhihu openad" + e);
      }
      break;
    case /search\/recommend_query/["test"]($request["url"]):
      try {
        let obj = JSON.parse(body);
        obj["recommend_queries"]?.["queries"] &&
          (obj["recommend_queries"]["queries"] = [
            {
              query: "",
              real_query: "",
              query_display: "",
              uuid: "f8c151ce-8bba-4491-89d1-06af4353e3da",
              type: "normal",
            },
          ]),
          (body = JSON.stringify(obj));
      } catch (e) {
        console.log("zhihu recommend_query" + e);
      }
      break;
    case /search\/tabs/["test"]($request["url"]):
      try {
        let obj = JSON.parse(body);
        (obj["data"] = obj["data"]["filter"]((o) => !(o["t"] == "pin"))),
          (body = JSON.stringify(obj));
      } catch (e) {
        console.log("zhihu search/tabs" + e);
      }
      break;
    case /search\/preset_words/["test"]($request["url"]):
      try {
        let obj = JSON.parse(body);
        obj["preset_words"]?.["words"] &&
          obj["preset_words"]["words"]["forEach"]((o) => {
            (o["begin_ts"] = 0xb2d05e00), (o["end_ts"] = 0xb2d06c10);
          }),
          obj["preset_words"]?.["force_words"] &&
            obj["preset_words"]["force_words"]["forEach"]((o) => {
              (o["begin_ts"] = 0xb2d05e00), (o["end_ts"] = 0xb2d06c10);
            }),
          (body = JSON.stringify(obj));
      } catch (e) {
        console.log("zhihu\x20preset_words" + e);
      }
      break;
    case /search\/hot_search/["test"]($request["url"]):
      try {
        let obj = JSON.parse(body);
        obj["hot_search_queries"] && (obj["hot_search_queries"] = []),
          (body = JSON.stringify(obj));
      } catch (e) {
        console.log("zhihu hot_search" + e);
      }
      break;
    case /bazaar\/vip_tab\/tabs/["test"]($request["url"]):
      try {
        let obj = JSON.parse(body);
        (obj = obj["filter"]((o) => !(o["value"] == "vip_buy"))),
          (body = JSON.stringify(obj));
      } catch (e) {
        console.log("zhihu vip_tab" + e);
      }
      break;
    default:
      $done({});
      break;
  }
  $done({ body: body });
} else $done({});
