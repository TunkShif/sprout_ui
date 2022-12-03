var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e2) {
        reject(e2);
      }
    };
    var step = (x3) => x3.done ? resolve(x3.value) : Promise.resolve(x3.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// node_modules/.pnpm/@tunkshif+live-element@0.0.3/node_modules/@tunkshif/live-element/dist/liveview-js.a5760f61.js
var require_liveview_js_a5760f61 = __commonJS({
  "node_modules/.pnpm/@tunkshif+live-element@0.0.3/node_modules/@tunkshif/live-element/dist/liveview-js.a5760f61.js"(exports) {
    "use strict";
    var c4 = (e2, t2) => JSON.stringify([[e2, t2]]);
    var r3 = { exec(e2, t2) {
      window.liveSocket.execJS(e2, t2 || "[]");
    }, setAttribute(e2, t2, i4, n4 = null) {
      r3.exec(e2, c4("set_attr", { attr: [t2, i4], to: n4 }));
    }, removeAttribute(e2, t2, i4 = null) {
      r3.exec(e2, c4("remove_attr", { attr: t2, to: i4 }));
    } };
    exports.LiveViewJS = r3;
  }
});

// node_modules/.pnpm/@tunkshif+live-element@0.0.3/node_modules/@tunkshif/live-element/dist/decorators.js
var require_decorators = __commonJS({
  "node_modules/.pnpm/@tunkshif+live-element@0.0.3/node_modules/@tunkshif/live-element/dist/decorators.js"(exports) {
    "use strict";
    Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
    var f3 = require_liveview_js_a5760f61();
    var v3 = (t2, e2) => (l3, u3) => {
      const r3 = `_${u3}`;
      Reflect.defineProperty(l3, u3, { get() {
        if (this[r3] === void 0) {
          const c4 = e2 != null && e2.customRoot ? this.root : this, a3 = e2 != null && e2.part ? `[data-part="${t2}"]` : t2;
          e2 != null && e2.all ? this[r3] = c4.querySelectorAll(a3) : this[r3] = c4.querySelector(a3);
        }
        return this[r3];
      }, enumerable: true, configurable: true });
    };
    var b3 = (t2, e2) => (l3, u3) => {
      Reflect.defineProperty(l3, u3, { get() {
        const r3 = this.getAttribute(t2);
        return e2 != null && e2.converter ? e2.converter(r3) : r3;
      }, set(r3) {
        e2 != null && e2.live ? f3.LiveViewJS.setAttribute(this, t2, r3) : this.setAttribute(t2, r3);
      }, enumerable: true, configurable: true });
    };
    exports.attr = b3;
    exports.query = v3;
  }
});

// node_modules/.pnpm/@tunkshif+live-element@0.0.3/node_modules/@tunkshif/live-element/decorators.js
var require_decorators2 = __commonJS({
  "node_modules/.pnpm/@tunkshif+live-element@0.0.3/node_modules/@tunkshif/live-element/decorators.js"(exports, module) {
    module.exports = require_decorators();
  }
});

// js/sprout-ui/components/global.ts
var init = () => {
};
var global = () => ({
  init
});
var global_default = global;

// node_modules/.pnpm/@tunkshif+live-element@0.0.3/node_modules/@tunkshif/live-element/dist/liveview-js.e3521e25.mjs
var c = (e2, t2) => JSON.stringify([[e2, t2]]);
var i = {
  exec(e2, t2) {
    window.liveSocket.execJS(e2, t2 || "[]");
  },
  setAttribute(e2, t2, r3, o3 = null) {
    i.exec(e2, c("set_attr", { attr: [t2, r3], to: o3 }));
  },
  removeAttribute(e2, t2, r3 = null) {
    i.exec(e2, c("remove_attr", { attr: t2, to: r3 }));
  }
};

// node_modules/.pnpm/@tunkshif+live-element@0.0.3/node_modules/@tunkshif/live-element/dist/index.mjs
var n = class extends HTMLElement {
  connectedCallback() {
  }
  updatedCallback(a3, e2, t2) {
  }
  disconnectedCallback() {
  }
  attributeChangedCallback(a3, e2, t2) {
    e2 === null && t2 !== null || e2 !== t2 && this.updatedCallback(a3, e2, t2);
  }
};

// js/sprout-ui/components/dialog.ts
var import_decorators = __toESM(require_decorators2());

// node_modules/.pnpm/tabbable@6.0.1/node_modules/tabbable/dist/index.esm.js
var candidateSelectors = ["input", "select", "textarea", "a[href]", "button", "[tabindex]:not(slot)", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])', "details>summary:first-of-type", "details"];
var candidateSelector = /* @__PURE__ */ candidateSelectors.join(",");
var NoElement = typeof Element === "undefined";
var matches = NoElement ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
var getRootNode = !NoElement && Element.prototype.getRootNode ? function(element) {
  return element.getRootNode();
} : function(element) {
  return element.ownerDocument;
};
var getCandidates = function getCandidates2(el, includeContainer, filter) {
  var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));
  if (includeContainer && matches.call(el, candidateSelector)) {
    candidates.unshift(el);
  }
  candidates = candidates.filter(filter);
  return candidates;
};
var getCandidatesIteratively = function getCandidatesIteratively2(elements, includeContainer, options) {
  var candidates = [];
  var elementsToCheck = Array.from(elements);
  while (elementsToCheck.length) {
    var element = elementsToCheck.shift();
    if (element.tagName === "SLOT") {
      var assigned = element.assignedElements();
      var content = assigned.length ? assigned : element.children;
      var nestedCandidates = getCandidatesIteratively2(content, true, options);
      if (options.flatten) {
        candidates.push.apply(candidates, nestedCandidates);
      } else {
        candidates.push({
          scopeParent: element,
          candidates: nestedCandidates
        });
      }
    } else {
      var validCandidate = matches.call(element, candidateSelector);
      if (validCandidate && options.filter(element) && (includeContainer || !elements.includes(element))) {
        candidates.push(element);
      }
      var shadowRoot = element.shadowRoot || typeof options.getShadowRoot === "function" && options.getShadowRoot(element);
      var validShadowRoot = !options.shadowRootFilter || options.shadowRootFilter(element);
      if (shadowRoot && validShadowRoot) {
        var _nestedCandidates = getCandidatesIteratively2(shadowRoot === true ? element.children : shadowRoot.children, true, options);
        if (options.flatten) {
          candidates.push.apply(candidates, _nestedCandidates);
        } else {
          candidates.push({
            scopeParent: element,
            candidates: _nestedCandidates
          });
        }
      } else {
        elementsToCheck.unshift.apply(elementsToCheck, element.children);
      }
    }
  }
  return candidates;
};
var getTabindex = function getTabindex2(node, isScope) {
  if (node.tabIndex < 0) {
    if ((isScope || /^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || node.isContentEditable) && isNaN(parseInt(node.getAttribute("tabindex"), 10))) {
      return 0;
    }
  }
  return node.tabIndex;
};
var sortOrderedTabbables = function sortOrderedTabbables2(a3, b3) {
  return a3.tabIndex === b3.tabIndex ? a3.documentOrder - b3.documentOrder : a3.tabIndex - b3.tabIndex;
};
var isInput = function isInput2(node) {
  return node.tagName === "INPUT";
};
var isHiddenInput = function isHiddenInput2(node) {
  return isInput(node) && node.type === "hidden";
};
var isDetailsWithSummary = function isDetailsWithSummary2(node) {
  var r3 = node.tagName === "DETAILS" && Array.prototype.slice.apply(node.children).some(function(child) {
    return child.tagName === "SUMMARY";
  });
  return r3;
};
var getCheckedRadio = function getCheckedRadio2(nodes, form) {
  for (var i4 = 0; i4 < nodes.length; i4++) {
    if (nodes[i4].checked && nodes[i4].form === form) {
      return nodes[i4];
    }
  }
};
var isTabbableRadio = function isTabbableRadio2(node) {
  if (!node.name) {
    return true;
  }
  var radioScope = node.form || getRootNode(node);
  var queryRadios = function queryRadios2(name) {
    return radioScope.querySelectorAll('input[type="radio"][name="' + name + '"]');
  };
  var radioSet;
  if (typeof window !== "undefined" && typeof window.CSS !== "undefined" && typeof window.CSS.escape === "function") {
    radioSet = queryRadios(window.CSS.escape(node.name));
  } else {
    try {
      radioSet = queryRadios(node.name);
    } catch (err) {
      console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", err.message);
      return false;
    }
  }
  var checked = getCheckedRadio(radioSet, node.form);
  return !checked || checked === node;
};
var isRadio = function isRadio2(node) {
  return isInput(node) && node.type === "radio";
};
var isNonTabbableRadio = function isNonTabbableRadio2(node) {
  return isRadio(node) && !isTabbableRadio(node);
};
var isNodeAttached = function isNodeAttached2(node) {
  var _nodeRootHost;
  var nodeRootHost = getRootNode(node).host;
  var attached = !!((_nodeRootHost = nodeRootHost) !== null && _nodeRootHost !== void 0 && _nodeRootHost.ownerDocument.contains(nodeRootHost) || node.ownerDocument.contains(node));
  while (!attached && nodeRootHost) {
    var _nodeRootHost2;
    nodeRootHost = getRootNode(nodeRootHost).host;
    attached = !!((_nodeRootHost2 = nodeRootHost) !== null && _nodeRootHost2 !== void 0 && _nodeRootHost2.ownerDocument.contains(nodeRootHost));
  }
  return attached;
};
var isZeroArea = function isZeroArea2(node) {
  var _node$getBoundingClie = node.getBoundingClientRect(), width = _node$getBoundingClie.width, height = _node$getBoundingClie.height;
  return width === 0 && height === 0;
};
var isHidden = function isHidden2(node, _ref) {
  var displayCheck = _ref.displayCheck, getShadowRoot = _ref.getShadowRoot;
  if (getComputedStyle(node).visibility === "hidden") {
    return true;
  }
  var isDirectSummary = matches.call(node, "details>summary:first-of-type");
  var nodeUnderDetails = isDirectSummary ? node.parentElement : node;
  if (matches.call(nodeUnderDetails, "details:not([open]) *")) {
    return true;
  }
  if (!displayCheck || displayCheck === "full" || displayCheck === "legacy-full") {
    if (typeof getShadowRoot === "function") {
      var originalNode = node;
      while (node) {
        var parentElement = node.parentElement;
        var rootNode = getRootNode(node);
        if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement) === true) {
          return isZeroArea(node);
        } else if (node.assignedSlot) {
          node = node.assignedSlot;
        } else if (!parentElement && rootNode !== node.ownerDocument) {
          node = rootNode.host;
        } else {
          node = parentElement;
        }
      }
      node = originalNode;
    }
    if (isNodeAttached(node)) {
      return !node.getClientRects().length;
    }
    if (displayCheck !== "legacy-full") {
      return true;
    }
  } else if (displayCheck === "non-zero-area") {
    return isZeroArea(node);
  }
  return false;
};
var isDisabledFromFieldset = function isDisabledFromFieldset2(node) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
    var parentNode = node.parentElement;
    while (parentNode) {
      if (parentNode.tagName === "FIELDSET" && parentNode.disabled) {
        for (var i4 = 0; i4 < parentNode.children.length; i4++) {
          var child = parentNode.children.item(i4);
          if (child.tagName === "LEGEND") {
            return matches.call(parentNode, "fieldset[disabled] *") ? true : !child.contains(node);
          }
        }
        return true;
      }
      parentNode = parentNode.parentElement;
    }
  }
  return false;
};
var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable2(options, node) {
  if (node.disabled || isHiddenInput(node) || isHidden(node, options) || isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
    return false;
  }
  return true;
};
var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable2(options, node) {
  if (isNonTabbableRadio(node) || getTabindex(node) < 0 || !isNodeMatchingSelectorFocusable(options, node)) {
    return false;
  }
  return true;
};
var isValidShadowRootTabbable = function isValidShadowRootTabbable2(shadowHostNode) {
  var tabIndex = parseInt(shadowHostNode.getAttribute("tabindex"), 10);
  if (isNaN(tabIndex) || tabIndex >= 0) {
    return true;
  }
  return false;
};
var sortByOrder = function sortByOrder2(candidates) {
  var regularTabbables = [];
  var orderedTabbables = [];
  candidates.forEach(function(item, i4) {
    var isScope = !!item.scopeParent;
    var element = isScope ? item.scopeParent : item;
    var candidateTabindex = getTabindex(element, isScope);
    var elements = isScope ? sortByOrder2(item.candidates) : element;
    if (candidateTabindex === 0) {
      isScope ? regularTabbables.push.apply(regularTabbables, elements) : regularTabbables.push(element);
    } else {
      orderedTabbables.push({
        documentOrder: i4,
        tabIndex: candidateTabindex,
        item,
        isScope,
        content: elements
      });
    }
  });
  return orderedTabbables.sort(sortOrderedTabbables).reduce(function(acc, sortable) {
    sortable.isScope ? acc.push.apply(acc, sortable.content) : acc.push(sortable.content);
    return acc;
  }, []).concat(regularTabbables);
};
var tabbable = function tabbable2(el, options) {
  options = options || {};
  var candidates;
  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([el], options.includeContainer, {
      filter: isNodeMatchingSelectorTabbable.bind(null, options),
      flatten: false,
      getShadowRoot: options.getShadowRoot,
      shadowRootFilter: isValidShadowRootTabbable
    });
  } else {
    candidates = getCandidates(el, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
  }
  return sortByOrder(candidates);
};
var focusable = function focusable2(el, options) {
  options = options || {};
  var candidates;
  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([el], options.includeContainer, {
      filter: isNodeMatchingSelectorFocusable.bind(null, options),
      flatten: true,
      getShadowRoot: options.getShadowRoot
    });
  } else {
    candidates = getCandidates(el, options.includeContainer, isNodeMatchingSelectorFocusable.bind(null, options));
  }
  return candidates;
};
var isTabbable = function isTabbable2(node, options) {
  options = options || {};
  if (!node) {
    throw new Error("No node provided");
  }
  if (matches.call(node, candidateSelector) === false) {
    return false;
  }
  return isNodeMatchingSelectorTabbable(options, node);
};
var focusableCandidateSelector = /* @__PURE__ */ candidateSelectors.concat("iframe").join(",");
var isFocusable = function isFocusable2(node, options) {
  options = options || {};
  if (!node) {
    throw new Error("No node provided");
  }
  if (matches.call(node, focusableCandidateSelector) === false) {
    return false;
  }
  return isNodeMatchingSelectorFocusable(options, node);
};

