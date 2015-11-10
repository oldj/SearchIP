/**
 * author: oldj
 * blog: http://oldj.net
 */

var current_mouse_pageX;
var current_mouse_pageY;

function GetIPInfo() {
}

GetIPInfo._methods = [];
GetIPInfo.addMethod = function (name, func) {
    GetIPInfo._methods.push({
        name: name,
        method: func
    });
};

GetIPInfo.prototype = {

    setInformParent: function (el) {
        this.el_inform_parent = el;
    },

    showSearch: function (ip) {
        var el = $([
            "<div class='oj-ip2location'>",
            "<div class='oj-ip2location-wrapper'>",
            "<a href='' class='oj-close'>X</a>",
            "<div class='oj-ip2location-title'>IP：",
            "<strong>", ip, "</strong>",
            "</div>",
            "<div class='oj-ip2location-content'>",
            "<span class='oj-searching'>查询中...</span>",
            "</div>",
            "</div>",
            "</div>"
        ].join(""));

        if (this.el_inform_parent) {
            this.el_inform_parent.append(el);
        } else {
            $("body").append(el);
            el.css({
                position: "absolute",
                top: current_mouse_pageY,
                left: current_mouse_pageX
            });
        }

        el.find("a.oj-close").click(function () {
            el.remove();
            return false;
        });

        this.el = el;
    },

    close: function () {
        this.el && this.el.remove();
    },

    onSuccess: function (lines) {
        if (typeof lines == "string") {
            lines = [lines];
        }

        var cnt = ["<h6>查询结果：</h6>", "<ul>"];
        var i, len = lines.length;

        for (i = 0; i < len; i++) {
            cnt.push("<li>");
            if (len > 1) {
                cnt.push("<span class='oj-num'>" + (i + 1) + ".</span> ");
            }
            cnt.push(lines[i].replace(/^\s+|\s+$/g, "") + "</li>");
        }
        cnt.push("</ul>");

        this.el.find(".oj-ip2location-content").html(cnt.join(""));
    },

    onFail: function () {
        this.el.find(".oj-ip2location-content").html("<p class='oj-error'>IP Search Fail!</p>");
    },

    shuffle: function () {
        GetIPInfo._methods.sort(function () {
            return Math.random() - 0.5;
        });
    },

    get: function (ip, method_name) {
        var idx = 0;
        var _this = this;

        this.ip = ip;
        this.shuffle();
        this.showSearch(ip);

        function tryMethods() {
            var m = GetIPInfo._methods[idx];
            if (!m) {
                _this.onFail();
                return;
            }
            m.method(_this, ip, function (res) {
                _this.onSuccess(res);
            }, function () {
                idx++;
                tryMethods();
            });
        }

        function tryTheMethod() {
            var i;
            var m;
            for (i = 0; i < GetIPInfo._methods.length; i++) {
                m = GetIPInfo._methods[i];
                if (m.name == method_name) {
                    m.method(_this, ip, function (res) {
                        _this.onSuccess(res);
                    }, function () {
                        _this.onFail();
                    });
                    return;
                }
            }
            _this.onFail();
        }

        if (method_name) {
            tryTheMethod();
        } else {
            tryMethods();
        }

    }
};

chrome.runtime.onMessage.addListener(function (msg/*, sender, sendResponse*/) {
    var m;
    if (msg.action == "SendIP") {
        m = new GetIPInfo();
        m.get(msg.ip, null);
    }
});

$(document).mousedown(function (e) {
    current_mouse_pageX = e.pageX;
    current_mouse_pageY = e.pageY;
});
