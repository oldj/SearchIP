/**
 * author: oldj
 * blog: https://oldj.net
 */

GetIPInfo.addMethod('ipip', function (self, ip, success, fail) {

  var url = 'http://freeapi.ipip.net/' + ip

  $.getJSON(url, function (res) {
    if (!res) {
      fail('bad input!')
      return
    }

    console.log(res)
    success(res.distinct().join(' '))
  })
})
