import { useState } from "react";

const Calendar = ({
  setIsOpenCalendar,
}: {
  setIsOpenCalendar: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
    <div
      className="w-full pt-[2.6rem] pl-[1.95rem] 
      pr-[1.85rem] pb-[3.1rem] bg-white rounded-[0.8rem]
      shadow-[0_10px_20px_0px_rgba(72,84,159,0.25)]
      transition-all duration-300"
    >
      <div className="flex justify-between items-center mb-[3.2rem]">
        <button
          onClick={() => {
            setCurrentDate(new Date(year, month - 1, 1));
          }}
        >
          <svg
            width="6"
            height="11"
            viewBox="0 0 6 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
          >
            <path
              d="M4.3418 0.88623L0.113895 5.11413L4.3418 9.34203"
              stroke="#7C5DFA"
              stroke-width="2"
            />
          </svg>
        </button>
        <h2
          className="text-[1.5rem] font-bold
          leading-[1.5rem] tracking-[-0.25px] text-[#0c0e16]"
        >
          {currentDate.toLocaleString("default", {
            month: "short",
            year: "numeric",
          })}
        </h2>
        <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))}>
          <svg
            width="6"
            height="11"
            viewBox="0 0 6 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
          >
            <path
              d="M1.11377 0.88623L5.34167 5.11413L1.11377 9.34203"
              stroke="#7C5DFA"
              stroke-width="2"
            />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-[1.5rem] text-center">
        {prevMonthDates.map((day, i) => (
          <div
            key={`prev-${i}`}
            className="text-[1.5rem]
            font-bold leading-[1.5rem] tracking-[-0.25px]
            text-[#0c0e16] opacity-[0.0814] cursor-pointer
            hover:text-[#7c5dfa] hover:opacity-[1]"
          >
            {day}
          </div>
        ))}

        {currentMonthDates.map((day, i) => (
          <div
            key={`current-${i}`}
            className="text-[1.5rem]
            font-bold leading-[1.5rem] tracking-[-0.25px]
            text-[#0c0e16] cursor-pointer
            hover:text-[#7c5dfa]"
            onClick={() => {
              setCurrentDate(new Date(year, month, day));
              setIsOpenCalendar(false);
            }}
          >
            {day}
          </div>
        ))}

        {nextMonthDates.map((day, i) => (
          <div
            key={`next-${i}`}
            className="text-[1.5rem]
            font-bold leading-[1.5rem] tracking-[-0.25px]
            text-[#0c0e16] opacity-[0.0814] cursor-pointer
            hover:text-[#7c5dfa] hover:opacity-[1]"
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