// node_modules/.pnpm/focus-trap@7.1.0/node_modules/focus-trap/dist/focus-trap.esm.js
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i4 = 1; i4 < arguments.length; i4++) {
    var source = null != arguments[i4] ? arguments[i4] : {};
    i4 % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var rooTrapStack = [];
var activeFocusTraps = {
  activateTrap: function activateTrap(trapStack, trap) {
    if (trapStack.length > 0) {
      var activeTrap = trapStack[trapStack.length - 1];
      if (activeTrap !== trap) {
        activeTrap.pause();
      }
    }
    var trapIndex = trapStack.indexOf(trap);
    if (trapIndex === -1) {
      trapStack.push(trap);
    } else {
      trapStack.splice(trapIndex, 1);
      trapStack.push(trap);
    }
  },
  deactivateTrap: function deactivateTrap(trapStack, trap) {
    var trapIndex = trapStack.indexOf(trap);
    if (trapIndex !== -1) {
      trapStack.splice(trapIndex, 1);
    }
    if (trapStack.length > 0) {
      trapStack[trapStack.length - 1].unpause();
    }
  }
};
var isSelectableInput = function isSelectableInput2(node) {
  return node.tagName && node.tagName.toLowerCase() === "input" && typeof node.select === "function";
};
var isEscapeEvent = function isEscapeEvent2(e2) {
  return e2.key === "Escape" || e2.key === "Esc" || e2.keyCode === 27;
};
var isTabEvent = function isTabEvent2(e2) {
  return e2.key === "Tab" || e2.keyCode === 9;
};
var delay = function delay2(fn) {
  return setTimeout(fn, 0);
};
var findIndex = function findIndex2(arr, fn) {
  var idx = -1;
  arr.every(function(value, i4) {
    if (fn(value)) {
      idx = i4;
      return false;
    }
    return true;
  });
  return idx;
};
var valueOrHandler = function valueOrHandler2(value) {
  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }
  return typeof value === "function" ? value.apply(void 0, params) : value;
};
var getActualTarget = function getActualTarget2(event) {
  return event.target.shadowRoot && typeof event.composedPath === "function" ? event.composedPath()[0] : event.target;
};
var createFocusTrap = function createFocusTrap2(elements, userOptions) {
  var doc = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.document) || document;
  var trapStack = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.trapStack) || rooTrapStack;
  var config = _objectSpread2({
    returnFocusOnDeactivate: true,
    escapeDeactivates: true,
    delayInitialFocus: true
  }, userOptions);
  var state = {
    containers: [],
    containerGroups: [],
    tabbableGroups: [],
    nodeFocusedBeforeActivation: null,
    mostRecentlyFocusedNode: null,
    active: false,
    paused: false,
    delayInitialFocusTimer: void 0
  };
  var trap;
  var getOption = function getOption2(configOverrideOptions, optionName, configOptionName) {
    return configOverrideOptions && configOverrideOptions[optionName] !== void 0 ? configOverrideOptions[optionName] : config[configOptionName || optionName];
  };
  var findContainerIndex = function findContainerIndex2(element) {
    return state.containerGroups.findIndex(function(_ref) {
      var container = _ref.container, tabbableNodes = _ref.tabbableNodes;
      return container.contains(element) || tabbableNodes.find(function(node) {
        return node === element;
      });
    });
  };
  var getNodeForOption = function getNodeForOption2(optionName) {
    var optionValue = config[optionName];
    if (typeof optionValue === "function") {
      for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        params[_key2 - 1] = arguments[_key2];
      }
      optionValue = optionValue.apply(void 0, params);
    }
    if (optionValue === true) {
      optionValue = void 0;
    }
    if (!optionValue) {
      if (optionValue === void 0 || optionValue === false) {
        return optionValue;
      }
      throw new Error("`".concat(optionName, "` was specified but was not a node, or did not return a node"));
    }
    var node = optionValue;
    if (typeof optionValue === "string") {
      node = doc.querySelector(optionValue);
      if (!node) {
        throw new Error("`".concat(optionName, "` as selector refers to no known node"));
      }
    }
    return node;
  };
  var getInitialFocusNode = function getInitialFocusNode2() {
    var node = getNodeForOption("initialFocus");
    if (node === false) {
      return false;
    }
    if (node === void 0) {
      if (findContainerIndex(doc.activeElement) >= 0) {
        node = doc.activeElement;
      } else {
        var firstTabbableGroup = state.tabbableGroups[0];
        var firstTabbableNode = firstTabbableGroup && firstTabbableGroup.firstTabbableNode;
        node = firstTabbableNode || getNodeForOption("fallbackFocus");
      }
    }
    if (!node) {
      throw new Error("Your focus-trap needs to have at least one focusable element");
    }
    return node;
  };
  var updateTabbableNodes = function updateTabbableNodes2() {
    state.containerGroups = state.containers.map(function(container) {
      var tabbableNodes = tabbable(container, config.tabbableOptions);
      var focusableNodes = focusable(container, config.tabbableOptions);
      return {
        container,
        tabbableNodes,
        focusableNodes,
        firstTabbableNode: tabbableNodes.length > 0 ? tabbableNodes[0] : null,
        lastTabbableNode: tabbableNodes.length > 0 ? tabbableNodes[tabbableNodes.length - 1] : null,
        nextTabbableNode: function nextTabbableNode(node) {
          var forward = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
          var nodeIdx = focusableNodes.findIndex(function(n4) {
            return n4 === node;
          });
          if (nodeIdx < 0) {
            return void 0;
          }
          if (forward) {
            return focusableNodes.slice(nodeIdx + 1).find(function(n4) {
              return isTabbable(n4, config.tabbableOptions);
            });
          }
          return focusableNodes.slice(0, nodeIdx).reverse().find(function(n4) {
            return isTabbable(n4, config.tabbableOptions);
          });
        }
      };
    });
    state.tabbableGroups = state.containerGroups.filter(function(group) {
      return group.tabbableNodes.length > 0;
    });
    if (state.tabbableGroups.length <= 0 && !getNodeForOption("fallbackFocus")) {
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    }
  };
  var tryFocus = function tryFocus2(node) {
    if (node === false) {
      return;
    }
    if (node === doc.activeElement) {
      return;
    }
    if (!node || !node.focus) {
      tryFocus2(getInitialFocusNode());
      return;
    }
    node.focus({
      preventScroll: !!config.preventScroll
    });
    state.mostRecentlyFocusedNode = node;
    if (isSelectableInput(node)) {
      node.select();
    }
  };
  var getReturnFocusNode = function getReturnFocusNode2(previousActiveElement) {
    var node = getNodeForOption("setReturnFocus", previousActiveElement);
    return node ? node : node === false ? false : previousActiveElement;
  };
  var checkPointerDown = function checkPointerDown2(e2) {
    var target = getActualTarget(e2);
    if (findContainerIndex(target) >= 0) {
      return;
    }
    if (valueOrHandler(config.clickOutsideDeactivates, e2)) {
      trap.deactivate({
        returnFocus: config.returnFocusOnDeactivate && !isFocusable(target, config.tabbableOptions)
      });
      return;
    }
    if (valueOrHandler(config.allowOutsideClick, e2)) {
      return;
    }
    e2.preventDefault();
  };
  var checkFocusIn = function checkFocusIn2(e2) {
    var target = getActualTarget(e2);
    var targetContained = findContainerIndex(target) >= 0;
    if (targetContained || target instanceof Document) {
      if (targetContained) {
        state.mostRecentlyFocusedNode = target;
      }
    } else {
      e2.stopImmediatePropagation();
      tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
    }
  };
  var checkTab = function checkTab2(e2) {
    var target = getActualTarget(e2);
    updateTabbableNodes();
    var destinationNode = null;
    if (state.tabbableGroups.length > 0) {
      var containerIndex = findContainerIndex(target);
      var containerGroup = containerIndex >= 0 ? state.containerGroups[containerIndex] : void 0;
      if (containerIndex < 0) {
        if (e2.shiftKey) {
          destinationNode = state.tabbableGroups[state.tabbableGroups.length - 1].lastTabbableNode;
        } else {
          destinationNode = state.tabbableGroups[0].firstTabbableNode;
        }
      } else if (e2.shiftKey) {
        var startOfGroupIndex = findIndex(state.tabbableGroups, function(_ref2) {
          var firstTabbableNode = _ref2.firstTabbableNode;
          return target === firstTabbableNode;
        });
        if (startOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target, config.tabbableOptions) && !isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target, false))) {
          startOfGroupIndex = containerIndex;
        }
        if (startOfGroupIndex >= 0) {
          var destinationGroupIndex = startOfGroupIndex === 0 ? state.tabbableGroups.length - 1 : startOfGroupIndex - 1;
          var destinationGroup = state.tabbableGroups[destinationGroupIndex];
          destinationNode = destinationGroup.lastTabbableNode;
        }
      } else {
        var lastOfGroupIndex = findIndex(state.tabbableGroups, function(_ref3) {
          var lastTabbableNode = _ref3.lastTabbableNode;
          return target === lastTabbableNode;
        });
        if (lastOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target, config.tabbableOptions) && !isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target))) {
          lastOfGroupIndex = containerIndex;
        }
        if (lastOfGroupIndex >= 0) {
          var _destinationGroupIndex = lastOfGroupIndex === state.tabbableGroups.length - 1 ? 0 : lastOfGroupIndex + 1;
          var _destinationGroup = state.tabbableGroups[_destinationGroupIndex];
          destinationNode = _destinationGroup.firstTabbableNode;
        }
      }
    } else {
      destinationNode = getNodeForOption("fallbackFocus");
    }
    if (destinationNode) {
      e2.preventDefault();
      tryFocus(destinationNode);
    }
  };
  var checkKey = function checkKey2(e2) {
    if (isEscapeEvent(e2) && valueOrHandler(config.escapeDeactivates, e2) !== false) {
      e2.preventDefault();
      trap.deactivate();
      return;
    }
    if (isTabEvent(e2)) {
      checkTab(e2);
      return;
    }
  };
  var checkClick = function checkClick2(e2) {
    var target = getActualTarget(e2);
    if (findContainerIndex(target) >= 0) {
      return;
    }
    if (valueOrHandler(config.clickOutsideDeactivates, e2)) {
      return;
    }
    if (valueOrHandler(config.allowOutsideClick, e2)) {
      return;
    }
    e2.preventDefault();
    e2.stopImmediatePropagation();
  };
  var addListeners = function addListeners2() {
    if (!state.active) {
      return;
    }
    activeFocusTraps.activateTrap(trapStack, trap);
    state.delayInitialFocusTimer = config.delayInitialFocus ? delay(function() {
      tryFocus(getInitialFocusNode());
    }) : tryFocus(getInitialFocusNode());
    doc.addEventListener("focusin", checkFocusIn, true);
    doc.addEventListener("mousedown", checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener("touchstart", checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener("click", checkClick, {
      capture: true,
      passive: false
    });
    doc.addEventListener("keydown", checkKey, {
      capture: true,
      passive: false
    });
    return trap;
  };
  var removeListeners = function removeListeners2() {
    if (!state.active) {
      return;
    }
    doc.removeEventListener("focusin", checkFocusIn, true);
    doc.removeEventListener("mousedown", checkPointerDown, true);
    doc.removeEventListener("touchstart", checkPointerDown, true);
    doc.removeEventListener("click", checkClick, true);
    doc.removeEventListener("keydown", checkKey, true);
    return trap;
  };
  trap = {
    get active() {
      return state.active;
    },
    get paused() {
      return state.paused;
    },
    activate: function activate(activateOptions) {
      if (state.active) {
        return this;
      }
      var onActivate = getOption(activateOptions, "onActivate");
      var onPostActivate = getOption(activateOptions, "onPostActivate");
      var checkCanFocusTrap = getOption(activateOptions, "checkCanFocusTrap");
      if (!checkCanFocusTrap) {
        updateTabbableNodes();
      }
      state.active = true;
      state.paused = false;
      state.nodeFocusedBeforeActivation = doc.activeElement;
      if (onActivate) {
        onActivate();
      }
      var finishActivation = function finishActivation2() {
        if (checkCanFocusTrap) {
          updateTabbableNodes();
        }
        addListeners();
        if (onPostActivate) {
          onPostActivate();
        }
      };
      if (checkCanFocusTrap) {
        checkCanFocusTrap(state.containers.concat()).then(finishActivation, finishActivation);
        return this;
      }
      finishActivation();
      return this;
    },
    deactivate: function deactivate(deactivateOptions) {
      if (!state.active) {
        return this;
      }
      var options = _objectSpread2({
        onDeactivate: config.onDeactivate,
        onPostDeactivate: config.onPostDeactivate,
        checkCanReturnFocus: config.checkCanReturnFocus
      }, deactivateOptions);
      clearTimeout(state.delayInitialFocusTimer);
      state.delayInitialFocusTimer = void 0;
      removeListeners();
      state.active = false;
      state.paused = false;
      activeFocusTraps.deactivateTrap(trapStack, trap);
      var onDeactivate = getOption(options, "onDeactivate");
      var onPostDeactivate = getOption(options, "onPostDeactivate");
      var checkCanReturnFocus = getOption(options, "checkCanReturnFocus");
      var returnFocus = getOption(options, "returnFocus", "returnFocusOnDeactivate");
      if (onDeactivate) {
        onDeactivate();
      }
      var finishDeactivation = function finishDeactivation2() {
        delay(function() {
          if (returnFocus) {
            tryFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation));
          }
          if (onPostDeactivate) {
            onPostDeactivate();
          }
        });
      };
      if (returnFocus && checkCanReturnFocus) {
        checkCanReturnFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation)).then(finishDeactivation, finishDeactivation);
        return this;
      }
      finishDeactivation();
      return this;
    },
    pause: function pause() {
      if (state.paused || !state.active) {
        return this;
      }
      state.paused = true;
      removeListeners();
      return this;
    },
    unpause: function unpause() {
      if (!state.paused || !state.active) {
        return this;
      }
      state.paused = false;
      updateTabbableNodes();
      addListeners();
      return this;
    },
    updateContainerElements: function updateContainerElements(containerElements) {
      var elementsAsArray = [].concat(containerElements).filter(Boolean);
      state.containers = elementsAsArray.map(function(element) {
        return typeof element === "string" ? doc.querySelector(element) : element;
      });
      if (state.active) {
        updateTabbableNodes();
      }
      return this;
    }
  };
  trap.updateContainerElements(elements);
  return trap;
};

