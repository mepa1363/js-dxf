"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Text = function () {
    /**
     * @param {number} x1 - x
     * @param {number} y1 - y
     * @param {number} height - Text height
     * @param {number} rotation - Text rotation
     * @param {string} value - the string itself
     */
    function Text(x1, y1, height, rotation, value) {
        _classCallCheck(this, Text);

        this.x1 = x1;
        this.y1 = y1;
        this.height = height;
        this.rotation = rotation;
        this.value = value;
    }

    _createClass(Text, [{
        key: "toDxfString",
        value: function toDxfString() {
            //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/text_al_u05_c.htm
            var s = "0\nTEXT\n";
            s += "8\n" + this.layer.name + "\n";
            s += "1\n" + this.value + "\n";
            s += "10\n" + this.x1 + "\n20\n" + this.y1 + "\n30\n0\n";
            s += "40\n" + this.height + "\n50\n" + this.rotation + "\n";
            return s;
        }
    }]);

    return Text;
}();

module.exports = Text;