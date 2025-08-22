import { useNavigate, useParams } from "react-router-dom";
import { useDataContext } from "../context/InvoicesContext";
import EditInvoice from "../components/EditInvoice";
import { useState } from "react";
export default function Invoice() {
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useDataContext();
  const getInvoice = data.find((item) => item.id === id)!;
  console.log(getInvoice);
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div
      className="bg-[#f8f8fb]
      relative min-h-screen"
    >
      <div
        className="mt-[3.3rem]
      px-[2.4rem]"
      >
        <div
          className="flex gap-[2.3rem]
        items-center cursor-pointer
        "
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
        rounded-[0.8rem] mt-[3.1rem]
        shadow-[0_10px_10px_-10px_rgba(72,84,159,0.1)]
        "
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
        <div
          className="p-[2.4rem] bg-white rounded-[0.8rem]
        shadow-[0_10px_10px_-10px_rgba(72,84,159,0.1)]
        mt-[1.6rem]"
        >
          <div>
            <div>
              <h3>#{getInvoice.id}</h3>
              <span>{getInvoice.description}</span>
            </div>
            <div className="flex flex-col">
              <span>{getInvoice.senderAddress.street}</span>
              <span>{getInvoice.senderAddress.city}</span>
              <span>{getInvoice.senderAddress.postCode}</span>
              <span>{getInvoice.senderAddress.country}</span>
            </div>
            <div>
              <div>
                <span>Invoice Date</span>
                <span>{getInvoice.createdAt}</span>
              </div>
              <div>
                <span>Payment Due</span>
                <span>{getInvoice.paymentDue}</span>
              </div>
              <div>
                <div>
                  <span>Bill to</span>
                  <span>{getInvoice.clientName}</span>
                </div>
                <div>
                  <span>{getInvoice.clientAddress.street}</span>
                  <span>{getInvoice.clientAddress.city}</span>
                  <span>{getInvoice.clientAddress.postCode}</span>
                  <span>{getInvoice.clientAddress.country}</span>
                </div>
              </div>
              <div>
                <span>Sent to</span>
                <span>{getInvoice.clientEmail}</span>
              </div>
            </div>
            <div
              className="px-[2.4rem] pt-[2.5rem] pb-[2.3rem
            bg-[#f9fafe] rounded-t-[0.8rem]"
            >
              <div>
                {getInvoice.items.map((item) => (
                  <>
                    <div>
                      <h4>{item.name}</h4>
                      <p>
                        {item.quantity} x £ {item.price}
                      </p>
                    </div>
                  </>
                ))}
              </div>
            </div>
            <div
              className="px-[2.4rem] pt-[2.6rem] pb-[2.2rem
            bg-[#373b53] rounded-b-[0.8rem]"
            >
              <span>Grand Total</span>
              <h5>£ {getInvoice.total}</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div
          className="px-[2.4rem]
          flex gap-[0.8rem]
          text-[1.5rem] font-bold
          leading-[1.5rem] tracking-[-0.25px]
          text-white"
        >
          <button
            className="
            pt-[1.8rem] pb-[1.5rem]
            bg-[#f9fafe]
            pl-[2.4rem] pr-[2.3rem]
            rounded-[2.4rem]
            text-[#7e88c3]
            cursor-pointer"
            onClick={() => setShowEdit((prev) => !prev)}
          >
            Edit
          </button>
          <button
            className="
            pt-[1.8rem] pb-[1.5rem]
            bg-[#ec5757]
            pl-[2.5rem] pr-[2.4rem]
            rounded-[2.4rem]
            cursor-pointer"
          >
            Delete
          </button>
          <button
            className="
            pt-[1.8rem] pb-[1.5rem]
            bg-[#7c5dfa]
            pl-[2.7rem] pr-[2.8rem]
            rounded-[2.4rem]
            cursor-pointer"
          >
            Mark as Paid
          </button>
        </div>
      </div>
      {showEdit ? (
        <EditInvoice invoiceId={getInvoice.id} goBack={goBack} />
      ) : null}
    </div>
  );
}