// js/sprout-ui/utils/index.ts
var isTruthy = (val) => val !== null && val !== void 0;
var isVisible = (element) => !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length > 0);
var flipping = (current, values = ["open", "closed"]) => current === values[0] ? values[1] : values[0];

// js/sprout-ui/utils/body-scroll.ts
var toggleBodyScroll = (state) => {
  if (!state)
    return;
  switch (state) {
    case "on":
      Object.assign(document.body.style, { overflow: "" });
      break;
    case "off":
      Object.assign(document.body.style, { overflow: "hidden" });
      break;
  }
};

// js/sprout-ui/utils/disposables.ts
var Disposables = class {
  constructor() {
    this.disposables = [];
  }
  add(callback) {
    this.disposables.push(callback);
    return () => {
      let idx = this.disposables.indexOf(callback);
      if (idx >= 0) {
        let [dispose] = this.disposables.splice(idx, 1);
        dispose();
      }
    };
  }
  nextFrame(callback) {
    const raf = requestAnimationFrame(() => requestAnimationFrame(callback));
    return this.add(() => cancelAnimationFrame(raf));
  }
  addEventListener(element, event, listener, options) {
    element.addEventListener(event, listener, options);
    return this.add(() => element.removeEventListener(event, listener));
  }
  setTimeout(handler, timeout) {
    const id = window.setTimeout(handler, timeout);
    return this.add(() => clearTimeout(id));
  }
  dispose() {
    this.disposables.splice(0).forEach((d3) => d3());
  }
};

