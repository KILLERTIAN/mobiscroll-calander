import React, { useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalenderGrid = ({ currentMonth, events, onDateClick, resources, onAddResource, selectedDate }) => {
  const calendarRef = useRef(null);

  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

  const dates = [];
  for (let date = new Date(firstDayOfMonth); date <= lastDayOfMonth; date.setDate(date.getDate() + 1)) {
    dates.push(new Date(date));
  }

  useEffect(() => {
    if (calendarRef.current && selectedDate) {
      const cellIndex = dates.findIndex(
        (date) => date.toDateString() === selectedDate.toDateString()
      );
      if (cellIndex !== -1) {
        const scrollX = cellIndex * 80; // Adjust the scroll to the selected date
        calendarRef.current.scrollTo({ left: scrollX, behavior: "smooth" });
      }
    }
  }, [selectedDate, dates]);

  return (
    <div className="w-full flex">
      {/* Resource Column */}
      <div className="sticky top-0 left-0 bg-white dark:bg-[#030207] z-10 border-r dark:border-gray-700">
        <div className="border-b dark:border-gray-700">
          <button
            onClick={onAddResource}
            className="flex items-center p-2 bg-blue-500 dark:bg-orange-500 text-white text-sm"
          >
            <Plus className="mr-2" /> Add Resource
          </button>
        </div>
        {/* Resource names */}
        {resources.map((resource, index) => (
          <div key={index} className="p-2 h-20 border-b dark:border-gray-700 flex items-center">
            {resource}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 overflow-x-auto" ref={calendarRef}>
        {/* Weekdays and Dates Header */}
        <div className="flex bg-white border-l-gray-700 border-r-gray-700 dark:bg-[#030207] sticky top-0 z-10">
          {dates.map((date) => {
            const isToday =
              date.getDate() === new Date().getDate() &&
              date.getMonth() === new Date().getMonth() &&
              date.getFullYear() === new Date().getFullYear();

            return (
              <div
                key={date.toISOString()}
                className={`flex flex-row items-center justify-center min-w-20 text-center font-semibold border dark:border-gray-700 cursor-pointer gap-1
                  ${isToday ? "bg-blue-500 text-white dark:bg-orange-500 rounded-full my-auto h-[30px]" : "p-2 h-[40px]"}
                `}
                onClick={() => setSelectedDate(date)}
              >
                <div>{date.getDate()}</div>
                <div>{weekdays[date.getDay()]}</div>
              </div>
            );
          })}
        </div>

        {/* Calendar Grid Rows */}
        <div className="flex flex-col">
          {resources.map((resource, resourceIndex) => (
            <div key={resourceIndex} className="flex">
              {dates.map((date, dateIndex) => {
                const eventList = events[resource]?.[date.toDateString()] || [];

                return (
                  <div
                    key={dateIndex}
                    className={`w-20 h-20 min-w-20 border dark:border-gray-700 relative`}
                    onClick={() => onDateClick(resource, date)}
                  >
                    {eventList.map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className="absolute inset-1 p-1 rounded text-white"
                        style={{ backgroundColor: event.color }}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalenderGrid;
