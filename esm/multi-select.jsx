import React, { useState, useMemo, useEffect } from 'react';
import { Dropdown, Input, Button, Checkbox } from 'antd';
import { SearchOutlined, DownOutlined } from '@ant-design/icons';
import cls from 'classnames';

var toString = {}.toString;

var classofRaw = function (it) {
  return toString.call(it).slice(8, -1);
};

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
var isArray = Array.isArray || function isArray(arg) {
  return classofRaw(arg) == 'Array';
};

var isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
var toObject = function (argument) {
  return Object(requireObjectCoercible(argument));
};

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
var toInteger = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
var toLength = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var toPrimitive = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var descriptors = !fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = typeof window == 'object' && window && window.Math == Math ? window
  : typeof self == 'object' && self && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();

var document = global.document;
// typeof document.createElement is 'object' in old IE
var exist = isObject(document) && isObject(document.createElement);

var documentCreateElement = function (it) {
  return exist ? document.createElement(it) : {};
};

// Thank's IE8 for his funny defineProperty
var ie8DomDefine = !descriptors && !fails(function () {
  return Object.defineProperty(documentCreateElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

var anObject = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};

var nativeDefineProperty = Object.defineProperty;

var f = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (ie8DomDefine) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var objectDefineProperty = {
	f: f
};

var createPropertyDescriptor = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var createProperty = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var hide = descriptors ? function (object, key, value) {
  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var setGlobal = function (key, value) {
  try {
    hide(global, key, value);
  } catch (e) {
    global[key] = value;
  } return value;
};

var shared = createCommonjsModule(function (module) {
var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.0.0',
  mode:  'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});
});

var id = 0;
var postfix = Math.random();

var uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + postfix).toString(36));
};

// Chrome 38 Symbol has incorrect toString conversion
var nativeSymbol = !fails(function () {
  // eslint-disable-next-line no-undef
  String(Symbol());
});

var store = shared('wks');

var Symbol$1 = global.Symbol;


var wellKnownSymbol = function (name) {
  return store[name] || (store[name] = nativeSymbol && Symbol$1[name]
    || (nativeSymbol ? Symbol$1 : uid)('Symbol.' + name));
};

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
var arraySpeciesCreate = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};

var SPECIES$1 = wellKnownSymbol('species');

var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
  return !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES$1] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = nativeGetOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

var f$1 = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = nativeGetOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;

