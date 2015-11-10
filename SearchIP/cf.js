/**
 * author: oldj
 * blog: http://oldj.net
 */

Array.prototype.distinct = function () {

    var d = {},
        i;

    this.push(d);
    while ((i = this.shift()) != d) {
        if (!d.hasOwnProperty(i)) {
            this.push(i);
            d[i] = 1;
        }
    }

    return this;
};
