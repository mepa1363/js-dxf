'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LineType = function () {
    /**
     * @param {string} name
     * @param {string} description
     * @param {array} elements - if elem > 0 it is a line, if elem < 0 it is gap, if elem == 0.0 it is a 
     */
    function LineType(name, description, elements) {
        _classCallCheck(this, LineType);

        this.name = name;
        this.description = description;
        this.elements = elements;
    }

    /**
     * @link https://www.autodesk.com/techpubs/autocad/acadr14/dxf/ltype_al_u05_c.htm
     */


    _createClass(LineType, [{
        key: 'toDxfString',
        value: function toDxfString() {
            var s = '0\nLTYPE\n';
            s += '72\n65\n';
            s += '70\n64\n';
            s += '2\n' + this.name + '\n';
            s += '3\n' + this.description + '\n';
            s += '73\n' + this.elements.length + '\n';
            s += '40\n' + this.getElementsSum() + '\n';

            for (var i = 0; i < this.elements.length; ++i) {
                s += '49\n' + this.elements[i] + '\n';
            }

            return s;
        }
    }, {
        key: 'getElementsSum',
        value: function getElementsSum() {
            var sum = 0;
            for (var i = 0; i < this.elements.length; ++i) {
                sum += Math.abs(this.elements[i]);
            }

            return sum;
        }
    }]);

    return LineType;
}();

module.exports = LineType;