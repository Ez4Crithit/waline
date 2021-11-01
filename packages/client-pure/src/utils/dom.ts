const style = `{--wl-white:#000;--wl-light-grey:#666;--wl-dark-grey:#999;--wl-color:#888;--wl-bgcolor:#1e1e1e;--wl-bgcolor-light:#272727;--wl-bgcolor-hover: #444;--wl-border-color:#333;--wl-disable-bgcolor:#444;--wl-disable-color:#272727;--wl-bq-color:#272727;--wl-info-bgcolor:#272727;--wl-info-color:#666}`;

export const h = (
  tag: string,
  attrs: Record<string, string>,
  children?: HTMLElement[]
): HTMLElement => {
  const node = document.createElement(tag);
  attrs &&
    Object.keys(attrs).forEach((key) => {
      if (!key.indexOf('data')) {
        const k = key.replace('data', '');
        node.dataset[k] = attrs[key];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      } else node[key] = attrs[key];
    });

  if (children)
    children.forEach((child) => {
      node.appendChild(child);
    });

  return node;
};

const injectStyle = (content: string, attr: string): void => {
  if (!document.body.hasAttribute(attr)) {
    const style = document.createElement('style');

    style.appendChild(document.createTextNode(content));
    document.head.appendChild(style);
    document.body.setAttribute(attr, '');
  }
};

export const injectDarkStyle = (selector?: string | boolean): void => {
  if (typeof selector === 'string') {
    injectStyle(
      selector === 'auto'
        ? `@media(prefers-color-scheme:dark){body${style}}`
        : `${selector}${style}`,
      'waline-dark'
    );
  }
};