var objectPropertyIsEnumerable = {
	f: f$1
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings


var split = ''.split;

var indexedObject = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

// toObject with fallback for non-array-like ES3 strings



var toIndexedObject = function (it) {
  return indexedObject(requireObjectCoercible(it));
};

var hasOwnProperty = {}.hasOwnProperty;

var has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var nativeGetOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

var f$2 = descriptors ? nativeGetOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (ie8DomDefine) try {
    return nativeGetOwnPropertyDescriptor$1(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
};

var objectGetOwnPropertyDescriptor = {
	f: f$2
};

var functionToString = shared('native-function-to-string', Function.toString);

var WeakMap = global.WeakMap;

var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(functionToString.call(WeakMap));

var shared$1 = shared('keys');


var sharedKey = function (key) {
  return shared$1[key] || (shared$1[key] = uid(key));
};

var hiddenKeys = {};

var WeakMap$1 = global.WeakMap;
var set, get, has$1;

var enforce = function (it) {
  return has$1(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (nativeWeakMap) {
  var store$1 = new WeakMap$1();
  var wmget = store$1.get;
  var wmhas = store$1.has;
  var wmset = store$1.set;
  set = function (it, metadata) {
    wmset.call(store$1, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store$1, it) || {};
  };
  has$1 = function (it) {
    return wmhas.call(store$1, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    hide(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return has(it, STATE) ? it[STATE] : {};
  };
  has$1 = function (it) {
    return has(it, STATE);
  };
}

var internalState = {
  set: set,
  get: get,
  has: has$1,
  enforce: enforce,
  getterFor: getterFor
};

var redefine = createCommonjsModule(function (module) {
var getInternalState = internalState.get;
var enforceInternalState = internalState.enforce;
var TEMPLATE = String(functionToString).split('toString');

shared('inspectSource', function (it) {
  return functionToString.call(it);
});

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) hide(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else hide(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || functionToString.call(this);
});
});

var max = Math.max;
var min$1 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).
var toAbsoluteIndex = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
};

// `Array.prototype.{ indexOf, includes }` methods implementation
// false -> Array#indexOf
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
// true  -> Array#includes
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
var arrayIncludes = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var arrayIndexOf = arrayIncludes(false);


var objectKeysInternal = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return objectKeysInternal(O, hiddenKeys$1);
};

var objectGetOwnPropertyNames = {
	f: f$3
};

var f$4 = Object.getOwnPropertySymbols;

var objectGetOwnPropertySymbols = {
	f: f$4
};

var Reflect = global.Reflect;

// all object keys, includes non-enumerable and symbols
var ownKeys = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = objectGetOwnPropertyNames.f(anObject(it));
  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

var copyConstructorProperties = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = objectDefineProperty.f;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

var isForced_1 = isForced;

var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;






/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      hide(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1fffffffffffff;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

var IS_CONCAT_SPREADABLE_SUPPORT = !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.github.io/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
_export({ target: 'Array', proto: true, forced: FORCED }, {
  concat: function concat(arg) { // eslint-disable-line no-unused-vars
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});

var aFunction = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};

// optional / simple context binding
var bindContext = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
// 0 -> Array#forEach
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
// 1 -> Array#map
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// 2 -> Array#filter
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// 3 -> Array#some
// https://tc39.github.io/ecma262/#sec-array.prototype.some
// 4 -> Array#every
// https://tc39.github.io/ecma262/#sec-array.prototype.every
// 5 -> Array#find
// https://tc39.github.io/ecma262/#sec-array.prototype.find
// 6 -> Array#findIndex
// https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
var arrayMethods = function (TYPE, specificCreate) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = specificCreate || arraySpeciesCreate;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = indexedObject(O);
    var boundFunction = bindContext(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: target.push(value);       // filter
        } else if (IS_EVERY) return false;  // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

var internalFilter = arrayMethods(2);

var SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('filter');

// `Array.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// with adding support of @@species
_export({ target: 'Array', proto: true, forced: !SPECIES_SUPPORT$1 }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return internalFilter(this, callbackfn, arguments[1]);
  }
});

// 19.1.2.14 / 15.2.3.14 Object.keys(O)



var objectKeys = Object.keys || function keys(O) {
  return objectKeysInternal(O, enumBugKeys);
};

var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var i = 0;
  var key;
  while (length > i) objectDefineProperty.f(O, key = keys[i++], Properties[key]);
  return O;
};

var document$1 = global.document;

var html = document$1 && document$1.documentElement;

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])





var IE_PROTO = sharedKey('IE_PROTO');
var PROTOTYPE = 'prototype';
var Empty = function () { /* empty */ };

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var length = enumBugKeys.length;
  var lt = '<';
  var script = 'script';
  var gt = '>';
  var js = 'java' + script + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  iframe.src = String(js);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + script + gt + 'document.F=Object' + lt + '/' + script + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (length--) delete createDict[PROTOTYPE][enumBugKeys[length]];
  return createDict();
};

var objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : objectDefineProperties(result, Properties);
};

hiddenKeys[IE_PROTO] = true;

var UNSCOPABLES = wellKnownSymbol('unscopables');


var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  hide(ArrayPrototype, UNSCOPABLES, objectCreate(null));
}

// add a key to Array.prototype[@@unscopables]
var addToUnscopables = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};

var internalIncludes = arrayIncludes(true);

// `Array.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
_export({ target: 'Array', proto: true }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return internalIncludes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');

var internalMap = arrayMethods(1);

var SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport('map');

// `Array.prototype.map` method
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// with adding support of @@species
_export({ target: 'Array', proto: true, forced: !SPECIES_SUPPORT$2 }, {
  map: function map(callbackfn /* , thisArg */) {
    return internalMap(this, callbackfn, arguments[1]);
  }
});

var defineProperty = objectDefineProperty.f;
var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// Function instances `.name` property
// https://tc39.github.io/ecma262/#sec-function-instances-name
if (descriptors && !(NAME in FunctionPrototype)) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (e) {
        return '';
      }
    }
  });
}

