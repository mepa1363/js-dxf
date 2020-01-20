'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LineType = require('./LineType');
var Layer = require('./Layer');
var Line = require('./Line');
var Arc = require('./Arc');
var Circle = require('./Circle');
var Text = require('./Text');
var Polyline = require('./Polyline');
var Polyline3d = require('./Polyline3d');
var Face = require('./Face');
var Point = require('./Point');

var Drawing = function () {
    function Drawing() {
        _classCallCheck(this, Drawing);

        this.layers = {};
        this.activeLayer = null;
        this.lineTypes = {};
        this.headers = {};

        this.setUnits('Unitless');

        for (var i = 0; i < Drawing.LINE_TYPES.length; ++i) {
            this.addLineType(Drawing.LINE_TYPES[i].name, Drawing.LINE_TYPES[i].description, Drawing.LINE_TYPES[i].elements);
        }

        for (var _i = 0; _i < Drawing.LAYERS.length; ++_i) {
            this.addLayer(Drawing.LAYERS[_i].name, Drawing.LAYERS[_i].colorNumber, Drawing.LAYERS[_i].lineTypeName);
        }

        this.setActiveLayer('0');
    }

    /**
     * @param {string} name
     * @param {string} description
     * @param {array} elements - if elem > 0 it is a line, if elem < 0 it is gap, if elem == 0.0 it is a 
     */


    _createClass(Drawing, [{
        key: 'addLineType',
        value: function addLineType(name, description, elements) {
            this.lineTypes[name] = new LineType(name, description, elements);
            return this;
        }
    }, {
        key: 'addLayer',
        value: function addLayer(name, colorNumber, lineTypeName) {
            this.layers[name] = new Layer(name, colorNumber, lineTypeName);
            return this;
        }
    }, {
        key: 'setActiveLayer',
        value: function setActiveLayer(name) {
            this.activeLayer = this.layers[name];
            return this;
        }
    }, {
        key: 'drawLine',
        value: function drawLine(x1, y1, x2, y2) {
            this.activeLayer.addShape(new Line(x1, y1, x2, y2));
            return this;
        }
    }, {
        key: 'drawPoint',
        value: function drawPoint(x, y) {
            this.activeLayer.addShape(new Point(x, y));
            return this;
        }
    }, {
        key: 'drawRect',
        value: function drawRect(x1, y1, x2, y2) {
            this.activeLayer.addShape(new Line(x1, y1, x2, y1));
            this.activeLayer.addShape(new Line(x1, y2, x2, y2));
            this.activeLayer.addShape(new Line(x1, y1, x1, y2));
            this.activeLayer.addShape(new Line(x2, y1, x2, y2));
            return this;
        }

        /**
         * @param {number} x1 - Center x
         * @param {number} y1 - Center y
         * @param {number} r - radius
         * @param {number} startAngle - degree 
         * @param {number} endAngle - degree 
         */

    }, {
        key: 'drawArc',
        value: function drawArc(x1, y1, r, startAngle, endAngle) {
            this.activeLayer.addShape(new Arc(x1, y1, r, startAngle, endAngle));
            return this;
        }

        /**
         * @param {number} x1 - Center x
         * @param {number} y1 - Center y
         * @param {number} r - radius
         */

    }, {
        key: 'drawCircle',
        value: function drawCircle(x1, y1, r) {
            this.activeLayer.addShape(new Circle(x1, y1, r));
            return this;
        }

        /**
         * @param {number} x1 - x
         * @param {number} y1 - y
         * @param {number} height - Text height
         * @param {number} rotation - Text rotation
         * @param {string} value - the string itself
         */

    }, {
        key: 'drawText',
        value: function drawText(x1, y1, height, rotation, value) {
            this.activeLayer.addShape(new Text(x1, y1, height, rotation, value));
            return this;
        }

        /**
         * @param {array} points - Array of points like [ [x1, y1], [x2, y2]... ] 
         */

    }, {
        key: 'drawPolyline',
        value: function drawPolyline(points) {
            this.activeLayer.addShape(new Polyline(points));
            return this;
        }

        /**
         * @param {array} points - Array of points like [ [x1, y1, z1], [x2, y2, z1]... ] 
         */

    }, {
        key: 'drawPolyline3d',
        value: function drawPolyline3d(points) {
            points.forEach(function (point) {
                if (point.length !== 3) {
                    throw "Require 3D coordinate";
                }
            });
            this.activeLayer.addShape(new Polyline3d(points));
            return this;
        }

        /**
         * 
         * @param {number} trueColor - Integer representing the true color, can be passed as an hexadecimal value of the form 0xRRGGBB
         */

    }, {
        key: 'setTrueColor',
        value: function setTrueColor(trueColor) {
            this.activeLayer.setTrueColor(trueColor);
            return this;
        }

        /**
         * @param {number} x1 - x
         * @param {number} y1 - y
         * @param {number} z1 - z
         * @param {number} x2 - x
         * @param {number} y2 - y
         * @param {number} z2 - z
         * @param {number} x3 - x
         * @param {number} y3 - y
         * @param {number} z3 - z
         * @param {number} x4 - x
         * @param {number} y4 - y
         * @param {number} z4 - z
         */

    }, {
        key: 'drawFace',
        value: function drawFace(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4) {
            this.activeLayer.addShape(new Face(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4));
            return this;
        }
    }, {
        key: '_getDxfLtypeTable',
        value: function _getDxfLtypeTable() {
            var s = '0\nTABLE\n'; //start table
            s += '2\nLTYPE\n'; //name table as LTYPE table

            for (var lineTypeName in this.lineTypes) {
                s += this.lineTypes[lineTypeName].toDxfString();
            }

            s += '0\nENDTAB\n'; //end table

            return s;
        }
    }, {
        key: '_getDxfLayerTable',
        value: function _getDxfLayerTable() {
            var s = '0\nTABLE\n'; //start table
            s += '2\nLAYER\n'; //name table as LAYER table

            for (var layerName in this.layers) {
                s += this.layers[layerName].toDxfString();
            }

            s += '0\nENDTAB\n';

            return s;
        }

        /**
         * @see https://www.autodesk.com/techpubs/autocad/acadr14/dxf/header_section_al_u05_c.htm
         * @see https://www.autodesk.com/techpubs/autocad/acad2000/dxf/header_section_group_codes_dxf_02.htm
         * 
         * @param {string} variable 
         * @param {array} values Array of "two elements arrays". [  [value1_GroupCode, value1_value], [value2_GroupCode, value2_value]  ]
         */

    }, {
        key: 'header',
        value: function header(variable, values) {
            this.headers[variable] = values;
            return this;
        }
    }, {
        key: '_getHeader',
        value: function _getHeader(variable, values) {
            var s = '9\n$' + variable + '\n';

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var value = _step.value;

                    s += value[0] + '\n' + value[1] + '\n';
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return s;
        }

        /**
         * 
         * @param {string} unit see Drawing.UNITS
         */

    }, {
        key: 'setUnits',
        value: function setUnits(unit) {
            var value = typeof Drawing.UNITS[unit] != 'undefined' ? Drawing.UNITS[unit] : Drawing.UNITS['Unitless'];
            this.header('INSUNITS', [[70, Drawing.UNITS[unit]]]);
            return this;
        }
    }, {
        key: 'toDxfString',
        value: function toDxfString() {
            var s = '';

            //start section
            s += '0\nSECTION\n';
            //name section as HEADER section
            s += '2\nHEADER\n';

            for (var header in this.headers) {
                s += this._getHeader(header, this.headers[header]);
            }

            //end section
            s += '0\nENDSEC\n';

            //start section
            s += '0\nSECTION\n';
            //name section as TABLES section
            s += '2\nTABLES\n';

            s += this._getDxfLtypeTable();
            s += this._getDxfLayerTable();

            //end section
            s += '0\nENDSEC\n';

            //ENTITES section
            s += '0\nSECTION\n';
            s += '2\nENTITIES\n';

            for (var layerName in this.layers) {
                var layer = this.layers[layerName];
                s += layer.shapesToDxf();
                // let shapes = layer.getShapes();
            }

            s += '0\nENDSEC\n';

            //close file
            s += '0\nEOF';

            return s;
        }
    }]);

    return Drawing;
}();

