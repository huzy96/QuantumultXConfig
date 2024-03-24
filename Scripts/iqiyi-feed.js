let body = $response.body;
console.log(body);
let obj = JSON.parse(body);

if (obj.hasOwnProperty('cards')) {
    for (let i = 0; i < obj['cards'].length; i++) {
        if (obj['cards'][i].hasOwnProperty('blocks')) {
            for (let j = 0; j < obj['cards'][i]['blocks'].length; j++) {
                if (obj['cards'][i]['blocks'][j].hasOwnProperty('buttons')) {
                    for (let k = 0; k < obj['cards'][i]['blocks'][j]['buttons'].length; k++) {
                        if (obj['cards'][i]['blocks'][j]['buttons'][k].hasOwnProperty('actions')) {
                            if (obj['cards'][i]['blocks'][j]['buttons'][k]['actions'].hasOwnProperty('click_event')) {
                                if (obj['cards'][i]['blocks'][j]['buttons'][k]['actions']['click_event'].hasOwnProperty('data')) {
                                    if (obj['cards'][i]['blocks'][j]['buttons'][k]['actions']['click_event']['data'].hasOwnProperty('pop_content')) {
                                        if (obj['cards'][i]['blocks'][j]['buttons'][k]['actions']['click_event']['data']['pop_content'].includes('屏蔽此广告')) {
                                            obj['cards'][i]['blocks'].splice(j, 1);
                                            j--;
                                            // if (obj['cards'][i].hasOwnProperty('total_num')) {
                                            //   obj['cards'][i]['total_num']--
                                            // }
                                            break
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

body = JSON.stringify(obj);
console.log(body);
$done(body);