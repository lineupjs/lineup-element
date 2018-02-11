import { EAdvancedSortMethod, IBuilderAdapterCategoricalColumnDescProps, IBuilderAdapterColumnDescProps, IBuilderAdapterDateColumnDescProps, IBuilderAdapterHierarchyColumnDescProps, IBuilderAdapterNumberColumnDescProps, IBuilderAdapterStringColumnDescProps, ICategoricalColumnDesc, ICategory, IColumnDesc, IDateColumnDesc, IHierarchyColumnDesc, INumberColumnDesc, IPartialCategoryNode, IStringColumnDesc } from 'lineupjs';
export declare class LineUpColumnDesc extends Polymer.Element implements IBuilderAdapterColumnDescProps {
    build(_data: any[]): IColumnDesc;
    column: string;
    asMap?: boolean;
    asArray?: string[] | number | boolean;
    custom?: {
        [key: string]: any;
    };
}
export declare class LineUpCategoricalColumnDesc extends LineUpColumnDesc implements IBuilderAdapterCategoricalColumnDescProps {
    static readonly is: string;
    build(data: any[]): ICategoricalColumnDesc;
    asOrdinal?: boolean;
    categories?: (string | Partial<ICategory>)[];
    missingCategory?: (string | Partial<ICategory>);
    asSet?: boolean | string;
}
export declare class LineUpDateColumnDesc extends LineUpColumnDesc implements IBuilderAdapterDateColumnDescProps {
    static readonly is: string;
    build(): IDateColumnDesc;
    dateFormat?: string;
    dateParse?: string;
}
export declare class LineUpHierarchyColumnDesc extends LineUpColumnDesc implements IBuilderAdapterHierarchyColumnDescProps {
    static readonly is: string;
    build(): IHierarchyColumnDesc;
    hierarchy: IPartialCategoryNode;
    hierarchySeparator?: string;
}
export declare class LineUpNumberColumn extends LineUpColumnDesc implements IBuilderAdapterNumberColumnDescProps {
    static readonly is: string;
    build(data: any[]): INumberColumnDesc;
    domain?: [number, number];
    range?: [number, number];
    mapping?: 'linear' | 'sqrt' | 'pow1.1' | 'pow2' | 'pow3';
    scripted?: string;
    sort?: EAdvancedSortMethod;
}
export declare class LineUpStringColumnDesc extends LineUpColumnDesc implements IBuilderAdapterStringColumnDescProps {
    static readonly is: string;
    build(): IStringColumnDesc;
    editable?: boolean;
    html?: boolean;
    pattern?: string;
    patternTemplates?: string[];
}
