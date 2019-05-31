(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.React = factory());
}(this, function () { 'use strict';

  function h(nodeName, attrs) {
      var children = [];
      for (var _i = 2; _i < arguments.length; _i++) {
          children[_i - 2] = arguments[_i];
      }
      return { nodeName: nodeName, attrs: attrs, children: children };
  }

  var renderVNode = function (vnode) {
      if (typeof vnode === 'string') {
          return document.createTextNode(vnode);
      }
      var nodeName = vnode.nodeName, attrs = vnode.attrs, children = vnode.children;
      var el;
      if (typeof nodeName === 'string') {
          el = document.createElement(nodeName);
          for (var key in attrs) {
              el.setAttribute(key, attrs[key]);
          }
      }
      else if (typeof nodeName === 'function') {
          var component = new nodeName(attrs);
          el = renderVNode(component.render(component.props, component.state));
          component.el = el;
      }
      (children || []).forEach(function (child) {
          el.appendChild(renderVNode(child));
      });
      return el;
  };
  var renderComponent = function (component) {
      var newVNode = component.render(component.props, component.state);
      component.el = diff(component.el, newVNode);
  };
  var diff = function (oldDom, newVNode) {
      if (oldDom) {
          if (typeof newVNode === 'string') {
              if (newVNode !== oldDom.nodeValue) {
                  oldDom.nodeValue = newVNode;
              }
              return oldDom;
          }
          if (typeof newVNode.nodeName === 'function') {
              var component = new newVNode.nodeName(newVNode.attrs);
              var newVNode1 = component.render(component.props, component.state);
              diff(oldDom, newVNode1);
              return oldDom;
          }
          if (newVNode.children.length !== oldDom.childNodes.length) {
              oldDom.appendChild(renderVNode(newVNode.children[newVNode.children.length - 1]));
          }
          oldDom.childNodes.forEach(function (child, i) { return diff(child, newVNode.children[i]); });
          return oldDom;
      }
  };

  var Component = /** @class */ (function () {
      function Component(props) {
          this.props = props;
          this.state = {};
      }
      Component.prototype.setState = function (state) {
          if (this.state === state) {
              return;
          }
          this.state = state;
          renderComponent(this);
      };
      return Component;
  }());

  var React = /** @class */ (function () {
      function React() {
          this.Component = Component;
      }
      React.prototype.createElement = function (nodeName, attrs) {
          var children = [];
          for (var _i = 2; _i < arguments.length; _i++) {
              children[_i - 2] = arguments[_i];
          }
          return h.apply(void 0, [nodeName, attrs].concat(children));
      };
      React.prototype.render = function (vnode, parent) {
          var newDom = renderVNode(vnode);
          parent.appendChild(newDom);
      };
      return React;
  }());

  var index = new React();

  return index;

}));
//# sourceMappingURL=simple-react.js.map