// js/sprout-ui/internal/modal.ts
var Modal = class {
  constructor(element, options) {
    this.listeners = new Disposables();
    this.disposables = new Disposables();
    var _a, _b, _c;
    this.element = element;
    this.preventScroll = (_a = options == null ? void 0 : options.preventScroll) != null ? _a : true;
    this.dismissOnEsc = (_b = options == null ? void 0 : options.dismissOnEsc) != null ? _b : true;
    this.dismissOnClickAway = (_c = options == null ? void 0 : options.dismissOnClickAway) != null ? _c : true;
  }
  addEventListeners(onDismiss) {
    if (this.dismissOnClickAway) {
      this.listeners.addEventListener(document, "click", (event) => {
        if (isVisible(this.element) && !this.element.contains(event.target)) {
          onDismiss();
          event.preventDefault();
        }
      });
    }
    if (this.dismissOnEsc) {
      this.listeners.addEventListener(document, "keydown", (event) => {
        const { key } = event;
        if (isVisible(this.element) && key === "Escape") {
          onDismiss();
          event.preventDefault();
        }
      });
    }
  }
  removeEventListeners() {
    this.listeners.dispose();
  }
  activate() {
    const focusTrap = createFocusTrap(this.element, {
      escapeDeactivates: false,
      allowOutsideClick: true
    });
    this.disposables.add(() => focusTrap.deactivate());
    this.disposables.nextFrame(() => focusTrap.activate());
    toggleBodyScroll(this.preventScroll ? "off" : void 0);
  }
  deactivate() {
    this.disposables.dispose();
    toggleBodyScroll(this.preventScroll ? "on" : void 0);
  }
};

// js/sprout-ui/internal/transition.ts
var getTransitionClasses = (element) => Object.fromEntries(
  ["enter", "leave"].map((v3) => [v3, `${v3}From`, `${v3}To`, `${v3}Ended`]).flat().map((key) => {
    var _a, _b, _c;
    return [key, (_c = (_b = (_a = element.dataset[key]) == null ? void 0 : _a.split(" ")) == null ? void 0 : _b.filter(Boolean)) != null ? _c : []];
  })
);
var _waitForTransition = (element, onDone) => {
  let { transitionDuration, transitionDelay } = getComputedStyle(element);
  let totalDuration = [transitionDuration, transitionDelay].map((value) => {
    let [resolvedValue = 0] = value.split(",").filter(Boolean).map((v3) => v3.includes("ms") ? parseFloat(v3) : parseFloat(v3) * 1e3).sort((a3, z2) => z2 - a3);
    return resolvedValue;
  }).reduce((a3, b3) => a3 + b3, 0);
  const d3 = new Disposables();
  if (totalDuration === 0) {
    onDone("ended");
  } else {
    const listeners = [];
    listeners.push(
      d3.addEventListener(element, "transitionrun", (event) => {
        if (event.target !== event.currentTarget)
          return;
        listeners.splice(0).forEach((d4) => d4());
        listeners.push(
          d3.addEventListener(element, "transitionend", (event2) => {
            if (event2.target !== event2.currentTarget)
              return;
            onDone("ended");
            listeners.splice(0).forEach((d4) => d4());
          }),
          d3.addEventListener(element, "transitioncancel", (event2) => {
            if (event2.target !== event2.currentTarget)
              return;
            onDone("canceled");
            listeners.splice(0).forEach((d4) => d4());
          })
        );
      })
    );
  }
  d3.add(() => onDone("canceled"));
  return d3.dispose;
};
var doTransition = (element, stage, classes, callbacks) => {
  var _a;
  const originalClasses = Array.from(element.classList);
  let base;
  let from;
  let to;
  let ended;
  switch (stage) {
    case "enter":
      base = classes.enter;
      from = classes.enterFrom;
      to = classes.enterTo;
      ended = classes.enterEnded;
      break;
    case "leave":
      base = classes.leave;
      from = classes.leaveFrom;
      to = classes.leaveTo;
      ended = classes.leaveEnded;
      break;
  }
  (_a = callbacks.onStart) == null ? void 0 : _a.call(callbacks, stage);
  element.classList.add(...base, ...from);
  const d3 = new Disposables();
  d3.nextFrame(() => {
    element.classList.remove(...from);
    element.classList.add(...to);
    _waitForTransition(element, (status) => {
      var _a2;
      if (status === "ended") {
        element.classList.remove(
          ...base,
          ...Array.from(element.classList).filter((c4) => !originalClasses.includes(c4))
        );
        element.classList.add(...ended);
      }
      (_a2 = callbacks.onDone) == null ? void 0 : _a2.call(callbacks, stage, status);
    });
  });
  return d3.dispose;
};
var transitionElement = (element, stage) => new Promise((resolve) => {
  if (!element.hasAttribute("data-transition")) {
    resolve(void 0);
    return;
  }
  const classes = getTransitionClasses(element);
  doTransition(element, stage, classes, {
    onDone: (_stage, status) => resolve(status)
  });
});

// js/sprout-ui/components/dialog.ts
var DialogElement = class extends n {
  static get observedAttributes() {
    return ["data-state"];
  }
  connectedCallback() {
    if (!this.dialog || !this.backdrop || !this.panel)
      throw new Error("Dialog must have a backdrop element and a panel element.");
    this.modal = new Modal(this.panel, {
      preventScroll: isTruthy(this.dataset.preventScroll),
      dismissOnEsc: isTruthy(this.dataset.closeOnEsc),
      dismissOnClickAway: isTruthy(this.dataset.closeOnClickAway)
    });
  }
  updatedCallback(attribute, _oldValue, _newValue) {
    if (attribute === "data-state")
      this.handleStateChange();
  }
  handleStateChange() {
    return __async(this, null, function* () {
      const parts = [this.backdrop, this.panel];
      if (this.state === "open") {
        i.exec(this, this.dataset.onOpenJs);
        i.removeAttribute(this.dialog, "hidden");
        this.modal.addEventListeners(() => {
          this.state = "closed";
        });
        this.modal.activate();
        yield Promise.all(parts.map((part) => transitionElement(part, "enter")));
      } else {
        i.exec(this, this.dataset.onCloseJs);
        this.modal.removeEventListeners();
        this.modal.deactivate();
        yield Promise.all(parts.map((part) => transitionElement(part, "leave")));
        i.setAttribute(this.dialog, "hidden", "true");
      }
    });
  }
};
__decorateClass([
  (0, import_decorators.query)("container", { part: true })
], DialogElement.prototype, "dialog", 2);
__decorateClass([
  (0, import_decorators.query)("backdrop", { part: true })
], DialogElement.prototype, "backdrop", 2);
__decorateClass([
  (0, import_decorators.query)("panel", { part: true })
], DialogElement.prototype, "panel", 2);
__decorateClass([
  (0, import_decorators.attr)("data-state", { live: true })
], DialogElement.prototype, "state", 2);
var Dialog = (_opts) => ({
  init: () => {
    customElements.define("sp-dialog", DialogElement);
  }
});
var dialog_default = Dialog;

