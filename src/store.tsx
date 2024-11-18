import dayjs from "dayjs";
import { create } from "zustand"

type DateRange = {
    from: Date | null;
    to: Date | null;
};

interface DateRangeState {
    selectedRange: DateRange;
    setSelectedRange: (range: DateRange) => void;
}

// defaults to last 7 days
const today = dayjs();
const defaultRange: DateRange = {
    from: today.subtract(6, 'day').toDate(),
    to: today.toDate(),
};

export const useDateRangeStore = create<DateRangeState>((set) => ({
    selectedRange: defaultRange,
    setSelectedRange: (range) => set({selectedRange: range}),
}));