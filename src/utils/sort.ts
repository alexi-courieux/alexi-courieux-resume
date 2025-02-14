export const dateSortAsc = (a: string, b: string) => {
    return new Date(a).getTime() - new Date(b).getTime();
};

export const dateSortDesc = (a: string, b: string) => {
    return new Date(b).getTime() - new Date(a).getTime();
};

export const stringSortAsc = (a: string, b: string) => {
    return a.localeCompare(b);
};

export const stringSortDesc = (a: string, b: string) => {
    return b.localeCompare(a);
};

export const numberSortAsc = (a: number, b: number) => {
    return a - b;
};

export const numberSortDesc = (a: number, b: number) => {
    return b - a;
};