// node_modules/.pnpm/@floating-ui+core@1.0.1/node_modules/@floating-ui/core/dist/floating-ui.core.browser.min.mjs
function t(t2) {
  return t2.split("-")[0];
}
function e(t2) {
  return t2.split("-")[1];
}
function n2(e2) {
  return ["top", "bottom"].includes(t(e2)) ? "x" : "y";
}
function r(t2) {
  return "y" === t2 ? "height" : "width";
}
function i2(i4, o3, a3) {
  let { reference: l3, floating: s3 } = i4;
  const c4 = l3.x + l3.width / 2 - s3.width / 2, f3 = l3.y + l3.height / 2 - s3.height / 2, u3 = n2(o3), m3 = r(u3), g3 = l3[m3] / 2 - s3[m3] / 2, d3 = "x" === u3;
  let p3;
  switch (t(o3)) {
    case "top":
      p3 = { x: c4, y: l3.y - s3.height };
      break;
    case "bottom":
      p3 = { x: c4, y: l3.y + l3.height };
      break;
    case "right":
      p3 = { x: l3.x + l3.width, y: f3 };
      break;
    case "left":
      p3 = { x: l3.x - s3.width, y: f3 };
      break;
    default:
      p3 = { x: l3.x, y: l3.y };
  }
  switch (e(o3)) {
    case "start":
      p3[u3] -= g3 * (a3 && d3 ? -1 : 1);
      break;
    case "end":
      p3[u3] += g3 * (a3 && d3 ? -1 : 1);
  }
  return p3;
}
var o = async (t2, e2, n4) => {
  const { placement: r3 = "bottom", strategy: o3 = "absolute", middleware: a3 = [], platform: l3 } = n4, s3 = await (null == l3.isRTL ? void 0 : l3.isRTL(e2));
  let c4 = await l3.getElementRects({ reference: t2, floating: e2, strategy: o3 }), { x: f3, y: u3 } = i2(c4, r3, s3), m3 = r3, g3 = {}, d3 = 0;
  for (let n5 = 0; n5 < a3.length; n5++) {
    const { name: p3, fn: h3 } = a3[n5], { x: y3, y: x3, data: w3, reset: v3 } = await h3({ x: f3, y: u3, initialPlacement: r3, placement: m3, strategy: o3, middlewareData: g3, rects: c4, platform: l3, elements: { reference: t2, floating: e2 } });
    f3 = null != y3 ? y3 : f3, u3 = null != x3 ? x3 : u3, g3 = { ...g3, [p3]: { ...g3[p3], ...w3 } }, v3 && d3 <= 50 && (d3++, "object" == typeof v3 && (v3.placement && (m3 = v3.placement), v3.rects && (c4 = true === v3.rects ? await l3.getElementRects({ reference: t2, floating: e2, strategy: o3 }) : v3.rects), { x: f3, y: u3 } = i2(c4, m3, s3)), n5 = -1);
  }
  return { x: f3, y: u3, placement: m3, strategy: o3, middlewareData: g3 };
};
function a(t2) {
  return "number" != typeof t2 ? function(t3) {
    return { top: 0, right: 0, bottom: 0, left: 0, ...t3 };
  }(t2) : { top: t2, right: t2, bottom: t2, left: t2 };
}
function l(t2) {
  return { ...t2, top: t2.y, left: t2.x, right: t2.x + t2.width, bottom: t2.y + t2.height };
}
async function s(t2, e2) {
  var n4;
  void 0 === e2 && (e2 = {});
  const { x: r3, y: i4, platform: o3, rects: s3, elements: c4, strategy: f3 } = t2, { boundary: u3 = "clippingAncestors", rootBoundary: m3 = "viewport", elementContext: g3 = "floating", altBoundary: d3 = false, padding: p3 = 0 } = e2, h3 = a(p3), y3 = c4[d3 ? "floating" === g3 ? "reference" : "floating" : g3], x3 = l(await o3.getClippingRect({ element: null == (n4 = await (null == o3.isElement ? void 0 : o3.isElement(y3))) || n4 ? y3 : y3.contextElement || await (null == o3.getDocumentElement ? void 0 : o3.getDocumentElement(c4.floating)), boundary: u3, rootBoundary: m3, strategy: f3 })), w3 = l(o3.convertOffsetParentRelativeRectToViewportRelativeRect ? await o3.convertOffsetParentRelativeRectToViewportRelativeRect({ rect: "floating" === g3 ? { ...s3.floating, x: r3, y: i4 } : s3.reference, offsetParent: await (null == o3.getOffsetParent ? void 0 : o3.getOffsetParent(c4.floating)), strategy: f3 }) : s3[g3]);
  return { top: x3.top - w3.top + h3.top, bottom: w3.bottom - x3.bottom + h3.bottom, left: x3.left - w3.left + h3.left, right: w3.right - x3.right + h3.right };
}
var c2 = Math.min;
var f = Math.max;
function u(t2, e2, n4) {
  return f(t2, c2(e2, n4));
}
var m = (t2) => ({ name: "arrow", options: t2, async fn(i4) {
  const { element: o3, padding: l3 = 0 } = null != t2 ? t2 : {}, { x: s3, y: c4, placement: f3, rects: m3, platform: g3 } = i4;
  if (null == o3)
    return {};
  const d3 = a(l3), p3 = { x: s3, y: c4 }, h3 = n2(f3), y3 = e(f3), x3 = r(h3), w3 = await g3.getDimensions(o3), v3 = "y" === h3 ? "top" : "left", b3 = "y" === h3 ? "bottom" : "right", R2 = m3.reference[x3] + m3.reference[h3] - p3[h3] - m3.floating[x3], A2 = p3[h3] - m3.reference[h3], P2 = await (null == g3.getOffsetParent ? void 0 : g3.getOffsetParent(o3));
  let T3 = P2 ? "y" === h3 ? P2.clientHeight || 0 : P2.clientWidth || 0 : 0;
  0 === T3 && (T3 = m3.floating[x3]);
  const O2 = R2 / 2 - A2 / 2, L3 = d3[v3], D3 = T3 - w3[x3] - d3[b3], k2 = T3 / 2 - w3[x3] / 2 + O2, E3 = u(L3, k2, D3), C2 = ("start" === y3 ? d3[v3] : d3[b3]) > 0 && k2 !== E3 && m3.reference[x3] <= m3.floating[x3];
  return { [h3]: p3[h3] - (C2 ? k2 < L3 ? L3 - k2 : D3 - k2 : 0), data: { [h3]: E3, centerOffset: k2 - E3 } };
} });
var g = { left: "right", right: "left", bottom: "top", top: "bottom" };
function d(t2) {
  return t2.replace(/left|right|bottom|top/g, (t3) => g[t3]);
}
function p(t2, i4, o3) {
  void 0 === o3 && (o3 = false);
  const a3 = e(t2), l3 = n2(t2), s3 = r(l3);
  let c4 = "x" === l3 ? a3 === (o3 ? "end" : "start") ? "right" : "left" : "start" === a3 ? "bottom" : "top";
  return i4.reference[s3] > i4.floating[s3] && (c4 = d(c4)), { main: c4, cross: d(c4) };
}
var h = { start: "end", end: "start" };
function y(t2) {
  return t2.replace(/start|end/g, (t3) => h[t3]);
}
var x = ["top", "right", "bottom", "left"];
var w = x.reduce((t2, e2) => t2.concat(e2, e2 + "-start", e2 + "-end"), []);
var b = function(e2) {
  return void 0 === e2 && (e2 = {}), { name: "flip", options: e2, async fn(n4) {
    var r3;
    const { placement: i4, middlewareData: o3, rects: a3, initialPlacement: l3, platform: c4, elements: f3 } = n4, { mainAxis: u3 = true, crossAxis: m3 = true, fallbackPlacements: g3, fallbackStrategy: h3 = "bestFit", flipAlignment: x3 = true, ...w3 } = e2, v3 = t(i4), b3 = g3 || (v3 === l3 || !x3 ? [d(l3)] : function(t2) {
      const e3 = d(t2);
      return [y(t2), e3, y(e3)];
    }(l3)), R2 = [l3, ...b3], A2 = await s(n4, w3), P2 = [];
    let T3 = (null == (r3 = o3.flip) ? void 0 : r3.overflows) || [];
    if (u3 && P2.push(A2[v3]), m3) {
      const { main: t2, cross: e3 } = p(i4, a3, await (null == c4.isRTL ? void 0 : c4.isRTL(f3.floating)));
      P2.push(A2[t2], A2[e3]);
    }
    if (T3 = [...T3, { placement: i4, overflows: P2 }], !P2.every((t2) => t2 <= 0)) {
      var O2, L3;
      const t2 = (null != (O2 = null == (L3 = o3.flip) ? void 0 : L3.index) ? O2 : 0) + 1, e3 = R2[t2];
      if (e3)
        return { data: { index: t2, overflows: T3 }, reset: { placement: e3 } };
      let n5 = "bottom";
      switch (h3) {
        case "bestFit": {
          var D3;
          const t3 = null == (D3 = T3.map((t4) => [t4, t4.overflows.filter((t5) => t5 > 0).reduce((t5, e4) => t5 + e4, 0)]).sort((t4, e4) => t4[1] - e4[1])[0]) ? void 0 : D3[0].placement;
          t3 && (n5 = t3);
          break;
        }
        case "initialPlacement":
          n5 = l3;
      }
      if (i4 !== n5)
        return { reset: { placement: n5 } };
    }
    return {};
  } };
};
var T = function(r3) {
  return void 0 === r3 && (r3 = 0), { name: "offset", options: r3, async fn(i4) {
    const { x: o3, y: a3 } = i4, l3 = await async function(r4, i5) {
      const { placement: o4, platform: a4, elements: l4 } = r4, s3 = await (null == a4.isRTL ? void 0 : a4.isRTL(l4.floating)), c4 = t(o4), f3 = e(o4), u3 = "x" === n2(o4), m3 = ["left", "top"].includes(c4) ? -1 : 1, g3 = s3 && u3 ? -1 : 1, d3 = "function" == typeof i5 ? i5(r4) : i5;
      let { mainAxis: p3, crossAxis: h3, alignmentAxis: y3 } = "number" == typeof d3 ? { mainAxis: d3, crossAxis: 0, alignmentAxis: null } : { mainAxis: 0, crossAxis: 0, alignmentAxis: null, ...d3 };
      return f3 && "number" == typeof y3 && (h3 = "end" === f3 ? -1 * y3 : y3), u3 ? { x: h3 * g3, y: p3 * m3 } : { x: p3 * m3, y: h3 * g3 };
    }(i4, r3);
    return { x: o3 + l3.x, y: a3 + l3.y, data: l3 };
  } };
};
function O(t2) {
  return "x" === t2 ? "y" : "x";
}
var L = function(e2) {
  return void 0 === e2 && (e2 = {}), { name: "shift", options: e2, async fn(r3) {
    const { x: i4, y: o3, placement: a3 } = r3, { mainAxis: l3 = true, crossAxis: c4 = false, limiter: f3 = { fn: (t2) => {
      let { x: e3, y: n4 } = t2;
      return { x: e3, y: n4 };
    } }, ...m3 } = e2, g3 = { x: i4, y: o3 }, d3 = await s(r3, m3), p3 = n2(t(a3)), h3 = O(p3);
    let y3 = g3[p3], x3 = g3[h3];
    if (l3) {
      const t2 = "y" === p3 ? "bottom" : "right";
      y3 = u(y3 + d3["y" === p3 ? "top" : "left"], y3, y3 - d3[t2]);
    }
    if (c4) {
      const t2 = "y" === h3 ? "bottom" : "right";
      x3 = u(x3 + d3["y" === h3 ? "top" : "left"], x3, x3 - d3[t2]);
    }
    const w3 = f3.fn({ ...r3, [p3]: y3, [h3]: x3 });
    return { ...w3, data: { x: w3.x - i4, y: w3.y - o3 } };
  } };
};

