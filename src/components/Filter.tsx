export default function ({
  filter,
  setFilter,
}: {
  filter: IFilter;
  setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
}) {
  const filterWords = ["Draft", "Pending", "Paid"];
  return (
    <div
      className="flex justify-between
        mb-[3.2rem] mt-[3.6rem]"
    >
      <div className="flex flex-col gap-[0.3rem]">
        <h1
          className="text-[2.4rem] font-bold tracking-[-0.75px]
            text-invoiceHeaderText-light"
        >
          Invoices
        </h1>
        <span
          className="text-[1.3rem] font-[500] leading-[1.5rem]
            tracking-[-0.1px] text-[#888eb0]"
        >
          7 invoices
        </span>
      </div>
      <div
        className="flex items-center
        gap-[1.9rem]"
      >
        <div>
          <div
            className="flex gap-[1.2rem]
            items-center cursor-pointer"
          >
            <span
              className="text-[1.5rem] font-bold tracking-[-0.25px]
            leading-[1.5rem] text-invoiceHeaderText-light"
            >
              Filter
            </span>
            <svg
              width="10"
              height="7"
              viewBox="0 0 10 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L5.2279 5.2279L9.4558 1"
                stroke="#7C5DFA"
                stroke-width="2"
              />
            </svg>
          </div>
          {filterWords.map((item) => (
            <div key={item} className="cursor-pointer">
              <input
                type="checkbox"
                id={`"checkbox-${item}`}
                className="w-[1.6rem] h-[1.6rem] bg-[#dfe3fa] rounded-[0.2rem]"
                checked={!!filter[item as keyof IFilter]}
                onChange={() =>
                  setFilter((prev) => ({
                    ...prev,
                    [item]: !prev[item as keyof IFilter],
                  }))
                }
              />
              <label htmlFor={`checkbox-${item}`}>{item}</label>
            </div>
          ))}
        </div>
        <button
          className="flex
            py-[0.6rem] pl-[0.6rem] pr-[1.5rem]
            bg-[#7c6dfa] rounded-[2.4rem]
            text-white text-[1.5rem] font-bold
            leading-[1.5rem] tracking-[-0.25px]
            items-center gap-[0.8rem]
            cursor-pointer"
        >
          <div
            className="bg-white rounded-full w-[3.2rem] h-[3.2rem]
            flex items-center justify-center"
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 11 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.31311 10.0234V6.3136H10.0229V3.73327H6.31311V0.0234375H3.73278V3.73327H0.0229492V6.3136H3.73278V10.0234H6.31311Z"
                fill="#7C5DFA"
              />
            </svg>
          </div>
          New
        </button>
      </div>
    </div>
  );
}
