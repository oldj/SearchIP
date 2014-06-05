/**
 * author: oldj
 * blog: http://oldj.net
 */

GetIPInfo.addMethod("ip138", function (self, ip, success, fail) {

	var url = "http://www.ip138.com/ips138.asp?ip=" + ip + "&action=2";

	$.get(url, function (res) {
		var a = res.split(ip);
		var cnt;
		var locations = [];
		var i;
		var line;

		if (a.length > 2) {
			cnt = a[1];
		} else {
			fail();
			return;
		}

		a = cnt.match(/<li>(.+?)<\/li>/ig);
		if (!a) {
			fail();
		} else {
			for (i = 0; i < a.length; i ++) {
				line = a[i].replace(/<.*?>/g, "");
				line = line.split(/[:：]/);
				if (line.length > 1) {
					line = line.splice(1);
				}
				line = line.join(":");
				locations.push(line);
			}
			success(locations.distinct());
		}
	});
});
