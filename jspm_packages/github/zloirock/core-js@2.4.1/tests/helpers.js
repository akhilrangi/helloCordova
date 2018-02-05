// Generated by LiveScript 1.4.0
(function(){
  QUnit.assert.arity = function(fn, length, message){
    this.push(fn.length === length, fn.length, length, message || "arity is " + length);
  };
}).call(this);

// Generated by LiveScript 1.4.0
(function(){
  var same, slice$ = [].slice;
  same = function(a, b){
    if (a === b) {
      return a !== 0 || 1 / a === 1 / b;
    } else {
      return a != a && b != b;
    }
  };
  QUnit.assert.arrayEqual = function(a, b, message){
    var result, i$, to$, i;
    result = true;
    if (a.length !== b.length) {
      result = false;
    } else {
      for (i$ = 0, to$ = a.length; i$ < to$; ++i$) {
        i = i$;
        if (!same(a[i], b[i])) {
          result = false;
          break;
        }
      }
    }
    this.push(result, slice$.call(a), slice$.call(b), message);
  };
}).call(this);

// Generated by LiveScript 1.4.0
(function(){
  var global, ArrayBuffer, DataView;
  global = Function('return this')();
  ArrayBuffer = (typeof core != 'undefined' && core !== null ? core.ArrayBuffer : void 8) || global.ArrayBuffer;
  DataView = (typeof core != 'undefined' && core !== null ? core.DataView : void 8) || global.DataView;
  global.arrayToBuffer = function(it){
    var buffer, view, i$, to$, i;
    buffer = new ArrayBuffer(it.length);
    view = new DataView(buffer);
    for (i$ = 0, to$ = it.length; i$ < to$; ++i$) {
      i = i$;
      view.setUint8(i, it[i]);
    }
    return buffer;
  };
}).call(this);

// Generated by LiveScript 1.4.0
(function(){
  var global, DataView;
  global = Function('return this')();
  DataView = (typeof core != 'undefined' && core !== null ? core.DataView : void 8) || global.DataView;
  global.bufferToArray = function(it){
    var view, i$, to$, i, results$ = [];
    view = new DataView(it);
    for (i$ = 0, to$ = view.byteLength; i$ < to$; ++i$) {
      i = i$;
      results$.push(view.getUint8(i));
    }
    return results$;
  };
}).call(this);

