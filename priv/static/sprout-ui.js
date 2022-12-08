"use strict";
var SproutUI = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a3, b4) => {
    for (var prop in b4 || (b4 = {}))
      if (__hasOwnProp.call(b4, prop))
        __defNormalProp(a3, prop, b4[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b4)) {
        if (__propIsEnum.call(b4, prop))
          __defNormalProp(a3, prop, b4[prop]);
      }
    return a3;
  };
  var __spreadProps = (a3, b4) => __defProps(a3, __getOwnPropDescs(b4));
  var __objRest = (source, exclude) => {
    var target = {};
    for (var prop in source)
      if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
        target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(source)) {
        if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
          target[prop] = source[prop];
      }
    return target;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i3 = decorators.length - 1, decorator; i3 >= 0; i3--)
      if (decorator = decorators[i3])
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

  // js/sprout-ui/index.ts
  var sprout_ui_exports = {};
  __export(sprout_ui_exports, {
    Accordion: () => accordion_default,
    Collapsible: () => collapsible_default,
    Dialog: () => dialog_default,
    Floating: () => floating_default,
    Popover: () => popover_default,
    Switch: () => switch_default,
    Toggle: () => toggle_default,
    Tooltip: () => tooltip_default,
    createSproutConfig: () => createSproutConfig
  });

  // node_modules/.pnpm/@tunkshif+live-element@0.1.1/node_modules/@tunkshif/live-element/dist/index.js
  var s = (l3) => class extends l3 {
    connectedCallback() {
    }
    updatedCallback(e2, t2, r3) {
    }
    disconnectedCallback() {
    }
    attributeChangedCallback(e2, t2, r3) {
      t2 === null && r3 !== null || t2 !== r3 && this.updatedCallback(e2, t2, r3);
    }
  };
  var d = s(HTMLElement);
  var u = (l3, e2) => JSON.stringify([[l3, e2]]);
  var b = class {
    static get liveSocket() {
      if (!window.liveSocket)
        throw new Error("LiveSocket not initialized.");
      return window.liveSocket;
    }
    static execute(e2, t2) {
      this.liveSocket.execJS(e2, t2 || "[]");
    }
    static setAttribute(e2, t2, r3, c3 = null) {
      this.execute(e2, u("set_attr", { attr: [t2, r3], to: c3 }));
    }
    static removeAttribute(e2, t2, r3 = null) {
      this.execute(e2, u("remove_attr", { attr: t2, to: r3 }));
    }
  };
  var h = (l3, e2) => (t2, r3) => {
    const c3 = `_${r3}`;
    Reflect.defineProperty(t2, r3, {
      get() {
        if (this[c3] === void 0) {
          const a3 = e2 != null && e2.customRoot ? this.root : this, i3 = e2 != null && e2.part ? `[data-part="${l3}"]` : l3;
          e2 != null && e2.all ? this[c3] = a3.querySelectorAll(i3) : this[c3] = a3.querySelector(i3);
        }
        return this[c3];
      },
      enumerable: true,
      configurable: true
    });
  };
  var n = (l3, e2) => (t2, r3) => {
    Reflect.defineProperty(t2, r3, {
      get() {
        const c3 = this.getAttribute(l3);
        return e2 != null && e2.converter ? e2.converter(c3) : c3;
      },
      set(c3) {
        e2 != null && e2.live ? b.setAttribute(this, l3, c3) : this.setAttribute(l3, c3);
      },
      enumerable: true,
      configurable: true
    });
  };

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
  var sortOrderedTabbables = function sortOrderedTabbables2(a3, b4) {
    return a3.tabIndex === b4.tabIndex ? a3.documentOrder - b4.documentOrder : a3.tabIndex - b4.tabIndex;
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
    for (var i3 = 0; i3 < nodes.length; i3++) {
      if (nodes[i3].checked && nodes[i3].form === form) {
        return nodes[i3];
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
          for (var i3 = 0; i3 < parentNode.children.length; i3++) {
            var child = parentNode.children.item(i3);
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
    candidates.forEach(function(item, i3) {
      var isScope = !!item.scopeParent;
      var element = isScope ? item.scopeParent : item;
      var candidateTabindex = getTabindex(element, isScope);
      var elements = isScope ? sortByOrder2(item.candidates) : element;
      if (candidateTabindex === 0) {
        isScope ? regularTabbables.push.apply(regularTabbables, elements) : regularTabbables.push(element);
      } else {
        orderedTabbables.push({
          documentOrder: i3,
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
    for (var i3 = 1; i3 < arguments.length; i3++) {
      var source = null != arguments[i3] ? arguments[i3] : {};
      i3 % 2 ? ownKeys(Object(source), true).forEach(function(key) {
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
    arr.every(function(value, i3) {
      if (fn(value)) {
        idx = i3;
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
  var nextFrame = (callback) => {
    const raf = requestAnimationFrame(() => requestAnimationFrame(callback));
    return () => cancelAnimationFrame(raf);
  };
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
      return this.add(nextFrame(callback));
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
      this.disposables.splice(0).forEach((d4) => d4());
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
    }).reduce((a3, b4) => a3 + b4, 0);
    const d4 = new Disposables();
    if (totalDuration === 0) {
      onDone("ended");
    } else {
      const listeners = [];
      listeners.push(
        d4.addEventListener(element, "transitionrun", (event) => {
          if (event.target !== event.currentTarget)
            return;
          listeners.splice(0).forEach((d5) => d5());
          listeners.push(
            d4.addEventListener(element, "transitionend", (event2) => {
              if (event2.target !== event2.currentTarget)
                return;
              onDone("ended");
              listeners.splice(0).forEach((d5) => d5());
            }),
            d4.addEventListener(element, "transitioncancel", (event2) => {
              if (event2.target !== event2.currentTarget)
                return;
              onDone("canceled");
              listeners.splice(0).forEach((d5) => d5());
            })
          );
        })
      );
    }
    d4.add(() => onDone("canceled"));
    return d4.dispose;
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
    const d4 = new Disposables();
    d4.nextFrame(() => {
      element.classList.remove(...from);
      element.classList.add(...to);
      _waitForTransition(element, (status) => {
        var _a2;
        if (status === "ended") {
          element.classList.remove(
            ...base,
            ...Array.from(element.classList).filter((c3) => !originalClasses.includes(c3))
          );
          element.classList.add(...ended);
        }
        (_a2 = callbacks.onDone) == null ? void 0 : _a2.call(callbacks, stage, status);
      });
    });
    return d4.dispose;
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
  var DialogElement = class extends d {
    constructor() {
      super(...arguments);
      this.disposables = new Disposables();
      this.listeners = new Disposables();
    }
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
      this.addEventListeners();
    }
    updatedCallback(attribute, _oldValue, _newValue) {
      if (attribute === "data-state")
        this.handleStateChange();
    }
    disconnectedCallback() {
      this.disposables.dispose();
      this.listeners.dispose();
    }
    addEventListeners() {
      this.listeners.addEventListener(this.trigger, "click", () => {
        this.state = "open";
      });
      this.closeButtons.forEach(
        (it) => this.listeners.addEventListener(it, "click", () => {
          this.state = "closed";
        })
      );
    }
    handleStateChange() {
      return __async(this, null, function* () {
        const parts = [this.backdrop, this.panel];
        if (this.state === "open") {
          b.execute(this, this.dataset.onOpenJs);
          this.modal.addEventListeners(() => {
            this.state = "closed";
          });
          this.disposables.nextFrame(() => {
            b.removeAttribute(this.dialog, "hidden");
            this.modal.activate();
            Promise.all(parts.map((part) => transitionElement(part, "enter")));
          });
        } else {
          b.execute(this, this.dataset.onCloseJs);
          this.modal.removeEventListeners();
          this.modal.deactivate();
          yield Promise.all(parts.map((part) => transitionElement(part, "leave")));
          b.setAttribute(this.dialog, "hidden", "true");
        }
      });
    }
  };
  __decorateClass([
    h("trigger", { part: true })
  ], DialogElement.prototype, "trigger", 2);
  __decorateClass([
    h("container", { part: true })
  ], DialogElement.prototype, "dialog", 2);
  __decorateClass([
    h("backdrop", { part: true })
  ], DialogElement.prototype, "backdrop", 2);
  __decorateClass([
    h("panel", { part: true })
  ], DialogElement.prototype, "panel", 2);
  __decorateClass([
    h("close-button", { part: true, all: true })
  ], DialogElement.prototype, "closeButtons", 2);
  __decorateClass([
    n("data-state", { live: true })
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
  function i(i3, o3, a3) {
    let { reference: l3, floating: s4 } = i3;
    const c3 = l3.x + l3.width / 2 - s4.width / 2, f3 = l3.y + l3.height / 2 - s4.height / 2, u4 = n2(o3), m3 = r(u4), g3 = l3[m3] / 2 - s4[m3] / 2, d4 = "x" === u4;
    let p3;
    switch (t(o3)) {
      case "top":
        p3 = { x: c3, y: l3.y - s4.height };
        break;
      case "bottom":
        p3 = { x: c3, y: l3.y + l3.height };
        break;
      case "right":
        p3 = { x: l3.x + l3.width, y: f3 };
        break;
      case "left":
        p3 = { x: l3.x - s4.width, y: f3 };
        break;
      default:
        p3 = { x: l3.x, y: l3.y };
    }
    switch (e(o3)) {
      case "start":
        p3[u4] -= g3 * (a3 && d4 ? -1 : 1);
        break;
      case "end":
        p3[u4] += g3 * (a3 && d4 ? -1 : 1);
    }
    return p3;
  }
  var o = (t2, e2, n4) => __async(void 0, null, function* () {
    const { placement: r3 = "bottom", strategy: o3 = "absolute", middleware: a3 = [], platform: l3 } = n4, s4 = yield null == l3.isRTL ? void 0 : l3.isRTL(e2);
    let c3 = yield l3.getElementRects({ reference: t2, floating: e2, strategy: o3 }), { x: f3, y: u4 } = i(c3, r3, s4), m3 = r3, g3 = {}, d4 = 0;
    for (let n5 = 0; n5 < a3.length; n5++) {
      const { name: p3, fn: h4 } = a3[n5], { x: y3, y: x3, data: w3, reset: v3 } = yield h4({ x: f3, y: u4, initialPlacement: r3, placement: m3, strategy: o3, middlewareData: g3, rects: c3, platform: l3, elements: { reference: t2, floating: e2 } });
      f3 = null != y3 ? y3 : f3, u4 = null != x3 ? x3 : u4, g3 = __spreadProps(__spreadValues({}, g3), { [p3]: __spreadValues(__spreadValues({}, g3[p3]), w3) }), v3 && d4 <= 50 && (d4++, "object" == typeof v3 && (v3.placement && (m3 = v3.placement), v3.rects && (c3 = true === v3.rects ? yield l3.getElementRects({ reference: t2, floating: e2, strategy: o3 }) : v3.rects), { x: f3, y: u4 } = i(c3, m3, s4)), n5 = -1);
    }
    return { x: f3, y: u4, placement: m3, strategy: o3, middlewareData: g3 };
  });
  function a(t2) {
    return "number" != typeof t2 ? function(t3) {
      return __spreadValues({ top: 0, right: 0, bottom: 0, left: 0 }, t3);
    }(t2) : { top: t2, right: t2, bottom: t2, left: t2 };
  }
  function l(t2) {
    return __spreadProps(__spreadValues({}, t2), { top: t2.y, left: t2.x, right: t2.x + t2.width, bottom: t2.y + t2.height });
  }
  function s2(t2, e2) {
    return __async(this, null, function* () {
      var n4;
      void 0 === e2 && (e2 = {});
      const { x: r3, y: i3, platform: o3, rects: s4, elements: c3, strategy: f3 } = t2, { boundary: u4 = "clippingAncestors", rootBoundary: m3 = "viewport", elementContext: g3 = "floating", altBoundary: d4 = false, padding: p3 = 0 } = e2, h4 = a(p3), y3 = c3[d4 ? "floating" === g3 ? "reference" : "floating" : g3], x3 = l(yield o3.getClippingRect({ element: null == (n4 = yield null == o3.isElement ? void 0 : o3.isElement(y3)) || n4 ? y3 : y3.contextElement || (yield null == o3.getDocumentElement ? void 0 : o3.getDocumentElement(c3.floating)), boundary: u4, rootBoundary: m3, strategy: f3 })), w3 = l(o3.convertOffsetParentRelativeRectToViewportRelativeRect ? yield o3.convertOffsetParentRelativeRectToViewportRelativeRect({ rect: "floating" === g3 ? __spreadProps(__spreadValues({}, s4.floating), { x: r3, y: i3 }) : s4.reference, offsetParent: yield null == o3.getOffsetParent ? void 0 : o3.getOffsetParent(c3.floating), strategy: f3 }) : s4[g3]);
      return { top: x3.top - w3.top + h4.top, bottom: w3.bottom - x3.bottom + h4.bottom, left: x3.left - w3.left + h4.left, right: w3.right - x3.right + h4.right };
    });
  }
  var c = Math.min;
  var f = Math.max;
  function u2(t2, e2, n4) {
    return f(t2, c(e2, n4));
  }
  var m = (t2) => ({ name: "arrow", options: t2, fn(i3) {
    return __async(this, null, function* () {
      const { element: o3, padding: l3 = 0 } = null != t2 ? t2 : {}, { x: s4, y: c3, placement: f3, rects: m3, platform: g3 } = i3;
      if (null == o3)
        return {};
      const d4 = a(l3), p3 = { x: s4, y: c3 }, h4 = n2(f3), y3 = e(f3), x3 = r(h4), w3 = yield g3.getDimensions(o3), v3 = "y" === h4 ? "top" : "left", b4 = "y" === h4 ? "bottom" : "right", R2 = m3.reference[x3] + m3.reference[h4] - p3[h4] - m3.floating[x3], A2 = p3[h4] - m3.reference[h4], P2 = yield null == g3.getOffsetParent ? void 0 : g3.getOffsetParent(o3);
      let T3 = P2 ? "y" === h4 ? P2.clientHeight || 0 : P2.clientWidth || 0 : 0;
      0 === T3 && (T3 = m3.floating[x3]);
      const O2 = R2 / 2 - A2 / 2, L3 = d4[v3], D3 = T3 - w3[x3] - d4[b4], k2 = T3 / 2 - w3[x3] / 2 + O2, E3 = u2(L3, k2, D3), C2 = ("start" === y3 ? d4[v3] : d4[b4]) > 0 && k2 !== E3 && m3.reference[x3] <= m3.floating[x3];
      return { [h4]: p3[h4] - (C2 ? k2 < L3 ? L3 - k2 : D3 - k2 : 0), data: { [h4]: E3, centerOffset: k2 - E3 } };
    });
  } });
  var g = { left: "right", right: "left", bottom: "top", top: "bottom" };
  function d2(t2) {
    return t2.replace(/left|right|bottom|top/g, (t3) => g[t3]);
  }
  function p(t2, i3, o3) {
    void 0 === o3 && (o3 = false);
    const a3 = e(t2), l3 = n2(t2), s4 = r(l3);
    let c3 = "x" === l3 ? a3 === (o3 ? "end" : "start") ? "right" : "left" : "start" === a3 ? "bottom" : "top";
    return i3.reference[s4] > i3.floating[s4] && (c3 = d2(c3)), { main: c3, cross: d2(c3) };
  }
  var h2 = { start: "end", end: "start" };
  function y(t2) {
    return t2.replace(/start|end/g, (t3) => h2[t3]);
  }
  var x = ["top", "right", "bottom", "left"];
  var w = x.reduce((t2, e2) => t2.concat(e2, e2 + "-start", e2 + "-end"), []);
  var b2 = function(e2) {
    return void 0 === e2 && (e2 = {}), { name: "flip", options: e2, fn(n4) {
      return __async(this, null, function* () {
        var r3;
        const { placement: i3, middlewareData: o3, rects: a3, initialPlacement: l3, platform: c3, elements: f3 } = n4, _a2 = e2, { mainAxis: u4 = true, crossAxis: m3 = true, fallbackPlacements: g3, fallbackStrategy: h4 = "bestFit", flipAlignment: x3 = true } = _a2, w3 = __objRest(_a2, ["mainAxis", "crossAxis", "fallbackPlacements", "fallbackStrategy", "flipAlignment"]), v3 = t(i3), b4 = g3 || (v3 === l3 || !x3 ? [d2(l3)] : function(t2) {
          const e3 = d2(t2);
          return [y(t2), e3, y(e3)];
        }(l3)), R2 = [l3, ...b4], A2 = yield s2(n4, w3), P2 = [];
        let T3 = (null == (r3 = o3.flip) ? void 0 : r3.overflows) || [];
        if (u4 && P2.push(A2[v3]), m3) {
          const { main: t2, cross: e3 } = p(i3, a3, yield null == c3.isRTL ? void 0 : c3.isRTL(f3.floating));
          P2.push(A2[t2], A2[e3]);
        }
        if (T3 = [...T3, { placement: i3, overflows: P2 }], !P2.every((t2) => t2 <= 0)) {
          var O2, L3;
          const t2 = (null != (O2 = null == (L3 = o3.flip) ? void 0 : L3.index) ? O2 : 0) + 1, e3 = R2[t2];
          if (e3)
            return { data: { index: t2, overflows: T3 }, reset: { placement: e3 } };
          let n5 = "bottom";
          switch (h4) {
            case "bestFit": {
              var D3;
              const t3 = null == (D3 = T3.map((t4) => [t4, t4.overflows.filter((t5) => t5 > 0).reduce((t5, e4) => t5 + e4, 0)]).sort((t4, e4) => t4[1] - e4[1])[0]) ? void 0 : D3[0].placement;
              t3 && (n5 = t3);
              break;
            }
            case "initialPlacement":
              n5 = l3;
          }
          if (i3 !== n5)
            return { reset: { placement: n5 } };
        }
        return {};
      });
    } };
  };
  var T = function(r3) {
    return void 0 === r3 && (r3 = 0), { name: "offset", options: r3, fn(i3) {
      return __async(this, null, function* () {
        const { x: o3, y: a3 } = i3, l3 = yield function(r4, i4) {
          return __async(this, null, function* () {
            const { placement: o4, platform: a4, elements: l4 } = r4, s4 = yield null == a4.isRTL ? void 0 : a4.isRTL(l4.floating), c3 = t(o4), f3 = e(o4), u4 = "x" === n2(o4), m3 = ["left", "top"].includes(c3) ? -1 : 1, g3 = s4 && u4 ? -1 : 1, d4 = "function" == typeof i4 ? i4(r4) : i4;
            let { mainAxis: p3, crossAxis: h4, alignmentAxis: y3 } = "number" == typeof d4 ? { mainAxis: d4, crossAxis: 0, alignmentAxis: null } : __spreadValues({ mainAxis: 0, crossAxis: 0, alignmentAxis: null }, d4);
            return f3 && "number" == typeof y3 && (h4 = "end" === f3 ? -1 * y3 : y3), u4 ? { x: h4 * g3, y: p3 * m3 } : { x: p3 * m3, y: h4 * g3 };
          });
        }(i3, r3);
        return { x: o3 + l3.x, y: a3 + l3.y, data: l3 };
      });
    } };
  };
  function O(t2) {
    return "x" === t2 ? "y" : "x";
  }
  var L = function(e2) {
    return void 0 === e2 && (e2 = {}), { name: "shift", options: e2, fn(r3) {
      return __async(this, null, function* () {
        const { x: i3, y: o3, placement: a3 } = r3, _a2 = e2, { mainAxis: l3 = true, crossAxis: c3 = false, limiter: f3 = { fn: (t2) => {
          let { x: e3, y: n4 } = t2;
          return { x: e3, y: n4 };
        } } } = _a2, m3 = __objRest(_a2, ["mainAxis", "crossAxis", "limiter"]), g3 = { x: i3, y: o3 }, d4 = yield s2(r3, m3), p3 = n2(t(a3)), h4 = O(p3);
        let y3 = g3[p3], x3 = g3[h4];
        if (l3) {
          const t2 = "y" === p3 ? "bottom" : "right";
          y3 = u2(y3 + d4["y" === p3 ? "top" : "left"], y3, y3 - d4[t2]);
        }
        if (c3) {
          const t2 = "y" === h4 ? "bottom" : "right";
          x3 = u2(x3 + d4["y" === h4 ? "top" : "left"], x3, x3 - d4[t2]);
        }
        const w3 = f3.fn(__spreadProps(__spreadValues({}, r3), { [p3]: y3, [h4]: x3 }));
        return __spreadProps(__spreadValues({}, w3), { data: { x: w3.x - i3, y: w3.y - o3 } });
      });
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
  function i2(t2) {
    return o2(t2).getComputedStyle(t2);
  }
  function r2(t2) {
    return n3(t2) ? "" : t2 ? (t2.nodeName || "").toLowerCase() : "";
  }
  function l2() {
    const t2 = navigator.userAgentData;
    return null != t2 && t2.brands ? t2.brands.map((t3) => t3.brand + "/" + t3.version).join(" ") : navigator.userAgent;
  }
  function c2(t2) {
    return t2 instanceof o2(t2).HTMLElement;
  }
  function s3(t2) {
    return t2 instanceof o2(t2).Element;
  }
  function f2(t2) {
    if ("undefined" == typeof ShadowRoot)
      return false;
    return t2 instanceof o2(t2).ShadowRoot || t2 instanceof ShadowRoot;
  }
  function u3(t2) {
    const { overflow: e2, overflowX: n4, overflowY: o3, display: r3 } = i2(t2);
    return /auto|scroll|overlay|hidden/.test(e2 + o3 + n4) && !["inline", "contents"].includes(r3);
  }
  function d3(t2) {
    return ["table", "td", "th"].includes(r2(t2));
  }
  function h3(t2) {
    const e2 = /firefox/i.test(l2()), n4 = i2(t2);
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
    var i3, r3, l3, f3;
    void 0 === e2 && (e2 = false), void 0 === n4 && (n4 = false);
    const u4 = t2.getBoundingClientRect();
    let d4 = 1, h4 = 1;
    e2 && c2(t2) && (d4 = t2.offsetWidth > 0 && w2(u4.width) / t2.offsetWidth || 1, h4 = t2.offsetHeight > 0 && w2(u4.height) / t2.offsetHeight || 1);
    const g3 = s3(t2) ? o2(t2) : window, m3 = !a2() && n4, p3 = (u4.left + (m3 && null != (i3 = null == (r3 = g3.visualViewport) ? void 0 : r3.offsetLeft) ? i3 : 0)) / d4, v3 = (u4.top + (m3 && null != (l3 = null == (f3 = g3.visualViewport) ? void 0 : f3.offsetTop) ? l3 : 0)) / h4, y3 = u4.width / d4, x3 = u4.height / h4;
    return { width: y3, height: x3, top: v3, right: p3 + y3, bottom: v3 + x3, left: p3, x: p3, y: v3 };
  }
  function y2(t2) {
    return (e2 = t2, (e2 instanceof o2(e2).Node ? t2.ownerDocument : t2.document) || window.document).documentElement;
    var e2;
  }
  function x2(t2) {
    return s3(t2) ? { scrollLeft: t2.scrollLeft, scrollTop: t2.scrollTop } : { scrollLeft: t2.pageXOffset, scrollTop: t2.pageYOffset };
  }
  function b3(t2) {
    return v2(y2(t2)).left + x2(t2).scrollLeft;
  }
  function L2(t2, e2, n4) {
    const o3 = c2(e2), i3 = y2(e2), l3 = v2(t2, o3 && function(t3) {
      const e3 = v2(t3);
      return w2(e3.width) !== t3.offsetWidth || w2(e3.height) !== t3.offsetHeight;
    }(e2), "fixed" === n4);
    let s4 = { scrollLeft: 0, scrollTop: 0 };
    const f3 = { x: 0, y: 0 };
    if (o3 || !o3 && "fixed" !== n4)
      if (("body" !== r2(e2) || u3(i3)) && (s4 = x2(e2)), c2(e2)) {
        const t3 = v2(e2, true);
        f3.x = t3.x + e2.clientLeft, f3.y = t3.y + e2.clientTop;
      } else
        i3 && (f3.x = b3(i3));
    return { x: l3.left + s4.scrollLeft - f3.x, y: l3.top + s4.scrollTop - f3.y, width: l3.width, height: l3.height };
  }
  function R(t2) {
    return "html" === r2(t2) ? t2 : t2.assignedSlot || t2.parentNode || (f2(t2) ? t2.host : null) || y2(t2);
  }
  function E2(t2) {
    return c2(t2) && "fixed" !== i2(t2).position ? t2.offsetParent : null;
  }
  function T2(t2) {
    const e2 = o2(t2);
    let n4 = E2(t2);
    for (; n4 && d3(n4) && "static" === i2(n4).position; )
      n4 = E2(n4);
    return n4 && ("html" === r2(n4) || "body" === r2(n4) && "static" === i2(n4).position && !h3(n4)) ? e2 : n4 || function(t3) {
      let e3 = R(t3);
      for (f2(e3) && (e3 = e3.host); c2(e3) && !g2(e3); ) {
        if (h3(e3))
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
    if (c2(t2))
      return { width: t2.offsetWidth, height: t2.offsetHeight };
    const e2 = v2(t2);
    return { width: e2.width, height: e2.height };
  }
  function H(t2) {
    const e2 = R(t2);
    return g2(e2) ? t2.ownerDocument.body : c2(e2) && u3(e2) ? e2 : H(e2);
  }
  function C(t2, e2) {
    var n4;
    void 0 === e2 && (e2 = []);
    const i3 = H(t2), r3 = i3 === (null == (n4 = t2.ownerDocument) ? void 0 : n4.body), l3 = o2(i3), c3 = r3 ? [l3].concat(l3.visualViewport || [], u3(i3) ? i3 : []) : i3, s4 = e2.concat(c3);
    return r3 ? s4 : s4.concat(C(c3));
  }
  function D2(e2, n4, r3) {
    return "viewport" === n4 ? l(function(t2, e3) {
      const n5 = o2(t2), i3 = y2(t2), r4 = n5.visualViewport;
      let l3 = i3.clientWidth, c3 = i3.clientHeight, s4 = 0, f3 = 0;
      if (r4) {
        l3 = r4.width, c3 = r4.height;
        const t3 = a2();
        (t3 || !t3 && "fixed" === e3) && (s4 = r4.offsetLeft, f3 = r4.offsetTop);
      }
      return { width: l3, height: c3, x: s4, y: f3 };
    }(e2, r3)) : s3(n4) ? function(t2, e3) {
      const n5 = v2(t2, false, "fixed" === e3), o3 = n5.top + t2.clientTop, i3 = n5.left + t2.clientLeft;
      return { top: o3, left: i3, x: i3, y: o3, right: i3 + t2.clientWidth, bottom: o3 + t2.clientHeight, width: t2.clientWidth, height: t2.clientHeight };
    }(n4, r3) : l(function(t2) {
      var e3;
      const n5 = y2(t2), o3 = x2(t2), r4 = null == (e3 = t2.ownerDocument) ? void 0 : e3.body, l3 = p2(n5.scrollWidth, n5.clientWidth, r4 ? r4.scrollWidth : 0, r4 ? r4.clientWidth : 0), c3 = p2(n5.scrollHeight, n5.clientHeight, r4 ? r4.scrollHeight : 0, r4 ? r4.clientHeight : 0);
      let s4 = -o3.scrollLeft + b3(t2);
      const f3 = -o3.scrollTop;
      return "rtl" === i2(r4 || n5).direction && (s4 += p2(n5.clientWidth, r4 ? r4.clientWidth : 0) - l3), { width: l3, height: c3, x: s4, y: f3 };
    }(y2(e2)));
  }
  function N(t2) {
    const e2 = C(t2), n4 = function(t3, e3) {
      let n5 = t3;
      for (; n5 && !g2(n5) && !e3.includes(n5) && (!s3(n5) || !["absolute", "fixed"].includes(i2(n5).position)); ) {
        const t4 = R(n5);
        n5 = f2(t4) ? t4.host : t4;
      }
      return n5;
    }(t2, e2);
    let o3 = null;
    if (n4 && c2(n4)) {
      const t3 = T2(n4);
      u3(n4) ? o3 = n4 : c2(t3) && (o3 = t3);
    }
    return s3(o3) ? e2.filter((t3) => o3 && s3(t3) && function(t4, e3) {
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
    let { element: e2, boundary: n4, rootBoundary: o3, strategy: i3 } = t2;
    const r3 = [..."clippingAncestors" === n4 ? N(e2) : [].concat(n4), o3], l3 = r3[0], c3 = r3.reduce((t3, n5) => {
      const o4 = D2(e2, n5, i3);
      return t3.top = p2(o4.top, t3.top), t3.right = m2(o4.right, t3.right), t3.bottom = m2(o4.bottom, t3.bottom), t3.left = p2(o4.left, t3.left), t3;
    }, D2(e2, l3, i3));
    return { width: c3.right - c3.left, height: c3.bottom - c3.top, x: c3.left, y: c3.top };
  }, convertOffsetParentRelativeRectToViewportRelativeRect: function(t2) {
    let { rect: e2, offsetParent: n4, strategy: o3 } = t2;
    const i3 = c2(n4), l3 = y2(n4);
    if (n4 === l3)
      return e2;
    let s4 = { scrollLeft: 0, scrollTop: 0 };
    const f3 = { x: 0, y: 0 };
    if ((i3 || !i3 && "fixed" !== o3) && (("body" !== r2(n4) || u3(l3)) && (s4 = x2(n4)), c2(n4))) {
      const t3 = v2(n4, true);
      f3.x = t3.x + n4.clientLeft, f3.y = t3.y + n4.clientTop;
    }
    return __spreadProps(__spreadValues({}, e2), { x: e2.x - s4.scrollLeft + f3.x, y: e2.y - s4.scrollTop + f3.y });
  }, isElement: s3, getDimensions: W, getOffsetParent: T2, getDocumentElement: y2, getElementRects: (t2) => {
    let { reference: e2, floating: n4, strategy: o3 } = t2;
    return { reference: L2(e2, T2(n4), o3), floating: __spreadProps(__spreadValues({}, W(n4)), { x: 0, y: 0 }) };
  }, getClientRects: (t2) => Array.from(t2.getClientRects()), isRTL: (t2) => "rtl" === i2(t2).direction };
  function z(t2, e2, n4, o3) {
    void 0 === o3 && (o3 = {});
    const { ancestorScroll: i3 = true, ancestorResize: r3 = true, elementResize: l3 = true, animationFrame: c3 = false } = o3, f3 = i3 && !c3, u4 = f3 || r3 ? [...s3(t2) ? C(t2) : t2.contextElement ? C(t2.contextElement) : [], ...C(e2)] : [];
    u4.forEach((t3) => {
      f3 && t3.addEventListener("scroll", n4, { passive: true }), r3 && t3.addEventListener("resize", n4);
    });
    let d4, h4 = null;
    if (l3) {
      let o4 = true;
      h4 = new ResizeObserver(() => {
        o4 || n4(), o4 = false;
      }), s3(t2) && !c3 && h4.observe(t2), s3(t2) || !t2.contextElement || c3 || h4.observe(t2.contextElement), h4.observe(e2);
    }
    let a3 = c3 ? v2(t2) : null;
    return c3 && function e3() {
      const o4 = v2(t2);
      !a3 || o4.x === a3.x && o4.y === a3.y && o4.width === a3.width && o4.height === a3.height || n4();
      a3 = o4, d4 = requestAnimationFrame(e3);
    }(), n4(), () => {
      var t3;
      u4.forEach((t4) => {
        f3 && t4.removeEventListener("scroll", n4), r3 && t4.removeEventListener("resize", n4);
      }), null == (t3 = h4) || t3.disconnect(), h4 = null, c3 && cancelAnimationFrame(d4);
    };
  }
  var A = (t2, n4, o3) => o(t2, n4, __spreadValues({ platform: S }, o3));

  // js/sprout-ui/components/floating.ts
  var FloatingElement = class extends s(HTMLDivElement) {
    static get observedAttributes() {
      return ["data-placement"];
    }
    connectedCallback() {
      const anchor = document.querySelector(this.dataset.anchor);
      if (!anchor)
        throw new Error("Floating element must have an anchor element");
      this.anchor = anchor;
      this.middleware = this.buildMiddleware();
      this.start();
    }
    updatedCallback(_attribute, _oldValue, _newValue) {
      this.update();
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
        middleware.push(b2());
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
    h("arrow", { part: true })
  ], FloatingElement.prototype, "arrow", 2);
  __decorateClass([
    n("data-placement")
  ], FloatingElement.prototype, "placement", 2);
  __decorateClass([
    n("data-offset", { converter: Number })
  ], FloatingElement.prototype, "offset", 2);
  __decorateClass([
    n("data-shift", { converter: isTruthy })
  ], FloatingElement.prototype, "shift", 2);
  __decorateClass([
    n("data-flip", { converter: isTruthy })
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
  var PopoverElement = class extends d {
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
      this.modal = new Modal(this.panel, {
        preventScroll: false,
        dismissOnEsc: isTruthy(this.dataset.closeOnEsc),
        dismissOnClickAway: isTruthy(this.dataset.closeOnClickAway)
      });
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
      this.listeners.addEventListener(this.trigger, "click", () => {
        this.state = flipping(this.state);
      });
      this.closeButtons.forEach(
        (it) => this.listeners.addEventListener(it, "click", () => {
          this.state = "closed";
        })
      );
    }
    handleStateChange() {
      return __async(this, null, function* () {
        if (this.state === "open") {
          b.execute(this, this.dataset.onOpenJs);
          this.modal.addEventListeners(() => {
            this.state = "closed";
          });
          nextFrame(() => {
            b.removeAttribute(this.panel, "hidden");
            b.setAttribute(this.trigger, "aria-expanded", "true");
            transitionElement(this.panel, "enter");
          });
        } else {
          b.execute(this, this.dataset.onCloseJs);
          this.modal.removeEventListeners();
          yield transitionElement(this.panel, "leave");
          b.setAttribute(this.panel, "hidden", "true");
          b.setAttribute(this.trigger, "aria-expanded", "false");
        }
      });
    }
  };
  __decorateClass([
    h("trigger", { part: true })
  ], PopoverElement.prototype, "trigger", 2);
  __decorateClass([
    h("panel", { part: true })
  ], PopoverElement.prototype, "panel", 2);
  __decorateClass([
    h("close-button", { part: true, all: true })
  ], PopoverElement.prototype, "closeButtons", 2);
  __decorateClass([
    n("data-state", { live: true })
  ], PopoverElement.prototype, "state", 2);
  var Popover = () => ({
    init: () => {
      customElements.define("sp-popover", PopoverElement);
    }
  });
  var popover_default = Popover;

  // js/sprout-ui/components/tooltip.ts
  var TooltipElement = class extends d {
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
      this.listeners.dispose();
    }
    addEventListeners() {
      this.listeners.addEventListener(this.trigger, "mouseover", () => {
        this.disposables.setTimeout(() => {
          this.state = "open";
        }, this.openDelay);
      });
      this.listeners.addEventListener(this.trigger, "mouseout", () => {
        this.disposables.setTimeout(() => {
          this.state = "closed";
        }, this.closeDelay);
      });
      this.listeners.addEventListener(this.trigger, "focus", () => {
        this.state = "open";
      });
      this.listeners.addEventListener(this.trigger, "blur", () => {
        this.state = "closed";
      });
      this.listeners.addEventListener(this.trigger, "click", () => {
        this.state = "open";
      });
    }
    handleStateChange() {
      return __async(this, null, function* () {
        if (this.state === "open") {
          b.execute(this, this.dataset.onOpenJs);
          this.disposables.dispose();
          this.disposables.addEventListener(document, "keydown", (event) => {
            const { key } = event;
            if (this.state === "open" && key === "Escape") {
              this.state = "closed";
              event.preventDefault();
            }
          });
          b.removeAttribute(this.container, "hidden");
          transitionElement(this.container, "enter");
        } else {
          b.execute(this, this.dataset.onCloseJs);
          this.disposables.dispose();
          yield transitionElement(this.container, "leave");
          b.setAttribute(this.container, "hidden", "true");
        }
      });
    }
  };
  __decorateClass([
    h("trigger", { part: true })
  ], TooltipElement.prototype, "trigger", 2);
  __decorateClass([
    h("container", { part: true })
  ], TooltipElement.prototype, "container", 2);
  __decorateClass([
    n("data-state", { live: true })
  ], TooltipElement.prototype, "state", 2);
  __decorateClass([
    n("data-open-delay", { converter: Number })
  ], TooltipElement.prototype, "openDelay", 2);
  __decorateClass([
    n("data-close-delay", { converter: Number })
  ], TooltipElement.prototype, "closeDelay", 2);
  var Tooltip = () => ({
    init: () => {
      customElements.define("sp-tooltip", TooltipElement);
    }
  });
  var tooltip_default = Tooltip;

  // js/sprout-ui/components/switch.ts
  var SwitchElement = class extends d {
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
    }
    toggle() {
      this.state = flipping(this.state, ["checked", "unchecked"]);
      b.setAttribute(
        this.track,
        "aria-checked",
        flipping(this.track.getAttribute("aria-checked") || "false", ["true", "false"])
      );
    }
    handleStateChange() {
      return __async(this, null, function* () {
        if (this.state === "checked") {
          b.execute(this, this.dataset.onCheckedJs);
        } else {
          b.execute(this, this.dataset.onUncheckedJs);
        }
      });
    }
  };
  __decorateClass([
    h("track", { part: true })
  ], SwitchElement.prototype, "track", 2);
  __decorateClass([
    h("thumb", { part: true })
  ], SwitchElement.prototype, "thumb", 2);
  __decorateClass([
    n("data-state", { live: true })
  ], SwitchElement.prototype, "state", 2);
  var Switch = () => ({
    init: () => {
      customElements.define("sp-switch", SwitchElement);
    }
  });
  var switch_default = Switch;

  // js/sprout-ui/components/toggle.ts
  var ToggleElement = class extends s(HTMLButtonElement) {
    constructor() {
      super(...arguments);
      this.listeners = new Disposables();
    }
    static get observedAttributes() {
      return ["data-state"];
    }
    connectedCallback() {
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
        this.state = flipping(this.state, ["on", "off"]);
      });
    }
    handleStateChange() {
      if (this.state === "on") {
        b.execute(this, this.dataset.onToggleOnJs);
      } else {
        b.execute(this, this.dataset.onToggleOffJs);
      }
    }
  };
  __decorateClass([
    n("data-state", { live: true })
  ], ToggleElement.prototype, "state", 2);
  var Toggle = () => ({
    init: () => {
      customElements.define("sp-toggle", ToggleElement, { extends: "button" });
    }
  });
  var toggle_default = Toggle;

  // js/sprout-ui/internal/animation.ts
  var waitForAnimation = (element) => Promise.all(
    element.getAnimations().map(
      (animation) => new Promise((resolve) => {
        animation.addEventListener("cancel", () => resolve("cancelled"), { once: true });
        animation.addEventListener("finish", () => resolve("finished"), { once: true });
      })
    )
  );
  var stopAnimations = (element) => Promise.all(
    element.getAnimations().map(
      (animation) => new Promise((resolve) => {
        const handleAnimationEvent = requestAnimationFrame(resolve);
        animation.addEventListener("cancel", () => handleAnimationEvent, { once: true });
        animation.addEventListener("finish", () => handleAnimationEvent, { once: true });
        animation.cancel();
      })
    )
  );

  // js/sprout-ui/components/collapsible.ts
  var CollapsibleElement = class extends s(HTMLDivElement) {
    constructor() {
      super(...arguments);
      this.listeners = new Disposables();
    }
    static get observedAttributes() {
      return ["data-state"];
    }
    connectedCallback() {
      if (!this.trigger || !this.panel)
        throw new Error("Collapsible must have a trigger element and a panel element.");
      if (!this.controlled)
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
      this.listeners.addEventListener(this.trigger, "click", () => {
        this.state = flipping(this.state);
      });
    }
    handleStateChange() {
      return __async(this, null, function* () {
        if (this.state === "open") {
          b.execute(this, this.dataset.onOpenJs);
          yield stopAnimations(this.panel);
          b.removeAttribute(this.panel, "hidden");
          b.setAttribute(this.trigger, "aria-expanded", "true");
          const animationName = getComputedStyle(this.panel).animationName;
          this.panel.style.animationName = "none";
          const { height } = this.panel.getBoundingClientRect();
          this.panel.style.setProperty("--panel-height", `${height}px`);
          this.panel.style.animationName = animationName;
          yield waitForAnimation(this.panel);
          this.panel.style.animation = "";
        } else {
          b.execute(this, this.dataset.onCloseJs);
          yield waitForAnimation(this.panel);
          b.setAttribute(this.panel, "hidden", "true");
          b.setAttribute(this.trigger, "aria-expanded", "false");
        }
      });
    }
  };
  __decorateClass([
    h("trigger", { part: true })
  ], CollapsibleElement.prototype, "trigger", 2);
  __decorateClass([
    h("panel", { part: true })
  ], CollapsibleElement.prototype, "panel", 2);
  __decorateClass([
    n("data-state", { live: true })
  ], CollapsibleElement.prototype, "state", 2);
  __decorateClass([
    n("data-controlled", { live: true, converter: isTruthy })
  ], CollapsibleElement.prototype, "controlled", 2);
  var Collapsible = () => ({
    init: () => {
      customElements.define("sp-collapsible", CollapsibleElement, { extends: "div" });
    },
    handleDomChange: (from, to) => {
      if (from.id.startsWith("collapsible-panel") || from.id.startsWith("accordion-item-panel")) {
        const property = "--panel-height";
        to.style.setProperty(property, from.style.getPropertyValue(property));
      }
    }
  });
  var collapsible_default = Collapsible;

  // js/sprout-ui/components/accordion.ts
  var _AccordionElement = class extends d {
    constructor() {
      super(...arguments);
      this.listeners = new Disposables();
    }
    connectedCallback() {
      this.addEventListeners();
    }
    disconnectedCallback() {
      this.listeners.dispose();
    }
    addEventListeners() {
      this.items.forEach((item) => {
        this.listeners.addEventListener(item.trigger, "click", () => {
          if (item.state === "open") {
            item.state = "closed";
          } else {
            if (!this.allowMultiple)
              this.closeAll();
            item.state = "open";
          }
        });
        this.listeners.addEventListener(item.trigger, "keydown", (event) => {
          const { key } = event;
          if (!_AccordionElement.TRIGGER_KEYS.includes(key))
            return;
          const items = [...this.items];
          const itemCount = items.length;
          const currentIndex = items.findIndex((it) => it === item);
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
          const cycledIndex = nextIndex % itemCount;
          items[cycledIndex].trigger.focus();
        });
      });
    }
    closeAll() {
      this.items.forEach((item) => {
        item.state = "closed";
      });
    }
  };
  var AccordionElement = _AccordionElement;
  AccordionElement.TRIGGER_KEYS = ["Home", "End", "ArrowUp", "ArrowDown"];
  __decorateClass([
    h("container", { part: true, all: true })
  ], AccordionElement.prototype, "items", 2);
  __decorateClass([
    n("data-allow-multiple", { converter: isTruthy })
  ], AccordionElement.prototype, "allowMultiple", 2);
  var Accordion = () => ({
    init: () => {
      customElements.define("sp-accordion", AccordionElement);
    }
  });
  var accordion_default = Accordion;

  // js/sprout-ui/index.ts
  var createSproutConfig = (opts) => {
    const components = opts.components;
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
  return __toCommonJS(sprout_ui_exports);
})();
/*!
* focus-trap 7.1.0
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/
/*!
* tabbable 6.0.1
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
