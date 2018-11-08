import {PolymerElement} from '@polymer/polymer';
import {customElement, property} from '@polymer/decorators';
import {
  builderAdapter,
  EAdvancedSortMethod,
  IBuilderAdapterCategoricalColumnDescProps,
  IBuilderAdapterColumnDescProps,
  IBuilderAdapterDateColumnDescProps,
  IBuilderAdapterHierarchyColumnDescProps,
  IBuilderAdapterNumberColumnDescProps,
  IBuilderAdapterStringColumnDescProps,
  IBuilderAdapterActionsColumnDescProps,
  ICategoricalColumnDesc,
  ICategory,
  IColumnDesc,
  IDateColumnDesc,
  IHierarchyColumnDesc,
  INumberColumnDesc,
  IPartialCategoryNode,
  IActionColumnDesc,
  IAction,
  IGroupAction,
  ILinkColumnDesc
} from 'lineupjs';

@customElement('lineup-column-desc')
export class LineUpColumnDesc extends PolymerElement implements IBuilderAdapterColumnDescProps {
  build(_data: any[]): IColumnDesc {
    return builderAdapter.build(this);
  }

  @property({type: String})
  column: string = '';
  @property({type: Boolean})
  asMap?: boolean;
  @property({type: Object})
  asArray?: string[] | number | boolean;
  @property({type: Object})
  custom?: {[key: string]: any};

  /**
   * label of the column
   */
  @property({type: String})
  label?: string;
  /**
   * the column type
   */
  @property({type: String})
  type?: string;

  /**
   * column description
   */
  @property({type: String})
  description?: string;

  /**
   * color of this column
   */
  @property({type: String})
  color?: string;

  /**
   * frozen column
   * @default isSupportType
   */
  @property({type: Boolean})
  frozen?: boolean;

  /**
   * whether the column can be removed or not
   * @default false
   */
  @property({type: Boolean})
  fixed?: boolean;

  /**
   * default renderer to use
   */
  @property({type: String})
  renderer?: string;

  /**
   * default group renderer to use
   */
  @property({type: String})
  groupRenderer?: string;

  /**
   * default summary renderer to use
   */
  @property({type: String})
  summaryRenderer?: string;

  /**
   * initial width of the column
   * @default 100 or 200 for strings
   */
  @property({type: Number})
  width?: number;

  /**
   * is this column visible by default
   * @default true
   */
  @property({type: Boolean})
  visible = true;
}

export class LineUpCategoricalColumnDesc extends LineUpColumnDesc implements IBuilderAdapterCategoricalColumnDescProps {
  static readonly is = 'lineup-categorical-desc';

  build(data: any[]): ICategoricalColumnDesc {
    return builderAdapter.buildCategorical(this, data);
  }

  @property({type: Boolean})
  asOrdinal?: boolean;
  @property({type: Array})
  categories?: (string | Partial<ICategory>)[];
  @property({type: Object})
  missingCategory?: (string | Partial<ICategory>);
  @property({type: Object})
  asSet?: boolean | string;
}

window.customElements.define(LineUpCategoricalColumnDesc.is, LineUpCategoricalColumnDesc);


export class LineUpDateColumnDesc extends LineUpColumnDesc implements IBuilderAdapterDateColumnDescProps {
  static readonly is = 'lineup-date-desc';

  build(): IDateColumnDesc {
    return builderAdapter.buildDate(this);
  }

  @property({type: String})
  dateFormat?: string;
  @property({type: String})
  dateParse?: string;
}

window.customElements.define(LineUpDateColumnDesc.is, LineUpDateColumnDesc);


export class LineUpHierarchyColumnDesc extends LineUpColumnDesc implements IBuilderAdapterHierarchyColumnDescProps {
  static readonly is = 'lineup-hierarchy-desc';

  build(): IHierarchyColumnDesc {
    return builderAdapter.buildHierarchy(this);
  }

  @property({type: Object})
  hierarchy: IPartialCategoryNode = {
    name: '',
    children: []
  };

  @property({type: String})
  hierarchySeparator?: string;
}

window.customElements.define(LineUpHierarchyColumnDesc.is, LineUpHierarchyColumnDesc);

export class LineUpNumberColumn extends LineUpColumnDesc implements IBuilderAdapterNumberColumnDescProps {
  static readonly is = 'lineup-number-desc';

  build(data: any[]): INumberColumnDesc {
    return builderAdapter.buildNumber(this, data);
  }

  @property({type: Array})
  domain?: [number, number];
  @property({type: Array})
  range?: [number, number];
  @property({type: String})
  mapping?: 'linear' | 'sqrt' | 'pow1.1' | 'pow2' | 'pow3';
  @property({type: String})
  scripted?: string;
  @property({type: String})
  sort?: EAdvancedSortMethod;
}

window.customElements.define(LineUpNumberColumn.is, LineUpNumberColumn);

export class LineUpStringColumnDesc extends LineUpColumnDesc implements IBuilderAdapterStringColumnDescProps {
  static readonly is = 'lineup-string-desc';

  build(): ILinkColumnDesc {
    return builderAdapter.buildString(this);
  }

  @property({type: Boolean})
  editable?: boolean;
  @property({type: Boolean})
  html?: boolean;
  @property({type: String})
  pattern?: string;
  @property({type: Array})
  patternTemplates?: string[];
}

window.customElements.define(LineUpStringColumnDesc.is, LineUpStringColumnDesc);


export class LineUpActionsColumnDesc extends LineUpColumnDesc implements IBuilderAdapterActionsColumnDescProps {
  static readonly is = 'lineup-actions-desc';

  build(): IActionColumnDesc {
    return builderAdapter.buildActions(this);
  }

  @property({type: Array})
  actions?: IAction[];
  @property({type: Array})
  groupActions?: IGroupAction[];
}

window.customElements.define(LineUpActionsColumnDesc.is, LineUpActionsColumnDesc);
