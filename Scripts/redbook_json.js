/***********************************************
> 应用名称：墨鱼自用小红书去广告脚本
> 脚本作者：@ddgksf2013
> 微信账号：墨鱼手记
> 更新时间：2025-01-13
> 通知频道：https://t.me/ddgksf2021
> 贡献投稿：https://t.me/ddgksf2013_bot
> 问题反馈：ddgksf2013@163.com
> 特别提醒：如需转载请注明出处，谢谢合作！
***********************************************/

const version = "V1.0.24";
const $ = new Env("小红书");

($["RedBookPhotoKey"] = "redbook_user_photo_key"), ($["RedBookVideoKey"] = "redbook_user_video_key");

let body = $response.body;
if (body) {
    console.log("原始json: " + body)
    switch (!![]) {
        case /api\/sns\/v\d+\/note\/widgets/.test($request.url):
            try {
                let obj = JSON.parse(body);
                const propertiesToDelete = ["1goods_card_v2", "note_next_step"];
                for (const prop of propertiesToDelete) {
                    obj.data?.[prop] && delete obj.data[prop];
                }
                body = JSON.stringify(obj);
            } catch (s) {
                console.log("widgets: " + s);
            }
            break;
        case /api\/sns\/v\d+\/note\/live_photo\/save/.test($request.url):
            try {
                let obj = JSON.parse(body);
                console.log("getdata_RedBookPhotoKey: " + $["getdata"]($["RedBookPhotoKey"]));
                (obj.data.datas = JSON.parse($["getdata"]($["RedBookPhotoKey"]))), (body = JSON.stringify(obj));
            } catch (s) {
                console.log("live_photo: " + s);
            }
            break;
        case /api\/sns\/v\d+\/note\/video\/save/.test($request.url):
            try {
                let obj = JSON.parse(body), tmp = JSON.parse($["getdata"]($["RedBookVideoKey"]));
                console.log("getdata_RedBookVideoKey: " + $["getdata"]($["RedBookVideoKey"]));
                for (let module of tmp) {
                    module.note_id == obj.data.note_id && (obj.data = module);
                }
                body = JSON.stringify(obj);
            } catch (s) {
                console.log("video: " + s);
            }
            break;
        case /api\/sns\/v\d+\/note\/comment\/list/.test($request.url):
            try {
                let obj = JSON.parse(body);
                for (let module of obj.data.comments) {
                    if (module.pictures) {
                        for (let item of module.pictures) {
                            item.meme_package?.image_url && ((item.origin_url = item.meme_package.image_url), (item.url = item.meme_package.image_url));
                        }
                    }
                }
                body = JSON.stringify(obj);
            } catch (s) {
                console.log("comment: " + s);
            }
            break;
        case /api\/sns\/v\d+\/note\/redtube/.test($request.url):
            try {
                let obj = JSON.parse(body);
                for (let module of obj.data.items) {
                    module.related_goods_num && (module.related_goods_num = 0x0),
                        module.has_related_goods && (module.has_related_goods = ![]),
                        module.media_save_config && (module.media_save_config = {
                            disable_save: ![],
                            disable_watermark: !![],
                            disable_weibo_cover: !![],
                        }),
                        module.share_info && (module.share_info.function_entries = [
                            { type: "video_download" },
                            { type: "generate_image" },
                            { type: "copy_link" },
                            { type: "native_voice" },
                            { type: "video_speed" },
                            { type: "dislike" },
                            { type: "report" },
                            { type: "video_feedback" },
                        ]);
                }
                body = JSON.stringify(obj);
            } catch (s) {
                console.log("redtube: " + s);
            }
            break;
        case /api\/sns\/v\d+\/note\/videofeed/.test($request.url):
            try {
                let obj = JSON.parse(body),
                    datas = [];
                for (let module of obj.data) {
                    module.related_goods_num && (module.related_goods_num = 0x0);
                    module.has_related_goods &&
                        (module.has_related_goods = ![]);
                    module.media_save_config &&
                        (module.media_save_config = {
                            disable_save: ![],
                            disable_watermark: !![],
                            disable_weibo_cover: !![],
                        });
                    module.share_info &&
                        (module.share_info.function_entries = [
                            { type: "video_download" },
                            { type: "generate_image" },
                            { type: "copy_link" },
                            { type: "native_voice" },
                            { type: "video_speed" },
                            { type: "dislike" },
                            { type: "report" },
                            { type: "video_feedback" },
                        ]);
                    if (module.video_info_v2?.media?.stream?.h265) {
                        let idata = {};
                        (idata.status = 0x2),
                            (idata.note_id = module.id),
                            (idata.download_url = module.video_info_v2.media.stream.h265[0x0]["master_url"]),
                            datas.push(idata);
                    }
                }
                $["setdata"](JSON.stringify(datas), $["RedBookVideoKey"]), (body = JSON.stringify(obj));
            } catch (s) {
                console.log("videofeed: " + s);
            }
            break;
        case /api\/sns\/v\d+\/note\/tabfeed/.test($request.url):
            try {
                let obj = JSON.parse(body),
                    datas = [];
                for (let module of obj.data.items) {
                    module.related_goods_num &&
                        (module.related_goods_num = 0x0);
                    module.has_related_goods &&
                        (module.has_related_goods = ![]);
                    module.media_save_config &&
                        (module.media_save_config = {
                            disable_save: ![],
                            disable_watermark: !![],
                            disable_weibo_cover: !![],
                        });
                    module.share_info &&
                        (module.share_info.function_entries = [
                            { type: "video_download" },
                            { type: "generate_image" },
                            { type: "copy_link" },
                            { type: "native_voice" },
                            { type: "video_speed" },
                            { type: "dislike" },
                            { type: "report" },
                            { type: "video_feedback" },
                        ]);
                    if (module.video_info_v2?.media?.stream?.h265) {
                        let idata = {};
                        (idata.status = 0x2), (idata.note_id = module.id), (idata.download_url = module.video_info_v2.media.stream.h265[0x0]["master_url"]), datas.push(idata);
                    }
                }
                $["setdata"](JSON.stringify(datas), $["RedBookVideoKey"]), (body = JSON.stringify(obj));
            } catch (s) {
                console.log("tabfeed: " + s);
            }
            break;
        case /api\/sns\/v\d+\/note\/feed/.test($request.url):
            try {
                let obj = JSON.parse(body);
                for (let module of obj.data) {
                    module.related_goods_num &&
                        (module.related_goods_num = 0x0);
                    module.has_related_goods &&
                        (module.has_related_goods = ![]);
                    if (module.note_list)
                        for (let item of module.note_list) {
                            item.media_save_config = {
                                disable_save: ![],
                                disable_watermark: !![],
                                disable_weibo_cover: !![],
                            };
                        }
                }
                body = JSON.stringify(obj);
            } catch (s) {
                console.log("feed: " + s);
            }
            break;
        case /api\/sns\/v\d+\/note\/imagefeed/.test($request.url):
            try {
                let obj = JSON.parse(body),
                    datas = [];
                for (let module of obj.data) {
                    module.related_goods_num &&
                        (module.related_goods_num = 0x0);
                    module.has_related_goods &&
                        (module.has_related_goods = ![]);
                    if (module.note_list)
                        for (let item of module.note_list) {
                            item.media_save_config = {
                                disable_save: ![],
                                disable_watermark: !![],
                                disable_weibo_cover: !![],
                            };
                            if (item.images_list)
                                for (let it of item.images_list) {
                                    if (it.live_photo) {
                                        let idata = {};
                                        (idata.video_id = it.live_photo.media.video_id), (idata.file_id = it.live_photo_file_id), (idata.url = it.live_photo.media.stream.h265[0x0]["master_url"]), datas.push(idata);
                                    }
                                }
                        }
                }
                $["setdata"](JSON.stringify(datas), $["RedBookPhotoKey"]), (body = JSON.stringify(obj));
            } catch (s) {
                console.log("imagefeed: " + s);
            }
            break;
        case /api\/sns\/v\d+\/homefeed\/categories\?/.test($request.url):
            try {
                let obj = JSON.parse(body);
                (obj.data.categories = obj.data.categories.filter((e) => !(e.oid == "homefeed.shop" || e.oid == "homefeed.live"))), (body = JSON.stringify(obj));
            } catch (s) {
                console.log("categories: " + s);
            }
            break;
        case /api\/sns\/v\d+\/search\/hint/.test($request.url):
            try {
                let obj = JSON.parse(body);
                obj.data?.hint_words &&
                    (obj.data.hint_words = [
                        {
                            title: "搜索笔记",
                            type: "firstEnterOther#itemCfRecWord#搜索笔记#1",
                            search_word: "搜索笔记",
                        },
                    ]),
                    (body = JSON.stringify(obj));
            } catch (s) {
                console.log("hint: " + s);
            }
            break;
        case /api\/sns\/v\d+\/search\/hot_list/.test($request.url):
            try {
                let obj = JSON.parse(body);
                (obj.data = {
                    scene: "",
                    title: "",
                    items: [],
                    host: "",
                    background_color: {},
                    word_request_id: "",
                }),
                    (body = JSON.stringify(obj));
            } catch (s) {
                console.log("hot_list: " + s);
            }
            break;
        case /api\/sns\/v\d+\/search\/trending/.test($request.url):
            try {
                let obj = JSON.parse(body);
                (
                    obj.data = {
                        title: "",
                        queries: [],
                        type: "",
                        word_request_id: "",
                    }
                ), (body = JSON.stringify(obj));
            } catch (s) {
                console.log("trending: " + s);
            }
            break;
        case /api\/sns\/v\d+\/system_service\/splash_config/.test($request.url):
            try {
                let obj = JSON.parse(body);
                obj.data.ads_groups.forEach(
                    (e) => {
                        (e.start_time = "2208963661"), (e.end_time = "2209050061"), e.ads && e.ads.forEach((e) => { (e.start_time = "2208963661"), (e.end_time = "2209050061"); });
                    }
                ),
                    (body = JSON.stringify(obj));
            } catch (s) {
                console.log("splash_config: " + s);
            }
            break;
        case /api\/sns\/v\d+\/homefeed\?/.test($request.url):
            try {
                let obj = JSON.parse(body);
                (obj.data = obj.data.filter((e) => !e.is_ads)),
                    (obj.data = obj.data.filter((e) => (!e.ads_info))),
                    (body = JSON.stringify(obj));
            } catch (s) {
                console.log("homefeed: " + s);
            }
            break;
        case /api\/sns\/v\d+\/search\/notes\?/.test($request.url):
            try {
                let obj = JSON.parse(body);
                (obj.data.items = obj.data.items.filter((e) => !e.ads)),
                    (body = JSON.stringify(obj));
            } catch (s) {
                console.log("search/notes: " + s);
            }
            break;
        case /api\/sns\/v\d+\/system_service\/config\?/.test($request.url):
            try {
                let obj = JSON.parse(body);
                const propertiesToDelete = [
                    "store",
                    "redtube: ",
                    "splash",
                    "loading_img",
                    "app_theme",
                    "cmt_words",
                    "highlight_tab",
                ];
                for (const prop of propertiesToDelete) {
                    obj.data?.[prop] && delete obj.data[prop];
                }
                body = JSON.stringify(obj);
            } catch (s) {
                console.log("system_service: " + s);
            }
            break;
        default:
            $done({});
            break;
    }
    console.log("处理后json: " + body)
    $done({ body: body });
} else $done({});

