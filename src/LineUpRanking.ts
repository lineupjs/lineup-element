import {PolymerElement} from '@polymer/polymer';
import {customElement, property} from '@polymer/decorators';
import {
  builderAdapter,
  IBuilderAdapterImposeColumnProps,
  IBuilderAdapterNestedColumnProps,
  IBuilderAdapterRankingProps,
  IBuilderAdapterReduceColumnProps,
  IBuilderAdapterScriptColumnProps,
  IBuilderAdapterSupportColumnProps,
  IBuilderAdapterWeightedSumColumnProps,
  IImposeColumnBuilder,
  INestedBuilder,
  IReduceBuilder,
  IScriptedBuilder,
  IWeightedSumBuilder,
  LocalDataProvider,
  Ranking
} from 'lineupjs';

export abstract class ALineUpColumnBuilder extends PolymerElement {
  abstract build(): (string | IImposeColumnBuilder | INestedBuilder | IWeightedSumBuilder | IReduceBuilder | IScriptedBuilder);
}


@customElement('lineup-ranking')
export default class LineUpRanking extends PolymerElement implements IBuilderAdapterRankingProps {
  merge() {
    const inline = Array.from(this.children).filter((d) => d instanceof ALineUpColumnBuilder).map((d) => (<ALineUpColumnBuilder>d).build());

    const columns = (this.columns || []).concat(inline);

    const r: IBuilderAdapterRankingProps = {columns};
    if (this.sortBy) {
      r.sortBy = this.sortBy;
    }
    if (this.groupBy) {
      r.groupBy = this.groupBy;
    }
    return r;
  }

  /*
   * build the column description
   */
  build(data: LocalDataProvider): Ranking {
    return builderAdapter.buildRanking(this, data);
  }

  @property({type: Object})
  sortBy?: (string | {column: string, asc: 'asc' | 'desc' | boolean}) | ((string | {column: string, asc: 'asc' | 'desc' | boolean})[]);
  @property({type: Object})
  groupBy?: string[] | string;
  @property({type: Array})
  columns?: (string | IImposeColumnBuilder | INestedBuilder | IWeightedSumBuilder | IReduceBuilder | IScriptedBuilder)[];
}


@customElement('lineup-column')
export class LineUpColumn extends ALineUpColumnBuilder {
  build() {
    return builderAdapter.buildGeneric(this);
  }

  @property({type: String})
  column: '*' | string = '*';
}


@customElement('lineup-impose-column')
export class LineUpImposeColumn extends ALineUpColumnBuilder implements IBuilderAdapterImposeColumnProps {
  build() {
    return builderAdapter.buildImposeRanking(this);
  }

  @property({type: String})
  label?: string;
  @property({type: String})
  column: string = '';
  @property({type: String})
  categoricalColumn: string = '';
}

@customElement('lineup-nested-column')
export class LineUpNestedColumn extends ALineUpColumnBuilder implements IBuilderAdapterNestedColumnProps {
  build(): INestedBuilder {
    const children = <LineUpColumn[]>Array.from(this.children).filter((d) => d instanceof LineUpColumn);
    return builderAdapter.buildNestedRanking(this, children.map((d) => d.build()));
  }

  @property({type: String})
  label?: string;
}

@customElement('lineup-weighted-column')
export class LineUpWeightedColumn extends ALineUpColumnBuilder {
  build() {
    return this.column;
  }

  @property({type: String})
  column: string = '';
  @property({type: String})
  weight: number = 1;
}

@customElement('lineup-weighted-sum-column')
export class LineUpWeightedSumColumn extends ALineUpColumnBuilder implements IBuilderAdapterWeightedSumColumnProps {
  build(): IWeightedSumBuilder {
    const children = <LineUpWeightedColumn[]>Array.from(this.children).filter((d) => d instanceof LineUpWeightedColumn);
    return builderAdapter.buildWeightedSumRanking(this, children.map((d) => ({
      weight: d.weight,
      column: d.build()
    })));
  }

  @property({type: String})
  label?: string;
}

@customElement('lineup-reduce-column')
export class LineUpReduceColumn extends ALineUpColumnBuilder implements IBuilderAdapterReduceColumnProps {
  build(): IReduceBuilder {
    const children = <LineUpColumn[]>Array.from(this.children).filter((d) => d instanceof LineUpColumn);
    return builderAdapter.buildReduceRanking(this, children.map((d) => d.build()));
  }

  @property({type: String})
  type: 'min' | 'max' | 'mean' | 'median' = 'max';
  @property({type: String})
  label?: string;
}


@customElement('lineup-scripted-column')
export class LineUpScriptedColumn extends ALineUpColumnBuilder implements IBuilderAdapterScriptColumnProps {
  build(): IScriptedBuilder {
    const children = <LineUpColumn[]>Array.from(this.children).filter((d) => d instanceof LineUpColumn);
    return builderAdapter.buildScriptRanking(this, children.map((d) => d.build()));
  }

  @property({type: String})
  code: string = '';
  @property({type: String})
  label?: string;
}

@customElement('lineup-support-column')
export class LineUpSupportColumn extends ALineUpColumnBuilder implements IBuilderAdapterSupportColumnProps {
  build() {
    return builderAdapter.buildSupportRanking(this);
  }

  @property({type: String})
  type: 'rank' | 'selection' | 'group' | 'aggregate' | '*' = '*';
}

@customElement('lineup-all-columns')
export class LineUpAllColumns extends ALineUpColumnBuilder {
  build() {
    return builderAdapter.buildAllColumnsRanking();
  }
}
