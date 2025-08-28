import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useDataContext, useFormDate } from "../context/InvoicesContext";
import { useState } from "react";
import Delete from "../components/Delete";
import InvoiceButtons from "../components/InvoiceButtonsHeaders";
import InvoiceHeaderStatus from "../components/InvoiceHeaderStatus";

export default function Invoice() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, setData } = useDataContext();
  const { formDate } = useFormDate();
  const getInvoice = data.find((item) => item.id === id)!;
  const goBack = () => {
    navigate("/");
  };
  const [showDelete, setShowDelete] = useState<boolean>(false);

  const handleMarkAsPaid = (invoiceId: string) => {
    setData((prev) =>
      prev.map(
        (invoice): IInvoice =>
          invoice.id === invoiceId && invoice.status !== "Paid"
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
      className="
      relative min-h-screen flex flex-col
      xl:max-w-[73rem]
      xl:mx-auto
      md:pb-[13.5rem]
      xl:pb-[5.3rem]"
    >
      <div
        className="mt-[3.3rem]
        md:mt-[4.9rem]
        px-[2.4rem]"
      >
        <div
          className="flex gap-[2.3rem]
          items-center cursor-pointer
          group transition-all duration-300
          w-[9rem]
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
              strokeWidth="2"
            />
          </svg>
          <span
            className="text-[1.5rem] text-invoiceHeaderText-light
            font-bold leading-[1.5rem] tracking-[-0.25px]
            group-hover:text-[#7e88c3]
            transition-all duration-300
            dark:text-white"
          >
            Go back
          </span>
        </div>
        <InvoiceHeaderStatus getInvoice={getInvoice}>
          <InvoiceButtons
            setShowDelete={setShowDelete}
            handleMarkAsPaid={handleMarkAsPaid}
            invoiceId={getInvoice.id}
          />
        </InvoiceHeaderStatus>
        <div
          className="p-[2.4rem] bg-white rounded-[0.8rem]
          shadow-[0_10px_10px_-10px_rgba(72,84,159,0.1)]
          mt-[1.6rem] md:mt-[2.4rem]
          md:pt-[3.3rem] md:pb-[4.8rem]
          md:px-[3.2rem]
          transition-all duration-300
          dark:bg-[#1e2139]"
        >
          <div>
            <div
              className="md:flex md:justify-between
              md:mb-[2.1rem]"
            >
              <div
                className="flex flex-col gap-[0.4rem]
                md:gap-[0.7rem] mb-[3rem]
                md:mb-[unset]"
              >
                <h3
                  className="text-[1.5rem] font-bold
                leading-[1.5rem] tracking-[-0.25px]
                text-[#0c0e16]
                transition-all duration-300 dark:text-white"
                >
                  <span
                    className="text-[#7e88c3]
                  "
                  >
                    #
                  </span>
                  {getInvoice.id}
                </h3>
                <span
                  className="text-[1.5rem] font-[500]
                leading-[1.5rem] tracking-[-0.25px]
                text-[#7e88c3] transition-all duration-300
                dark:text-[#dfe3fa]"
                >
                  {getInvoice.description}
                </span>
              </div>
              <div
                className="flex flex-col
              text-[1.3rem] font-[500]
              leading-[1.8rem] tracking-[-0.1px]
              text-[#7e88c3] mb-[3.1rem] md:mb-[unset]
              transition-all duration-300 dark:text-[#dfe3fa]"
              >
                <span>{getInvoice.senderAddress.street}</span>
                <span>{getInvoice.senderAddress.city}</span>
                <span>{getInvoice.senderAddress.postCode}</span>
                <span>{getInvoice.senderAddress.country}</span>
              </div>
            </div>
            <div
              className="flex items-center gap-[6.2rem]
              mb-[3.2rem]
              flex-wrap
              md:items-start
              md:gap-[11.9rem]
              md:mb-[4.7rem]"
            >
              <div
                className="flex flex-col gap-[3.1rem]
                "
              >
                <div className="flex flex-col gap-[1.3rem]">
                  <span
                    className="text-[1.5rem] font-[500]
                  leading-[1.5rem] tracking-[-0.25px]
                  text-[#7e88c3]
                  transition-all duration-300 dark:text-[#dfe3fa]"
                  >
                    Invoice Date
                  </span>
                  <span
                    className="text-[1.5rem] font-bold
                    leading-[2rem] tracking-[-0.25px]
                    text-[#0c0e16]
                    transition-all duration-300 dark:text-white"
                  >
                    {formDate(getInvoice.createdAt)}
                  </span>
                </div>
                <div className="flex flex-col gap-[1.3rem]">
                  <span
                    className="text-[1.5rem] font-[500]
                    leading-[1.5rem] tracking-[-0.25px]
                    text-[#7e88c3]
                    transition-all duration-300 dark:text-[#dfe3fa]"
                  >
                    Payment Due
                  </span>
                  <span
                    className="text-[1.5rem] font-bold
                    leading-[2rem] tracking-[-0.25px]
                    text-[#0c0e16]
                    transition-all duration-300 dark:text-white"
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
                    text-[#7e88c3]
                    transition-all duration-300 dark:text-[#dfe3fa]"
                  >
                    Bill to
                  </span>
                  <span
                    className="text-[1.5rem] font-bold
                    leading-[2rem] tracking-[-0.25px]
                    text-[#0c0e16]
                    transition-all duration-300 dark:text-white"
                  >
                    {getInvoice.clientName}
                  </span>
                </div>
                <div
                  className="flex flex-col
                  text-[1.5rem] font-[500]
                  leading-[1.8rem] tracking-[-0.25px]
                  text-[#7e88c3]
                  transition-all duration-300 dark:text-[#dfe3fa]"
                >
                  <span>{getInvoice.clientAddress.street}</span>
                  <span>{getInvoice.clientAddress.city}</span>
                  <span>{getInvoice.clientAddress.postCode}</span>
                  <span>{getInvoice.clientAddress.country}</span>
                </div>
              </div>
              <div
                className="flex flex-col gap-[1.3rem]
              mb-[3.8rem]"
              >
                <span
                  className="text-[1.5rem] font-[500]
                leading-[1.8rem] tracking-[-0.25px]
                text-[#7e88c3]
                transition-all duration-300 dark:text-[#dfe3fa]"
                >
                  Sent to
                </span>
                <span
                  className="text-[1.5rem] font-bold
                leading-[2rem] tracking-[-0.25px]
                text-[#0c0e16]
                transition-all duration-300 dark:text-white"
                >
                  {getInvoice.clientEmail}
                </span>
              </div>
            </div>

            <div
              className="px-[2.4rem] pt-[2.5rem]
              bg-[#f9fafe] rounded-t-[0.8rem]
              md:p-[unset] md:pt-[3.3rem]
              md:pl-[3.2rem] md:pr-[3.4rem]
              md:pb-[3.9rem]
              transition-all duration-300 dark:bg-[#252945]"
            >
              <div
                className="flex flex-col pb-[2.3rem]
                gap-[2.4rem]"
              >
                <div
                  className="hidden md:flex
                  md:justify-between
                  text-[1.3rem] font-[500]
                  leading-[1.8rem] tracking-[-0.1px] text-[#7e8cc3]
                  transition-all duration-300 dark:text-[#dfe3fa]"
                >
                  <span>Item Name</span>
                  <div className="flex gap-[13rem]">
                    <span>QTY.</span>
                    <span>Price</span>
                    <span>Total</span>
                  </div>
                </div>
                {getInvoice.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between
                    items-center md:block
                    "
                  >
                    <div
                      className="flex flex-col 
                      md:flex-row md:justify-between
                      md:items-center"
                    >
                      <h4
                        className="text-[1.5rem] font-bold 
                        leading-[1.5rem] tracking-[-0.25px] 
                        text-[#0c0e16]
                        transition-all duration-300 dark:text-white"
                      >
                        {item.name}
                      </h4>
                      <div
                        className="hidden md:flex
                        md:items-center gap-[10rem]
                        "
                      >
                        <p
                          className="
                          md:w-[1rem]
                          text-[1.5rem] font-bold text-[#7e88c3]
                          flex gap-[0.3rem] md:gap-[unset]
                          transition-all duration-300 dark:text-[#dfe3fa]
                        "
                        >
                          {item.quantity}{" "}
                          <span className="block md:hidden">
                            x £ {item.price}
                          </span>
                        </p>
                        <div
                          className="md:w-[6.5rem]
                          flex justify-center"
                        >
                          <p
                            className="
                            hidden md:flex text-[1.5rem] font-bold text-[#7e88c3]
                            transition-all duration-300 dark:text-[#dfe3fa]"
                          >
                            <span>£</span> <span>{item.price.toFixed(2)}</span>
                          </p>
                        </div>
                        <div
                          className="md:w-[5rem]
                          flex justify-center"
                        >
                          <p
                            className="
                          md:w-[12rem]
                        hidden md:flex text-[1.5rem] font-bold text-[#0c0e16]
                        transition-all duration-300 dark:text-white
                        "
                          >
                            <span>£</span>
                            <span>
                              {(item.quantity * item.price).toFixed(2)}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="md:hidden">
                      <p
                        className="text-[1.5rem] font-bold
                        leading-[1.5rem] tracking-[-0.25px]
                        text-[#0c0e16] text-end
                        transition-all duration-300 dark:text-white"
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
              flex justify-between items-center
              md:px-[3.2rem] md:pt-[2.7rem] md:pb-[2.1rem]
              transition-all duration-300 dark:bg-[#0c0e16]"
            >
              <span
                className="text-[1.3rem] font-[500]
                leading-[1.8rem] tracking-[-0.1px]
                text-white
                transition-all duration-300"
              >
                Grand Total
              </span>
              <h5
                className="text-[2.4rem] font-bold
                leading-[3.2rem] tracking-[-0.5px]
                text-white
                transition-all duration-300"
              >
                £ {getInvoice.total.toFixed(2)}
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <InvoiceButtons
          setShowDelete={setShowDelete}
          handleMarkAsPaid={handleMarkAsPaid}
          invoiceId={getInvoice.id}
        />
      </div>
      {showDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Delete invoiceId={getInvoice.id} setShowDelete={setShowDelete} />
        </div>
      )}
      <Outlet />
    </div>
  );
}