//AutoCAD Color Index (ACI)
//http://sub-atomic.com/~moses/acadcolors.html


Drawing.ACI = {
    LAYER: 0,
    RED: 1,
    YELLOW: 2,
    GREEN: 3,
    CYAN: 4,
    BLUE: 5,
    MAGENTA: 6,
    WHITE: 7
};

Drawing.LINE_TYPES = [{ name: 'CONTINUOUS', description: '______', elements: [] }, { name: 'DASHED', description: '_ _ _ ', elements: [5.0, -5.0] }, { name: 'DOTTED', description: '. . . ', elements: [0.0, -5.0] }];

Drawing.LAYERS = [{ name: '0', colorNumber: Drawing.ACI.WHITE, lineTypeName: 'CONTINUOUS' }];

//https://www.autodesk.com/techpubs/autocad/acad2000/dxf/header_section_group_codes_dxf_02.htm
Drawing.UNITS = {
    'Unitless': 0,
    'Inches': 1,
    'Feet': 2,
    'Miles': 3,
    'Millimeters': 4,
    'Centimeters': 5,
    'Meters': 6,
    'Kilometers': 7,
    'Microinches': 8,
    'Mils': 9,
    'Yards': 10,
    'Angstroms': 11,
    'Nanometers': 12,
    'Microns': 13,
    'Decimeters': 14,
    'Decameters': 15,
    'Hectometers': 16,
    'Gigameters': 17,
    'Astronomical units': 18,
    'Light years': 19,
    'Parsecs': 20
};

module.exports = Drawing;