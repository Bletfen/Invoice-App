import { Link, useLocation } from "react-router-dom";
export default function Header() {
  const location = useLocation();
  const isEditPage = location.pathname.includes("/edit");
  return (
    <div
      className={`bg-header-light
        flex justify-between
        pr-[2.4rem] xl:flex-col xl:top-0
        xl:p-[unset] xl:pb-[2.4rem]
        xl:rounded-r-[2rem]
        transition-all duration-300 ${
          isEditPage ? "xl:h-full" : "xl:min-h-screen"
        }`}
    >
      <Link to={"/"}>
        <svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0H52C63.0457 0 72 8.95431 72 20V52C72 63.0457 63.0457 72 52 72H0V0Z"
            fill="#7C5DFA"
          />
          <mask
            id="mask0_0_1479"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="72"
            height="72"
          >
            <path
              d="M0 0H52C63.0457 0 72 8.95431 72 20V52C72 63.0457 63.0457 72 52 72H0V0Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask0_0_1479)">
            <path
              d="M72 36.3496H20C8.95431 36.3496 0 45.3039 0 56.3496V88.3496C0 99.3953 8.95431 108.35 20 108.35H72V36.3496Z"
              fill="#9277FF"
            />
          </g>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M29.486 23.0003L36 35.8995L42.514 23.0003C46.9652 25.3092 50 29.9105 50 35.21C50 42.8261 43.732 49.0002 36 49.0002C28.268 49.0002 22 42.8261 22 35.21C22 29.9105 25.0348 25.3092 29.486 23.0003Z"
            fill="white"
          />
        </svg>
      </Link>
      <div
        className="flex gap-[2.4rem]
        items-center xl:flex-col"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="cursor-pointer"
        >
          <path
            d="M19.5016 11.3423C19.2971 11.2912 19.0927 11.3423 18.9137 11.4701C18.2492 12.0324 17.4824 12.4924 16.639 12.7991C15.8466 13.1059 14.9776 13.2592 14.0575 13.2592C11.9872 13.2592 10.0958 12.4158 8.74121 11.0611C7.38658 9.70649 6.54313 7.81512 6.54313 5.74483C6.54313 4.87582 6.69649 4.03237 6.95208 3.26559C7.23323 2.4477 7.64217 1.70649 8.17891 1.06751C8.40895 0.786362 8.35783 0.377416 8.07668 0.147384C7.89776 0.0195887 7.69329 -0.0315295 7.48882 0.0195887C5.31629 0.607448 3.42492 1.91096 2.07029 3.64898C0.766773 5.36144 0 7.48285 0 9.78317C0 12.5691 1.1246 15.0995 2.96486 16.9397C4.80511 18.78 7.3099 19.9046 10.1214 19.9046C12.4728 19.9046 14.6454 19.0867 16.3834 17.732C18.147 16.3519 19.4249 14.3838 19.9617 12.1346C20.0639 11.7768 19.8594 11.419 19.5016 11.3423Z"
            fill="#7E88C3"
          />
        </svg>
        <div
          className="h-full w-px bg-[#494e6e]
            xl:w-full xl:h-px"
        ></div>
        <div
          className="w-[3.2rem] h-[3.2rem]
                    cursor-pointer"
        >
          <img
            src="/assets/image-avatar.jpg"
            alt="user-img"
            className="rounded-[3.2rem]"
          />
        </div>
      </div>
    </div>
  );
}
