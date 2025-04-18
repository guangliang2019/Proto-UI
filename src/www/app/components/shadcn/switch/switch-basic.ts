import { Div, h } from '@/www/utils/dom';
import { DocCode, HighlightRule } from '@/www/components/doc-component';
import '@/components/shadcn';
import { HIGHLIGHT_RULE } from '@/www/utils/regex';

export default class ShadcnSwitchBasic extends DocCode {
  protected _code = '<shadcn-switch></shadcn-switch>';
  protected _highlightRules: HighlightRule[] = [
    HIGHLIGHT_RULE.shadcnTagName,
  ];

  protected _preview = () => {
    return Div({}, [h('shadcn-switch')]);
  };
}

customElements.define('shadcn-switch-basic', ShadcnSwitchBasic);
