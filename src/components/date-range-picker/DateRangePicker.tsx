import { useEffect, useState } from 'react';
import { DateRange, DayPicker } from 'react-day-picker';
import dayjs from 'dayjs';
import * as Popover from '@radix-ui/react-popover';
import 'react-day-picker/dist/style.css';
import styles from './DateRangePicker.module.scss';
import { ChevronDown } from 'lucide-react';
import { useDateRangeStore } from '../../store';
import * as Separator from '@radix-ui/react-separator';
import { DateRangePreset } from '../../types/types';

const DATE_FORMAT = 'YYYY/MM/DD';

const DateRangePicker = () => {
  const { selectedRange, setSelectedRange } = useDateRangeStore();
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [tempRange, setTempRange] = useState<DateRange>();
  const [selectedPreset, setSelectedPreset] = useState<string>('');

  const formatDate = (date: Date) => dayjs(date).format(DATE_FORMAT);

  useEffect(() => {
    handlePresetSelection('Last 30 days');
  }, []);

  const handleRangeChange = (range: DateRange | undefined) => {
    if (range) {
      setTempRange({ from: range.from, to: range.to });
      setInputValue(
        range.from && range.to
          ? `${formatDate(range.from)} – ${formatDate(range.to)}`
          : ''
      );
    }
    setSelectedPreset('Custom');
  };

  const handlePresetSelection = (preset: DateRangePreset) => {
    const today = dayjs();
    let fromDate = today.toDate();
    let toDate = today.toDate();
    setSelectedPreset(preset);

    switch (preset) {
      case 'Last 7 days':
        fromDate = today.subtract(6, 'day').toDate();
        break;
      case 'Last 14 days':
        fromDate = today.subtract(13, 'day').toDate();
        break;
      case 'Last 30 days':
        fromDate = today.subtract(29, 'day').toDate();
        break;
      case 'Last 6 months':
        fromDate = today.subtract(179, 'day').toDate();
        break;
    }

    setTempRange({ from: fromDate, to: toDate });
    setInputValue(`${formatDate(fromDate)} – ${formatDate(toDate)}`);
  };

  const handleConfirm = () => {
    setSelectedRange(tempRange);
    setCalendarOpen(false);
  };

  const handleCancel = () => {
    setTempRange(selectedRange);
    setCalendarOpen(false);
  };

  return (
    <>
      <div>{selectedPreset}</div>
      <Separator.Root className="SeparatorRoot" orientation="vertical" />
      <Popover.Root open={calendarOpen} onOpenChange={setCalendarOpen}>
        <Popover.Trigger asChild>
          <div className={styles.inputContainer}>
            <ChevronDown strokeWidth={1.5} size={14} className={styles.icon} />
            <input
              type="text"
              value={inputValue}
              onClick={() => setCalendarOpen(!calendarOpen)}
              placeholder="Select date range"
              className={styles.inputField}
              readOnly
            />
          </div>
        </Popover.Trigger>
        <Popover.Anchor />
        <Popover.Portal>
          <Popover.Content align="end" className={styles.popoverContent}>
            <div className={styles.calendarHeader}></div>
            <DayPicker
              mode="range"
              numberOfMonths={2}
              selected={tempRange}
              onSelect={handleRangeChange}
              className={styles.datePicker}
            />
            <Separator.Root className="SeparatorRoot" />
            <div className={styles.calendarFooter}>
              {[
                'Last 7 days',
                'Last 14 days',
                'Last 30 days',
                'Last 6 months',
              ].map((preset) => (
                <button
                  key={preset}
                  className={styles.datePreset}
                  onClick={() => handlePresetSelection(preset)}
                >
                  {preset}
                </button>
              ))}
              <div>
                <button className="btn btn-alt" onClick={handleCancel}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleConfirm}>
                  Apply
                </button>
              </div>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </>
  );
};
export default DateRangePicker;
