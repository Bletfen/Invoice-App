export default function PaymentTerms({
  setSelectedPaymentTerms,
  setIsOpenNetDay,
}: {
  setSelectedPaymentTerms: React.Dispatch<React.SetStateAction<number>>;
  setIsOpenNetDay: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const paymentTermsArray: number[] = [1, 7, 14, 30];
  const handlePaymentTermSelect = (terms: number) => {
    setSelectedPaymentTerms(terms);
    setIsOpenNetDay(false);
  };
  return (
    <div
      className="
                    absolute top-33 w-full
                    flex flex-col py-[1.6rem]
                    bg-white rounded-[0.8rem]
                    shadow-[0_10px_20px_0px_rgba(72,84,159,0.25)]
                    text-[1.5rem] font-bold leading-[1.5rem]
                    tracking-[-0.25px] text-[#0c0e16]
                    gap-[1.5rem]
                    "
    >
      {paymentTermsArray.map((net, index) => (
        <div key={net}>
          <p
            className="pl-[2.4rem] hover:text-[#7c5dfa] hover:opacity-[1]
                    "
            onClick={(e) => {
              e.stopPropagation();
              handlePaymentTermSelect(net);
            }}
          >
            Net {net} Day{net !== 1 ? "s" : ""}
          </p>
          {index < paymentTermsArray.length - 1 ? (
            <div className="w-full h-px bg-[#dfe3fa] mt-[1.5rem]"></div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
