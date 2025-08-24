import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { useDataContext, useFormDate } from "../context/InvoicesContext";
export default function Invoice() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, setData } = useDataContext();
  const { formDate } = useFormDate();
  const getInvoice = data.find((item) => item.id === id)!;

  const goBack = () => {
    navigate("/");
  };
  const handleDelete = () => {
    setData((prev) => prev.filter((invoiceObj) => invoiceObj.id !== id));
    navigate("/");
  };
  const handleMarkAsPaid = (invoiceId: string) => {
    setData((prev) =>
      prev.map(
        (invoice): IInvoice =>
          invoice.id === invoiceId
            ? {
                ...invoice,
                status: "Paid",
                paymentDue: new Date().toISOString().split("T")[0], // Add paid date
              }
            : invoice
      )
    );
  };
  return (
    <div
      className="bg-[#f8f8fb]
      relative min-h-screen flex flex-col
      justify-between"
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
            <div className="flex flex-col gap-[0.4rem] mb-[3rem]">
              <h3
                className="text-[1.5rem] font-bold
                leading-[1.5rem] tracking-[-0.25px]
                text-[#0c0e16]"
              >
                <span className="text-[#7e88c3]">#</span>
                {getInvoice.id}
              </h3>
              <span
                className="text-[1.5rem] font-[500]
                leading-[1.5rem] tracking-[-0.25px]
                text-[#7e88c3]"
              >
                {getInvoice.description}
              </span>
            </div>
            <div
              className="flex flex-col
              text-[1.3rem] font-[500]
              leading-[1.8rem] tracking-[-0.1px]
              text-[#7e88c3] mb-[3.1rem]"
            >
              <span>{getInvoice.senderAddress.street}</span>
              <span>{getInvoice.senderAddress.city}</span>
              <span>{getInvoice.senderAddress.postCode}</span>
              <span>{getInvoice.senderAddress.country}</span>
            </div>
            <div
              className="flex items-center gap-[6.2rem]
              mb-[3.2rem]"
            >
              <div className="flex flex-col gap-[3.1rem]">
                <div className="flex flex-col gap-[1.3rem]">
                  <span
                    className="text-[1.5rem] font-[500]
                  leading-[1.5rem] tracking-[-0.25px]
                  text-[#7e88c3]"
                  >
                    Invoice Date
                  </span>
                  <span
                    className="text-[1.5rem] font-bold
                    leading-[2rem] tracking-[-0.25px]
                    text-[#0c0e16]"
                  >
                    {formDate(getInvoice.createdAt)}
                  </span>
                </div>
                <div className="flex flex-col gap-[1.3rem]">
                  <span
                    className="text-[1.5rem] font-[500]
                    leading-[1.5rem] tracking-[-0.25px]
                    text-[#7e88c3]"
                  >
                    Payment Due
                  </span>
                  <span
                    className="text-[1.5rem] font-bold
                    leading-[2rem] tracking-[-0.25px]
                    text-[#0c0e16]"
                  >
                    {formDate(getInvoice.paymentDue)}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-[0.7rem]">
                <div className="flex flex-col gap-[1.3rem]">
                  <span
                    className="text-[1.5rem] font-[500]
                    leading-[1.5rem] tracking-[-0.25px]
                    text-[#7e88c3]"
                  >
                    Bill to
                  </span>
                  <span
                    className="text-[1.5rem] font-bold
                    leading-[2rem] tracking-[-0.25px]
                    text-[#0c0e16]"
                  >
                    {getInvoice.clientName}
                  </span>
                </div>
                <div
                  className="flex flex-col
                  text-[1.5rem] font-[500]
                  leading-[1.8rem] tracking-[-0.25px]
                  text-[#7e88c3]"
                >
                  <span>{getInvoice.clientAddress.street}</span>
                  <span>{getInvoice.clientAddress.city}</span>
                  <span>{getInvoice.clientAddress.postCode}</span>
                  <span>{getInvoice.clientAddress.country}</span>
                </div>
              </div>
            </div>
            <div
              className="flex flex-col gap-[1.3rem]
              mb-[3.8rem]"
            >
              <span
                className="text-[1.5rem] font-[500]
                leading-[1.8rem] tracking-[-0.25px]
                text-[#7e88c3]"
              >
                Sent to
              </span>
              <span
                className="text-[1.5rem] font-bold
                leading-[2rem] tracking-[-0.25px]
                text-[#0c0e16]"
              >
                {getInvoice.clientEmail}
              </span>
            </div>
            <div
              className="px-[2.4rem] pt-[2.5rem]
              bg-[#f9fafe] rounded-t-[0.8rem]"
            >
              <div
                className="flex flex-col pb-[2.3rem]
                gap-[2.4rem]"
              >
                {getInvoice.items.map((item) => (
                  <div
                    className="flex justify-between
                    items-center"
                  >
                    <div className="flex flex-col gap-[0.8rem]">
                      <h4
                        className="text-[1.5rem] font-bold
                        leading-[1.5rem] tracking-[-0.25px]
                        text-[#0c0e16]"
                      >
                        {item.name}
                      </h4>
                      <p
                        className="text-[1.5rem]
                        font-bold leading-[1.5rem] tracking-[-0.25px]
                        text-[#7e88c3]"
                      >
                        {item.quantity} x £ {item.price.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p
                        className="text-[1.5rem] font-bold
                        leading-[1.5rem] tracking-[-0.25px]
                        text-[#0c0e16]"
                      >
                        £ {(item.quantity * item.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="px-[2.4rem] pt-[2.6rem]
              bg-[#373b53] rounded-b-[0.8rem] pb-[2.2rem]
              flex justify-between items-center"
            >
              <span
                className="text-[1.3rem] font-[500]
                leading-[1.8rem] tracking-[-0.1px]
                text-white"
              >
                Grand Total
              </span>
              <h5
                className="text-[2.4rem] font-bold
                leading-[3.2rem] tracking-[-0.5px]
                text-white"
              >
                £ {getInvoice.total.toFixed(2)}
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div
        className="bg-white py-[2.1rem]
        flex justify-center mt-[5.6rem] items-center"
      >
        <div
          className="px-[2.4rem]
          flex gap-[0.8rem]
          text-[1.5rem] font-bold
          leading-[1.5rem] tracking-[-0.25px]
          text-white"
        >
          <Link
            to={"edit"}
            className="
            pt-[1.8rem] pb-[1.5rem]
            bg-[#f9fafe]
            pl-[2.4rem] pr-[2.3rem]
            rounded-[2.4rem]
            text-[#7e88c3]
            cursor-pointer"
          >
            Edit
          </Link>
          <button
            className="
            pt-[1.8rem] pb-[1.5rem]
            bg-[#ec5757]
            pl-[2.5rem] pr-[2.4rem]
            rounded-[2.4rem]
            cursor-pointer"
            onClick={handleDelete}
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
            onClick={() => handleMarkAsPaid(getInvoice.id)}
          >
            Mark as Paid
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
