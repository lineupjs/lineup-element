const {customElement, property} = Polymer.decorators;
import {
  builderAdapter,
  EAdvancedSortMethod,
  IBuilderAdapterCategoricalColumnDescProps,
  IBuilderAdapterColumnDescProps,
  IBuilderAdapterDateColumnDescProps,
  IBuilderAdapterHierarchyColumnDescProps,
  IBuilderAdapterNumberColumnDescProps,
  IBuilderAdapterStringColumnDescProps,
  ICategoricalColumnDesc,
  ICategory,
  IColumnDesc,
  IDateColumnDesc,
  IHierarchyColumnDesc,
  INumberColumnDesc,
  IPartialCategoryNode,
  IStringColumnDesc
} from 'lineupjs';

@customElement('lineup-column-desc')
export class LineUpColumnDesc extends Polymer.Element implements IBuilderAdapterColumnDescProps {
  build(_data: any[]): IColumnDesc {
    return builderAdapter.build(this);
  }

  @property({type: String})
  column: string;
  @property({type: Boolean})
  asMap?: boolean;
  @property({type: Object})
  asArray?: string[] | number | boolean;
  @property({type: Object})
  custom?: { [key: string]: any };
}

@customElement('lineup-categorical-desc')
export class LineUpCategoricalColumnDesc extends LineUpColumnDesc implements IBuilderAdapterCategoricalColumnDescProps {
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


@customElement('lineup-date-desc')
export class LineUpDateColumnDesc extends LineUpColumnDesc implements IBuilderAdapterDateColumnDescProps {
  build(): IDateColumnDesc {
    return builderAdapter.buildDate(this);
  }

  @property({type: String})
  dateFormat?: string;
  @property({type: String})
  dateParse?: string;
}


@customElement('lineup-hierarchy-desc')
export class LineUpHierarchyColumnDesc extends LineUpColumnDesc implements IBuilderAdapterHierarchyColumnDescProps {
  build(): IHierarchyColumnDesc {
    return builderAdapter.buildHierarchy(this);
  }

  @property({type: Object})
  hierarchy: IPartialCategoryNode;
  @property({type: String})
  hierarchySeparator?: string;
}

@customElement('lineup-number-desc')
export class LineUpNumberColumn extends LineUpColumnDesc implements IBuilderAdapterNumberColumnDescProps {
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

@customElement('lineup-string-desc')
export class LineUpStringColumnDesc extends LineUpColumnDesc implements IBuilderAdapterStringColumnDescProps {
  build(): IStringColumnDesc {
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