// node_modules/.pnpm/@floating-ui+dom@1.0.4/node_modules/@floating-ui/dom/dist/floating-ui.dom.browser.min.mjs
function n3(t2) {
  return t2 && t2.document && t2.location && t2.alert && t2.setInterval;
}
function o2(t2) {
  if (null == t2)
    return window;
  if (!n3(t2)) {
    const e2 = t2.ownerDocument;
    return e2 && e2.defaultView || window;
  }
  return t2;
}
function i3(t2) {
  return o2(t2).getComputedStyle(t2);
}
function r2(t2) {
  return n3(t2) ? "" : t2 ? (t2.nodeName || "").toLowerCase() : "";
}
function l2() {
  const t2 = navigator.userAgentData;
  return null != t2 && t2.brands ? t2.brands.map((t3) => t3.brand + "/" + t3.version).join(" ") : navigator.userAgent;
}
function c3(t2) {
  return t2 instanceof o2(t2).HTMLElement;
}
function s2(t2) {
  return t2 instanceof o2(t2).Element;
}
function f2(t2) {
  if ("undefined" == typeof ShadowRoot)
    return false;
  return t2 instanceof o2(t2).ShadowRoot || t2 instanceof ShadowRoot;
}
function u2(t2) {
  const { overflow: e2, overflowX: n4, overflowY: o3, display: r3 } = i3(t2);
  return /auto|scroll|overlay|hidden/.test(e2 + o3 + n4) && !["inline", "contents"].includes(r3);
}
function d2(t2) {
  return ["table", "td", "th"].includes(r2(t2));
}
function h2(t2) {
  const e2 = /firefox/i.test(l2()), n4 = i3(t2);
  return "none" !== n4.transform || "none" !== n4.perspective || e2 && "filter" === n4.willChange || e2 && !!n4.filter && "none" !== n4.filter || ["transform", "perspective"].some((t3) => n4.willChange.includes(t3)) || ["paint", "layout", "strict", "content"].some((t3) => {
    const e3 = n4.contain;
    return null != e3 && e3.includes(t3);
  });
}
function a2() {
  return !/^((?!chrome|android).)*safari/i.test(l2());
}
function g2(t2) {
  return ["html", "body", "#document"].includes(r2(t2));
}
var m2 = Math.min;
var p2 = Math.max;
var w2 = Math.round;
function v2(t2, e2, n4) {
  var i4, r3, l3, f3;
  void 0 === e2 && (e2 = false), void 0 === n4 && (n4 = false);
  const u3 = t2.getBoundingClientRect();
  let d3 = 1, h3 = 1;
  e2 && c3(t2) && (d3 = t2.offsetWidth > 0 && w2(u3.width) / t2.offsetWidth || 1, h3 = t2.offsetHeight > 0 && w2(u3.height) / t2.offsetHeight || 1);
  const g3 = s2(t2) ? o2(t2) : window, m3 = !a2() && n4, p3 = (u3.left + (m3 && null != (i4 = null == (r3 = g3.visualViewport) ? void 0 : r3.offsetLeft) ? i4 : 0)) / d3, v3 = (u3.top + (m3 && null != (l3 = null == (f3 = g3.visualViewport) ? void 0 : f3.offsetTop) ? l3 : 0)) / h3, y3 = u3.width / d3, x3 = u3.height / h3;
  return { width: y3, height: x3, top: v3, right: p3 + y3, bottom: v3 + x3, left: p3, x: p3, y: v3 };
}
function y2(t2) {
  return (e2 = t2, (e2 instanceof o2(e2).Node ? t2.ownerDocument : t2.document) || window.document).documentElement;
  var e2;
}
function x2(t2) {
  return s2(t2) ? { scrollLeft: t2.scrollLeft, scrollTop: t2.scrollTop } : { scrollLeft: t2.pageXOffset, scrollTop: t2.pageYOffset };
}
function b2(t2) {
  return v2(y2(t2)).left + x2(t2).scrollLeft;
}
function L2(t2, e2, n4) {
  const o3 = c3(e2), i4 = y2(e2), l3 = v2(t2, o3 && function(t3) {
    const e3 = v2(t3);
    return w2(e3.width) !== t3.offsetWidth || w2(e3.height) !== t3.offsetHeight;
  }(e2), "fixed" === n4);
  let s3 = { scrollLeft: 0, scrollTop: 0 };
  const f3 = { x: 0, y: 0 };
  if (o3 || !o3 && "fixed" !== n4)
    if (("body" !== r2(e2) || u2(i4)) && (s3 = x2(e2)), c3(e2)) {
      const t3 = v2(e2, true);
      f3.x = t3.x + e2.clientLeft, f3.y = t3.y + e2.clientTop;
    } else
      i4 && (f3.x = b2(i4));
  return { x: l3.left + s3.scrollLeft - f3.x, y: l3.top + s3.scrollTop - f3.y, width: l3.width, height: l3.height };
}
function R(t2) {
  return "html" === r2(t2) ? t2 : t2.assignedSlot || t2.parentNode || (f2(t2) ? t2.host : null) || y2(t2);
}
function E2(t2) {
  return c3(t2) && "fixed" !== i3(t2).position ? t2.offsetParent : null;
}
function T2(t2) {
  const e2 = o2(t2);
  let n4 = E2(t2);
  for (; n4 && d2(n4) && "static" === i3(n4).position; )
    n4 = E2(n4);
  return n4 && ("html" === r2(n4) || "body" === r2(n4) && "static" === i3(n4).position && !h2(n4)) ? e2 : n4 || function(t3) {
    let e3 = R(t3);
    for (f2(e3) && (e3 = e3.host); c3(e3) && !g2(e3); ) {
      if (h2(e3))
        return e3;
      {
        const t4 = e3.parentNode;
        e3 = f2(t4) ? t4.host : t4;
      }
    }
    return null;
  }(t2) || e2;
}
function W(t2) {
  if (c3(t2))
    return { width: t2.offsetWidth, height: t2.offsetHeight };
  const e2 = v2(t2);
  return { width: e2.width, height: e2.height };
}
function H(t2) {
  const e2 = R(t2);
  return g2(e2) ? t2.ownerDocument.body : c3(e2) && u2(e2) ? e2 : H(e2);
}
function C(t2, e2) {
  var n4;
  void 0 === e2 && (e2 = []);
  const i4 = H(t2), r3 = i4 === (null == (n4 = t2.ownerDocument) ? void 0 : n4.body), l3 = o2(i4), c4 = r3 ? [l3].concat(l3.visualViewport || [], u2(i4) ? i4 : []) : i4, s3 = e2.concat(c4);
  return r3 ? s3 : s3.concat(C(c4));
}
function D2(e2, n4, r3) {
  return "viewport" === n4 ? l(function(t2, e3) {
    const n5 = o2(t2), i4 = y2(t2), r4 = n5.visualViewport;
    let l3 = i4.clientWidth, c4 = i4.clientHeight, s3 = 0, f3 = 0;
    if (r4) {
      l3 = r4.width, c4 = r4.height;
      const t3 = a2();
      (t3 || !t3 && "fixed" === e3) && (s3 = r4.offsetLeft, f3 = r4.offsetTop);
    }
    return { width: l3, height: c4, x: s3, y: f3 };
  }(e2, r3)) : s2(n4) ? function(t2, e3) {
    const n5 = v2(t2, false, "fixed" === e3), o3 = n5.top + t2.clientTop, i4 = n5.left + t2.clientLeft;
    return { top: o3, left: i4, x: i4, y: o3, right: i4 + t2.clientWidth, bottom: o3 + t2.clientHeight, width: t2.clientWidth, height: t2.clientHeight };
  }(n4, r3) : l(function(t2) {
    var e3;
    const n5 = y2(t2), o3 = x2(t2), r4 = null == (e3 = t2.ownerDocument) ? void 0 : e3.body, l3 = p2(n5.scrollWidth, n5.clientWidth, r4 ? r4.scrollWidth : 0, r4 ? r4.clientWidth : 0), c4 = p2(n5.scrollHeight, n5.clientHeight, r4 ? r4.scrollHeight : 0, r4 ? r4.clientHeight : 0);
    let s3 = -o3.scrollLeft + b2(t2);
    const f3 = -o3.scrollTop;
    return "rtl" === i3(r4 || n5).direction && (s3 += p2(n5.clientWidth, r4 ? r4.clientWidth : 0) - l3), { width: l3, height: c4, x: s3, y: f3 };
  }(y2(e2)));
}
function N(t2) {
  const e2 = C(t2), n4 = function(t3, e3) {
    let n5 = t3;
    for (; n5 && !g2(n5) && !e3.includes(n5) && (!s2(n5) || !["absolute", "fixed"].includes(i3(n5).position)); ) {
      const t4 = R(n5);
      n5 = f2(t4) ? t4.host : t4;
    }
    return n5;
  }(t2, e2);
  let o3 = null;
  if (n4 && c3(n4)) {
    const t3 = T2(n4);
    u2(n4) ? o3 = n4 : c3(t3) && (o3 = t3);
  }
  return s2(o3) ? e2.filter((t3) => o3 && s2(t3) && function(t4, e3) {
    const n5 = null == e3.getRootNode ? void 0 : e3.getRootNode();
    if (t4.contains(e3))
      return true;
    if (n5 && f2(n5)) {
      let n6 = e3;
      do {
        if (n6 && t4 === n6)
          return true;
        n6 = n6.parentNode || n6.host;
      } while (n6);
    }
    return false;
  }(t3, o3) && "body" !== r2(t3)) : [];
}
var S = { getClippingRect: function(t2) {
  let { element: e2, boundary: n4, rootBoundary: o3, strategy: i4 } = t2;
  const r3 = [..."clippingAncestors" === n4 ? N(e2) : [].concat(n4), o3], l3 = r3[0], c4 = r3.reduce((t3, n5) => {
    const o4 = D2(e2, n5, i4);
    return t3.top = p2(o4.top, t3.top), t3.right = m2(o4.right, t3.right), t3.bottom = m2(o4.bottom, t3.bottom), t3.left = p2(o4.left, t3.left), t3;
  }, D2(e2, l3, i4));
  return { width: c4.right - c4.left, height: c4.bottom - c4.top, x: c4.left, y: c4.top };
}, convertOffsetParentRelativeRectToViewportRelativeRect: function(t2) {
  let { rect: e2, offsetParent: n4, strategy: o3 } = t2;
  const i4 = c3(n4), l3 = y2(n4);
  if (n4 === l3)
    return e2;
  let s3 = { scrollLeft: 0, scrollTop: 0 };
  const f3 = { x: 0, y: 0 };
  if ((i4 || !i4 && "fixed" !== o3) && (("body" !== r2(n4) || u2(l3)) && (s3 = x2(n4)), c3(n4))) {
    const t3 = v2(n4, true);
    f3.x = t3.x + n4.clientLeft, f3.y = t3.y + n4.clientTop;
  }
  return { ...e2, x: e2.x - s3.scrollLeft + f3.x, y: e2.y - s3.scrollTop + f3.y };
}, isElement: s2, getDimensions: W, getOffsetParent: T2, getDocumentElement: y2, getElementRects: (t2) => {
  let { reference: e2, floating: n4, strategy: o3 } = t2;
  return { reference: L2(e2, T2(n4), o3), floating: { ...W(n4), x: 0, y: 0 } };
}, getClientRects: (t2) => Array.from(t2.getClientRects()), isRTL: (t2) => "rtl" === i3(t2).direction };
function z(t2, e2, n4, o3) {
  void 0 === o3 && (o3 = {});
  const { ancestorScroll: i4 = true, ancestorResize: r3 = true, elementResize: l3 = true, animationFrame: c4 = false } = o3, f3 = i4 && !c4, u3 = f3 || r3 ? [...s2(t2) ? C(t2) : t2.contextElement ? C(t2.contextElement) : [], ...C(e2)] : [];
  u3.forEach((t3) => {
    f3 && t3.addEventListener("scroll", n4, { passive: true }), r3 && t3.addEventListener("resize", n4);
  });
  let d3, h3 = null;
  if (l3) {
    let o4 = true;
    h3 = new ResizeObserver(() => {
      o4 || n4(), o4 = false;
    }), s2(t2) && !c4 && h3.observe(t2), s2(t2) || !t2.contextElement || c4 || h3.observe(t2.contextElement), h3.observe(e2);
  }
  let a3 = c4 ? v2(t2) : null;
  return c4 && function e3() {
    const o4 = v2(t2);
    !a3 || o4.x === a3.x && o4.y === a3.y && o4.width === a3.width && o4.height === a3.height || n4();
    a3 = o4, d3 = requestAnimationFrame(e3);
  }(), n4(), () => {
    var t3;
    u3.forEach((t4) => {
      f3 && t4.removeEventListener("scroll", n4), r3 && t4.removeEventListener("resize", n4);
    }), null == (t3 = h3) || t3.disconnect(), h3 = null, c4 && cancelAnimationFrame(d3);
  };
}
var A = (t2, n4, o3) => o(t2, n4, { platform: S, ...o3 });

