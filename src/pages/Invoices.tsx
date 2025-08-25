import { Link } from "react-router-dom";
import Filter from "../components/Filter";
import { useDataContext, useFormDate } from "../context/InvoicesContext";
import { useState } from "react";
import Nothing from "../components/Nothing";
export default function Invoices() {
  const [filter, setFilter] = useState<IFilter>({
    Draft: false,
    Pending: false,
    Paid: false,
  });
  const { data } = useDataContext();
  const { formDate } = useFormDate();
  const filteredDataBase = data.filter((item) => {
    if (!filter.Draft && !filter.Pending && !filter.Paid) return true;
    return (
      (filter.Draft && item.status.toLowerCase() === "draft") ||
      (filter.Pending && item.status.toLowerCase() === "pending") ||
      (filter.Paid && item.status.toLowerCase() === "paid")
    );
  });

  return (
    <div
      className="px-[2.4rem]
      pb-[10.5rem] relative
      min-h-screen
      md:px-[4.8rem]
      xl:max-w-[73rem]
      xl:mx-auto
      xl:p-[unset]"
    >
      <Filter filter={filter} setFilter={setFilter} />
      {data.length === 0 ? (
        <Nothing />
      ) : (
        <div className="flex flex-col gap-[1.6rem]">
          {filteredDataBase.map((item) => (
            <Link key={item.id} to={item.id}>
              <div
                className="pt-[2.4rem] pb-[2.2rem]
              px-[2.4rem] bg-white rounded-[0.8rem]
              shadow-[0_10px_10px_-10px_rgba(72,84,159,0.1)]
              md:flex md:justify-between
              md:items-center xl:p-[unset] xl:px-[2.4rem] xl:py-[1.6rem]
              transition-all duration-300 border border-transparent
              hover:border-[#7c5dfa]
              transition-all duration-300 dark:bg-[#1e2139]
              "
              >
                <div
                  className="flex
                justify-between md:justify-start
                md:flex md:gap-[5.1rem]
                mb-[2.4rem]
                md:mb-[unset]
                "
                >
                  <div className="flex gap-[2.8rem]">
                    <h2
                      className="text-[1.5rem]
                    font-bold leading-[1.5rem]
                    tracking-[-0.25px]
                    text-invoiceHeaderText-light
                    transition-all duration-300
                    text-white"
                    >
                      <span className="text-[#7e88c3]">#</span>
                      {item.id}
                    </h2>
                    <p
                      className="text-[1.3rem]
                    font-[500] leading-[1.5rem]
                    tracking-[-0.1px]
                    text-invoicePText-light
                    hidden md:block
                    transition-all duration-300 dark:text-[#dfe3fa]
                    "
                    >
                      <span
                        className="text-[#888eb0]
                        transition-all duration-300 dark:text-[#dfe3fa]"
                      >
                        Due{" "}
                      </span>
                      {formDate(item.createdAt)}
                    </p>
                  </div>
                  <span
                    className="text-[1.3rem]
                    font-[500] leading-[1.5rem]
                    tracking-[-0.1px]
                    text-invoicePText-light
                    transition-all duration-300 dark:text-white"
                  >
                    {item.clientName}
                  </span>
                </div>
                <div
                  className="flex
                items-center
                justify-between
                md:justify-start
                "
                >
                  <div
                    className="flex flex-col gap-[0.9rem]
                  md:mr-[4rem]"
                  >
                    <p
                      className="text-[1.3rem]
                    font-[500] leading-[1.5rem]
                    tracking-[-0.1px]
                    text-invoicePText-light
                    md:hidden
                    transition-all duration-300 dark:text-[#dfe3fa]"
                    >
                      <span
                        className="text-[#888eb0]
                        transition-all duration-300 dark:text-[#dfe3fa]"
                      >
                        Due{" "}
                      </span>
                      {formDate(item.createdAt)}
                    </p>
                    <p
                      className="text-[1.5rem]
                    font-bold leading-[2.4rem]
                    tracking-[-0.25px]
                    text-invoiceHeaderText-light
                    transition-all duration-300 dark:text-white"
                    >
                      £{item.total.toLocaleString()}
                    </p>
                  </div>
                  <div
                    className={`pt-[1.4rem] pb-[1.1rem]
                  rounded-[0.6rem]
                  text-[1.5rem] font-bold leading-[1.5rem]
                  tracking-[-0.25px]
                  flex items-center justify-center gap-[0.8rem]
                  md:mr-[2rem] w-[10.4rem] ${
                    item.status.toLowerCase() === "paid"
                      ? "bg-paidButton-light/5 text-paidButton-light"
                      : item.status.toLowerCase() === "pending"
                      ? "bg-pendingButton-light/5 text-pendingButton-light"
                      : "bg-[#f8f8fb]/90 text-[#373b53]"
                  }`}
                  >
                    <div
                      className={`w-[0.8rem] h-[0.8rem] 
                      bg-black rounded-full ${
                        item.status.toLowerCase() === "paid"
                          ? "bg-paidButton-light"
                          : item.status.toLowerCase() === "pending"
                          ? "bg-pendingButton-light"
                          : "bg-header-light"
                      }`}
                    ></div>
                    {item.status}
                  </div>
                  <svg
                    width="7"
                    height="10"
                    viewBox="0 0 7 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="hidden md:block"
                  >
                    <path d="M1 1L5 5L1 9" stroke="#7C5DFA" stroke-width="2" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
