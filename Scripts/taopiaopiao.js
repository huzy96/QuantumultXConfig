let body = $response.body;
console.log('Original Body:', body);
let obj = JSON.parse(body);

function removeExposeTrackingUrls(nodes) {
    if (!nodes) return;

    for (let node of nodes) {
        if (node.nodes) {
            removeExposeTrackingUrls(node.nodes); // 递归处理嵌套节点
        }

        if (node.data?.componentId === "tpp_banner_loop" && node.nodes) {
            node.nodes = node.nodes.filter(subNode => !subNode.data?.exposeTrackingUrlList);
        }
    }
}

if (obj.data?.nodes) {
    removeExposeTrackingUrls(obj.data.nodes);
}

body = JSON.stringify(obj);
console.log('Modified Body:', body);
$done(body);