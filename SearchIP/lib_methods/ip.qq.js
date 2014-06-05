/**
 * author: oldj
 * blog: http://oldj.net
 */

GetIPInfo.addMethod("ip.qq", function (self, ip, success, fail) {

	var url = "http://ip.qq.com/cgi-bin/searchip";

	$.post(url, {
		searchip1: ip
	}, function (res) {
		var cnt;
		var a = res.split(ip);

		cnt = a[a.length - 1];
		a = cnt.split("change_hint");
		cnt = a[0];

		a = cnt.match(/<span>(.+?)<\/span>/);

		if (a) {
			cnt = a[1];
			success(cnt);
		} else {
			fail();
		}
	});
});
