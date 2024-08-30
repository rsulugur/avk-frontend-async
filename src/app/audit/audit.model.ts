export interface Audit {
    _id: number;
    searchQuery: string;
    suggestedProducts: string[];
    timeTaken: string;
    totalRecords: number;
    createdDate: string; // or Date if you prefer to handle it as a Date object
}
