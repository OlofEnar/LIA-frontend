import React, { useEffect, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import dayjs from "dayjs";
import * as Popover from "@radix-ui/react-popover";
import "react-day-picker/dist/style.css";
import styles from "./DateRangePicker.module.scss"
import { ChevronDown } from 'lucide-react';
import { useDateRangeStore } from "../../store";
import * as Separator from "@radix-ui/react-separator";

const DATE_FORMAT = 'YYYY/MM/DD';
type Preset = 'Last 7 days' | 'Last 14 days' | 'Last 30 days' | 'Custom';
let selectedPreset: string = '';

const DateRangePicker = () => {
    const { selectedRange, setSelectedRange } = useDateRangeStore();
    const [showPicker, setShowPicker] = useState<boolean>(false);
    const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
    const [isPreset, setIsPreset] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [tempRange, setTempRange] = useState<DateRange>();

    useEffect(() => {
        handlePresetSelection('Last 30 days');
    }, []);
    
    const handleRangeChange = (range: DateRange | undefined) => {
        if (range) {
            setIsPreset(false)
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
        setIsPreset(true);

        switch (preset) {
            case 'Last 7 days':
                fromDate = today.subtract(6, 'day').toDate();
                toDate = today.toDate();
                selectedPreset = preset;
                break;
            
            case 'Last 14 days':
                fromDate = today.subtract(13, 'day').toDate();
                toDate = today.toDate();
                selectedPreset = preset;
                break;

            case 'Last 30 days':
                fromDate = today.subtract(29, 'day').toDate();
                toDate = today.toDate();
                selectedPreset = preset;
                break;
            default:
                break;
        }
        console.log(selectedPreset);

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
        if(!isPreset) {
            selectedPreset = 'Custom';
        }
    };

    const handleCancel = () => {
        selectedPreset = '';
        setCalendarOpen(false);
        setSelectedRange(selectedRange); // Revert to initial range not working when cancelling
    };

return (
    <>
    <div>{selectedPreset}</div>
    <Separator.Root className="SeparatorRoot" orientation="vertical" />
        <Popover.Root open={calendarOpen} onOpenChange={setCalendarOpen}>
		<Popover.Trigger asChild>
            <div className={styles.inputContainer}>
                <ChevronDown strokeWidth={1.5} size={14} className={styles.icon}/>
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
                <Separator.Root className="SeparatorRoot" />
                <div className={styles.calendarFooter}>
                    <div className={styles.datePresets}>
                        <button className={styles.datePreset} onClick={() => handlePresetSelection('Last 7 days')}>Last 7 days</button>
                        <button className={styles.datePreset} onClick={() => handlePresetSelection('Last 14 days')}>Last 14 days</button>
                        <button className={styles.datePreset} onClick={() => handlePresetSelection('Last 30 days')}>Last 30 days</button>
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