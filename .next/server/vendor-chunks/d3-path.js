"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/d3-path";
exports.ids = ["vendor-chunks/d3-path"];
exports.modules = {

/***/ "(ssr)/./node_modules/d3-path/src/path.js":
/*!******************************************!*\
  !*** ./node_modules/d3-path/src/path.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Path: () => (/* binding */ Path),\n/* harmony export */   path: () => (/* binding */ path),\n/* harmony export */   pathRound: () => (/* binding */ pathRound)\n/* harmony export */ });\nconst pi = Math.PI,\n    tau = 2 * pi,\n    epsilon = 1e-6,\n    tauEpsilon = tau - epsilon;\n\nfunction append(strings) {\n  this._ += strings[0];\n  for (let i = 1, n = strings.length; i < n; ++i) {\n    this._ += arguments[i] + strings[i];\n  }\n}\n\nfunction appendRound(digits) {\n  let d = Math.floor(digits);\n  if (!(d >= 0)) throw new Error(`invalid digits: ${digits}`);\n  if (d > 15) return append;\n  const k = 10 ** d;\n  return function(strings) {\n    this._ += strings[0];\n    for (let i = 1, n = strings.length; i < n; ++i) {\n      this._ += Math.round(arguments[i] * k) / k + strings[i];\n    }\n  };\n}\n\nclass Path {\n  constructor(digits) {\n    this._x0 = this._y0 = // start of current subpath\n    this._x1 = this._y1 = null; // end of current subpath\n    this._ = \"\";\n    this._append = digits == null ? append : appendRound(digits);\n  }\n  moveTo(x, y) {\n    this._append`M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}`;\n  }\n  closePath() {\n    if (this._x1 !== null) {\n      this._x1 = this._x0, this._y1 = this._y0;\n      this._append`Z`;\n    }\n  }\n  lineTo(x, y) {\n    this._append`L${this._x1 = +x},${this._y1 = +y}`;\n  }\n  quadraticCurveTo(x1, y1, x, y) {\n    this._append`Q${+x1},${+y1},${this._x1 = +x},${this._y1 = +y}`;\n  }\n  bezierCurveTo(x1, y1, x2, y2, x, y) {\n    this._append`C${+x1},${+y1},${+x2},${+y2},${this._x1 = +x},${this._y1 = +y}`;\n  }\n  arcTo(x1, y1, x2, y2, r) {\n    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;\n\n    // Is the radius negative? Error.\n    if (r < 0) throw new Error(`negative radius: ${r}`);\n\n    let x0 = this._x1,\n        y0 = this._y1,\n        x21 = x2 - x1,\n        y21 = y2 - y1,\n        x01 = x0 - x1,\n        y01 = y0 - y1,\n        l01_2 = x01 * x01 + y01 * y01;\n\n    // Is this path empty? Move to (x1,y1).\n    if (this._x1 === null) {\n      this._append`M${this._x1 = x1},${this._y1 = y1}`;\n    }\n\n    // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.\n    else if (!(l01_2 > epsilon));\n\n    // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?\n    // Equivalently, is (x1,y1) coincident with (x2,y2)?\n    // Or, is the radius zero? Line to (x1,y1).\n    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {\n      this._append`L${this._x1 = x1},${this._y1 = y1}`;\n    }\n\n    // Otherwise, draw an arc!\n    else {\n      let x20 = x2 - x0,\n          y20 = y2 - y0,\n          l21_2 = x21 * x21 + y21 * y21,\n          l20_2 = x20 * x20 + y20 * y20,\n          l21 = Math.sqrt(l21_2),\n          l01 = Math.sqrt(l01_2),\n          l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),\n          t01 = l / l01,\n          t21 = l / l21;\n\n      // If the start tangent is not coincident with (x0,y0), line to.\n      if (Math.abs(t01 - 1) > epsilon) {\n        this._append`L${x1 + t01 * x01},${y1 + t01 * y01}`;\n      }\n\n      this._append`A${r},${r},0,0,${+(y01 * x20 > x01 * y20)},${this._x1 = x1 + t21 * x21},${this._y1 = y1 + t21 * y21}`;\n    }\n  }\n  arc(x, y, r, a0, a1, ccw) {\n    x = +x, y = +y, r = +r, ccw = !!ccw;\n\n    // Is the radius negative? Error.\n    if (r < 0) throw new Error(`negative radius: ${r}`);\n\n    let dx = r * Math.cos(a0),\n        dy = r * Math.sin(a0),\n        x0 = x + dx,\n        y0 = y + dy,\n        cw = 1 ^ ccw,\n        da = ccw ? a0 - a1 : a1 - a0;\n\n    // Is this path empty? Move to (x0,y0).\n    if (this._x1 === null) {\n      this._append`M${x0},${y0}`;\n    }\n\n    // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).\n    else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {\n      this._append`L${x0},${y0}`;\n    }\n\n    // Is this arc empty? We’re done.\n    if (!r) return;\n\n    // Does the angle go the wrong way? Flip the direction.\n    if (da < 0) da = da % tau + tau;\n\n    // Is this a complete circle? Draw two arcs to complete the circle.\n    if (da > tauEpsilon) {\n      this._append`A${r},${r},0,1,${cw},${x - dx},${y - dy}A${r},${r},0,1,${cw},${this._x1 = x0},${this._y1 = y0}`;\n    }\n\n    // Is this arc non-empty? Draw an arc!\n    else if (da > epsilon) {\n      this._append`A${r},${r},0,${+(da >= pi)},${cw},${this._x1 = x + r * Math.cos(a1)},${this._y1 = y + r * Math.sin(a1)}`;\n    }\n  }\n  rect(x, y, w, h) {\n    this._append`M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}h${w = +w}v${+h}h${-w}Z`;\n  }\n  toString() {\n    return this._;\n  }\n}\n\nfunction path() {\n  return new Path;\n}\n\n// Allow instanceof d3.path\npath.prototype = Path.prototype;\n\nfunction pathRound(digits = 3) {\n  return new Path(+digits);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZDMtcGF0aC9zcmMvcGF0aC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0NBQXNDLE9BQU87QUFDN0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvREFBb0QsT0FBTztBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxPQUFPO0FBQy9DO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQix5QkFBeUIsR0FBRyx5QkFBeUI7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixjQUFjLEdBQUcsY0FBYztBQUNuRDtBQUNBO0FBQ0Esb0JBQW9CLElBQUksR0FBRyxJQUFJLEdBQUcsY0FBYyxHQUFHLGNBQWM7QUFDakU7QUFDQTtBQUNBLG9CQUFvQixJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsY0FBYyxHQUFHLGNBQWM7QUFDL0U7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbURBQW1ELEVBQUU7O0FBRXJEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQkFBc0IsY0FBYyxHQUFHLGNBQWM7QUFDckQ7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixjQUFjLEdBQUcsY0FBYztBQUNyRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0IsZUFBZSxHQUFHLGVBQWU7QUFDekQ7O0FBRUEsc0JBQXNCLEVBQUUsR0FBRyxFQUFFLE9BQU8seUJBQXlCLEdBQUcsMEJBQTBCLEdBQUcsMEJBQTBCO0FBQ3ZIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbURBQW1ELEVBQUU7O0FBRXJEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0JBQXNCLEdBQUcsR0FBRyxHQUFHO0FBQy9COztBQUVBO0FBQ0E7QUFDQSxzQkFBc0IsR0FBRyxHQUFHLEdBQUc7QUFDL0I7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQkFBc0IsRUFBRSxHQUFHLEVBQUUsT0FBTyxHQUFHLEdBQUcsT0FBTyxHQUFHLE9BQU8sR0FBRyxFQUFFLEdBQUcsRUFBRSxPQUFPLEdBQUcsR0FBRyxjQUFjLEdBQUcsY0FBYztBQUNqSDs7QUFFQTtBQUNBO0FBQ0Esc0JBQXNCLEVBQUUsR0FBRyxFQUFFLEtBQUssWUFBWSxHQUFHLEdBQUcsR0FBRyxnQ0FBZ0MsR0FBRyxnQ0FBZ0M7QUFDMUg7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHlCQUF5QixHQUFHLHlCQUF5QixHQUFHLE9BQU8sR0FBRyxHQUFHLEdBQUcsR0FBRztBQUMvRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBOztBQUVPO0FBQ1A7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2FpLW1ha2V0cGxhY2UtYWRtaW4vLi9ub2RlX21vZHVsZXMvZDMtcGF0aC9zcmMvcGF0aC5qcz80YmUwIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHBpID0gTWF0aC5QSSxcbiAgICB0YXUgPSAyICogcGksXG4gICAgZXBzaWxvbiA9IDFlLTYsXG4gICAgdGF1RXBzaWxvbiA9IHRhdSAtIGVwc2lsb247XG5cbmZ1bmN0aW9uIGFwcGVuZChzdHJpbmdzKSB7XG4gIHRoaXMuXyArPSBzdHJpbmdzWzBdO1xuICBmb3IgKGxldCBpID0gMSwgbiA9IHN0cmluZ3MubGVuZ3RoOyBpIDwgbjsgKytpKSB7XG4gICAgdGhpcy5fICs9IGFyZ3VtZW50c1tpXSArIHN0cmluZ3NbaV07XG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwZW5kUm91bmQoZGlnaXRzKSB7XG4gIGxldCBkID0gTWF0aC5mbG9vcihkaWdpdHMpO1xuICBpZiAoIShkID49IDApKSB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgZGlnaXRzOiAke2RpZ2l0c31gKTtcbiAgaWYgKGQgPiAxNSkgcmV0dXJuIGFwcGVuZDtcbiAgY29uc3QgayA9IDEwICoqIGQ7XG4gIHJldHVybiBmdW5jdGlvbihzdHJpbmdzKSB7XG4gICAgdGhpcy5fICs9IHN0cmluZ3NbMF07XG4gICAgZm9yIChsZXQgaSA9IDEsIG4gPSBzdHJpbmdzLmxlbmd0aDsgaSA8IG47ICsraSkge1xuICAgICAgdGhpcy5fICs9IE1hdGgucm91bmQoYXJndW1lbnRzW2ldICogaykgLyBrICsgc3RyaW5nc1tpXTtcbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCBjbGFzcyBQYXRoIHtcbiAgY29uc3RydWN0b3IoZGlnaXRzKSB7XG4gICAgdGhpcy5feDAgPSB0aGlzLl95MCA9IC8vIHN0YXJ0IG9mIGN1cnJlbnQgc3VicGF0aFxuICAgIHRoaXMuX3gxID0gdGhpcy5feTEgPSBudWxsOyAvLyBlbmQgb2YgY3VycmVudCBzdWJwYXRoXG4gICAgdGhpcy5fID0gXCJcIjtcbiAgICB0aGlzLl9hcHBlbmQgPSBkaWdpdHMgPT0gbnVsbCA/IGFwcGVuZCA6IGFwcGVuZFJvdW5kKGRpZ2l0cyk7XG4gIH1cbiAgbW92ZVRvKHgsIHkpIHtcbiAgICB0aGlzLl9hcHBlbmRgTSR7dGhpcy5feDAgPSB0aGlzLl94MSA9ICt4fSwke3RoaXMuX3kwID0gdGhpcy5feTEgPSAreX1gO1xuICB9XG4gIGNsb3NlUGF0aCgpIHtcbiAgICBpZiAodGhpcy5feDEgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuX3gxID0gdGhpcy5feDAsIHRoaXMuX3kxID0gdGhpcy5feTA7XG4gICAgICB0aGlzLl9hcHBlbmRgWmA7XG4gICAgfVxuICB9XG4gIGxpbmVUbyh4LCB5KSB7XG4gICAgdGhpcy5fYXBwZW5kYEwke3RoaXMuX3gxID0gK3h9LCR7dGhpcy5feTEgPSAreX1gO1xuICB9XG4gIHF1YWRyYXRpY0N1cnZlVG8oeDEsIHkxLCB4LCB5KSB7XG4gICAgdGhpcy5fYXBwZW5kYFEkeyt4MX0sJHsreTF9LCR7dGhpcy5feDEgPSAreH0sJHt0aGlzLl95MSA9ICt5fWA7XG4gIH1cbiAgYmV6aWVyQ3VydmVUbyh4MSwgeTEsIHgyLCB5MiwgeCwgeSkge1xuICAgIHRoaXMuX2FwcGVuZGBDJHsreDF9LCR7K3kxfSwkeyt4Mn0sJHsreTJ9LCR7dGhpcy5feDEgPSAreH0sJHt0aGlzLl95MSA9ICt5fWA7XG4gIH1cbiAgYXJjVG8oeDEsIHkxLCB4MiwgeTIsIHIpIHtcbiAgICB4MSA9ICt4MSwgeTEgPSAreTEsIHgyID0gK3gyLCB5MiA9ICt5MiwgciA9ICtyO1xuXG4gICAgLy8gSXMgdGhlIHJhZGl1cyBuZWdhdGl2ZT8gRXJyb3IuXG4gICAgaWYgKHIgPCAwKSB0aHJvdyBuZXcgRXJyb3IoYG5lZ2F0aXZlIHJhZGl1czogJHtyfWApO1xuXG4gICAgbGV0IHgwID0gdGhpcy5feDEsXG4gICAgICAgIHkwID0gdGhpcy5feTEsXG4gICAgICAgIHgyMSA9IHgyIC0geDEsXG4gICAgICAgIHkyMSA9IHkyIC0geTEsXG4gICAgICAgIHgwMSA9IHgwIC0geDEsXG4gICAgICAgIHkwMSA9IHkwIC0geTEsXG4gICAgICAgIGwwMV8yID0geDAxICogeDAxICsgeTAxICogeTAxO1xuXG4gICAgLy8gSXMgdGhpcyBwYXRoIGVtcHR5PyBNb3ZlIHRvICh4MSx5MSkuXG4gICAgaWYgKHRoaXMuX3gxID09PSBudWxsKSB7XG4gICAgICB0aGlzLl9hcHBlbmRgTSR7dGhpcy5feDEgPSB4MX0sJHt0aGlzLl95MSA9IHkxfWA7XG4gICAgfVxuXG4gICAgLy8gT3IsIGlzICh4MSx5MSkgY29pbmNpZGVudCB3aXRoICh4MCx5MCk/IERvIG5vdGhpbmcuXG4gICAgZWxzZSBpZiAoIShsMDFfMiA+IGVwc2lsb24pKTtcblxuICAgIC8vIE9yLCBhcmUgKHgwLHkwKSwgKHgxLHkxKSBhbmQgKHgyLHkyKSBjb2xsaW5lYXI/XG4gICAgLy8gRXF1aXZhbGVudGx5LCBpcyAoeDEseTEpIGNvaW5jaWRlbnQgd2l0aCAoeDIseTIpP1xuICAgIC8vIE9yLCBpcyB0aGUgcmFkaXVzIHplcm8/IExpbmUgdG8gKHgxLHkxKS5cbiAgICBlbHNlIGlmICghKE1hdGguYWJzKHkwMSAqIHgyMSAtIHkyMSAqIHgwMSkgPiBlcHNpbG9uKSB8fCAhcikge1xuICAgICAgdGhpcy5fYXBwZW5kYEwke3RoaXMuX3gxID0geDF9LCR7dGhpcy5feTEgPSB5MX1gO1xuICAgIH1cblxuICAgIC8vIE90aGVyd2lzZSwgZHJhdyBhbiBhcmMhXG4gICAgZWxzZSB7XG4gICAgICBsZXQgeDIwID0geDIgLSB4MCxcbiAgICAgICAgICB5MjAgPSB5MiAtIHkwLFxuICAgICAgICAgIGwyMV8yID0geDIxICogeDIxICsgeTIxICogeTIxLFxuICAgICAgICAgIGwyMF8yID0geDIwICogeDIwICsgeTIwICogeTIwLFxuICAgICAgICAgIGwyMSA9IE1hdGguc3FydChsMjFfMiksXG4gICAgICAgICAgbDAxID0gTWF0aC5zcXJ0KGwwMV8yKSxcbiAgICAgICAgICBsID0gciAqIE1hdGgudGFuKChwaSAtIE1hdGguYWNvcygobDIxXzIgKyBsMDFfMiAtIGwyMF8yKSAvICgyICogbDIxICogbDAxKSkpIC8gMiksXG4gICAgICAgICAgdDAxID0gbCAvIGwwMSxcbiAgICAgICAgICB0MjEgPSBsIC8gbDIxO1xuXG4gICAgICAvLyBJZiB0aGUgc3RhcnQgdGFuZ2VudCBpcyBub3QgY29pbmNpZGVudCB3aXRoICh4MCx5MCksIGxpbmUgdG8uXG4gICAgICBpZiAoTWF0aC5hYnModDAxIC0gMSkgPiBlcHNpbG9uKSB7XG4gICAgICAgIHRoaXMuX2FwcGVuZGBMJHt4MSArIHQwMSAqIHgwMX0sJHt5MSArIHQwMSAqIHkwMX1gO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9hcHBlbmRgQSR7cn0sJHtyfSwwLDAsJHsrKHkwMSAqIHgyMCA+IHgwMSAqIHkyMCl9LCR7dGhpcy5feDEgPSB4MSArIHQyMSAqIHgyMX0sJHt0aGlzLl95MSA9IHkxICsgdDIxICogeTIxfWA7XG4gICAgfVxuICB9XG4gIGFyYyh4LCB5LCByLCBhMCwgYTEsIGNjdykge1xuICAgIHggPSAreCwgeSA9ICt5LCByID0gK3IsIGNjdyA9ICEhY2N3O1xuXG4gICAgLy8gSXMgdGhlIHJhZGl1cyBuZWdhdGl2ZT8gRXJyb3IuXG4gICAgaWYgKHIgPCAwKSB0aHJvdyBuZXcgRXJyb3IoYG5lZ2F0aXZlIHJhZGl1czogJHtyfWApO1xuXG4gICAgbGV0IGR4ID0gciAqIE1hdGguY29zKGEwKSxcbiAgICAgICAgZHkgPSByICogTWF0aC5zaW4oYTApLFxuICAgICAgICB4MCA9IHggKyBkeCxcbiAgICAgICAgeTAgPSB5ICsgZHksXG4gICAgICAgIGN3ID0gMSBeIGNjdyxcbiAgICAgICAgZGEgPSBjY3cgPyBhMCAtIGExIDogYTEgLSBhMDtcblxuICAgIC8vIElzIHRoaXMgcGF0aCBlbXB0eT8gTW92ZSB0byAoeDAseTApLlxuICAgIGlmICh0aGlzLl94MSA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5fYXBwZW5kYE0ke3gwfSwke3kwfWA7XG4gICAgfVxuXG4gICAgLy8gT3IsIGlzICh4MCx5MCkgbm90IGNvaW5jaWRlbnQgd2l0aCB0aGUgcHJldmlvdXMgcG9pbnQ/IExpbmUgdG8gKHgwLHkwKS5cbiAgICBlbHNlIGlmIChNYXRoLmFicyh0aGlzLl94MSAtIHgwKSA+IGVwc2lsb24gfHwgTWF0aC5hYnModGhpcy5feTEgLSB5MCkgPiBlcHNpbG9uKSB7XG4gICAgICB0aGlzLl9hcHBlbmRgTCR7eDB9LCR7eTB9YDtcbiAgICB9XG5cbiAgICAvLyBJcyB0aGlzIGFyYyBlbXB0eT8gV2XigJlyZSBkb25lLlxuICAgIGlmICghcikgcmV0dXJuO1xuXG4gICAgLy8gRG9lcyB0aGUgYW5nbGUgZ28gdGhlIHdyb25nIHdheT8gRmxpcCB0aGUgZGlyZWN0aW9uLlxuICAgIGlmIChkYSA8IDApIGRhID0gZGEgJSB0YXUgKyB0YXU7XG5cbiAgICAvLyBJcyB0aGlzIGEgY29tcGxldGUgY2lyY2xlPyBEcmF3IHR3byBhcmNzIHRvIGNvbXBsZXRlIHRoZSBjaXJjbGUuXG4gICAgaWYgKGRhID4gdGF1RXBzaWxvbikge1xuICAgICAgdGhpcy5fYXBwZW5kYEEke3J9LCR7cn0sMCwxLCR7Y3d9LCR7eCAtIGR4fSwke3kgLSBkeX1BJHtyfSwke3J9LDAsMSwke2N3fSwke3RoaXMuX3gxID0geDB9LCR7dGhpcy5feTEgPSB5MH1gO1xuICAgIH1cblxuICAgIC8vIElzIHRoaXMgYXJjIG5vbi1lbXB0eT8gRHJhdyBhbiBhcmMhXG4gICAgZWxzZSBpZiAoZGEgPiBlcHNpbG9uKSB7XG4gICAgICB0aGlzLl9hcHBlbmRgQSR7cn0sJHtyfSwwLCR7KyhkYSA+PSBwaSl9LCR7Y3d9LCR7dGhpcy5feDEgPSB4ICsgciAqIE1hdGguY29zKGExKX0sJHt0aGlzLl95MSA9IHkgKyByICogTWF0aC5zaW4oYTEpfWA7XG4gICAgfVxuICB9XG4gIHJlY3QoeCwgeSwgdywgaCkge1xuICAgIHRoaXMuX2FwcGVuZGBNJHt0aGlzLl94MCA9IHRoaXMuX3gxID0gK3h9LCR7dGhpcy5feTAgPSB0aGlzLl95MSA9ICt5fWgke3cgPSArd312JHsraH1oJHstd31aYDtcbiAgfVxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5fO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXRoKCkge1xuICByZXR1cm4gbmV3IFBhdGg7XG59XG5cbi8vIEFsbG93IGluc3RhbmNlb2YgZDMucGF0aFxucGF0aC5wcm90b3R5cGUgPSBQYXRoLnByb3RvdHlwZTtcblxuZXhwb3J0IGZ1bmN0aW9uIHBhdGhSb3VuZChkaWdpdHMgPSAzKSB7XG4gIHJldHVybiBuZXcgUGF0aCgrZGlnaXRzKTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/d3-path/src/path.js\n");

/***/ })

};
;