export const dateSort = (a: string, b: string, desc: boolean) => {
    return desc ? new Date(b).getTime() - new Date(a).getTime() : new Date(a).getTime() - new Date(b).getTime();
};

export const stringSort = (a: string, b: string, desc = false) => {
    return desc ? b.localeCompare(a) : a.localeCompare(b);
};

export const numberSort = (a: number, b: number, desc: boolean) => {
    return desc ? b - a : a - b;
};