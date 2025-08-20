import { Link } from "react-router-dom";
import dataBase from "../../data.json";
export default function Invoices() {
  return (
    <div>
      <div>
        <div>
          <h1>Invoices</h1>
          <span>7 invoices</span>
        </div>
        <div>
          <span>Filter</span>
          <svg
            width="10"
            height="7"
            viewBox="0 0 10 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L5.2279 5.2279L9.4558 1"
              stroke="#7C5DFA"
              stroke-width="2"
            />
          </svg>
        </div>
        <button>
          <div>
            <svg
              width="11"
              height="11"
              viewBox="0 0 11 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.31311 10.0234V6.3136H10.0229V3.73327H6.31311V0.0234375H3.73278V3.73327H0.0229492V6.3136H3.73278V10.0234H6.31311Z"
                fill="#7C5DFA"
              />
            </svg>
          </div>
          New
        </button>
      </div>
      <div className="flex flex-col">
        {dataBase.map((item) => (
          <Link key={item.id} to={item.id}>
            <div>
              <div>
                <div>
                  <h2>{item.id}</h2>
                  <p>{item.createdAt}</p>
                </div>
                <span>{item.clientName}</span>
              </div>
              <div>
                <p>£{item.total}</p>
                <button>{item.status}</button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
