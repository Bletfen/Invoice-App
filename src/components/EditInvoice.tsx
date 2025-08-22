import { useDataContext } from "../context/InvoicesContext";
import { useForm, type SubmitHandler } from "react-hook-form";
export default function EditInvoice({
  invoiceId,
  goBack,
  setShowEdit,
}: {
  invoiceId: string;
  goBack: () => void;
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { data, setData } = useDataContext();
  const updateInvoice = (id: string, updated: IInvoice) => {
    setData((prev) => prev.map((inv) => (inv.id === id ? updated : inv)));
  };
  const invoice = data.find((item) => item.id === invoiceId);
  if (!invoice) return;
  type Inputs = {
    senderAddress: {
      street: string;
      city: string;
      postCode: string;
      country: string;
    };
    clientName: string;
    clientEmail: string;
    clientAddress: {
      street: string;
      city: string;
      postCode: string;
      country: string;
    };
    description: string;
  };
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    const updatedInvoice = {
      ...invoice,
      senderAddress: formData.senderAddress,
    };
    updateInvoice(invoiceId, updatedInvoice);
    setShowEdit(false);
  };
  return (
    <div
      className="absolute -top-13 left-0
        bg-white pt-[3.3rem]
        px-[2.4rem] w-full
        h-screen"
    >
      <div
        className="flex gap-[2.3rem]
        items-center cursor-pointer
        mb-[2.6rem]"
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
      <h6
        className="text-[2.4rem]
        font-bold leading-[3.2rem] tracking-[-0.5px]
        mb-[2.2rem]"
      >
        Edit #{invoice?.id}
      </h6>
      <form
        id="editInvoiceForm"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col"
      >
        <span
          className="text-[1.5rem]
          font-bold leading-[1.5rem]
          tracking-[-0.25px] text-[#7c5dfa]
          mb-[2.4rem]"
        >
          Bill From
        </span>
        <label
          htmlFor="address"
          className="flex flex-col
          text-[1.3rem] font-[500] leading-[1.5rem] tracking-[-0.1px]
          text-[#7e88c3]
          gap-[0.9rem] mb-[2.5rem]"
        >
          Street Address
          <div
            className="px-[2rem] pt-[1.8rem] pb-[1.5rem]
            border border-[#dfe3fa] rounded-[0.4rem]"
          >
            <input
              type="text"
              id="address"
              defaultValue={invoice.senderAddress.street}
              {...register("senderAddress.street")}
              className="text-[1.5rem]
            font-bold leading-[1.5rem]
            tracking-[-0.25px]
            text-[#0c0e16] outline-none"
            />
          </div>
        </label>
        <div
          className="grid grid-cols-2 gap-[2.3rem]
          mb-[2.5rem]"
        >
          <label
            htmlFor="city"
            className="flex flex-col
            text-[1.3rem] font-[500] leading-[1.5rem] tracking-[-0.1px]
            text-[#7e88c3] gap-[0.9rem]"
          >
            City
            <div
              className="px-[2rem] pt-[1.8rem] pb-[1.5rem]
              border border-[#dfe3fa] rounded-[0.4rem]"
            >
              <input
                type="text"
                id="city"
                defaultValue={invoice.senderAddress.city}
                {...register("senderAddress.city")}
                className="text-[1.5rem]
              font-bold leading-[1.5rem]
              tracking-[-0.25px]
              text-[#0c0e16] outline-none"
              />
            </div>
          </label>
          <label
            htmlFor="postCode"
            className="flex flex-col
            text-[1.3rem] font-[500] leading-[1.5rem] tracking-[-0.1px]
            text-[#7e88c3] gap-[0.9rem]"
          >
            Post Code
            <div
              className="px-[2rem] pt-[1.8rem] pb-[1.5rem]
              border border-[#dfe3fa] rounded-[0.4rem]"
            >
              <input
                type="text"
                id="postCode"
                defaultValue={invoice.senderAddress.postCode}
                {...register("senderAddress.postCode")}
                className="text-[1.5rem]
              font-bold leading-[1.5rem]
              tracking-[-0.25px]
              text-[#0c0e16] outline-none"
              />
            </div>
          </label>
        </div>
        <label
          htmlFor="country"
          className="flex flex-col
          text-[1.3rem] font-[500] leading-[1.5rem] tracking-[-0.1px]
          text-[#7e88c3] gap-[0.9rem] mb-[4.1rem]"
        >
          Country
          <div
            className="px-[2rem] pt-[1.8rem] pb-[1.5rem]
            border border-[#dfe3fa] rounded-[0.4rem]"
          >
            <input
              type="text"
              id="country"
              defaultValue={invoice.senderAddress.country}
              {...register("senderAddress.country")}
              className="text-[1.5rem]
              font-bold leading-[1.5rem]
              tracking-[-0.25px]
              text-[#0c0e16] outline-none"
            />
          </div>
        </label>

        <span
          className="text-[1.5rem]
          font-bold leading-[1.5rem]
          tracking-[-0.25px] text-[#7c5dfa]
          mb-[2.4rem]"
        >
          Bill To
        </span>
        <label
          htmlFor="clientName"
          className="flex flex-col
          text-[1.3rem] font-[500] leading-[1.5rem] tracking-[-0.1px]
          text-[#7e88c3] gap-[0.9rem] mb-[2.5rem]"
        >
          Client's Name
          <div
            className="px-[2rem] pt-[1.8rem] pb-[1.5rem]
            border border-[#dfe3fa] rounded-[0.4rem]"
          >
            <input
              type="text"
              id="clientName"
              defaultValue={invoice.clientName}
              {...register("clientName")}
              className="text-[1.5rem]
              font-bold leading-[1.5rem]
              tracking-[-0.25px]
              text-[#0c0e16] outline-none"
            />
          </div>
        </label>
        <label
          htmlFor="email"
          className="flex flex-col
          text-[1.3rem] font-[500] leading-[1.5rem] tracking-[-0.1px]
          text-[#7e88c3] gap-[0.9rem] mb-[2.5rem]"
        >
          Client's Email
          <div
            className="px-[2rem] pt-[1.8rem] pb-[1.5rem]
            border border-[#dfe3fa] rounded-[0.4rem]"
          >
            <input
              type="text"
              id="email"
              defaultValue={invoice.clientEmail}
              {...register("clientEmail")}
              className="text-[1.5rem]
              font-bold leading-[1.5rem]
              tracking-[-0.25px]
              text-[#0c0e16] outline-none"
            />
          </div>
        </label>
        <label
          htmlFor="clientAddress"
          className="flex flex-col
          text-[1.3rem] font-[500] leading-[1.5rem] tracking-[-0.1px]
          text-[#7e88c3] gap-[0.9rem] mb-[2.5rem]"
        >
          Street Address
          <div
            className="px-[2rem] pt-[1.8rem] pb-[1.5rem]
            border border-[#dfe3fa] rounded-[0.4rem]"
          >
            <input
              type="text"
              id="clientAddress"
              defaultValue={invoice.clientAddress.street}
              {...register("clientAddress.street")}
              className="text-[1.5rem]
              font-bold leading-[1.5rem]
              tracking-[-0.25px]
              text-[#0c0e16] outline-none"
            />
          </div>
        </label>
        <div
          className="grid grid-cols-2 gap-[2.3rem]
          mb-[2.5rem]"
        >
          <label
            htmlFor="clientCity"
            className="flex flex-col
            text-[1.3rem] font-[500] leading-[1.5rem] tracking-[-0.1px]
            text-[#7e88c3] gap-[0.9rem]"
          >
            City
            <div
              className="px-[2rem] pt-[1.8rem] pb-[1.5rem]
              border border-[#dfe3fa] rounded-[0.4rem]"
            >
              <input
                type="text"
                id="clientCity"
                defaultValue={invoice.clientAddress.city}
                {...register("clientAddress.city")}
                className="text-[1.5rem]
                font-bold leading-[1.5rem]
                tracking-[-0.25px]
                text-[#0c0e16]"
              />
            </div>
          </label>
          <label
            htmlFor="clientPostCode"
            className="flex flex-col
            text-[1.3rem] font-[500] leading-[1.5rem] tracking-[-0.1px]
            text-[#7e88c3] gap-[0.9rem]"
          >
            Post Code
            <div
              className="px-[2rem] pt-[1.8rem] pb-[1.5rem]
              border border-[#dfe3fa] rounded-[0.4rem]"
            >
              <input
                type="text"
                id="clientPostCode"
                defaultValue={invoice.clientAddress.postCode}
                {...register("clientAddress.postCode")}
                className="text-[1.5rem]
                font-bold leading-[1.5rem]
                tracking-[-0.25px]
                text-[#0c0e16]"
              />
            </div>
          </label>
        </div>
        <label
          htmlFor="clientCountry"
          className="flex flex-col
          text-[1.3rem] font-[500] leading-[1.5rem] tracking-[-0.1px]
          text-[#7e88c3] gap-[0.9rem] mb-[2.5rem]"
        >
          Country
          <div
            className="px-[2rem] pt-[1.8rem] pb-[1.5rem]
              border border-[#dfe3fa] rounded-[0.4rem]"
          >
            <input
              type="text"
              id="clientCountry"
              defaultValue={invoice.clientAddress.country}
              {...register("clientAddress.country")}
              className="text-[1.5rem]
              font-bold leading-[1.5rem]
              tracking-[-0.25px]
              text-[#0c0e16]"
            />
          </div>
        </label>
        <div>
          <span>Invoice Date</span>
          <div>
            <span>{invoice?.createdAt}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.3334 2H14C15.1027 2 16 2.89734 16 4V14C16 15.1027 15.1027 16 14 16H2C0.897339 16 0 15.1027 0 14V4C0 2.89734 0.897339 2 2 2H2.66663V0.666626C2.66663 0.298706 2.96533 0 3.33337 0H4C4.36804 0 4.66663 0.298706 4.66663 0.666626V2H11.3334V0.666626C11.3334 0.298706 11.632 0 12 0H12.6666C13.0347 0 13.3334 0.298706 13.3334 0.666626V2ZM14 14.6666C14.3673 14.6666 14.6666 14.3673 14.6666 14V6.69336H1.33337V14C1.33337 14.3673 1.63269 14.6666 2 14.6666H14Z"
                fill="#7E88C3"
              />
            </svg>
          </div>
        </div>
        <div>
          <span>Payment Terms</span>
          <div>
            Net 30 Days
            <svg
              width="11"
              height="7"
              viewBox="0 0 11 7"
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
        </div>
        <button type="submit" form="editInvoiceForm">
          Save
        </button>
      </form>
    </div>
  );
}
