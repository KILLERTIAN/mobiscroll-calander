import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { format, isSameDay, isSameMonth, isSameYear, startOfDecade, endOfDecade } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'react-calendar/dist/Calendar.css';
import './CustomCalendar.css'; // Import the custom CSS

const DatePicker = ({ selectedDate, onSelect }) => {
    const [date, setDate] = useState(selectedDate || new Date());
    const [view, setView] = useState('month');
    const [isOpen, setIsOpen] = useState(true);

    const handleDateChange = (date) => {
        setDate(date);
        onSelect(date);
        setIsOpen(false); // Close the calendar when a date is selected
    };

    const handlePrev = () => {
        if (view === 'month') {
            setDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
        } else if (view === 'year') {
            setDate(prevDate => new Date(prevDate.getFullYear() - 1, 0, 1));
        } else if (view === 'decade') {
            setDate(prevDate => new Date(prevDate.getFullYear() - 10, 0, 1));
        }
    };

    const handleNext = () => {
        if (view === 'month') {
            setDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
        } else if (view === 'year') {
            setDate(prevDate => new Date(prevDate.getFullYear() + 1, 0, 1));
        } else if (view === 'decade') {
            setDate(prevDate => new Date(prevDate.getFullYear() + 10, 0, 1));
        }
    };

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            if (isSameDay(date, selectedDate)) {
                return 'react-calendar__tile--active';
            }
            if (isSameDay(date, new Date())) {
                return 'react-calendar__tile--now';
            }
            if (!isSameMonth(date, selectedDate || new Date())) {
                return 'react-calendar__tile--inactive';
            }
        }
        return '';
    };

    return (
        isOpen && (
            <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 z-[999]">
                <div className="flex justify-between items-center mb-2 px-4 py-2">
                    <div className="text-lg font-semibold">
                        <button onClick={() => setView(view === 'month' ? 'year' : 'decade')} className="text-blue-500 dark:text-orange-400">
                            {view === 'month' ? format(date, 'MMMM yyyy') : view === 'year' ? format(date, 'yyyy') : `${format(startOfDecade(date), 'yyyy')} - ${format(endOfDecade(date), 'yyyy')}`}
                        </button>
                    </div>
                    <div>
                        <button onClick={handlePrev} aria-label="Previous" className="rounded-full mr-2">
                            <ChevronLeft className="w-8 h-8 text-blue-500 dark:text-orange-400" />
                        </button>
                        <button onClick={handleNext} aria-label="Next" className="rounded-full">
                            <ChevronRight className="w-8 h-8 text-blue-500 dark:text-orange-400" />
                        </button>
                    </div>
                </div>

                <Calendar
                    onChange={handleDateChange}
                    value={date}
                    view={view}
                    onViewChange={({ activeStartDate, view }) => setView(view)}
                    prevLabel={null}
                    nextLabel={null}
                    tileClassName={tileClassName}
                    formatShortWeekday={(locale, date) => ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()]}
                    className="bg-white dark:bg-gray-800"
                />
            </div>
        )
    );
};

export default DatePicker;
