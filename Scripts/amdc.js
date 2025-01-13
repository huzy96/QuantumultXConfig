/***********************************************
 > 应用名称：墨鱼自用amdc脚本
 > 脚本作者：@ddgksf2013
 > 微信账号：墨鱼手记
 > 更新时间：2024-01-21
 > 通知频道：https://t.me/ddgksf2021
 > 贡献投稿：https://t.me/ddgksf2013_bot
 > 问题反馈：ddgksf2013@163.com
 > 特别提醒：如需转载请注明出处，谢谢合作！
 ***********************************************/

//使用AMDC的APP有：咸鱼、淘宝、盒马、高德、菜鸟、飞猪

const version = 'V1.0.8';


// 提取正则表达式到常量
const USER_AGENT_REGEX = /(MovieApp|AMap|Cainiao|%E9%A3%9E%E7%8C%AA%E6%97%85%E8%A1%8C|Hema4iPhone|Moon|DMPortal)/;

// 使用解构赋值获取User-Agent
const { headers } = $request;
const ua = headers["User-Agent"] || headers["user-agent"];

// 简化条件判断
const response = USER_AGENT_REGEX.test(ua) ? { body: "ddgksf2013" } : {};
$done(response);
