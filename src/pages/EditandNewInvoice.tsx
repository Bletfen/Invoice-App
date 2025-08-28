import { useDataContext, useFormDate } from "../context/InvoicesContext";
import Calendar from "../components/Calendar";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { generateInvoiceId } from "../seperateFuncs";
import Input from "../components/Input";
import PaymentTerms from "../components/PaymentTerms";
import { createSubmitHandler, useInvoiceForm } from "../hookFormFunctions";
import { goBack } from "../hookFormFunctions";
export default function EditandNewInvoice() {
  const { data, setData } = useDataContext();
  const { formDate } = useFormDate();
  const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);
  const [isOpenNetDay, setIsOpenNetDay] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedPaymentTerms, setSelectedPaymentTerms] = useState<number>(30);

  const { id } = useParams();
  const invoice = data.find((item) => item.id === id);
  const navigate = useNavigate();

  const location = useLocation();
  const isEdit = location.pathname.includes("/edit");

  const updateInvoice = (id: string, updated: IInvoice) => {
    setData((prev) => prev.map((inv) => (inv.id === id ? updated : inv)));
  };

  useEffect(() => {
    if (isEdit && !invoice) {
      navigate("/");
    }
  }, [isEdit, invoice, navigate]);

  const {
    register,
    watch,
    handleSubmit,
    errors,
    fields,
    append,
    remove,
    onSubmit,
  } = useInvoiceForm(
    isEdit,
    invoice ?? null,
    selectedDate,
    selectedPaymentTerms,
    updateInvoice,
    setData,
    navigate
  );

  const submitHandler = createSubmitHandler(handleSubmit, onSubmit);
  const handleSaveAsDraft = submitHandler("Draft");
  const handleSaveAndSend = submitHandler("Pending");
  const handleSaveChanges = submitHandler(invoice?.status || "Pending");

  return (
    <>
      <div
        className="fixed w-full bg-black/50 inset-0
        overflow-y-auto
        h-screen z-50
        "
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            goBack(navigate);
          }
        }}
      >
        <div
          className="absolute
          bg-white pt-[3.3rem]
          dark:bg-[#141625]
          w-full
          min-h-screen md:w-[61.6rem]
          md:rounded-r-[2rem]
          transition-all duration-300
          top-29
          xl:top-0 xl:left-32
          xl:w-[71.9rem]
          md:pt-[5.9rem]
          "
        >
          <div
            className="flex gap-[2.3rem]
            items-center cursor-pointer
            mb-[2.6rem] px-[2.4rem]
            md:hidden"
            onClick={() => goBack(navigate)}
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
            font-bold leading-[1.5rem] tracking-[-0.25px]
            transition-all duration-300 dark:text-white"
            >
              Go back
            </span>
          </div>
          <h6
            className="text-[2.4rem]
            font-bold leading-[3.2rem] tracking-[-0.5px]
            mb-[2.2rem] px-[2.4rem]
            md:px-[5.6rem]
            md:mb-[4.6rem]
            transition-all duration-300 dark:text-white"
          >
            {isEdit ? (
              <p>
                Edit <span className="text-[#888eb0]">#</span>
                {invoice?.id}
              </p>
            ) : (
              <p>New Invoice</p>
            )}
          </h6>
          <form
            id="editInvoiceForm"
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
            <Input
              id={"senderAddress.street"}
              label={"Street Address"}
              register={register}
              errors={errors.senderAddress?.street}
              errorsMessage={errors.senderAddress?.street?.message}
              defaultValue={invoice?.senderAddress.street || ""}
            />
            <div
              className="grid grid-cols-2 gap-[2.3rem]
              mb-[2.5rem] md:grid-cols-3 md:mb-[4.9rem]"
            >
              <Input
                id={"senderAddress.city"}
                label={"City"}
                register={register}
                errors={errors.senderAddress?.city}
                errorsMessage={errors.senderAddress?.city?.message}
                defaultValue={invoice?.senderAddress.city || ""}
              />
              <Input
                id={"senderAddress.postCode"}
                label={"Post Code"}
                register={register}
                errors={errors.senderAddress?.postCode}
                errorsMessage={errors.senderAddress?.postCode?.message}
                defaultValue={invoice?.senderAddress.postCode || ""}
              />
              <Input
                id={"senderAddress.country"}
                label={"Country"}
                register={register}
                errors={errors.senderAddress?.country}
                errorsMessage={errors.senderAddress?.country?.message}
                defaultValue={invoice?.senderAddress.country || ""}
              />
            </div>

            <span
              className="text-[1.5rem]
          font-bold leading-[1.5rem]
          tracking-[-0.25px] text-[#7c5dfa]
          mb-[2.4rem]"
            >
              Bill To
            </span>
            <Input
              id={"clientName"}
              label={"Client's Name"}
              register={register}
              errors={errors.clientName}
              errorsMessage={errors.clientName?.message}
              defaultValue={invoice?.clientName || ""}
            />
            <Input
              id={"clientEmail"}
              label={"Client's Email"}
              register={register}
              errors={errors.clientEmail}
              errorsMessage={errors.clientEmail?.message}
              defaultValue={invoice?.clientEmail || ""}
            />
            <Input
              id={"clientAddress.street"}
              label={"Street Address"}
              register={register}
              errors={errors.clientAddress?.street}
              errorsMessage={errors.clientAddress?.street?.message}
              defaultValue={invoice?.clientAddress.street || ""}
            />
            <div
              className="grid grid-cols-2 gap-[2.3rem]
            mb-[2.5rem] md:grid-cols-3"
            >
              <Input
                id={"clientAddress.city"}
                label={"City"}
                register={register}
                errors={errors.clientAddress?.city}
                errorsMessage={errors.clientAddress?.city?.message}
                defaultValue={invoice?.clientAddress.city || ""}
              />
              <Input
                id={"clientAddress.postCode"}
                label={"Post Code"}
                register={register}
                errors={errors.clientAddress?.postCode}
                errorsMessage={errors.clientAddress?.postCode?.message}
                defaultValue={invoice?.clientAddress.postCode || ""}
              />
              <Input
                id={"clientAddress.country"}
                label={"Country"}
                register={register}
                errors={errors.clientAddress?.country}
                errorsMessage={errors.clientAddress?.country?.message}
                defaultValue={invoice?.clientAddress.country || ""}
              />
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
                text-[#7e88c3] transition-all duration-300 dark:text-[#dfedfa]"
                >
                  Invoice Date
                </span>
                <div
                  className="flex justify-between items-center
                px-[2rem] pt-[1.8rem] pb-[1.5rem]
                border border-[#dfe3fa] rounded-[0.4rem]"
                  onClick={() => setIsOpenCalendar((prev) => !prev)}
                >
                  <span
                    className="text-[1.5rem]
                  font-bold leading-[1.5rem] tracking-[-0.25px]
                  transition-all duration-300 dark:text-white"
                  >
                    {formDate(selectedDate || invoice?.createdAt || "") ||
                      "Select Date"}
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
                flex flex-col gap-[0.9rem] mb-[2.5rem] cursor-pointer
                md:mb-[unset]"
                onClick={() => setIsOpenNetDay((prev) => !prev)}
              >
                <span
                  className="text-[1.3rem] font-[500] leading-[1.5rem] tracking-[-0.1px]
                text-[#7e88c3]
                transition-all duration-300 dark:text-[#dfedfa]"
                >
                  Payment Terms
                </span>
                <div
                  className="flex justify-between items-center
                  px-[2rem] pt-[1.8rem] pb-[1.5rem]
                  border border-[#dfe3fa] rounded-[0.4rem]
                  text-[1.5rem]
                  font-bold leading-[1.5rem] tracking-[-0.25px]
                  transition-all duration-300 dark:text-white"
                >
                  Net {selectedPaymentTerms} Days
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
                  <PaymentTerms
                    setSelectedPaymentTerms={setSelectedPaymentTerms}
                    setIsOpenNetDay={setIsOpenNetDay}
                  />
                ) : null}
              </div>
            </div>
            <Input
              id={"description"}
              label={"Project Description"}
              register={register}
              errors={errors.description}
              errorsMessage={errors.description?.message}
              defaultValue={invoice?.description || ""}
            />
            <span
              className="text-[1.8rem] font-bold
              leading-[3.2rem] tracking-[-0.375px]
              text-[#777f98] mb-[2.2rem]"
            >
              Item List
            </span>
            <div
              className="mb-[4.8rem]
              md:mb-[unset]"
            >
              {fields.map((item, index) => {
                const watchedQuantity = watch(`items.${index}.quantity`) || 0;
                const watchedPrice = watch(`items.${index}.price`) || 0;
                const itemTotal = watchedQuantity * watchedPrice;
                return (
                  <div
                    key={item.id || index}
                    className="md:grid
                    md:grid-cols-5 md:gap-[1.6rem]
                    md:mb-[1.8rem]"
                  >
                    <Input
                      id={`items.${index}.name`}
                      label={"Item Name"}
                      register={register}
                      errors={errors.items?.[index]?.name}
                      errorsMessage={errors.items?.[index]?.name?.message}
                      defaultValue={item.name}
                    />
                    <div className="flex gap-[1.6rem]">
                      <Input
                        id={`items.${index}.quantity`}
                        label={"Qty."}
                        register={register}
                        errors={errors.items?.[index]?.quantity}
                        errorsMessage={errors.items?.[index]?.quantity?.message}
                        defaultValue={item.quantity.toString()}
                      />
                      <Input
                        id={`items.${index}.price`}
                        label={"Price"}
                        register={register}
                        errors={errors.items?.[index]?.price}
                        errorsMessage={errors.items?.[index]?.price?.message}
                        defaultValue={item.price.toString()}
                      />
                      <div
                        className="flex flex-col gap-[0.9rem]
                  ml-[1.6rem]"
                      >
                        <span
                          className="
                    text-[1.3rem] font-[500] leading-[1.5rem] tracking-[-0.1px]
                    text-[#7e88c3]
                    transition-all duration-300 dark:text-[#dfe3fa]"
                        >
                          Total
                        </span>
                        <div
                          className="pt-[1.8rem] pb-[1.5rem]
                    text-[1.5rem] font-bold leading-[1.5rem]
                    tracking-[-0.25px] text-[#888eb0]
                    flex items-center gap-[5.5rem]
                    md:gap-[4rem]
                    transition-all duration-300 dark:text-[#dfe3fa]"
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
          cursor-pointer
          transition-all duration-300 dark:bg-[#252945]
          dark:text-[#dfe3fa]"
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
            className="w-full h-[6.4rem] md:hidden
          "
          ></div>
          <div
            className={`flex ${isEdit ? "justify-end" : "justify-between"}
            pt-[2.1rem] pb-[2.2rem] px-[2.4rem]
            md:px-[5.6rem]`}
          >
            {!isEdit && (
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
                onClick={() => goBack(navigate)}
              >
                Discard
              </button>
            )}
            <div
              className="flex
             gap-[0.8rem] items-center
             "
            >
              <button
                type="button"
                className={`flex items-center
              pt-[1.8rem] pb-[1.5rem] px-[2.65rem]
              bg-[#f9fafe] rounded-[2.4rem]
              text-[1.5rem] font-bold leading-[1.5rem]
              tracking-[-0.25px] text-[#7e88c3]
              cursor-pointer
              transition-all
              duration-300
              dark:text-[#dfe3fa]
              hover:bg-[#1e2139]
              ${isEdit ? " dark:bg-[#252945]" : "dark:bg-[#373b53]"}`}
                onClick={isEdit ? () => goBack(navigate) : handleSaveAsDraft}
              >
                {isEdit ? "Cancel" : "Save as Draft"}
              </button>
              <button
                type="button"
                className="flex items-center
              pt-[1.8rem] pb-[1.5rem] pl-[2.4rem] pr-[2.3rem]
              bg-[#7c5dfa] rounded-[2.4rem]
              text-[1.5rem] font-bold leading-[1.5rem]
              tracking-[-0.25px] text-white
              cursor-pointer
              transition-all duration-300
              hover:bg-[#9277ff]
              "
                onClick={isEdit ? handleSaveChanges : handleSaveAndSend}
              >
                {isEdit ? "Save Changes" : "Save & Send"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
