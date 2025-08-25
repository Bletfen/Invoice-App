export default function Nothing() {
  return (
    <div
      className="flex flex-col gap-[4.2rem]
        justify-center items-center
        mt-[10.2rem]"
    >
      <div className="">
        <img src="/assets/illustration-empty.svg" alt="illustration-empty" />
      </div>
      <div
        className="flex flex-col gap-[2.3rem]
        items-center"
      >
        <h1
          className="text-[2.4rem]
        font-bold tracking-[-0.75px]
        text-[#0c0e16]"
        >
          There is nothing here
        </h1>
        <p
          className="text-[1.3rem] font-[500] leading-[1.5rem]
            tracking-[-0.1px] text-[#888eb0]
            text-center"
        >
          Create an invoice by clicking the <br />
          <span className="font-bold">
            New <span className="hidden md:inline">Invoice</span>
          </span>{" "}
          button and get started
        </p>
      </div>
    </div>
  );
}
