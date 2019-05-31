export const renderVNode = vnode => {
  if (typeof vnode === 'string') {
    return document.createTextNode(vnode);
  }
  const { nodeName, attrs, children } = vnode;
  let el;
  if (typeof nodeName === 'string') {
    el = document.createElement(nodeName);
    for (let key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  } else if (typeof nodeName === 'function') {
    const component = new nodeName(attrs);
    el = renderVNode(component.render(component.props, component.state))
    component.el = el;
  }

  (children || []).forEach((child) => {
    el.appendChild(renderVNode(child))
  });
  return el;
}

export const renderComponent = (component) => {
  let newVNode = component.render(component.props, component.state)
  component.el = diff(component.el, newVNode)
}

export const diff = (oldDom, newVNode) => {
  if (oldDom) {
    if (typeof newVNode === 'string') {
      if (newVNode !== oldDom.nodeValue) {
        oldDom.nodeValue = newVNode;
      }
      return oldDom;
    }

    if (typeof newVNode.nodeName === 'function') {
      const component = new newVNode.nodeName(newVNode.attrs);
      const newVNode1 = component.render(component.props, component.state)
      diff(oldDom, newVNode1)
      return oldDom;
    }

    if (newVNode.children.length !== oldDom.childNodes.length) {
      oldDom.appendChild(renderVNode(newVNode.children[newVNode.children.length - 1]))
    }

    oldDom.childNodes.forEach((child, i) => diff(child, newVNode.children[i]))
    return oldDom;

  }
}