// js/sprout-ui/components/floating.ts
var import_decorators2 = __toESM(require_decorators2());
var FloatingElement = class extends HTMLDivElement {
  connectedCallback() {
    const anchor = document.querySelector(this.dataset.anchor);
    if (!anchor)
      throw new Error("Floating element must have an anchor element");
    this.anchor = anchor;
    this.middleware = this.buildMiddleware();
    this.start();
  }
  disconnectedCallback() {
    var _a;
    (_a = this.cleanup) == null ? void 0 : _a.call(this);
  }
  buildMiddleware() {
    const middleware = [];
    if (this.offset)
      middleware.push(T(this.offset));
    if (this.shift)
      middleware.push(L({ rootBoundary: "document" }));
    if (this.flip)
      middleware.push(b());
    if (this.arrow)
      middleware.push(m({ element: this.arrow }));
    return middleware;
  }
  start() {
    this.cleanup = z(this.anchor, this, this.update.bind(this));
  }
  update() {
    if (!isVisible(this))
      return;
    A(this.anchor, this, {
      placement: this.placement,
      middleware: this.middleware
    }).then(({ x: x3, y: y3, placement, middlewareData }) => {
      Object.assign(this.style, {
        left: `${x3}px`,
        top: `${y3}px`
      });
      if (middlewareData.arrow && this.arrow) {
        const { x: arrowX, y: arrowY } = middlewareData.arrow;
        const staticSide = {
          top: "bottom",
          right: "left",
          bottom: "top",
          left: "right"
        }[placement.split("-")[0]];
        Object.assign(this.arrow.style, {
          left: arrowX != null ? `${arrowX}px` : "",
          top: arrowY != null ? `${arrowY}px` : "",
          right: "",
          bottom: "",
          [staticSide]: "-4px"
        });
      }
    });
  }
};
__decorateClass([
  (0, import_decorators2.query)("arrow", { part: true })
], FloatingElement.prototype, "arrow", 2);
__decorateClass([
  (0, import_decorators2.attr)("data-placement")
], FloatingElement.prototype, "placement", 2);
__decorateClass([
  (0, import_decorators2.attr)("data-offset", { converter: Number })
], FloatingElement.prototype, "offset", 2);
__decorateClass([
  (0, import_decorators2.attr)("data-shift", { converter: isTruthy })
], FloatingElement.prototype, "shift", 2);
__decorateClass([
  (0, import_decorators2.attr)("data-flip", { converter: isTruthy })
], FloatingElement.prototype, "flip", 2);
var Floating = () => ({
  init: () => {
    customElements.define("floating-element", FloatingElement, { extends: "div" });
  },
  handleDomChange: (from, to) => {
    if (from.getAttribute("is") === "floating-element") {
      to.setAttribute("style", from.getAttribute("style"));
    }
  }
});
var floating_default = Floating;

// js/sprout-ui/components/popover.ts
var import_decorators3 = __toESM(require_decorators2());
var PopoverElement = class extends n {
  constructor() {
    super(...arguments);
    this.listeners = new Disposables();
  }
  static get observedAttributes() {
    return ["data-state"];
  }
  connectedCallback() {
    if (!this.panel || !this.trigger)
      throw new Error("Popover must have a trigger element and a panel element.");
    this.listeners.addEventListener(this.trigger, "click", () => {
      this.state = flipping(this.state);
    });
    this.modal = new Modal(this.panel, {
      preventScroll: false,
      dismissOnEsc: isTruthy(this.dataset.closeOnEsc),
      dismissOnClickAway: isTruthy(this.dataset.closeOnClickAway)
    });
  }
  updatedCallback(attribute, _oldValue, _newValue) {
    if (attribute === "data-state")
      this.handleStateChange();
  }
  disconnectedCallback() {
    this.listeners.dispose();
  }
  handleStateChange() {
    return __async(this, null, function* () {
      if (this.state === "open") {
        i.exec(this, this.dataset.onOpenJs);
        this.modal.addEventListeners(() => {
          this.state = "closed";
        });
        const d3 = new Disposables();
        d3.nextFrame(() => {
          i.removeAttribute(this.panel, "hidden");
          i.setAttribute(this.trigger, "aria-expanded", "true");
          transitionElement(this.panel, "enter");
        });
      } else {
        i.exec(this, this.dataset.onCloseJs);
        this.modal.removeEventListeners();
        yield transitionElement(this.panel, "leave");
        i.setAttribute(this.panel, "hidden", "true");
        i.setAttribute(this.trigger, "aria-expanded", "false");
      }
    });
  }
};
__decorateClass([
  (0, import_decorators3.query)("trigger", { part: true })
], PopoverElement.prototype, "trigger", 2);
__decorateClass([
  (0, import_decorators3.query)("panel", { part: true })
], PopoverElement.prototype, "panel", 2);
__decorateClass([
  (0, import_decorators3.attr)("data-state", { live: true })
], PopoverElement.prototype, "state", 2);
var Popover = () => ({
  init: () => {
    customElements.define("sp-popover", PopoverElement);
  }
});
var popover_default = Popover;

