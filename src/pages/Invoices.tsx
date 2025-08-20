import { Link } from "react-router-dom";
import dataBase from "../../data.json";
export default function Invoices() {
  return (
    <div>
      <div>
        <div>
          <h1>Invoices</h1>
          <span>7 invoices</span>
        </div>
        <div>
          <span>Filter</span>
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
        <button>
          <div>
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
      <div className="flex flex-col">
        {dataBase.map((item) => (
          <Link key={item.id} to={item.id}>
            <div
              className="pt-[2.4rem] pb-[2.2rem]
              px-[2.4rem]"
            >
              <div className="flex">
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
                    {item.createdAt}
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
                items-center"
              >
                <div className="flex flex-col gap-[0.9rem]">
                  <p
                    className="text-[1.3rem]
                    font-[500] leading-[1.5rem]
                    tracking-[-0.1px]
                    text-invoicePText-light"
                  >
                    <span className="text-[#888eb0]">Due </span>
                    {item.createdAt}
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
                <button
                  className={`px-[3rem] pt-[1.4rem] pb-[1.1rem]
                  bg-paidButton-light rounded-[0.6rem]
                  text-[1.5rem] font-bold leading-[1.5rem]
                  tracking-[-0.25px]
                  flex items-center ${
                    item.status.toLowerCase() === "paid"
                      ? "bg-paidButton-light"
                      : item.status.toLowerCase() === "pending"
                      ? "bg-pendingButton-light"
                      : "bg-draftButton-light"
                  }`}
                >
                  <div
                    className="w-[0.8rem] h-[0.8rem] 
                    bg-black rounded-full"
                  ></div>
                  {item.status}
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
