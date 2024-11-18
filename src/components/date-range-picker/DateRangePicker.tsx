import React, { useEffect, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import dayjs from "dayjs";
import * as Popover from "@radix-ui/react-popover";
import "react-day-picker/dist/style.css";
import styles from "./DateRangePicker.module.scss"
import { CalendarDays } from 'lucide-react';
import { useDateRangeStore } from "../../store";
import * as Separator from "@radix-ui/react-separator";

const DATE_FORMAT = 'YYYY-MM-DD';
type Preset = 'last7days' | 'last14days' | 'last30days';

const DateRangePicker = () => {
    const { selectedRange,setSelectedRange } = useDateRangeStore();
    const [showPicker, setShowPicker] = useState<boolean>(false);
    const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [tempRange, setTempRange] = useState<DateRange>();

    useEffect(() => {
        handlePresetSelection('last7days');
    }, []);
    
    const handleRangeChange = (range: DateRange | undefined) => {
        if (range) {
            setTempRange({from: range.from, to: range.to})
            setInputValue(
                range.from && range.to
                ? `${dayjs(range.from).format(DATE_FORMAT)} – ${dayjs(range.to).format(DATE_FORMAT)}`
                : ''
            );
        }
    };

    const handlePresetSelection = (preset: Preset) => {
        const today = dayjs();
        let fromDate: Date = today.toDate();
        let toDate: Date = today.toDate();

        switch (preset) {
            case 'last7days':
                fromDate = today.subtract(6, 'day').toDate();
                toDate = today.toDate();
                break;
            
            case 'last14days':
                fromDate = today.subtract(13, 'day').toDate();
                toDate = today.toDate();
                break;

            case 'last30days':
                fromDate = today.subtract(29, 'day').toDate();
                toDate = today.toDate();
                break;
            default:
                break;
        }

        setTempRange({ from: fromDate, to: toDate });
        setInputValue(
            `${dayjs(fromDate).format(DATE_FORMAT)} – ${dayjs(toDate).format(DATE_FORMAT)}`);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        const dates = e.target.value.split(' – ').map(date => dayjs(date, DATE_FORMAT).toDate())
        if (dates.length === 2 && !isNaN(dates[0].getTime()) && !isNaN(dates[1].getTime())) {
            setSelectedRange({ from: dates[0], to: dates[1] });
        }
    };

    const handleConfirm = () => {
        setSelectedRange(tempRange);
        setCalendarOpen(false);
        console.log(tempRange);
    };

    const handleCancel = () => {
        setCalendarOpen(false);
        setSelectedRange(selectedRange); // Revert to initial range not working when cancelling
    };

return (
    <>
        <Popover.Root open={calendarOpen} onOpenChange={setCalendarOpen}>
		<Popover.Trigger asChild>
            <div className={styles.inputContainer}>
                <CalendarDays strokeWidth={1.5} size={14} className={styles.icon}/>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onClick={() => setShowPicker(!showPicker)}
                    placeholder="Select date range"
                    className={styles.inputField}
                />
            </div>
        </Popover.Trigger>
		<Popover.Anchor />
		<Popover.Portal>
			<Popover.Content align="end" className={styles.popoverContent}>
                <div className={styles.calendarHeader}>
                </div>
                <DayPicker
                    mode="range"
                    numberOfMonths={2}
                    selected={tempRange}            
                    onSelect={handleRangeChange}
                    className={styles.datePicker}
                />
                <Separator.Root className={styles.SeparatorRoot} />
                <div className={styles.calendarFooter}>
                    <div className={styles.datePresets}>
                        <button className={styles.datePreset} onClick={() => handlePresetSelection('last7days')}>Last 7 days</button>
                        <button className={styles.datePreset} onClick={() => handlePresetSelection('last14days')}>Last 14 days</button>
                        <button className={styles.datePreset} onClick={() => handlePresetSelection('last30days')}>Last 30 days</button>
                    </div>
                    <div>
                        <button className="btn btn-alt" onClick={handleCancel}>Cancel</button>
                        <button className="btn btn-primary" onClick={handleConfirm}>Apply</button>
                    </div>
                </div>
			</Popover.Content>
		</Popover.Portal>
	</Popover.Root>
    </>
);
};
export default DateRangePicker;