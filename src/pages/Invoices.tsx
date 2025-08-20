import { Link } from "react-router-dom";
import dataBase from "../../data.json";
export default function Invoices() {
  return (
    <>
      {dataBase.map((item) => (
        <Link to={item.id}>
          <p>{item.clientName}</p>
        </Link>
      ))}
    </>
  );
}
