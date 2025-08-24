import { useNavigate } from "react-router-dom";
import { useDataContext, useFormDate } from "../context/InvoicesContext";
import { useForm, useFieldArray } from "react-hook-form";
import Calendar from "../components/Calendar";
import { useState } from "react";

export default function NewInvoice() {
  const { setData } = useDataContext();
  const { formDate } = useFormDate();
  const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);
  const [isOpenNetDay, setIsOpenNetDay] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedPaymentTerms, setSelectedPaymentTerms] = useState<number>(0);

  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };

  const generateInvoiceId = (): string => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomLetters =
      letters.charAt(Math.floor(Math.random() * letters.length)) +
      letters.charAt(Math.floor(Math.random() * letters.length));
    const randomNumbers = Math.floor(1000 + Math.random() * 9000);
    return randomLetters + randomNumbers;
  };

  const calculatePaymentDue = (
    createdAt: string,
    paymentTerms: number
  ): string => {
    const createdDate = new Date(createdAt);
    const dueDate = new Date(createdDate);
    dueDate.setDate(createdDate.getDate() + paymentTerms);
    return dueDate.toISOString().split("T")[0];
  };

  const onSubmit = (values: Inputs, status: "Pending" | "Draft") => {
    const newTotal = values.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    const invoiceDate = selectedDate || new Date().toISOString().split("T")[0];
    const paymentDue = calculatePaymentDue(invoiceDate, selectedPaymentTerms);

    const newInvoice: IInvoice = {
      id: generateInvoiceId(),
      createdAt: invoiceDate,
      paymentDue: paymentDue,
      description: values.description,
      paymentTerms: selectedPaymentTerms,
      clientName: values.clientName,
      clientEmail: values.clientEmail,
      status: status,
      senderAddress: values.senderAddress,
      clientAddress: values.clientAddress,
      items: values.items,
      total: newTotal,
    };

    setData((prev) => [newInvoice, ...prev]);
    navigate("/");
  };

  const { register, control, handleSubmit, watch } = useForm<Inputs>({
    defaultValues: {
      senderAddress: {
        street: "",
        city: "",
        postCode: "",
        country: "",
      },
      clientName: "",
      clientEmail: "",
      clientAddress: {
        street: "",
        city: "",
        postCode: "",
        country: "",
      },
      description: "",
      items: [{ name: "", quantity: 0, price: 0, total: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const paymentTermsArray: number[] = [1, 7, 14, 30];

  const handlePaymentTermSelect = (terms: number) => {
    setSelectedPaymentTerms(terms);
    setIsOpenNetDay(false);
  };

  const handleSaveAsDraft = () => {
    handleSubmit((values) => onSubmit(values, "Draft"))();
  };

  const handleSaveAndSend = () => {
    handleSubmit((values) => onSubmit(values, "Pending"))();
  };

  return (
    <div
      className="absolute -top-13.5 left-0
        bg-white pt-[3.3rem]
        w-full
        min-h-full"
    >
      <div
        className="flex gap-[2.3rem]
        items-center cursor-pointer
        mb-[2.6rem] px-[2.4rem]"
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
          font-bold leading-[1.5rem] tracking-[-0.25px]"
        >
          Go back
        </span>
      </div>
      <h6
        className="text-[2.4rem]
        font-bold leading-[3.2rem] tracking-[-0.5px]
        mb-[2.2rem] px-[2.4rem]"
      >
        New Invoice
      </h6>
      <form id="newInvoiceForm" className="flex flex-col px-[2.4rem]">
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
            border border-[#dfe3fa] rounded-[0.4rem]
            focus-within:border-[#9277ff]"
          >
            <input
              type="text"
              id="address"
              placeholder="19 Union Terrace"
              {...register("senderAddress.street")}
              className="text-[1.5rem]
              font-bold leading-[1.5rem]
              tracking-[-0.25px]
              text-[#0c0e16] outline-none
              w-full"
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
              border border-[#dfe3fa] rounded-[0.4rem]
              focus-within:border-[#9277ff]"
            >
              <input
                type="text"
                id="city"
                placeholder="London"
                {...register("senderAddress.city")}
                className="text-[1.5rem]
                font-bold leading-[1.5rem]
                tracking-[-0.25px]
                text-[#0c0e16] outline-none
                w-full"
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
              border border-[#dfe3fa] rounded-[0.4rem]
              focus-within:border-[#9277ff]"
            >
              <input
                type="text"
                id="postCode"
                placeholder="E1 3EZ"
                {...register("senderAddress.postCode")}
                className="text-[1.5rem]
                font-bold leading-[1.5rem]
                tracking-[-0.25px]
                text-[#0c0e16] outline-none
                w-full"
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
            border border-[#dfe3fa] rounded-[0.4rem]
            focus-within:border-[#9277ff]"
          >
            <input
              type="text"
              id="country"
              placeholder="United Kingdom"
              {...register("senderAddress.country")}
              className="text-[1.5rem]
              font-bold leading-[1.5rem]
              tracking-[-0.25px]
              text-[#0c0e16] outline-none
              w-full"
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
            border border-[#dfe3fa] rounded-[0.4rem]
            focus-within:border-[#9277ff]"
          >
            <input
              type="text"
              id="clientName"
              placeholder="Alex Grim"
              {...register("clientName")}
              className="text-[1.5rem]
              font-bold leading-[1.5rem]
              tracking-[-0.25px]
              text-[#0c0e16] outline-none
              w-full"
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
            border border-[#dfe3fa] rounded-[0.4rem]
            focus-within:border-[#9277ff]"
          >
            <input
              type="email"
              id="email"
              placeholder="alexgrim@mail.com"
              {...register("clientEmail")}
              className="text-[1.5rem]
              font-bold leading-[1.5rem]
              tracking-[-0.25px]
              text-[#0c0e16] outline-none
              w-full"
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
            border border-[#dfe3fa] rounded-[0.4rem]
            focus-within:border-[#9277ff]"
          >
            <input
              type="text"
              id="clientAddress"
              placeholder="84 Church Way"
              {...register("clientAddress.street")}
              className="text-[1.5rem]
              font-bold leading-[1.5rem]
              tracking-[-0.25px]
              text-[#0c0e16] outline-none
              w-full"
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
              border border-[#dfe3fa] rounded-[0.4rem]
              focus-within:border-[#9277ff]"
            >
              <input
                type="text"
                id="clientCity"
                placeholder="Bradford"
                {...register("clientAddress.city")}
                className="text-[1.5rem]
                font-bold leading-[1.5rem]
                tracking-[-0.25px]
                text-[#0c0e16] outline-none
                w-full"
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
              border border-[#dfe3fa] rounded-[0.4rem]
              focus-within:border-[#9277ff]"
            >
              <input
                type="text"
                id="clientPostCode"
                placeholder="BD1 9PB"
                {...register("clientAddress.postCode")}
                className="text-[1.5rem]
                font-bold leading-[1.5rem]
                tracking-[-0.25px]
                text-[#0c0e16] outline-none
                w-full"
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
            border border-[#dfe3fa] rounded-[0.4rem]
            focus-within:border-[#9277ff]"
          >
            <input
              type="text"
              id="clientCountry"
              placeholder="United Kingdom"
              {...register("clientAddress.country")}
              className="text-[1.5rem]
              font-bold leading-[1.5rem]
              tracking-[-0.25px]
              text-[#0c0e16] outline-none
              w-full"
            />
          </div>
        </label>
        <div className="relative flex flex-col gap-[0.9rem] mb-[2.5rem]">
          <span
            className="text-[1.3rem] font-[500] leading-[1.5rem] tracking-[-0.1px]
            text-[#7e88c3]"
          >
            Invoice Date
          </span>
          <div
            className={`flex justify-between items-center
            px-[2rem] pt-[1.8rem] pb-[1.5rem]
            border rounded-[0.4rem]
            cursor-pointer ${
              isOpenCalendar ? "border-[#9277ff]" : "border-[#dfe3fa]"
            }`}
            onClick={() => setIsOpenCalendar((prev) => !prev)}
          >
            <span
              className="text-[1.5rem]
              font-bold leading-[1.5rem] tracking-[-0.25px]"
            >
              {selectedDate ? (
                <span>{formDate(selectedDate)}</span>
              ) : (
                <span className="opacity-[0.5]">Select Date</span>
              )}
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.3334 2H14C15.1027 2 16 2.89734 16 4V14C16 15.1027 15.1027 16 14 16H2C0.897339 16 0 15.1027 0 14V4C0 2.89734 0.897339 2 2 2H2.66663V0.666626C2.66663 0.298706 2.96533 0 3.33337 0H4C4.36804 0 4.66663 0.298706 4.66663 0.666626V2H11.3334V0.666626C11.3334 0.298706 11.632 0 12 0H12.6666C13.0347 0 13.3334 0.298706 13.3334 0.666626V2ZM14 14.6666C14.3673 14.6666 14.6666 14.3673 14.6666 14V6.69336H1.33337V14C1.33337 14.3673 1.63269 14.6666 2 14.6666H14Z"
                fill="#7E88C3"
              />
            </svg>
          </div>
          {isOpenCalendar ? (
            <Calendar
              setSelectedDate={setSelectedDate}
              setIsOpenCalendar={setIsOpenCalendar}
            />
          ) : null}
        </div>
        <div
          className="relative 
          flex flex-col gap-[0.9rem] mb-[2.5rem]"
        >
          <span
            className="text-[1.3rem] font-[500] leading-[1.5rem] tracking-[-0.1px]
            text-[#7e88c3]"
          >
            Payment Terms
          </span>
          <div
            className={`flex justify-between items-center
            px-[2rem] pt-[1.8rem] pb-[1.5rem]
            border rounded-[0.4rem]
            text-[1.5rem]
            font-bold leading-[1.5rem] tracking-[-0.25px]
            cursor-pointer ${
              isOpenNetDay ? "border-[#9277ff]" : "border-[#dfe3fa]"
            }`}
            onClick={() => setIsOpenNetDay((prev) => !prev)}
          >
            {paymentTermsArray.includes(selectedPaymentTerms) ? (
              <span>Net {selectedPaymentTerms} Days</span>
            ) : (
              <span className="opacity-[0.5]">Select Payment Terms</span>
            )}

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
                strokeWidth="2"
              />
            </svg>
          </div>
          {isOpenNetDay ? (
            <div
              className="
              flex flex-col py-[1.6rem]
              bg-white rounded-[0.8rem]
              shadow-[0_10px_20px_0px_rgba(72,84,159,0.25)]
              text-[1.5rem] font-bold leading-[1.5rem]
              tracking-[-0.25px] text-[#0c0e16]
              z-[1] gap-[1.5rem]"
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
          ) : null}
        </div>
        <label
          htmlFor="description"
          className="flex flex-col
          text-[1.3rem] font-[500] leading-[1.5rem] tracking-[-0.1px]
          text-[#7e88c3] gap-[0.9rem] mb-[6.9rem]"
        >
          Project Description
          <div
            className="px-[2rem] pt-[1.8rem] pb-[1.5rem]
            border border-[#dfe3fa] rounded-[0.4rem]
            focus-within:border-[#9277ff]"
          >
            <input
              type="text"
              id="description"
              placeholder="Graphic Design"
              {...register("description")}
              className="text-[1.5rem]
              font-bold leading-[1.5rem]
              tracking-[-0.25px]
              text-[#0c0e16] outline-none
              w-full"
            />
          </div>
        </label>
        <span
          className="text-[1.8rem] font-bold
          leading-[3.2rem] tracking-[-0.375px]
          text-[#777f98] mb-[2.2rem]"
        >
          Item List
        </span>
        <div className="mb-[4.8rem]">
          {fields.map((item, index) => {
            const watchedQuantity = watch(`items.${index}.quantity`) || 0;
            const watchedPrice = watch(`items.${index}.price`) || 0;
            const itemTotal = watchedQuantity * watchedPrice;
            return (
              <div key={item.id}>
                <label
                  htmlFor={`item-name-${index}`}
                  className="flex flex-col
                  text-[1.3rem] font-[500] leading-[1.5rem] tracking-[-0.1px]
                  text-[#7e88c3] gap-[0.9rem] mb-[6.9rem]"
                >
                  Item Name
                  <div
                    className="px-[2rem] pt-[1.8rem] pb-[1.5rem]
                    border border-[#dfe3fa] rounded-[0.4rem]
                    focus-within:border-[#9277ff]"
                  >
                    <input
                      type="text"
                      id={`item-name-${index}`}
                      placeholder="Banner Design"
                      {...register(`items.${index}.name`)}
                      className="text-[1.5rem]
                      font-bold leading-[1.5rem]
                      tracking-[-0.25px]
                      text-[#0c0e16] outline-none
                      w-full"
                    />
                  </div>
                </label>
                <div className="flex gap-[1.6rem]">
                  <label
                    htmlFor={`item-quantity-${index}`}
                    className="flex flex-col
                    text-[1.3rem] font-[500] leading-[1.5rem] tracking-[-0.1px]
                    text-[#7e88c3] gap-[0.9rem] mb-[6.9rem]"
                  >
                    Qty.
                    <div
                      className="px-[2rem] pt-[1.8rem] pb-[1.5rem]
                      border border-[#dfe3fa] rounded-[0.4rem]
                      w-[6.4rem] focus-within:border-[#9277ff]"
                    >
                      <input
                        type="text"
                        id={`item-quantity-${index}`}
                        {...register(`items.${index}.quantity`, {
                          valueAsNumber: true,
                        })}
                        className="text-[1.5rem]
                        font-bold leading-[1.5rem]
                        tracking-[-0.25px]
                        text-[#0c0e16]
                        outline-none
                        w-full"
                      />
                    </div>
                  </label>

                  <label
                    htmlFor={`item-price-${index}`}
                    className="flex flex-col
                    text-[1.3rem] font-[500] leading-[1.5rem] tracking-[-0.1px]
                    text-[#7e88c3] gap-[0.9rem] mb-[6.9rem]"
                  >
                    Price
                    <div
                      className="px-[2rem] pt-[1.8rem] pb-[1.5rem]
                      border border-[#dfe3fa] rounded-[0.4rem]
                      w-[10rem] focus-within:border-[#9277ff]"
                    >
                      <input
                        type="text"
                        id={`item-price-${index}`}
                        {...register(`items.${index}.price`, {
                          valueAsNumber: true,
                        })}
                        className="text-[1.5rem]
                      font-bold leading-[1.5rem]
                      tracking-[-0.25px]
                      text-[#0c0e16]
                      outline-none
                      w-full"
                      />
                    </div>
                  </label>
                  <div
                    className="flex flex-col gap-[0.9rem]
                    ml-[1.6rem]"
                  >
                    <span
                      className="
                      text-[1.3rem] font-[500] leading-[1.5rem] tracking-[-0.1px]
                      text-[#7e88c3]"
                    >
                      Total
                    </span>
                    <div
                      className="pt-[1.8rem] pb-[1.5rem]
                      text-[1.5rem] font-bold leading-[1.5rem]
                      tracking-[-0.25px] text-[#888eb0]
                      flex items-center gap-[5.5rem]"
                    >
                      <span>{itemTotal.toFixed(2)}</span>
                      <svg
                        width="13"
                        height="16"
                        viewBox="0 0 13 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="cursor-pointer"
                        onClick={() => remove(index)}
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8.44442 0L9.33333 0.888875H12.4444V2.66667H0V0.888875H3.11108L4 0H8.44442ZM2.66667 16C1.68442 16 0.888875 15.2045 0.888875 14.2222V3.55554H11.5555V14.2222C11.5555 15.2045 10.76 16 9.77779 16H2.66667Z"
                          fill="#888EB0"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div
          className="flex justify-center
          pt-[1.8rem] pb-[1.5rem]
          bg-[#f9fafe] rounded-[2.4rem]
          text-[1.5rem] font-bold leading-[1.5rem]
          tracking-[-0.25px] text-[#7e88c3] mb-[2.4rem]
          cursor-pointer"
          onClick={() => append({ name: "", quantity: 1, price: 0, total: 0 })}
        >
          + Add New Item
        </div>
      </form>
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 100%)",
        }}
        className="w-full h-[6.4rem]
          "
      ></div>
      <div
        className="flex justify-end
        pt-[2.1rem] pb-[2.2rem] pr-[2.4rem]
        gap-[0.8rem]"
      >
        <button
          type="button"
          className="flex items-center
          pt-[1.8rem] pb-[1.5rem] px-[2.65rem]
          bg-[#f9fafe] rounded-[2.4rem]
          text-[1.5rem] font-bold leading-[1.5rem]
          tracking-[-0.25px] text-[#7e88c3]
          cursor-pointer"
          onClick={goBack}
        >
          Discard
        </button>
        <button
          type="button"
          className="flex items-center
          pt-[1.8rem] pb-[1.5rem] px-[2.65rem]
          bg-[#373b53] rounded-[2.4rem]
          text-[1.5rem] font-bold leading-[1.5rem]
          tracking-[-0.25px] text-[#888eb0]
          cursor-pointer"
          onClick={handleSaveAsDraft}
        >
          Save as Draft
        </button>
        <button
          type="button"
          form="newInvoiceForm"
          className="flex items-center
          pt-[1.8rem] pb-[1.5rem] pl-[2.4rem] pr-[2.3rem]
          bg-[#7c5dfa] rounded-[2.4rem]
          text-[1.5rem] font-bold leading-[1.5rem]
          tracking-[-0.25px] text-white
          cursor-pointer"
          onClick={handleSaveAndSend}
        >
          Save & Send
        </button>
      </div>
    </div>
  );
}
