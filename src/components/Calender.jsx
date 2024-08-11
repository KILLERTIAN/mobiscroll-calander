import React, { useState } from 'react';
import Header from './Header';
import CalenderGrid from './CalenderGrid'; // Corrected the import

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const events = {}; // Replace with your events data
  const resources = [
    "Resource A", "Resource B", "Resource C",
    "Resource D", "Resource E", "Resource F",
    "Resource G", "Resource H", "Resource I",
  ];

  const handleDateClick = (resource, selectedDate) => {
    console.log(`Resource: ${resource}, Date: ${selectedDate}`);
  };

  const handleAddResource = () => {
    console.log('Add Resource');
  };

  return (
    <div>
      <Header date={date} setDate={setDate} />
      <CalenderGrid
        currentMonth={date}
        events={events}
        onDateClick={handleDateClick}
        resources={resources}
        onAddResource={handleAddResource}
        selectedDate={date} 
      />
    </div>
  );
};

export default Calendar;