var validateSetPrototypeOfArguments = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) {
    throw TypeError("Can't set " + String(proto) + ' as a prototype');
  }
};

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */


var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () { // eslint-disable-line
  var correctSetter = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    correctSetter = test instanceof Array;
  } catch (e) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    validateSetPrototypeOfArguments(O, proto);
    if (correctSetter) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

var inheritIfRequired = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && objectSetPrototypeOf) {
    objectSetPrototypeOf(that, P);
  } return that;
};

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp
var isRegexp = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
};

// `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
var regexpFlags = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

var path = global;

var aFunction$1 = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

var getBuiltIn = function (namespace, method) {
  return arguments.length < 2 ? aFunction$1(path[namespace]) || aFunction$1(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};

var SPECIES$2 = wellKnownSymbol('species');

var setSpecies = function (CONSTRUCTOR_NAME) {
  var C = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = objectDefineProperty.f;
  if (descriptors && C && !C[SPECIES$2]) defineProperty(C, SPECIES$2, {
    configurable: true,
    get: function () { return this; }
  });
};

var MATCH$1 = wellKnownSymbol('match');



var defineProperty$1 = objectDefineProperty.f;
var getOwnPropertyNames = objectGetOwnPropertyNames.f;




var NativeRegExp = global.RegExp;
var RegExpPrototype = NativeRegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;

// "new" should create a new object, old webkit bug
var CORRECT_NEW = new NativeRegExp(re1) !== re1;

var FORCED$1 = isForced_1('RegExp', descriptors && (!CORRECT_NEW || fails(function () {
  re2[MATCH$1] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
})));

// `RegExp` constructor
// https://tc39.github.io/ecma262/#sec-regexp-constructor
if (FORCED$1) {
  var RegExpWrapper = function RegExp(pattern, flags) {
    var thisIsRegExp = this instanceof RegExpWrapper;
    var patternIsRegExp = isRegexp(pattern);
    var flagsAreUndefined = flags === undefined;
    return !thisIsRegExp && patternIsRegExp && pattern.constructor === RegExpWrapper && flagsAreUndefined ? pattern
      : inheritIfRequired(CORRECT_NEW
        ? new NativeRegExp(patternIsRegExp && !flagsAreUndefined ? pattern.source : pattern, flags)
        : NativeRegExp((patternIsRegExp = pattern instanceof RegExpWrapper)
          ? pattern.source
          : pattern, patternIsRegExp && flagsAreUndefined ? regexpFlags.call(pattern) : flags)
      , thisIsRegExp ? this : RegExpPrototype, RegExpWrapper);
  };
  var proxy = function (key) {
    key in RegExpWrapper || defineProperty$1(RegExpWrapper, key, {
      configurable: true,
      get: function () { return NativeRegExp[key]; },
      set: function (it) { NativeRegExp[key] = it; }
    });
  };
  var keys = getOwnPropertyNames(NativeRegExp);
  var i = 0;
  while (i < keys.length) proxy(keys[i++]);
  RegExpPrototype.constructor = RegExpWrapper;
  RegExpWrapper.prototype = RegExpPrototype;
  redefine(global, 'RegExp', RegExpWrapper);
}

// https://tc39.github.io/ecma262/#sec-get-regexp-@@species
setSpecies('RegExp');

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

var regexpExec = patchedExec;

_export({ target: 'RegExp', proto: true, forced: /./.exec !== regexpExec }, {
  exec: regexpExec
});

var TO_STRING = 'toString';
var nativeToString = /./[TO_STRING];

var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = nativeToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !descriptors && R instanceof RegExp ? regexpFlags.call(R) : undefined);
  }, { unsafe: true });
}

// helper for String#{startsWith, endsWith, includes}



var validateStringMethodArguments = function (that, searchString, NAME) {
  if (isRegexp(searchString)) {
    throw TypeError('String.prototype.' + NAME + " doesn't accept regex");
  } return String(requireObjectCoercible(that));
};

var MATCH$2 = wellKnownSymbol('match');

var correctIsRegexpLogic = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (e) {
    try {
      regexp[MATCH$2] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (f) { /* empty */ }
  } return false;
};

