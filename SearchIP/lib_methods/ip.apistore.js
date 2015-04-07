/**
 * author: oldj
 * blog: http://oldj.net
 */

GetIPInfo.addMethod("ip.apistore", function (self, ip, success, fail) {
	// @see http://apistore.baidu.com/astore/serviceinfo/1840.html

	var url = "http://apistore.baidu.com/microservice/iplookup";

	$.getJSON(url, {
		ip: ip
	}, function (res) {

		var cnt, d;
		if (res.retData) {
			d = res.retData;
			cnt = [
				d.country, d.province, d.city, d.district, " ", d.carrier
			].join("");
			success(cnt);
		} else {
			fail();
		}
	});
});
