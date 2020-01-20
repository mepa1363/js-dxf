"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Polyline = function () {
    /**
     * @param {array} points - Array of points like [ [x1, y1], [x2, y2]... ]
     */
    function Polyline(points) {
        _classCallCheck(this, Polyline);

        this.points = points;
    }

    _createClass(Polyline, [{
        key: "toDxfString",
        value: function toDxfString() {
            //https://www.autodesk.com/techpubs/autocad/acad2000/dxf/polyline_dxf_06.htm
            //https://www.autodesk.com/techpubs/autocad/acad2000/dxf/vertex_dxf_06.htm
            var s = "0\nPOLYLINE\n";
            s += "8\n" + this.layer.name + "\n";
            s += "66\n1\n70\n0\n";

            for (var i = 0; i < this.points.length; ++i) {
                s += "0\nVERTEX\n";
                s += "8\n" + this.layer.name + "\n";
                s += "70\n0\n";
                s += "10\n" + this.points[i][0] + "\n20\n" + this.points[i][1] + "\n";
            }

            s += "0\nSEQEND\n";
            return s;
        }
    }]);

    return Polyline;
}();

module.exports = Polyline;