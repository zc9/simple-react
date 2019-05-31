import h from './h';
import Component from './component';
import { diff, renderVNode } from './v-dom'
export default class React {
  createElement (nodeName, attrs, ...children) {
    return h(nodeName, attrs, ...children)
  }
  render(vnode, parent) {
    const newDom = renderVNode(vnode)
    parent.appendChild(newDom)
  }
  Component = Component;

}
