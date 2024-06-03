import { atom, selector } from "recoil";

export const countAtom = atom({
    key: "countAtom",
    default: 0
})

export const evenSelector = selector({
    key: "evenSelector",
    get: function({get}){
        const count = get(countAtom);
        return count%2;
    }
})

// this is to check for even or not, just like useMemo
// used when pure function with a state