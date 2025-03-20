import dayjs from 'dayjs';
import { DateRange } from 'react-day-picker';
import { create } from 'zustand';

interface UserCountStore {
  userCount: number;
  setUserCount: (count: number) => void;
}

interface DateRangeStore {
  selectedRange: DateRange;
  setSelectedRange: (range: DateRange) => void;
}

interface SelectedUserIdsStore {
  selectedUserIds: string[];
  setSelectedUserIds: (userIds: string[]) => void;
  resetSelectedUserIds: () => void;
}

// defaults to last 7 days
const today = dayjs();
const defaultRange: DateRange = {
  from: today.subtract(29, 'day').toDate(),
  to: today.toDate(),
};

export const useSelectedUsersStore = create<SelectedUserIdsStore>((set) => ({
  selectedUserIds: [],
  setSelectedUserIds: (userIds: string[]) => set({ selectedUserIds: userIds }),
  resetSelectedUserIds: () => set({ selectedUserIds: [] }),
}));

export const useUserCountStore = create<UserCountStore>((set) => ({
  userCount: 0,
  setUserCount: (userCount) => set(() => ({ userCount: userCount })),
}));

export const useDateRangeStore = create<DateRangeStore>((set) => ({
  selectedRange: defaultRange,
  setSelectedRange: (range) => set({ selectedRange: range }),
}));
