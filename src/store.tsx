import dayjs from "dayjs";
import { create } from "zustand"

interface UserCountStore {
    userCount: number;
    setUserCount: (count: number) => void;
}

interface CsvStore {
    exportData: Array<Record<string, any>>;
    setExportData: (newData: Array<Record<string, any>>) => void;
}

interface DateRangeStore {
    selectedRange: DateRange;
    setSelectedRange: (range: DateRange) => void;
}

type DateRange = {
    from: Date | null;
    to: Date | null;
};

// defaults to last 7 days
const today = dayjs();
const defaultRange: DateRange = {
    from: today.subtract(29, 'day').toDate(),
    to: today.toDate(),
};

export const useUserCountStore = create<UserCountStore>((set) => ({
    userCount: 0,
    setUserCount: (userCount) => set(() => ({userCount: userCount}))
}));

export const useDateRangeStore = create<DateRangeStore>((set) => ({
    selectedRange: defaultRange,
    setSelectedRange: (range) => set({selectedRange: range}),
}));

export const useCsvStore = create<CsvStore>((set) => ({
    exportData: [],
    setExportData: (newData) => 
        set((state) => {
            if (JSON.stringify(state.exportData) === JSON.stringify(newData)) {
                return state;
            }
            return {exportData: newData};
        }),
}));