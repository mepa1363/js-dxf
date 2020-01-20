"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Arc = function () {
    /**
     * @param {number} x1 - Center x
     * @param {number} y1 - Center y
     * @param {number} r - radius
     * @param {number} startAngle - degree 
     * @param {number} endAngle - degree 
     */
    function Arc(x1, y1, r, startAngle, endAngle) {
        _classCallCheck(this, Arc);

        this.x1 = x1;
        this.y1 = y1;
        this.r = r;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
    }

    _createClass(Arc, [{
        key: "toDxfString",
        value: function toDxfString() {
            //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/line_al_u05_c.htm
            var s = "0\nARC\n";
            s += "8\n" + this.layer.name + "\n";
            s += "10\n" + this.x1 + "\n20\n" + this.y1 + "\n30\n0\n";
            s += "40\n" + this.r + "\n50\n" + this.startAngle + "\n51\n" + this.endAngle + "\n";
            return s;
        }
    }]);

    return Arc;
}();

module.exports = Arc;