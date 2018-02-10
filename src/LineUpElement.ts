const { customElement, property, query, observe } = Polymer.decorators;
import {
  builderAdapter,
  Column,
  IBuilderAdapterProps,
  ICellRendererFactory,
  IDynamicHeight,
  IGroupData,
  IGroupItem,
  IToolbarAction,
  LineUp,
  Taggle,
  ILineUpOptions,
  LocalDataProvider,
  ITaggleOptions,
  Ranking,
} from 'lineupjs';
import * as css from 'raw-loader!lineupjs/build/LineUpJS.css';

{
  // see https://github.com/Polymer/polymer/issues/2386
  // font-face are not supported in custom styles need to import globally
  const style = String(css.default);
  const fontFace = style.match(/@font-face[^}]+}/);
  if (fontFace) {
    const s = document.createElement('style');
    s.innerText = fontFace[0];
    document.head.appendChild(s);
  }
}

function debounce(callback: () => void, timeToDelay = 100) {
  let tm = -1;
  return () => {
    if (tm >= 0) {
      clearTimeout(tm);
      tm = -1;
    }
    tm = self.setTimeout(() => {
      tm = -1;
      callback();
    }, timeToDelay);
  };
}


@customElement('lineup-element')
export class LineUpElement extends Polymer.Element implements IBuilderAdapterProps {

  @property({ type: Array })
  data: any[] = [];

  @property({ type: Array })
  selection: number[] | null = null;
  @property({ type: Number })
  highlight: number | null = null;

  onSelectionChanged(selection: number[]) {
    this.dispatchEvent(new CustomEvent('selectionChanged', {detail: {selection}}));
  }
  onHighlightChanged(highlight: number) {
    this.dispatchEvent(new CustomEvent('highlightChanged', {detail: {highlight}}));
  }

  @property({ type: Boolean })
  singleSelection?: boolean;
  @property({ type: Boolean })
  filterGlobally?: boolean;
  @property({ type: Boolean })
  noCriteriaLimits?: boolean;
  @property({ type: Number })
  maxGroupColumns?: number;
  @property({ type: Number })
  maxNestedSortingCriteria?: number;
  columnTypes?: { [type: string]: typeof Column };

  @property({ type: Object })
  deriveColumns?: boolean | string[];
  @property({ type: Boolean })
  deriveColors?: boolean;

  @property({ type: Object })
  restore?: any;
  @property({ type: Object })
  defaultRanking?: boolean | 'noSupportTypes';

  @property({ type: Boolean })
  animated?: boolean;
  @property({ type: Boolean })
  sidePanel?: boolean;
  @property({ type: Boolean })
  sidePanelCollapsed?: boolean;
  @property({ type: String })
  defaultSlopeGraphMode?: 'item' | 'band';
  @property({ type: Boolean })
  summaryHeader?: boolean;
  @property({ type: Boolean })
  expandLineOnHover?: boolean;
  @property({ type: Boolean })
  overviewMode?: boolean;

  @property({ type: Object })
  renderer?: { [id: string]: ICellRendererFactory };
  @property({ type: Object })
  toolbar?: { [id: string]: IToolbarAction };

  @property({ type: Number })
  rowHeight?: number;
  @property({ type: Number })
  rowPadding?: number;

  @property({ type: Number })
  groupHeight?: number;
  @property({ type: Number })
  groupPadding?: number;

  @property({ type: Object })
  dynamicHeight?: (data: (IGroupItem | IGroupData)[], ranking: Ranking) => (IDynamicHeight | null);

  @query('main')
  private _main: HTMLElement;

  private readonly _adapter = new builderAdapter.Adapter({
    props: () => this,
    createInstance: (data: LocalDataProvider, options: Partial<ILineUpOptions>) => this.createInstance(this._main, data, options),
    columnDescs: (_data: any[]) => [], //filterChildrenProps<LineUpColumnDesc, any>(this.props.children, LineUpColumnDesc).map((d) => d.type.build(d.props, data)),
    rankingBuilders: () => [], //filterChildrenProps<LineUpRanking>(this.props.children, LineUpRanking).map((d) => LineUpRanking.merge(d.props))
  });
  private _changed: Partial<IBuilderAdapterProps>= {};

  private _triggerChanged = debounce(() => this._updateImpl(), 50);

  protected createInstance(node: HTMLElement, data: LocalDataProvider, options: Partial<ITaggleOptions>): LineUp|Taggle {
    return new LineUp(node, data, options);
  }

  private _updateImpl() {
    const changed = Object.assign({}, this._changed);
    this._changed = {};
    this._adapter.componentDidUpdate((key: keyof IBuilderAdapterProps) => Boolean(changed[key]));
  }

  ready() {
    super.ready();
    this._adapter.componentDidMount();
  }


  @observe('*')
  onChanged(changeRecord: {path: keyof IBuilderAdapterProps, value: any}) {
    this._changed[changeRecord.path] = true;
    this._triggerChanged();
  }


  static get template() {
    const template = document.createElement('template');
    template.innerHTML = `
    <style>

      ${css.default}


      :host {
        position: relative;
        display: block;
        width: var(--lineup-width, 100%);
        height: var(--lineup-height, 500px);
      }

      .lu {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
      }
    </style>
    <main></main>
    `;
    return template;
  }
}