function Env(t, e) {
    "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
    class s {
        constructor(t) {
            this.env = t;
        }
        send(t, e = "GET") {
            t = "string" == typeof t ? { url: t } : t;
            let s = this.get;
            return (
                "POST" === e && (s = this.post),
                new Promise((e, i) => {
                    s.call(this, t, (t, s, r) => {
                        t ? i(t) : e(s);
                    });
                })
            );
        }
        get(t) {
            return this.send.call(this.env, t);
        }
        post(t) {
            return this.send.call(this.env, t, "POST");
        }
    }
    return new (class {
        constructor(t, e) {
            (this.name = t),
                (this.http = new s(this)),
                (this.data = null),
                (this.dataFile = "box.dat"),
                (this.logs = []),
                (this.isMute = !1),
                (this.isNeedRewrite = !1),
                (this.logSeparator = "\n"),
                (this.startTime = new Date().getTime()),
                Object.assign(this, e);
        }
        isNode() {
            return "undefined" != typeof module && !!module.exports;
        }
        isQuanX() {
            return "undefined" != typeof $task;
        }
        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon;
        }
        isLoon() {
            return "undefined" != typeof $loon;
        }
        toObj(t, e = null) {
            try {
                return JSON.parse(t);
            } catch {
                return e;
            }
        }
        toStr(t, e = null) {
            try {
                return JSON.stringify(t);
            } catch {
                return e;
            }
        }
        getjson(t, e) {
            let s = e;
            const i = this.getdata(t);
            if (i)
                try {
                    s = JSON.parse(this.getdata(t));
                } catch { }
            return s;
        }
        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e);
            } catch {
                return !1;
            }
        }
        getScript(t) {
            return new Promise((e) => {
                this.get({ url: t }, (t, s, i) => e(i));
            });
        }
        runScript(t, e) {
            return new Promise((s) => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, "").trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                (r = r ? 1 * r : 20), (r = e && e.timeout ? e.timeout : r);
                const [o, h] = i.split("@"),
                    n = {
                        url: `http://${h}/v1/scripting/evaluate`,
                        body: { script_text: t, mock_type: "cron", timeout: r },
                        headers: { "X-Key": o, Accept: "*/*" },
                    };
                this.post(n, (t, e, i) => s(i));
            }).catch((t) => this.logErr(t));
        }
        loaddata() {
            if (!this.isNode()) return {};
            {
                (this.fs = this.fs ? this.fs : require("fs")),
                    (this.path = this.path ? this.path : require("path"));
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e);
                if (!s && !i) return {};
                {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i));
                    } catch (t) {
                        return {};
                    }
                }
            }
        }
        writedata() {
            if (this.isNode()) {
                (this.fs = this.fs ? this.fs : require("fs")),
                    (this.path = this.path ? this.path : require("path"));
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e),
                    r = JSON.stringify(this.data);
                s
                    ? this.fs.writeFileSync(t, r)
                    : i
                        ? this.fs.writeFileSync(e, r)
                        : this.fs.writeFileSync(t, r);
            }
        }
        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for (const t of i) if (((r = Object(r)[t]), void 0 === r)) return s;
            return r;
        }
        lodash_set(t, e, s) {
            return Object(t) !== t
                ? t
                : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []),
                    (e
                        .slice(0, -1)
                        .reduce(
                            (t, s, i) =>
                                Object(t[s]) === t[s]
                                    ? t[s]
                                    : (t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}),
                            t
                        )[e[e.length - 1]] = s),
                    t);
        }
        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t),
                    r = s ? this.getval(s) : "";
                if (r)
                    try {
                        const t = JSON.parse(r);
                        e = t ? this.lodash_get(t, i, "") : e;
                    } catch (t) {
                        e = "";
                    }
            }
            return e;
        }
        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e),
                    o = this.getval(i),
                    h = i ? ("null" === o ? null : o || "{}") : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t), (s = this.setval(JSON.stringify(e), i));
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t), (s = this.setval(JSON.stringify(o), i));
                }
            } else s = this.setval(t, e);
            return s;
        }
        getval(t) {
            return this.isSurge() || this.isLoon()
                ? $persistentStore.read(t)
                : this.isQuanX()
                    ? $prefs.valueForKey(t)
                    : this.isNode()
                        ? ((this.data = this.loaddata()), this.data[t])
                        : (this.data && this.data[t]) || null;
        }
        setval(t, e) {
            return this.isSurge() || this.isLoon()
                ? $persistentStore.write(t, e)
                : this.isQuanX()
                    ? $prefs.setValueForKey(t, e)
                    : this.isNode()
                        ? ((this.data = this.loaddata()),
                            (this.data[e] = t),
                            this.writedata(),
                            !0)
                        : (this.data && this.data[e]) || null;
        }
        initGotEnv(t) {
            (this.got = this.got ? this.got : require("got")),
                (this.cktough = this.cktough ? this.cktough : require("tough-cookie")),
                (this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar()),
                t &&
                ((t.headers = t.headers ? t.headers : {}),
                    void 0 === t.headers.Cookie &&
                    void 0 === t.cookieJar &&
                    (t.cookieJar = this.ckjar));
        }
        get(t, e = () => { }) {
            t.headers &&
                (delete t.headers["Content-Type"], delete t.headers["Content-Length"]),
                this.isSurge() || this.isLoon()
                    ? (this.isSurge() &&
                        this.isNeedRewrite &&
                        ((t.headers = t.headers || {}),
                            Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })),
                        $httpClient.get(t, (t, s, i) => {
                            !t && s && ((s.body = i), (s.statusCode = s.status)), e(t, s, i);
                        }))
                    : this.isQuanX()
                        ? (this.isNeedRewrite &&
                            ((t.opts = t.opts || {}), Object.assign(t.opts, { hints: !1 })),
                            $task.fetch(t).then(
                                (t) => {
                                    const { statusCode: s, statusCode: i, headers: r, body: o } = t;
                                    e(null, { status: s, statusCode: i, headers: r, body: o }, o);
                                },
                                (t) => e(t)
                            ))
                        : this.isNode() &&
                        (this.initGotEnv(t),
                            this.got(t)
                                .on("redirect", (t, e) => {
                                    try {
                                        if (t.headers["set-cookie"]) {
                                            const s = t.headers["set-cookie"]
                                                .map(this.cktough.Cookie.parse)
                                                .toString();
                                            s && this.ckjar.setCookieSync(s, null),
                                                (e.cookieJar = this.ckjar);
                                        }
                                    } catch (t) {
                                        this.logErr(t);
                                    }
                                })
                                .then(
                                    (t) => {
                                        const {
                                            statusCode: s,
                                            statusCode: i,
                                            headers: r,
                                            body: o,
                                        } = t;
                                        e(null, { status: s, statusCode: i, headers: r, body: o }, o);
                                    },
                                    (t) => {
                                        const { message: s, response: i } = t;
                                        e(s, i, i && i.body);
                                    }
                                ));
        }
        post(t, e = () => { }) {
            if (
                (t.body &&
                    t.headers &&
                    !t.headers["Content-Type"] &&
                    (t.headers["Content-Type"] = "application/x-www-form-urlencoded"),
                    t.headers && delete t.headers["Content-Length"],
                    this.isSurge() || this.isLoon())
            )
                this.isSurge() &&
                    this.isNeedRewrite &&
                    ((t.headers = t.headers || {}),
                        Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })),
                    $httpClient.post(t, (t, s, i) => {
                        !t && s && ((s.body = i), (s.statusCode = s.status)), e(t, s, i);
                    });
            else if (this.isQuanX())
                (t.method = "POST"),
                    this.isNeedRewrite &&
                    ((t.opts = t.opts || {}), Object.assign(t.opts, { hints: !1 })),
                    $task.fetch(t).then(
                        (t) => {
                            const { statusCode: s, statusCode: i, headers: r, body: o } = t;
                            e(null, { status: s, statusCode: i, headers: r, body: o }, o);
                        },
                        (t) => e(t)
                    );
            else if (this.isNode()) {
                this.initGotEnv(t);
                const { url: s, ...i } = t;
                this.got.post(s, i).then(
                    (t) => {
                        const { statusCode: s, statusCode: i, headers: r, body: o } = t;
                        e(null, { status: s, statusCode: i, headers: r, body: o }, o);
                    },
                    (t) => {
                        const { message: s, response: i } = t;
                        e(s, i, i && i.body);
                    }
                );
            }
        }
        time(t, e = null) {
            const s = e ? new Date(e) : new Date();
            let i = {
                "M+": s.getMonth() + 1,
                "d+": s.getDate(),
                "H+": s.getHours(),
                "m+": s.getMinutes(),
                "s+": s.getSeconds(),
                "q+": Math.floor((s.getMonth() + 3) / 3),
                S: s.getMilliseconds(),
            };
            /(y+)/.test(t) &&
                (t = t.replace(
                    RegExp.$1,
                    (s.getFullYear() + "").substr(4 - RegExp.$1.length)
                ));
            for (let e in i)
                new RegExp("(" + e + ")").test(t) &&
                    (t = t.replace(
                        RegExp.$1,
                        1 == RegExp.$1.length
                            ? i[e]
                            : ("00" + i[e]).substr(("" + i[e]).length)
                    ));
            return t;
        }
        msg(e = t, s = "", i = "", r) {
            const o = (t) => {
                if (!t) return t;
                if ("string" == typeof t)
                    return this.isLoon()
                        ? t
                        : this.isQuanX()
                            ? { "open-url": t }
                            : this.isSurge()
                                ? { url: t }
                                : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"],
                            s = t.mediaUrl || t["media-url"];
                        return { openUrl: e, mediaUrl: s };
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl,
                            s = t["media-url"] || t.mediaUrl;
                        return { "open-url": e, "media-url": s };
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return { url: e };
                    }
                }
            };
            if (
                (this.isMute ||
                    (this.isSurge() || this.isLoon()
                        ? $notification.post(e, s, i, o(r))
                        : this.isQuanX() && $notify(e, s, i, o(r))),
                    !this.isMuteLog)
            ) {
                let t = [""];
                t.push(e),
                    s && t.push(s),
                    i && t.push(i),
                    console.log(t.join("\n")),
                    (this.logs = this.logs.concat(t));
            }
        }
        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]),
                console.log(t.join(this.logSeparator));
        }
        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s
                ? this.log("", `❗️${this.name}, 错误!`, t.stack)
                : this.log("", `❗️${this.name}, 错误!`, t);
        }
        wait(t) {
            return new Promise((e) => setTimeout(e, t));
        }
        done(t = {}) {
            const e = new Date().getTime(),
                s = (e - this.startTime) / 1e3;
            (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t);
        }
    })(t, e);
}
