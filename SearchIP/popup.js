/**
 * author: oldj
 * blog: http://oldj.net
 */

$(document).ready(function () {

	var m;

	function doSearch() {
		if (m) m.close();

		m = new GetIPInfo();
		var ip = $("input#ipt-ip").val();

		ip = ip.replace(/^\s+|\s+$/g, "");
		if (!ip) return;

		m.setInformParent($("#content"));
		m.get(ip, null);
	}

	$("button").click(doSearch);
	$("input#ipt-ip").keydown(function (e) {
		if (e.keyCode == 13) {
			doSearch();
		}
	});

});
