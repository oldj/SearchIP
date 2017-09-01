/**
 * author: oldj
 * blog: https://oldj.net
 */

//function genericOnClick (info) {
//  var cnt = info.selectionText
//
//  if (!cnt || !cnt.match(/^(\d+\.){3}\d+$/)) {
//    return
//  }
//
//  var a = cnt.split('.')
//  var i, c
//  for (i = 0; i < a.length; i++) {
//    c = parseInt(a[i])
//    if (c > 255) return
//  }
//
//  // match ip address
//
//  window.postMessage(cnt, '*')
//  chrome.tabs.query({
//    active: true,
//    currentWindow: true
//  }, function (tabs) {
//    chrome.tabs.sendMessage(tabs[0].id, {
//      action: 'SendIP',
//      ip: cnt
//    }, function (response) {
//
//    })
//  })
//
//}

// Create one test item for each context type.
//var contexts = ["page", "selection", "link", "editable", "image", "video", "audio"];
//var contexts = {
//  'selection': 'IP转地址'
//}
//for (var k in contexts) {
//  if (!contexts.hasOwnProperty(k)) continue
//
//  var title = contexts[k]
//  var id = chrome.contextMenus.create({
//    'title': title,
//    'contexts': [k],
//    'onclick': genericOnClick
//  })
////	console.log("'" + context + "' item:" + id);
//}
