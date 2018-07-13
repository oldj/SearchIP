/**
 * author: oldj
 * blog: https://oldj.net
 */

$(document).ready(function () {

  var m

  function doSearch () {
    if (m) m.close()

    m = new GetIPInfo()
    var ip = $('input#ipt-ip').val()
    var el_cnt = $('#content')

    ip = ip.replace(/^\s+|\s+$/g, '')
    if (!ip) {
      el_cnt.fadeOut()
      return
    }

    el_cnt.fadeIn(500)
    m.setInformParent(el_cnt)
    m.get(ip, null)
  }

  $('button').click(doSearch)
  $('input#ipt-ip')
    .focus()
    .keydown(function (e) {
      if (e.keyCode === 13) {
        doSearch()
      }
    })
    .click(function () {
      this.select()
    })

})
