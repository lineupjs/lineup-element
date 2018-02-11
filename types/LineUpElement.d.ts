import { Column, IBuilderAdapterProps, ICellRendererFactory, IDynamicHeight, IGroupData, IGroupItem, IToolbarAction, LineUp, Taggle, LocalDataProvider, ITaggleOptions, Ranking } from 'lineupjs';
export declare class LineUpElement extends Polymer.Element implements IBuilderAdapterProps {
    data: any[];
    selection: number[] | null;
    highlight: number | null;
    onSelectionChanged(selection: number[]): void;
    onHighlightChanged(highlight: number): void;
    singleSelection?: boolean;
    filterGlobally?: boolean;
    noCriteriaLimits?: boolean;
    maxGroupColumns?: number;
    maxNestedSortingCriteria?: number;
    columnTypes?: {
        [type: string]: typeof Column;
    };
    deriveColumns?: boolean | string[];
    deriveColors?: boolean;
    restore?: any;
    defaultRanking?: boolean | 'noSupportTypes';
    animated?: boolean;
    sidePanel?: boolean;
    sidePanelCollapsed?: boolean;
    defaultSlopeGraphMode?: 'item' | 'band';
    summaryHeader?: boolean;
    expandLineOnHover?: boolean;
    overviewMode?: boolean;
    renderer?: {
        [id: string]: ICellRendererFactory;
    };
    toolbar?: {
        [id: string]: IToolbarAction;
    };
    rowHeight?: number;
    rowPadding?: number;
    groupHeight?: number;
    groupPadding?: number;
    dynamicHeight?: (data: (IGroupItem | IGroupData)[], ranking: Ranking) => (IDynamicHeight | null);
    private _main;
    private readonly _adapter;
    private _changed;
    private _triggerChanged;
    protected createInstance(node: HTMLElement, data: LocalDataProvider, options: Partial<ITaggleOptions>): LineUp | Taggle;
    private _updateImpl();
    ready(): void;
    onChanged(changeRecord: {
        path: keyof IBuilderAdapterProps;
        value: any;
    }): void;
    static readonly template: HTMLTemplateElement;
}
