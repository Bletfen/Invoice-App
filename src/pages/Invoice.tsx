import { useNavigate, useParams } from "react-router-dom";
import { useDataContext } from "../context/InvoicesContext";
export default function Invoice() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useDataContext();
  const getInvoice = data.find((item) => item.id === id)!;
  console.log(getInvoice);
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="mt-[3.3rem]">
      <div
        className="flex gap-[2.3rem]
        items-center cursor-pointer"
        onClick={goBack}
      >
        <svg
          width="6"
          height="11"
          viewBox="0 0 6 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.3418 0.885742L0.113895 5.11364L4.3418 9.34155"
            stroke="#7C5DFA"
            stroke-width="2"
          />
        </svg>
        <span
          className="text-[1.5rem] text-invoiceHeaderText-light
          font-bold leading-[1.5rem] tracking-[-0.25px]"
        >
          Go back
        </span>
      </div>
      <div
        className="pt-[2.4rem] px-[2.4rem] pb-[2.7rem]
        flex items-center justify-between bg-white
        rounded-[0.8rem] mt-[3.1rem]"
      >
        <span
          className="
          text-[1.3rem] font-[500] leading-[1.5rem]
          tracking-[-0.1px] text-[#858bb2]"
        >
          Status
        </span>
        <div
          className={`px-[3rem] pt-[1.4rem] pb-[1.1rem]
                  rounded-[0.6rem]
                  text-[1.5rem] font-bold leading-[1.5rem]
                  tracking-[-0.25px]
                  flex items-center gap-[0.8rem] ${
                    getInvoice.status.toLowerCase() === "paid"
                      ? "bg-paidButton-light/5 text-paidButton-light"
                      : getInvoice.status.toLowerCase() === "pending"
                      ? "bg-pendingButton-light/5 text-pendingButton-light"
                      : "bg-[#373b53]/5 text-header-light"
                  }`}
        >
          <div
            className={`w-[0.8rem] h-[0.8rem] rounded-full
            ${
              getInvoice.status.toLowerCase() === "paid"
                ? "bg-paidButton-light"
                : getInvoice.status.toLowerCase() === "pending"
                ? "bg-pendingButton-light"
                : "bg-header-light"
            }`}
          ></div>
          <span>{getInvoice.status}</span>
        </div>
      </div>
    </div>
  );
}
