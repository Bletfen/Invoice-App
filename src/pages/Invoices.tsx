import { Link } from "react-router-dom";
import Filter from "../components/Filter";
import { useDataContext, useFormDate } from "../context/InvoicesContext";
import { useState } from "react";
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
      pb-[10.5rem] relative"
    >
      <Filter filter={filter} setFilter={setFilter} />
      <div className="flex flex-col gap-[1.6rem]">
        {filteredDataBase.map((item) => (
          <Link key={item.id} to={item.id}>
            <div
              className="pt-[2.4rem] pb-[2.2rem]
              px-[2.4rem] bg-white rounded-[0.8rem]
              shadow-[0_10px_10px_-10px_rgba(72,84,159,0.1)]
              "
            >
              <div
                className="flex
                justify-between
                mb-[2.4rem]"
              >
                <div>
                  <h2
                    className="text-[1.5rem]
                    font-bold leading-[1.5rem]
                    tracking-[-0.25px]
                    text-invoiceHeaderText-light"
                  >
                    <span className="text-[#7e88c3]">#</span>
                    {item.id}
                  </h2>
                  <p
                    className="text-[1.3rem]
                    font-[500] leading-[1.5rem]
                    tracking-[-0.1px]
                    text-invoicePText-light
                    hidden"
                  >
                    <span className="text-[#888eb0]">Due </span>
                    {formDate(item.createdAt)}
                  </p>
                </div>
                <span
                  className="text-[1.3rem]
                    font-[500] leading-[1.5rem]
                    tracking-[-0.1px]
                    text-invoicePText-light"
                >
                  {item.clientName}
                </span>
              </div>
              <div
                className="flex
                items-center
                justify-between"
              >
                <div className="flex flex-col gap-[0.9rem]">
                  <p
                    className="text-[1.3rem]
                    font-[500] leading-[1.5rem]
                    tracking-[-0.1px]
                    text-invoicePText-light"
                  >
                    <span className="text-[#888eb0]">Due </span>
                    {formDate(item.createdAt)}
                  </p>
                  <p
                    className="text-[1.5rem]
                    font-bold leading-[2.4rem]
                    tracking-[-0.25px]
                    text-invoiceHeaderText-light"
                  >
                    £{item.total}
                  </p>
                </div>
                <div
                  className={`px-[3rem] pt-[1.4rem] pb-[1.1rem]
                  rounded-[0.6rem]
                  text-[1.5rem] font-bold leading-[1.5rem]
                  tracking-[-0.25px]
                  flex items-center gap-[0.8rem] ${
                    item.status.toLowerCase() === "paid"
                      ? "bg-paidButton-light/5 text-paidButton-light"
                      : item.status.toLowerCase() === "pending"
                      ? "bg-pendingButton-light/5 text-pendingButton-light"
                      : "bg-[#373b53]/5 text-header-light"
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
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
