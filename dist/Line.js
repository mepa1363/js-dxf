"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Line = function () {
    function Line(x1, y1, x2, y2) {
        _classCallCheck(this, Line);

        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    _createClass(Line, [{
        key: "toDxfString",
        value: function toDxfString() {
            //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/line_al_u05_c.htm
            var s = "0\nLINE\n";
            s += "8\n" + this.layer.name + "\n";
            s += "10\n" + this.x1 + "\n20\n" + this.y1 + "\n30\n0\n";
            s += "11\n" + this.x2 + "\n21\n" + this.y2 + "\n31\n0\n";
            return s;
        }
    }]);

    return Line;
}();

module.exports = Line;