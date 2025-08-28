import { useDataContext } from "../context/InvoicesContext";
import { useNavigate } from "react-router-dom";
export default function Delete({
  invoiceId,
  setShowDelete,
}: {
  invoiceId: string;
  setShowDelete: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { setData } = useDataContext();
  const navigate = useNavigate();
  const handleDelete = () => {
    setData((prev) => prev.filter((invoiceObj) => invoiceObj.id !== invoiceId));
    navigate("/");
  };
  return (
    <div
      className="absolute pt-[3.4rem] pb-[3.2rem]
        px-[3.2rem] bg-white rounded-[0.8rem]
        shadow-[0_10px_10px_-10px_rgba(72,84,159,0.10)]
        transition-all duration-300 dark:bg-[#132139]
        w-[32.7rem] md:w-[48rem]
        md:pt-[5.1rem] md:px-[4.8rem]
        md:pb-[4.8rem]
        "
    >
      <h1
        className="text-[2.4rem]
        font-bold leading-[3.2rem]
        tracking-[-0.5px]
        text-[#0c0e16]
        mb-[0.8rem]
        md:mb-[1.2rem]
        transition-all duration-300 dark:text-white"
      >
        Confirm Deletion
      </h1>
      <p
        className="text-[1.3rem]
        font-[500] leading-[2.2rem]
        tracking-[-0.1px]
        text-[#888eb0] mb-[2.2rem]
        md:mb-[1.4rem]
        transition-all duration-300 dark:text-[#dfe3fa]"
      >
        Are you sure you want to delete invoice #{invoiceId}? This action cannot
        be undone.
      </p>
      <div
        className="flex
        justify-end
        gap-[0.8rem]"
      >
        <button
          type="button"
          className="flex items-center
          pt-[1.8rem] pb-[1.5rem] px-[2.4rem]
          bg-[#f9fafe] rounded-[2.4rem]
          text-[1.5rem] font-bold leading-[1.5rem]
          tracking-[-0.25px] text-[#7e88c3]
          cursor-pointer
          transition-all duration-300 dark:bg-[#252945]
          dark:text-[#dfe3fa]"
          onClick={() => setShowDelete(false)}
        >
          Cancel
        </button>
        <button
          type="button"
          className="flex items-center
          pt-[1.8rem] pb-[1.5rem] px-[2.4rem]
          bg-[#ec5757] rounded-[2.4rem]
          text-[1.5rem] font-bold leading-[1.5rem]
          tracking-[-0.25px] text-white
          cursor-pointer"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
