"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Face = function () {
    function Face(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4) {
        _classCallCheck(this, Face);

        this.x1 = x1;
        this.y1 = y1;
        this.z1 = z1;
        this.x2 = x2;
        this.y2 = y2;
        this.z2 = z2;
        this.x3 = x3;
        this.y3 = y3;
        this.z3 = z3;
        this.x4 = x4;
        this.y4 = y4;
        this.z4 = z4;
    }

    _createClass(Face, [{
        key: "toDxfString",
        value: function toDxfString() {
            //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/3dface_al_u05_c.htm
            var s = "0\n3DFACE\n";
            s += "8\n" + this.layer.name + "\n";
            s += "10\n" + this.x1 + "\n20\n" + this.y1 + "\n30\n" + this.z1 + "\n";
            s += "11\n" + this.x2 + "\n21\n" + this.y2 + "\n31\n" + this.z2 + "\n";
            s += "12\n" + this.x3 + "\n22\n" + this.y3 + "\n32\n" + this.z3 + "\n";
            s += "13\n" + this.x4 + "\n23\n" + this.y4 + "\n33\n" + this.z4 + "\n";
            return s;
        }
    }]);

    return Face;
}();

module.exports = Face;