// Generated by LiveScript 1.4.0
(function(){
  Function('return this')().createIterable = function(elements, methods){
    var iterable, ref$, ref1$;
    methods == null && (methods = {});
    return iterable = (ref$ = {
      called: false,
      received: false
    }, ref$[(typeof Symbol != 'undefined' && Symbol !== null ? Symbol.iterator : void 8) || (typeof core != 'undefined' && core !== null ? (ref1$ = core.Symbol) != null ? ref1$.iterator : void 8 : void 8)] = function(){
      var index;
      this.received = true;
      index = 0;
      return import$({
        next: function(){
          iterable.called = true;
          return {
            value: elements[index++],
            done: index > elements.length
          };
        }
      }, methods);
    }, ref$);
  };
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);

// Generated by LiveScript 1.4.0
(function(){
  QUnit.assert.epsilon = function(a, b, E, message){
    this.push(Math.abs(a - b) <= (E != null ? E : 1e-11), a, b, message);
  };
}).call(this);

// Generated by LiveScript 1.4.0
(function(){
  'use strict';
  var global;
  global = Function('return this')();
  import$(global, {
    global: global,
    DESCRIPTORS: function(){
      try {
        return 7 === Object.defineProperty({}, 'a', {
          get: function(){
            return 7;
          }
        }).a;
      } catch (e$) {}
    }(),
    STRICT: !function(){
      return this;
    }(),
    PROTO: Object.setPrototypeOf != null || '__proto__' in Object.prototype,
    NATIVE: void 8
  });
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);

// Generated by LiveScript 1.4.0
(function(){
  var toString$ = {}.toString;
  QUnit.assert.isFunction = function(fn, message){
    this.push(typeof fn === 'function' || toString$.call(fn).slice(8, -1) === 'Function', false, true, message || 'is function');
  };
}).call(this);

// Generated by LiveScript 1.4.0
(function(){
  QUnit.assert.isIterable = function(it, message){
    this.push(typeof core != 'undefined' && core !== null
      ? core.isIterable(it)
      : !!it[typeof Symbol != 'undefined' && Symbol !== null ? Symbol.iterator : void 8], false, true, message || 'is iterable');
  };
}).call(this);

// Generated by LiveScript 1.4.0
(function(){
  QUnit.assert.isIterator = function(it, message){
    this.push(typeof it === 'object' && typeof it.next === 'function', false, true, message || 'is iterator');
  };
}).call(this);

// Generated by LiveScript 1.4.0
(function(){
  var e;
  Function('return this')().LITTLE_ENDIAN = (function(){
    try {
      return deepEq$(new Uint8Array(new Uint16Array([1]).buffer)[0], 1, '===');
    } catch (e$) {
      e = e$;
      return true;
    }
  }());
  function deepEq$(x, y, type){
    var toString = {}.toString, hasOwnProperty = {}.hasOwnProperty,
        has = function (obj, key) { return hasOwnProperty.call(obj, key); };
    var first = true;
    return eq(x, y, []);
    function eq(a, b, stack) {
      var className, length, size, result, alength, blength, r, key, ref, sizeB;
      if (a == null || b == null) { return a === b; }
      if (a.__placeholder__ || b.__placeholder__) { return true; }
      if (a === b) { return a !== 0 || 1 / a == 1 / b; }
      className = toString.call(a);
      if (toString.call(b) != className) { return false; }
      switch (className) {
        case '[object String]': return a == String(b);
        case '[object Number]':
          return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
        case '[object Date]':
        case '[object Boolean]':
          return +a == +b;
        case '[object RegExp]':
          return a.source == b.source &&
                 a.global == b.global &&
                 a.multiline == b.multiline &&
                 a.ignoreCase == b.ignoreCase;
      }
      if (typeof a != 'object' || typeof b != 'object') { return false; }
      length = stack.length;
      while (length--) { if (stack[length] == a) { return true; } }
      stack.push(a);
      size = 0;
      result = true;
      if (className == '[object Array]') {
        alength = a.length;
        blength = b.length;
        if (first) {
          switch (type) {
          case '===': result = alength === blength; break;
          case '<==': result = alength <= blength; break;
          case '<<=': result = alength < blength; break;
          }
          size = alength;
          first = false;
        } else {
          result = alength === blength;
          size = alength;
        }
        if (result) {
          while (size--) {
            if (!(result = size in a == size in b && eq(a[size], b[size], stack))){ break; }
          }
        }
      } else {
        if ('constructor' in a != 'constructor' in b || a.constructor != b.constructor) {
          return false;
        }
        for (key in a) {
          if (has(a, key)) {
            size++;
            if (!(result = has(b, key) && eq(a[key], b[key], stack))) { break; }
          }
        }
        if (result) {
          sizeB = 0;
          for (key in b) {
            if (has(b, key)) { ++sizeB; }
          }
          if (first) {
            if (type === '<<=') {
              result = size < sizeB;
            } else if (type === '<==') {
              result = size <= sizeB
            } else {
              result = size === sizeB;
            }
          } else {
            first = false;
            result = size === sizeB;
          }
        }
      }
      stack.pop();
      return result;
    }
  }
}).call(this);

// Generated by LiveScript 1.4.0
(function(){
  QUnit.assert.looksNative = function(fn, message){
    this.push(/native code/.test(Function.prototype.toString.call(fn)), false, true, message || 'looks native');
  };
}).call(this);

// Generated by LiveScript 1.4.0
(function(){
  QUnit.assert.name = function(fn, name, message){
    this.push(fn.name === name, fn.name, name, message || "name is '" + name + "'");
  };
}).call(this);

// Generated by LiveScript 1.4.0
(function(){
  Function('return this')().nativeSubclass = (function(){
    try {
      return Function("'use strict';class O extends Object {};return new O instanceof O;")() && Function('F', "'use strict';\nclass G extends F {};\nreturn G;");
    } catch (e$) {}
  }());
}).call(this);

// Generated by LiveScript 1.4.0
(function(){
  QUnit.assert.nonEnumerable = function(O, key, message){
    DESCRIPTORS && this.push(!O.propertyIsEnumerable(key), false, true, message || (typeof key === 'symbol' ? 'method' : key) + " is non-enumerable");
  };
}).call(this);

// Generated by LiveScript 1.4.0
(function(){
  QUnit.assert.same = function(a, b, message){
    this.push(a === b
      ? a !== 0 || 1 / a === 1 / b
      : a != a && b != b, a, b, message);
  };
}).call(this);