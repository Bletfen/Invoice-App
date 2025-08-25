import { useNavigate } from "react-router-dom";
import { useDataContext, useFormDate } from "../context/InvoicesContext";
import { useForm, useFieldArray } from "react-hook-form";
import Calendar from "../components/Calendar";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../yup/schema";
import Invoices from "./Invoices";
import { generateInvoiceId } from "../idGenerator";
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

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
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
      items: [
        { id: generateInvoiceId(), name: "", quantity: 0, price: 0, total: 0 },
      ],
    },
    resolver: yupResolver(schema),
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
    <>
      <Invoices />
      <div
        className="fixed w-full bg-black/50 inset-0
        overflow-y-auto
        h-screen z-50
        "
        onClick={() => navigate("/")}
      >
        <div
          className="absolute top-29 left-0
          bg-white pt-[3.3rem]
          w-full
          min-h-full
          md:w-[61.6rem]
          md:rounded-r-[2rem]
          transition-all duration-300
          top-29
          xl:top-0 xl:left-30
          xl:w-[71.9rem]
          md:pt-[5.9rem]
          "
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="flex gap-[2.3rem]
            items-center cursor-pointer
            mb-[2.6rem] px-[2.4rem]
            md:hidden"
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
            mb-[2.2rem] px-[2.4rem]
            md:px-[5.6rem] md:mb-[4.6rem]"
          >
            New Invoice
          </h6>
          <form
            id="newInvoiceForm"
            className="flex flex-col px-[2.4rem]
            md:px-[5.6rem]"
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
          gap-[0.9rem] mb-[2.5rem]"
            >
              <div className="flex justify-between">
                <span
                  className={
                    errors.senderAddress?.street
                      ? "text-[#ec5757]"
                      : "text-[#7e88c3]"
                  }
                >
                  Street Address
                </span>
                {errors.senderAddress?.street && (
                  <span className="text-[1rem] text-[#ec5757]">
                    {errors.senderAddress.street.message}
                  </span>
                )}
              </div>
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
              mb-[2.5rem]
              md:grid-cols-3
              md:mb-[4.9rem]
              "
            >
              <label
                htmlFor="city"
                className="flex flex-col
                text-[1.3rem] font-[500] leading-[1.5rem] tracking-[-0.1px]
                text-[#7e88c3] gap-[0.9rem]"
              >
                <div className="flex justify-between">
                  <span
                    className={
                      errors.senderAddress?.city
                        ? "text-[#ec5757]"
                        : "text-[#7e88c3]"
                    }
                  >
                    City
                  </span>
                  {errors.senderAddress?.city && (
                    <span className="text-[1rem] text-[#ec5757]">
                      {errors.senderAddress.city.message}
                    </span>
                  )}
                </div>
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
                <div className="flex justify-between">
                  <span
                    className={
                      errors.senderAddress?.postCode
                        ? "text-[#ec5757]"
                        : "text-[#7e88c3]"
                    }
                  >
                    Post Code
                  </span>
                  {errors.senderAddress?.postCode && (
                    <span className="text-[1rem] text-[#ec5757]">
                      {errors.senderAddress.postCode.message}
                    </span>
                  )}
                </div>
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
              <label
                htmlFor="country"
                className="flex flex-col
                text-[1.3rem] font-[500] leading-[1.5rem] tracking-[-0.1px]
                text-[#7e88c3] gap-[0.9rem] mb-[4.1rem]
                col-span-2 md:col-span-1
                md:mb-[unset]"
              >
                <div className="flex justify-between">
                  <span
                    className={
                      errors.senderAddress?.country
                        ? "text-[#ec5757]"
                        : "text-[#7e88c3]"
                    }
                  >
                    Country
                  </span>
                  {errors.senderAddress?.country && (
                    <span className="text-[1rem] text-[#ec5757]">
                      {errors.senderAddress.country.message}
                    </span>
                  )}
                </div>
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
            </div>

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
              <div className="flex justify-between">
                <span
                  className={
                    errors.clientName ? "text-[#ec5757]" : "text-[#7e88c3]"
                  }
                >
                  Client's Name
                </span>
                {errors.clientName && (
                  <span className="text-[1rem] text-[#ec5757]">
                    {errors.clientName.message}
                  </span>
                )}
              </div>
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
              <div className="flex justify-between">
                <span
                  className={
                    errors.clientEmail ? "text-[#ec5757]" : "text-[#7e88c3]"
                  }
                >
                  Client's Email
                </span>
                {errors.clientEmail && (
                  <span className="text-[1rem] text-[#ec5757]">
                    {errors.clientEmail.message}
                  </span>
                )}
              </div>
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
              <div className="flex justify-between">
                <span
                  className={
                    errors.clientAddress?.street
                      ? "text-[#ec5757]"
                      : "text-[#7e88c3]"
                  }
                >
                  Street Address
                </span>
                {errors.clientAddress?.street && (
                  <span className="text-[1rem] text-[#ec5757]">
                    {errors.clientAddress?.street.message}
                  </span>
                )}
              </div>
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
              md:grid-cols-3
              mb-[2.5rem]"
            >
              <label
                htmlFor="clientCity"
                className="flex flex-col
            text-[1.3rem] font-[500] leading-[1.5rem] tracking-[-0.1px]
            text-[#7e88c3] gap-[0.9rem]"
              >
                <div className="flex justify-between">
                  <span
                    className={
                      errors.clientAddress?.city
                        ? "text-[#ec5757]"
                        : "text-[#7e88c3]"
                    }
                  >
                    City
                  </span>
                  {errors.clientAddress?.city && (
                    <span className="text-[1rem] text-[#ec5757]">
                      {errors.clientAddress?.city.message}
                    </span>
                  )}
                </div>
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
                <div className="flex justify-between">
                  <span
                    className={
                      errors.clientAddress?.postCode
                        ? "text-[#ec5757]"
                        : "text-[#7e88c3]"
                    }
                  >
                    Post Code
                  </span>
                  {errors.clientAddress?.postCode && (
                    <span className="text-[1rem] text-[#ec5757]">
                      {errors.clientAddress?.postCode.message}
                    </span>
                  )}
                </div>
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
              <label
                htmlFor="clientCountry"
                className="flex flex-col
                text-[1.3rem] font-[500] leading-[1.5rem] tracking-[-0.1px]
                text-[#7e88c3] gap-[0.9rem] mb-[2.5rem]
                col-span-2 md:col-span-1"
              >
                <div className="flex justify-between">
                  <span
                    className={
                      errors.clientAddress?.country
                        ? "text-[#ec5757]"
                        : "text-[#7e88c3]"
                    }
                  >
                    Country
                  </span>
                  {errors.clientAddress?.country && (
                    <span className="text-[1rem] text-[#ec5757]">
                      {errors.clientAddress?.country.message}
                    </span>
                  )}
                </div>
                <div
                  className="px-[2rem] pt-[1.8rem] pb-[1.5rem]
                  border border-[#dfe3fa] rounded-[0.4rem]
                  focus-within:border-[#9277ff]
                  "
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
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-2
              md:gap-[2.4rem] md:mb-[2.5rem]"
            >
              <div
                className="relative flex flex-col gap-[0.9rem] mb-[2.5rem]
                md:mb-[unset]"
              >
                <span
                  className="text-[1.3rem] font-[500] leading-[1.5rem] tracking-[-0.1px]
                "
                >
                  <div className="flex justify-between">
                    <span
                      className={
                        !selectedDate ? "text-[#ec5757]" : "text-[#7e88c3]"
                      }
                    >
                      Invoice Date
                    </span>
                    {!selectedDate && (
                      <span className="text-[#ec5757] text-[1rem]">
                        can't be empty
                      </span>
                    )}
                  </div>
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
                flex flex-col gap-[0.9rem] mb-[2.5rem]
                md:mb-[unset]"
              >
                <div
                  className="flex justify-between
                text-[1.3rem] font-[500] leading-[1.5rem] tracking-[-0.1px]
                text-[#7e88c3]"
                >
                  <span
                    className={
                      !selectedDate ? "text-[#ec5757]" : "text-[#7e88c3]"
                    }
                  >
                    Payment Terms
                  </span>
                  {!selectedDate && (
                    <span className="text-[#ec5757] text-[1rem]">
                      can't be empty
                    </span>
                  )}
                </div>
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
            </div>

            <label
              htmlFor="description"
              className="flex flex-col
              text-[1.3rem] font-[500] leading-[1.5rem] tracking-[-0.1px]
              text-[#7e88c3] gap-[0.9rem] mb-[6.9rem]
              md:mb-[2.7rem]"
            >
              <div className="flex justify-between">
                <span
                  className={
                    errors.description ? "text-[#ec5757]" : "text-[#7e88c3]"
                  }
                >
                  Project Description
                </span>
                {errors.description && (
                  <span className="text-[1rem] text-[#ec5757]">
                    {errors.description.message}
                  </span>
                )}
              </div>
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
            <div
              className="mb-[4.8rem]
              md:mb-[1.8rem]"
            >
              {fields.map((item, index) => {
                const watchedQuantity = watch(`items.${index}.quantity`) || 0;
                const watchedPrice = watch(`items.${index}.price`) || 0;
                const itemTotal = watchedQuantity * watchedPrice;
                return (
                  <div
                    key={item.id}
                    className="md:grid md:grid-cols-5
                    md:gap-[1.6rem]"
                  >
                    <label
                      htmlFor={`item-name-${index}`}
                      className="flex flex-col
                      text-[1.3rem] font-[500] leading-[1.5rem] tracking-[-0.1px]
                      text-[#7e88c3] gap-[0.9rem] mb-[6.9rem]
                      md:col-span-2 md:mb-[unset]"
                    >
                      <div className="flex justify-between">
                        <span
                          className={
                            errors.items?.[index]?.name
                              ? "text-[#ec5757]"
                              : "text-[#7e88c3]"
                          }
                        >
                          Item Name
                        </span>
                        {errors.items?.[index]?.name && (
                          <span className="text-[1rem] text-[#ec5757]">
                            {errors.items?.[index]?.name?.message}
                          </span>
                        )}
                      </div>
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
                    text-[#7e88c3] gap-[0.9rem] mb-[6.9rem]
                    md:mb-[unset]"
                      >
                        <span
                          className={
                            errors.items?.[index]?.quantity
                              ? "text-[#ec5757]"
                              : "text-[#7e88c3]"
                          }
                        >
                          Qty.
                        </span>
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
                        {errors.items?.[index]?.quantity && (
                          <span className="text-[1rem] text-[#ec5757]">
                            {errors.items?.[index]?.quantity?.message}
                          </span>
                        )}
                      </label>

                      <label
                        htmlFor={`item-price-${index}`}
                        className="flex flex-col
                    text-[1.3rem] font-[500] leading-[1.5rem] tracking-[-0.1px]
                    text-[#7e88c3] gap-[0.9rem] mb-[6.9rem]
                    md:mb-[unset]"
                      >
                        <span
                          className={
                            errors.items?.[index]?.price
                              ? "text-[#ec5757]"
                              : "text-[#7e88c3]"
                          }
                        >
                          Price
                        </span>
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
                        {errors.items?.[index]?.price && (
                          <span className="text-[1rem] text-[#ec5757]">
                            {errors.items?.[index]?.price?.message}
                          </span>
                        )}
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
                      flex items-center gap-[5.5rem]
                      md:gap-[4rem]"
                        >
                          <span>{itemTotal.toFixed(2)}</span>
                          <svg
                            width="13"
                            height="16"
                            viewBox="0 0 13 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`cursor-pointer ${
                              errors.items?.length && errors.items?.length > 0
                                ? "fill-[#ec5757]"
                                : "fill-[#888EB0]"
                            }`}
                            onClick={() => remove(index)}
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M8.44442 0L9.33333 0.888875H12.4444V2.66667H0V0.888875H3.11108L4 0H8.44442ZM2.66667 16C1.68442 16 0.888875 15.2045 0.888875 14.2222V3.55554H11.5555V14.2222C11.5555 15.2045 10.76 16 9.77779 16H2.66667Z"
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
              onClick={() =>
                append({
                  id: generateInvoiceId(),
                  name: "",
                  quantity: 1,
                  price: 0,
                  total: 0,
                })
              }
            >
              + Add New Item
            </div>
          </form>

          {Object.keys(errors).length > 0 && (
            <p
              className="text-[1rem] font-[600] leading-[1.5rem]
          tracking-[0.208px] text-[#ec5757]
          pl-[2.4rem] md:pl-[5.6rem]"
            >
              - All fields must be added <br /> - An item must be added
            </p>
          )}

          <div
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 100%)",
            }}
            className="w-full h-[6.4rem]
            md:hidden
          "
          ></div>
          <div
            className="flex justify-between
            pt-[2.1rem] pb-[2.2rem] px-[2.4rem]
            gap-[0.8rem]
            md:px-[5.6rem]
            "
          >
            <button
              type="button"
              className="flex items-center
              pt-[1.8rem] pb-[1.5rem] px-[2.65rem]
              bg-[#f9fafe] rounded-[2.4rem]
              text-[1.5rem] font-bold leading-[1.5rem]
              tracking-[-0.25px] text-[#7e88c3]
              cursor-pointer
              transition-all duration-300
              "
              onClick={goBack}
            >
              Discard
            </button>
            <div className="flex gap-[0.8rem]">
              <button
                type="button"
                className="flex items-center
                pt-[1.8rem] pb-[1.5rem] px-[2.65rem]
                bg-[#373b53] rounded-[2.4rem]
                text-[1.5rem] font-bold leading-[1.5rem]
                tracking-[-0.25px] text-[#888eb0]
                cursor-pointer transition-all duration-300
                hover:bg-[#0c0e16]"
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
                cursor-pointer transition-all duration-300
                hover:bg-[#9277ff]"
                onClick={handleSaveAndSend}
              >
                Save & Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
