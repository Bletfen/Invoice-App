import type { ReactNode } from "react";
export default function InvoiceHeaderStatus({
  children,
  getInvoice,
}: {
  getInvoice: IInvoice;
  children: ReactNode;
}) {
  return (
    <div
      className="pt-[2.4rem] px-[2.4rem] pb-[2.7rem]
            bg-white
          rounded-[0.8rem] mt-[3.1rem]
          shadow-[0_10px_10px_-10px_rgba(72,84,159,0.1)]
          md:flex md:justify-between
          md:items-center
          md:py-[2rem] md:px-[3.2rem]
          transition-all duration-300
          dark:bg-[#1e2139]
        "
    >
      <div
        className="flex items-center justify-between
        md:justify-start
        md:gap-[2rem]"
      >
        <span
          className="
            text-[1.3rem] font-[500] leading-[1.5rem]
            tracking-[-0.1px] text-[#858bb2]
            transition-all duration-300 dark:text-[#dfe3fa]"
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
                      : "bg-[#f8f8fb]/90 text-[#373b53]"
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
      <div className="hidden md:flex">{children}</div>
    </div>
  );
}
