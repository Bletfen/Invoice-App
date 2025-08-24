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
        px-[3.2rem] bg-white
        "
    >
      <h1 className="">Confirm Deletion</h1>
      <p>
        Are you sure you want to delete invoice #{invoiceId}? This action cannot
        be undone.
      </p>
      <div>
        <button
          type="button"
          className="flex items-center
          pt-[1.8rem] pb-[1.5rem] px-[2.65rem]
          bg-[#f9fafe] rounded-[2.4rem]
          text-[1.5rem] font-bold leading-[1.5rem]
          tracking-[-0.25px] text-[#7e88c3]
          cursor-pointer"
          onClick={() => setShowDelete(false)}
        >
          Cancel
        </button>
        <button
          type="button"
          className="flex items-center
          pt-[1.8rem] pb-[1.5rem] px-[2.65rem]
          bg-[#373b53] rounded-[2.4rem]
          text-[1.5rem] font-bold leading-[1.5rem]
          tracking-[-0.25px] text-[#888eb0]
          cursor-pointer"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
