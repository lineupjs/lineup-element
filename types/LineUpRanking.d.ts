import { IBuilderAdapterImposeColumnProps, IBuilderAdapterNestedColumnProps, IBuilderAdapterRankingProps, IBuilderAdapterReduceColumnProps, IBuilderAdapterScriptColumnProps, IBuilderAdapterSupportColumnProps, IBuilderAdapterWeightedSumColumnProps, IImposeColumnBuilder, INestedBuilder, IReduceBuilder, IScriptedBuilder, IWeightedSumBuilder, LocalDataProvider, Ranking } from 'lineupjs';
export declare abstract class ALineUpColumnBuilder extends Polymer.Element {
    abstract build(): (string | IImposeColumnBuilder | INestedBuilder | IWeightedSumBuilder | IReduceBuilder | IScriptedBuilder);
}
export default class LineUpRanking extends Polymer.Element implements IBuilderAdapterRankingProps {
    merge(): IBuilderAdapterRankingProps;
    build(data: LocalDataProvider): Ranking;
    sortBy?: (string | {
        column: string;
        asc: 'asc' | 'desc' | boolean;
    }) | ((string | {
        column: string;
        asc: 'asc' | 'desc' | boolean;
    })[]);
    groupBy?: string[] | string;
    columns?: (string | IImposeColumnBuilder | INestedBuilder | IWeightedSumBuilder | IReduceBuilder | IScriptedBuilder)[];
}
export declare class LineUpColumn extends ALineUpColumnBuilder {
    build(): string;
    column: '*' | string;
}
export declare class LineUpImposeColumn extends ALineUpColumnBuilder implements IBuilderAdapterImposeColumnProps {
    build(): any;
    label?: string;
    column: string;
    categoricalColumn: string;
}
export declare class LineUpNestedColumn extends ALineUpColumnBuilder implements IBuilderAdapterNestedColumnProps {
    build(): INestedBuilder;
    label?: string;
}
export declare class LineUpWeightedColumn extends ALineUpColumnBuilder {
    build(): string;
    column: string;
    weight: number;
}
export declare class LineUpWeightedSumColumn extends ALineUpColumnBuilder implements IBuilderAdapterWeightedSumColumnProps {
    build(): IWeightedSumBuilder;
    label?: string;
}
export declare class LineUpReduceColumn extends ALineUpColumnBuilder implements IBuilderAdapterReduceColumnProps {
    build(): IReduceBuilder;
    type: 'min' | 'max' | 'mean' | 'median';
    label?: string;
}
export declare class LineUpScriptedColumn extends ALineUpColumnBuilder implements IBuilderAdapterScriptColumnProps {
    build(): IScriptedBuilder;
    code: string;
    label?: string;
}
export declare class LineUpSupportColumn extends ALineUpColumnBuilder implements IBuilderAdapterSupportColumnProps {
    build(): string;
    type: 'rank' | 'selection' | 'group' | 'aggregate' | '*';
}
export declare class LineUpAllColumns extends ALineUpColumnBuilder {
    build(): string;
}
