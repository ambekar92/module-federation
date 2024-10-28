export type SearchItem = {
    [key: string]: string[];
}

export type Props = {
    searchEntity: 'naics' | 'agency';
    searchButtonText?: string;
    data: SearchItem;
    width?: string;
    selectedItems?: number[];
    cb: (selectedItems: number[]) => void;
}