var INCLUDES = 'includes';

var CORRECT_IS_REGEXP_LOGIC = correctIsRegexpLogic(INCLUDES);

// `String.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-string.prototype.includes
_export({ target: 'String', proto: true, forced: !CORRECT_IS_REGEXP_LOGIC }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~validateStringMethodArguments(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// CONVERT_TO_STRING: true  -> String#at
// CONVERT_TO_STRING: false -> String#codePointAt
var stringAt = function (that, pos, CONVERT_TO_STRING) {
  var S = String(requireObjectCoercible(that));
  var position = toInteger(pos);
  var size = S.length;
  var first, second;
  if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
  first = S.charCodeAt(position);
  return first < 0xd800 || first > 0xdbff || position + 1 === size
    || (second = S.charCodeAt(position + 1)) < 0xdc00 || second > 0xdfff
      ? CONVERT_TO_STRING ? S.charAt(position) : first
      : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xd800 << 10) + (second - 0xdc00) + 0x10000;
};

// `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
var advanceStringIndex = function (S, index, unicode) {
  return index + (unicode ? stringAt(S, index, true).length : 1);
};

// `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
var regexpExecAbstract = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classofRaw(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};

var SPECIES$3 = wellKnownSymbol('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };

    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES$3] = function () { return re; };
    }

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];

    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return regexMethod.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return regexMethod.call(string, this); }
    );
    if (sham) hide(RegExp.prototype[SYMBOL], 'sham', true);
  }
};

var max$1 = Math.max;
var min$2 = Math.min;
var floor$1 = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
fixRegexpWellKnownSymbolLogic(
  'replace',
  2,
  function (REPLACE, nativeReplace, maybeCallNative) {
    return [
      // `String.prototype.replace` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.replace
      function replace(searchValue, replaceValue) {
        var O = requireObjectCoercible(this);
        var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
        return replacer !== undefined
          ? replacer.call(searchValue, O, replaceValue)
          : nativeReplace.call(String(O), searchValue, replaceValue);
      },
      // `RegExp.prototype[@@replace]` method
      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
      function (regexp, replaceValue) {
        var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
        if (res.done) return res.value;

        var rx = anObject(regexp);
        var S = String(this);

        var functionalReplace = typeof replaceValue === 'function';
        if (!functionalReplace) replaceValue = String(replaceValue);

        var global = rx.global;
        if (global) {
          var fullUnicode = rx.unicode;
          rx.lastIndex = 0;
        }
        var results = [];
        while (true) {
          var result = regexpExecAbstract(rx, S);
          if (result === null) break;

          results.push(result);
          if (!global) break;

          var matchStr = String(result[0]);
          if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        }

        var accumulatedResult = '';
        var nextSourcePosition = 0;
        for (var i = 0; i < results.length; i++) {
          result = results[i];

          var matched = String(result[0]);
          var position = max$1(min$2(toInteger(result.index), S.length), 0);
          var captures = [];
          // NOTE: This is equivalent to
          //   captures = result.slice(1).map(maybeToString)
          // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
          // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
          // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
          for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
          var namedCaptures = result.groups;
          if (functionalReplace) {
            var replacerArgs = [matched].concat(captures, position, S);
            if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
            var replacement = String(replaceValue.apply(undefined, replacerArgs));
          } else {
            replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
          }
          if (position >= nextSourcePosition) {
            accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
            nextSourcePosition = position + matched.length;
          }
        }
        return accumulatedResult + S.slice(nextSourcePosition);
      }
    ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
    function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
      var tailPos = position + matched.length;
      var m = captures.length;
      var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
      if (namedCaptures !== undefined) {
        namedCaptures = toObject(namedCaptures);
        symbols = SUBSTITUTION_SYMBOLS;
      }
      return nativeReplace.call(replacement, symbols, function (match, ch) {
        var capture;
        switch (ch.charAt(0)) {
          case '$': return '$';
          case '&': return matched;
          case '`': return str.slice(0, position);
          case "'": return str.slice(tailPos);
          case '<':
            capture = namedCaptures[ch.slice(1, -1)];
            break;
          default: // \d\d?
            var n = +ch;
            if (n === 0) return match;
            if (n > m) {
              var f = floor$1(n / 10);
              if (f === 0) return match;
              if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
              return match;
            }
            capture = captures[n - 1];
        }
        return capture === undefined ? '' : capture;
      });
    }
  }
);