// js/sprout-ui/components/tooltip.ts
var import_decorators4 = __toESM(require_decorators2());
var TooltipElement = class extends n {
  constructor() {
    super(...arguments);
    this.disposables = new Disposables();
    this.listeners = new Disposables();
  }
  static get observedAttributes() {
    return ["data-state"];
  }
  connectedCallback() {
    if (!this.container || !this.trigger)
      throw new Error("Tooltip must have a trigger element and a container element.");
    this.addEventListeners();
  }
  updatedCallback(attribute, _oldValue, _newValue) {
    if (attribute === "data-state")
      this.handleStateChange();
  }
  disconnectedCallback() {
    this.disposables.dispose();
    this.removeEventListeners();
  }
  addEventListeners() {
    this.listeners.addEventListener(this.trigger, "mouseover", () => {
      this.disposables.dispose();
      this.disposables.setTimeout(() => {
        this.state = "open";
      }, this.openDelay);
    });
    this.listeners.addEventListener(this.trigger, "mouseout", () => {
      this.disposables.dispose();
      this.disposables.setTimeout(() => {
        this.state = "closed";
      }, this.closeDelay);
    });
    this.listeners.addEventListener(this.trigger, "focus", () => {
      this.disposables.dispose();
      this.state = "open";
    });
    this.listeners.addEventListener(this.trigger, "blur", () => {
      this.disposables.dispose();
      this.state = "closed";
    });
    this.listeners.addEventListener(this.trigger, "click", () => {
      this.disposables.dispose();
      this.state = "open";
    });
    this.listeners.addEventListener(document, "keydown", (event) => {
      const { key } = event;
      if (this.state === "open" && key === "Escape") {
        this.state = "closed";
        event.stopPropagation();
      }
    });
  }
  removeEventListeners() {
    this.listeners.dispose();
  }
  handleStateChange() {
    return __async(this, null, function* () {
      if (this.state === "open") {
        i.exec(this, this.dataset.onOpenJs);
        i.removeAttribute(this.container, "hidden");
        transitionElement(this.container, "enter");
      } else {
        i.exec(this, this.dataset.onCloseJs);
        yield transitionElement(this.container, "leave");
        i.setAttribute(this.container, "hidden", "true");
      }
    });
  }
};
__decorateClass([
  (0, import_decorators4.query)("trigger", { part: true })
], TooltipElement.prototype, "trigger", 2);
__decorateClass([
  (0, import_decorators4.query)("container", { part: true })
], TooltipElement.prototype, "container", 2);
__decorateClass([
  (0, import_decorators4.attr)("data-state", { live: true })
], TooltipElement.prototype, "state", 2);
__decorateClass([
  (0, import_decorators4.attr)("data-open-delay", { converter: Number })
], TooltipElement.prototype, "openDelay", 2);
__decorateClass([
  (0, import_decorators4.attr)("data-close-delay", { converter: Number })
], TooltipElement.prototype, "closeDelay", 2);
var Tooltip = () => ({
  init: () => {
    customElements.define("sp-tooltip", TooltipElement);
  }
});
var tooltip_default = Tooltip;

// js/sprout-ui/components/switch.ts
var import_decorators5 = __toESM(require_decorators2());
var SwitchElement = class extends n {
  constructor() {
    super(...arguments);
    this.listeners = new Disposables();
  }
  static get observedAttributes() {
    return ["data-state"];
  }
  connectedCallback() {
    if (!this.track || !this.thumb)
      throw new Error("Switch must have a track element and a thumb element.");
    this.addEventListeners();
  }
  updatedCallback(attribute, _oldValue, _newValue) {
    if (attribute === "data-state")
      this.handleStateChange();
  }
  disconnectedCallback() {
    this.listeners.dispose();
  }
  addEventListeners() {
    this.listeners.addEventListener(this, "click", () => {
      this.toggle();
    });
    this.listeners.addEventListener(this, "keydown", (event) => {
      const { key } = event;
      if (key === "Space") {
        event.preventDefault();
        this.toggle();
      }
    });
  }
  toggle() {
    this.state = flipping(this.state, ["checked", "unchecked"]);
    i.setAttribute(
      this.track,
      "aria-checked",
      flipping(this.track.getAttribute("aria-checked") || "false", ["true", "false"])
    );
  }
  handleStateChange() {
    return __async(this, null, function* () {
      if (this.state === "checked") {
        i.exec(this, this.dataset.onCheckedJs);
      } else {
        i.exec(this, this.dataset.onUncheckedJs);
      }
    });
  }
};
__decorateClass([
  (0, import_decorators5.query)("track", { part: true })
], SwitchElement.prototype, "track", 2);
__decorateClass([
  (0, import_decorators5.query)("thumb", { part: true })
], SwitchElement.prototype, "thumb", 2);
__decorateClass([
  (0, import_decorators5.attr)("data-state", { live: true })
], SwitchElement.prototype, "state", 2);
var Switch = () => ({
  init: () => {
    customElements.define("sp-switch", SwitchElement);
  }
});
var switch_default = Switch;

// js/sprout-ui/components/accordion.ts
var import_decorators6 = __toESM(require_decorators2());
var AccordionItem = class {
  constructor(container) {
    this.root = container;
  }
};
__decorateClass([
  (0, import_decorators6.query)("trigger", { customRoot: true, part: true })
], AccordionItem.prototype, "trigger", 2);
__decorateClass([
  (0, import_decorators6.query)("panel", { customRoot: true, part: true })
], AccordionItem.prototype, "panel", 2);
var _AccordionElement = class extends n {
  constructor() {
    super(...arguments);
    this.listeners = new Disposables();
  }
  connectedCallback() {
    this.items = [...this.containers].map((it) => new AccordionItem(it));
    this.addEventListeners();
  }
  disconnectedCallback() {
    this.listeners.dispose();
  }
  addEventListeners() {
    this.items.forEach((item) => {
      this.listeners.addEventListener(item.trigger, "click", () => {
        this.toggle(item);
      });
      this.listeners.addEventListener(item.trigger, "keydown", (event) => {
        const { key } = event;
        if (!_AccordionElement.TRIGGER_KEYS.includes(key))
          return;
        const itemCount = this.items.length;
        const currentIndex = this.items.findIndex((it) => it === item);
        event.preventDefault();
        let nextIndex = 0;
        switch (key) {
          case "Home":
            nextIndex = 0;
            break;
          case "End":
            nextIndex = itemCount - 1;
            break;
          case "ArrowDown":
            nextIndex = currentIndex + 1;
            break;
          case "ArrowUp":
            nextIndex = currentIndex - 1;
            if (nextIndex < 0) {
              nextIndex = itemCount - 1;
            }
            break;
        }
        let cycledIndex = nextIndex % itemCount;
        this.items[cycledIndex].trigger.focus();
      });
    });
  }
  toggle(item) {
    if (item.root.dataset.state === "open") {
      this.close(item);
    } else {
      if (!this.allowMultiple) {
        this.closeAll();
      }
      this.open(item);
    }
  }
  open(item) {
    return __async(this, null, function* () {
      i.exec(item.root, item.root.dataset.onOpenJs);
      i.removeAttribute(item.panel, "hidden");
      const { height } = item.panel.getBoundingClientRect();
      item.panel.style.setProperty("--accordion-panel-height", `${height}px`);
      i.setAttribute(item.root, "data-state", "open");
      i.setAttribute(item.trigger, "aria-expanded", "true");
      yield transitionElement(item.panel, "enter");
    });
  }
  close(item) {
    return __async(this, null, function* () {
      if (item.root.dataset.state === "closed")
        return;
      i.exec(item.root, item.root.dataset.onCloseJs);
      i.setAttribute(item.root, "data-state", "closed");
      i.setAttribute(item.trigger, "aria-expanded", "false");
      yield transitionElement(item.panel, "leave");
      i.setAttribute(item.panel, "hidden", "true");
    });
  }
  closeAll() {
    this.items.forEach((item) => {
      this.close(item);
    });
  }
};
var AccordionElement = _AccordionElement;
AccordionElement.TRIGGER_KEYS = ["Home", "End", "ArrowUp", "ArrowDown"];
__decorateClass([
  (0, import_decorators6.query)("container", { part: true, all: true })
], AccordionElement.prototype, "containers", 2);
__decorateClass([
  (0, import_decorators6.attr)("data-allow-multiple", { converter: isTruthy })
], AccordionElement.prototype, "allowMultiple", 2);
var Accordion = () => ({
  init: () => {
    customElements.define("sp-accordion", AccordionElement);
  },
  handleDomChange: (from, to) => {
    if (from.id.startsWith("accordion") && from.dataset.part === "panel") {
      const property = "--accordion-panel-height";
      to.style.setProperty(property, from.style.getPropertyValue(property));
    }
  }
});
var accordion_default = Accordion;

// js/sprout-ui/index.ts
var createSproutConfig = (opts) => {
  const components = [global_default(), ...opts.components];
  return {
    initComponents: () => {
      components.forEach((comp) => {
        var _a;
        return (_a = comp.init) == null ? void 0 : _a.call(comp);
      });
    },
    hooks: Object.assign({}, ...components.map((comp) => {
      var _a;
      return (_a = comp.hook) == null ? void 0 : _a.call(comp);
    })),
    handleDomChange: (from, to) => {
      components.forEach((comp) => {
        var _a;
        return (_a = comp.handleDomChange) == null ? void 0 : _a.call(comp, from, to);
      });
    }
  };
};
export {
  accordion_default as Accordion,
  dialog_default as Dialog,
  floating_default as Floating,
  popover_default as Popover,
  switch_default as Switch,
  tooltip_default as Tooltip,
  createSproutConfig
};
/*!
* focus-trap 7.1.0
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/
/*!
* tabbable 6.0.1
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
//# sourceMappingURL=sprout-ui.mjs.map
