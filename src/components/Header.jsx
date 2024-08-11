import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import DatePicker from './DatePicker'; // Import the custom DatePicker
import ThemeToggle from './ThemeToggle';
import { format } from 'date-fns';

const Header = ({ date, setDate }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef(null); // Ref for the DatePicker

  const handlePrevMonth = () => {
    setDate(new Date(date.setMonth(date.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setDate(new Date(date.setMonth(date.getMonth() + 1)));
  };

  const handleToday = () => {
    setDate(new Date());
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  // Close the calendar when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 dark:bg-[#121212] rounded-md shadow relative z-[999]">
      <div className="flex items-center">
        <button
          onClick={toggleDatePicker}
          className="text-3xl font-semibold text-blue-500 dark:text-orange-400 mr-4"
        >
          {format(date, 'MMMM yyyy')}
        </button>

        {showDatePicker && (
          <div
            ref={datePickerRef} // Set ref to the DatePicker container
            className="absolute top-12 left-4 z-10"
          >
            <DatePicker
              selectedDate={date}
              onSelect={setDate}
            />
          </div>
        )}
      </div>
      <div className="flex items-center">
        <button onClick={handlePrevMonth} aria-label="Previous month" className="rounded-full mr-2">
          <ChevronLeft className="w-8 h-8 text-blue-500 dark:text-orange-400" />
        </button>
        <button onClick={handleToday} className="px-2 py-1 text-xl font-semibold text-blue-500 dark:text-orange-400 rounded-md mr-2">
          Today
        </button>
        <button onClick={handleNextMonth} aria-label="Next month" className="rounded-full mr-2">
          <ChevronRight className="w-8 h-8 text-blue-500 dark:text-orange-400" />
        </button>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