// `SameValue` abstract operation
// https://tc39.github.io/ecma262/#sec-samevalue
var sameValue = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

// @@search logic
fixRegexpWellKnownSymbolLogic(
  'search',
  1,
  function (SEARCH, nativeSearch, maybeCallNative) {
    return [
      // `String.prototype.search` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.search
      function search(regexp) {
        var O = requireObjectCoercible(this);
        var searcher = regexp == undefined ? undefined : regexp[SEARCH];
        return searcher !== undefined ? searcher.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
      },
      // `RegExp.prototype[@@search]` method
      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
      function (regexp) {
        var res = maybeCallNative(nativeSearch, regexp, this);
        if (res.done) return res.value;

        var rx = anObject(regexp);
        var S = String(this);

        var previousLastIndex = rx.lastIndex;
        if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
        var result = regexpExecAbstract(rx, S);
        if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
        return result === null ? -1 : result.index;
      }
    ];
  }
);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys$1(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$1(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var emptyImage = "data:image/png;base64,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";

var Empty$1 = function Empty(_ref) {
  var className = _ref.className,
      style = _ref.style,
      _ref$text = _ref.text,
      text = _ref$text === void 0 ? '' : _ref$text;
  return /*#__PURE__*/React.createElement("div", {
    className: cls('empty-placeholder', className),
    style: _objectSpread2(_objectSpread2({}, style), {}, {
      display: 'flex',
      flexDirection: 'column'
    })
  }, /*#__PURE__*/React.createElement("img", {
    className: "empty-placeholder-image",
    src: emptyImage,
    alt: "\u65E0"
  }), text !== '' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'block',
      color: '#78828C'
    }
  }, text) : null);
};

var Item = function Item(_ref) {
  var name = _ref.name,
      icon = _ref.icon,
      checked = _ref.checked,
      _onClick = _ref.onClick;

  var onError = function onError(e) {//   e.target.src = require('./assets/defaultgame.png');
  };

  return /*#__PURE__*/React.createElement("div", {
    className: cls('multi-select-item', checked ? 'multi-select-item--selected' : undefined),
    title: name,
    onClick: function onClick() {
      return _onClick();
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    checked: checked
  }), icon ? /*#__PURE__*/React.createElement("span", {
    className: "game-icon"
  }, /*#__PURE__*/React.createElement("img", {
    width: "100%",
    src: icon,
    onError: onError,
    alt: name
  })) : null, /*#__PURE__*/React.createElement("div", {
    className: "multi-select-item-name"
  }, name));
};

var DemoData = [{
  key: 1,
  name: '选项1'
}, {
  key: 2,
  name: '选项2'
}, {
  key: 3,
  name: '选项3'
}, {
  key: 4,
  name: '选项4'
}];

