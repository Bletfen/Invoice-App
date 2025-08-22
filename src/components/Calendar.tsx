import { useState } from "react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const prevMonthDays = new Date(year, month, 0).getDate();

  const prevMonthDates = Array.from(
    { length: firstDayOfMonth },
    (_, i) => prevMonthDays - firstDayOfMonth + i + 1
  );

  const currentMonthDates = Array.from(
    { length: daysInMonth },
    (_, i) => i + 1
  );

  const nextMonthDates = Array.from(
    { length: 42 - (prevMonthDates.length + currentMonthDates.length) },
    (_, i) => i + 1
  );

  return (
    <div className="w-[400px] p-4 bg-white shadow rounded-2xl">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))}>
          ←
        </button>
        <h2 className="text-lg font-bold">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))}>
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-sm">
        {prevMonthDates.map((day, i) => (
          <div key={`prev-${i}`} className="p-2 text-gray-400">
            {day}
          </div>
        ))}

        {currentMonthDates.map((day, i) => (
          <div
            key={`current-${i}`}
            className="p-2 rounded-lg hover:bg-indigo-100 cursor-pointer"
          >
            {day}
          </div>
        ))}

        {nextMonthDates.map((day, i) => (
          <div key={`next-${i}`} className="p-2 text-gray-400">
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
