import {
  type UseFormRegister,
  type FieldErrors,
  type FieldPath,
} from "react-hook-form";
import { useParams } from "react-router-dom";

type InputProps<T extends Record<string, any>> = {
  id: FieldPath<T>;
  label: string;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  defaultValue: string;
  errorsMessage: string | undefined;
};

export default function Input<T extends Record<string, any>>({
  id,
  label,
  register,
  errors,
  defaultValue,
  errorsMessage,
}: InputProps<T>) {
  const path = useParams();
  return (
    <label
      htmlFor={id}
      className={`flex flex-col
              text-[1.3rem] font-[500] leading-[1.5rem] tracking-[-0.1px]
              gap-[0.9rem] mb-[2.5rem] ${
                id.startsWith("items.") && id.endsWith("name")
                  ? "col-span-2 md:col-span-2"
                  : id === "senderAddress.country" ||
                    id === "clientAddress.country"
                  ? "col-span-2 md:col-span-1"
                  : ""
              }`}
    >
      <div
        className="flex justify-between
                transition-all duration-300"
      >
        <span
          className={
            errors ? "text-[#ec5757]" : "text-[#7e88c3] dark:text-[#dfe3fa]"
          }
        >
          {label}
        </span>
        {errors && (
          <span className="text-[1rem] text-[#ec5757]">{errorsMessage}</span>
        )}
      </div>
      <div
        className={`px-[2rem] pt-[1.8rem] pb-[1.5rem]
                border border-[#dfe3fa] rounded-[0.4rem]
                transition-all duration-300
                dark:border-[#252945]
                hover:border-[#7c5dfa]
                ${
                  id.startsWith("items.") && id.endsWith("quantity")
                    ? "w-[6.4rem]"
                    : id.startsWith("items.") && id.endsWith("price")
                    ? "w-[10rem]"
                    : ""
                } `}
      >
        <input
          type="text"
          id={id}
          defaultValue={path.toString() === "/edit" ? `${defaultValue}` : ""}
          {...register(id)}
          className="text-[1.5rem]
              font-bold leading-[1.5rem]
              tracking-[-0.25px]
              text-[#0c0e16] outline-none
              w-full transition-all duration-300
              dark:text-white w-full
              "
        />
      </div>
    </label>
  );
}
