import { Link } from "react-router-dom";

export default function InvoiceButtons({
  setShowDelete,
  handleMarkAsPaid,
  invoiceId,
}: {
  setShowDelete: React.Dispatch<React.SetStateAction<boolean>>;
  handleMarkAsPaid: (invoiceId: string) => void;
  invoiceId: string;
}) {
  return (
    <div
      className="bg-white py-[2.1rem]
        flex justify-center mt-[5.6rem] items-center
        md:mt-[unset] md:py-[unset]
        transition-all duration-300
        dark:bg-[#1e2139]
        "
    >
      <div
        className="px-[2.4rem]
          flex gap-[0.8rem]
          text-[1.5rem] font-bold
          leading-[1.5rem] tracking-[-0.25px]
          text-white
          md:px-[unset]"
      >
        <Link
          to={"edit"}
          className="
            pt-[1.8rem] pb-[1.5rem]
            bg-[#f9fafe]
            pl-[2.4rem] pr-[2.3rem]
            rounded-[2.4rem]
            text-[#7e88c3]
            cursor-pointer
            transition-all duration-300
            hover:bg-[#dfe3fa]
            dark:bg-[#252945]
            dark:text-[#dfe3fa]
            hover:dark:bg-white
            dark:hover:text-[#7e88c3]"
        >
          Edit
        </Link>
        <button
          className="
            pt-[1.8rem] pb-[1.5rem]
            bg-[#ec5757]
            pl-[2.5rem] pr-[2.4rem]
            rounded-[2.4rem]
            cursor-pointer
            transition-all duration-300
            hover:bg-[#ff9797]"
          onClick={() => setShowDelete(true)}
        >
          Delete
        </button>
        <button
          className="
            pt-[1.8rem] pb-[1.5rem]
            bg-[#7c5dfa]
            pl-[2.7rem] pr-[2.8rem]
            rounded-[2.4rem]
            cursor-pointer
            transition-all duration-300
            hover:bg-[#9277ff]"
          onClick={() => handleMarkAsPaid(invoiceId)}
        >
          Mark as Paid
        </button>
      </div>
    </div>
  );
}