var MultiSelector = function MultiSelector(_ref2) {
  var _ref2$data = _ref2.data,
      data = _ref2$data === void 0 ? DemoData : _ref2$data,
      value = _ref2.value,
      onChange = _ref2.onChange,
      _ref2$search = _ref2.search,
      search = _ref2$search === void 0 ? true : _ref2$search,
      width = _ref2.width;

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      selected = _useState2[0],
      setSelected = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      visible = _useState4[0],
      setVisible = _useState4[1];

  var _useState5 = useState(data),
      _useState6 = _slicedToArray(_useState5, 2),
      list = _useState6[0],
      setList = _useState6[1];

  var _useState7 = useState(''),
      _useState8 = _slicedToArray(_useState7, 2),
      keyword = _useState8[0],
      setKeyword = _useState8[1];

  var show = function show() {
    setVisible(true);
  };

  var close = function close() {
    setVisible(false);
    setKeyword('');
  };

  var isSelected = function isSelected(itemKey) {
    return selected.includes(itemKey);
  };

  var isAllSelected = useMemo(function () {
    return selected.length && list.length === selected.length;
  }, [list.length, selected.length]);

  var handleKeywordChange = function handleKeywordChange(event) {
    setKeyword(event.target.value);
  };

  var handleSelectedChange = function handleSelectedChange(itemKey) {
    var changedSelected;

    if (itemKey) {
      if (isSelected(itemKey)) {
        changedSelected = selected.filter(function (item) {
          return item !== itemKey;
        });
      } else {
        changedSelected = selected.concat(itemKey);
      }
    } else {
      if (isAllSelected) {
        changedSelected = [];
      } else {
        changedSelected = list.map(function (item) {
          return item.key;
        });
      }
    }

    setSelected(changedSelected);
  };

  var handleOK = function handleOK() {
    if (onChange) {
      onChange(selected);
    }

    close();
  };

  var handleCancel = function handleCancel() {
    setSelected(value || []);
    close();
  };

  useEffect(function () {
    setList(data || []);
  }, [data]);
  useEffect(function () {
    setSelected(value || []);
  }, [value]);
  useEffect(function () {
    if (!visible) {
      setSelected(value || []);
    }
  }, [visible]);

  var renderLabel = function renderLabel() {
    if (isAllSelected) {
      return '全部';
    }

    if (selected.length) {
      return "\u5DF2\u9009\u62E9".concat(selected.length, "\u9879");
    }

    return /*#__PURE__*/React.createElement("div", {
      className: "task-select-placeholder"
    }, "\u8BF7\u9009\u62E9");
  };

  var renderTaskList = function renderTaskList() {
    var filteredList = list.filter(function (item) {
      var regx = new RegExp(keyword.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'), 'i');

      if (regx.test(item.name)) {
        return true;
      }

      return false;
    });

    if (filteredList.length) {
      return /*#__PURE__*/React.createElement(React.Fragment, null, !keyword && /*#__PURE__*/React.createElement(Item, {
        name: "\u5168\u90E8",
        checked: isAllSelected,
        onClick: function onClick() {
          return handleSelectedChange();
        }
      }), filteredList.map(function (item) {
        return /*#__PURE__*/React.createElement(Item, {
          key: item.key,
          name: item.name,
          icon: item.icon,
          checked: isSelected(item.key),
          onClick: function onClick() {
            return handleSelectedChange(item.key);
          }
        });
      }));
    }

    return /*#__PURE__*/React.createElement(Empty$1, {
      style: {
        height: '200px'
      }
    });
  };

  var dropDownRender = function dropDownRender() {
    return /*#__PURE__*/React.createElement("div", {
      className: "multi-select-dropdown",
      style: {
        width: width
      }
    }, search ? /*#__PURE__*/React.createElement("div", {
      className: "multi-select-dropdown-search-wrap"
    }, /*#__PURE__*/React.createElement(Input, {
      className: "multi-select-dropdown-search",
      placeholder: "\u641C\u7D22",
      value: keyword,
      prefix: /*#__PURE__*/React.createElement(SearchOutlined, null),
      onChange: handleKeywordChange
    })) : null, /*#__PURE__*/React.createElement("div", {
      className: "multi-select-dropdown-list"
    }, renderTaskList()), /*#__PURE__*/React.createElement("div", {
      className: "multi-select-dropdown-footer"
    }, /*#__PURE__*/React.createElement(Button, {
      type: "primary",
      onClick: handleOK,
      style: width === '120px' ? {
        padding: '1px 4px'
      } : {}
    }, "\u786E\u5B9A"), /*#__PURE__*/React.createElement(Button, {
      onClick: handleCancel,
      style: width === '120px' ? {
        padding: '1px 4px',
        marginLeft: '8px'
      } : {
        marginLeft: '8px'
      }
    }, "\u53D6\u6D88")));
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "multi-select"
  }, /*#__PURE__*/React.createElement(Dropdown, {
    overlay: dropDownRender(),
    visible: visible,
    onVisibleChange: setVisible,
    trigger: ['click'],
    getPopupContainer: function getPopupContainer(node) {
      return node.parentElement;
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "multi-select-value",
    style: width ? {
      width: width
    } : {},
    onClick: show
  }, renderLabel(), /*#__PURE__*/React.createElement(DownOutlined, {
    className: cls('multi-select-arrow', visible ? 'multi-select-arrow--rotate' : undefined)
  }))));
};

export default MultiSelector;
