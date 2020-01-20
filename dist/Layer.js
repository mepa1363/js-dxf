'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Layer = function () {
    function Layer(name, colorNumber, lineTypeName) {
        _classCallCheck(this, Layer);

        this.name = name;
        this.colorNumber = colorNumber;
        this.lineTypeName = lineTypeName;
        this.shapes = [];
        this.trueColor = -1;
    }

    _createClass(Layer, [{
        key: 'toDxfString',
        value: function toDxfString() {
            var s = '0\nLAYER\n';
            s += '70\n64\n';
            s += '2\n' + this.name + '\n';
            if (this.trueColor !== -1) {
                s += '420\n' + this.trueColor + '\n';
            } else {
                s += '62\n' + this.colorNumber + '\n';
            }
            s += '6\n' + this.lineTypeName + '\n';
            return s;
        }
    }, {
        key: 'setTrueColor',
        value: function setTrueColor(color) {
            this.trueColor = color;
        }
    }, {
        key: 'addShape',
        value: function addShape(shape) {
            this.shapes.push(shape);
            shape.layer = this;
        }
    }, {
        key: 'getShapes',
        value: function getShapes() {
            return this.shapes;
        }
    }, {
        key: 'shapesToDxf',
        value: function shapesToDxf() {
            var s = '';
            for (var i = 0; i < this.shapes.length; ++i) {
                s += this.shapes[i].toDxfString();
            }

            return s;
        }
    }]);

    return Layer;
}();

module.exports = Layer;