import { useState } from "react";
import { useDataContext } from "../context/InvoicesContext";
import { Link } from "react-router-dom";

export default function ({
  filter,
  setFilter,
}: {
  filter: IFilter;
  setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
}) {
  const { data } = useDataContext();
  const filterWords = ["Draft", "Pending", "Paid"];
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const renderInvoiceCount = () => {
    if (data.length === 0)
      return (
        <span>
          <span className="hidden md:inline">There are </span>No invoices
        </span>
      );
    if (data.length === 1)
      return (
        <span>
          <span className="hidden md:inliine">There are </span>1
          <span className="hidden md:inline"> total</span> invoice
        </span>
      );
    return (
      <span>
        <span className="hidden md:inline">There are </span>
        {data.length}
        <span className="hidden md:inline"> total</span> invoices
      </span>
    );
  };
  return (
    <div
      className="flex justify-between
        pb-[3.2rem] pt-[3.6rem]
        md:pt-[6.2rem] md:pb-[5.5rem]
        xl:pb-[6.4rem]"
    >
      <div className="flex flex-col gap-[0.3rem]">
        <h1
          className="text-[2.4rem] font-bold tracking-[-0.75px]
            text-invoiceHeaderText-light
            md:text-[3.6rem] md:tracking-[-1.125px]
            transition-all duration-300
            dark:text-white"
        >
          Invoices
        </h1>
        <p
          className="text-[1.3rem] font-[500] leading-[1.5rem]
            tracking-[-0.1px] text-[#888eb0]
            transition-all duration-300
            dark:text-[#dfe3fa]"
        >
          {renderInvoiceCount()}
        </p>
      </div>
      <div
        className="flex items-center
        gap-[1.9rem] relative
        "
      >
        <div
          className="flex gap-[1.2rem]
            items-center cursor-pointer"
          onClick={() => setShowFilter((prev) => !prev)}
        >
          <p
            className="text-[1.5rem] font-bold tracking-[-0.25px]
              leading-[1.5rem] text-invoiceHeaderText-light
              flex gap-[0.3rem] transition-all duration-300
              dark:text-white
              "
          >
            Filter <span className="hidden md:block">by status</span>
          </p>
          <svg
            width="10"
            height="7"
            viewBox="0 0 10 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {!showFilter ? (
              <path
                d="M1 1L5.2279 5.2279L9.4558 1"
                stroke="#7C5DFA"
                strokeWidth="2"
              />
            ) : (
              <path
                d="M1 6.22754L5.2279 1.99964L9.4558 6.22754"
                stroke="#7C5DFA"
                strokeWidth="2"
              />
            )}
          </svg>
        </div>
        {showFilter ? (
          <div
            className="absolute
              py-[2.4rem] pl-[2.4rem] pr-[8.8rem]
              bg-white top-20 -left-10 rounded-[0.8rem]
              shadow-[0_10px_20px_0_rgba(72,84,159,0.25)]
              flex flex-col gap-[1.5rem]
              transition-all duration-300
              dark:bg-[#252945]
              "
          >
            {filterWords.map((item) => (
              <div
                key={item}
                className="
                flex gap-[1.3rem] items-center
                text-invoiceHeaderText-light
                text-[1.5rem] font-bold leading-[1.5rem]
                tracking-[-0.25px]
                transition-all duration-300
                dark:text-white"
              >
                <input
                  type="checkbox"
                  id={`checkbox-${item}`}
                  className="w-[1.6rem] h-[1.6rem]
                  bg-[#dfe3fa] rounded-[0.2rem] cursor-pointer
                  outline-none"
                  checked={!!filter[item as keyof IFilter]}
                  onChange={() =>
                    setFilter((prev) => ({
                      ...prev,
                      [item]: !prev[item as keyof IFilter],
                    }))
                  }
                />
                <label htmlFor={`checkbox-${item}`} className="cursor-pointer">
                  {item}
                </label>
              </div>
            ))}
          </div>
        ) : null}
        <Link
          to={"create-new-invoice"}
          className="flex
            py-[0.6rem] pl-[0.6rem] pr-[1.5rem]
            bg-[#7c6dfa] rounded-[2.4rem]
            text-white text-[1.5rem] font-bold
            leading-[1.5rem] tracking-[-0.25px]
            items-center gap-[0.8rem]
            cursor-pointer
            transition-all duration-300
            hover:bg-[#9277ff]"
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
          <p className="flex gap-[0.4rem]">
            New<span className="hidden md:block">Invoice</span>
          </p>
        </Link>
      </div>
    </div>
  );
}
