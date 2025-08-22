import { useDataContext } from "../context/InvoicesContext";
import { useForm } from "react-hook-form";
export default function EditInvoice({
  invoiceId,
  goBack,
}: {
  invoiceId: string;
  goBack: () => void;
}) {
  const { data } = useDataContext();
  const invoice = data.find((item) => item.id === invoiceId);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  return (
    <div
      className="absolute top-0 left-0
        bg-white"
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
      <h6>Edit #{invoice?.id}</h6>
      <form>
        <span>Bill From</span>
        <label htmlFor="address">
          <input type="text" id="address" />
        </label>
        <div>
          <label htmlFor="city">
            <input type="text" id="city" />
          </label>
          <label htmlFor="postCode">
            <input type="text" id="postCode" />
          </label>
        </div>
        <label htmlFor="clientName">
          <input type="text" id="clientName" />
        </label>
        <span>Bill To</span>
        <label htmlFor="email">
          <input type="text" id="email" />
        </label>
        <label htmlFor="clientAddress">
          <input type="text" id="clientAddress" />
        </label>
        <div>
          <label htmlFor="clientCity">
            <input type="text" id="clientCity" />
          </label>
          <label htmlFor="clientPostCode">
            <input type="text" id="clientPostCode" />
          </label>
        </div>
        <label htmlFor="clientCountry">
          <input type="text" id="clientCountry" />
        </label>
        <label htmlFor="invoiceDate">
          <input type="text" id="invoiceDate" />
        </label>
      </form>
    </div>
  );
}
