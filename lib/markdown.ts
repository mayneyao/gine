import markdownIt from 'markdown-it';
import * as mdAnchor from 'markdown-it-anchor';
import * as mdToc from 'markdown-it-table-of-contents';
import highlightjs from 'markdown-it-highlightjs';

const md = markdownIt().use(highlightjs, {
  ignoreIllegals: true,
}).use(mdAnchor.default).use(mdToc, {
  includeLevel: [1, 2, 3, 4],
});


// Remember old renderer, if overridden, or proxy to default renderer
let defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
};

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  // If you are sure other plugins can't add `target` - drop check below
  const aIndex = tokens[idx].attrIndex('target');

  const token = tokens[idx];
  if (aIndex < 0) {
    token.attrPush(['target', '_blank']); // add new attribute
  } else {
    token.attrs![aIndex][1] = '_blank';    // replace value of existing attr
  }

  // pass token to default renderer.
  return defaultRender(tokens, idx, options, env, self);
};
export { md };