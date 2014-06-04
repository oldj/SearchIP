/**
 * author: oldj
 * blog: http://oldj.net
 */

GetIPInfo.addMethod("ip.cn", function (self, ip, success, fail) {

	var url = "http://www.ip.cn/index.php?ip=" + ip;

	$.get(url, {
	}, function (res) {
		var cnt;
		var a = res.split("<body");

		cnt = a[a.length - 1];
		a = cnt.split(ip);
		cnt = a[1];

		if (!cnt) fail();

		a = cnt.match(/来自：(.*?)</);

		if (a) {
			cnt = a[1];
			success(cnt);
		} else {
			fail();
		}
	});
});
