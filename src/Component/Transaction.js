import Item from "./Item";
import "./Transaction.css";
import axios from "axios";
import { useState } from "react";

const Transaction = (props) => {
  const data = props.listData;
  const [valuesData, setData] = useState(data);

  const handleIconOnclick = (event) => {
    const jsonData = { email: event.target.id };
    axios.post("http://localhost:3333/delete", jsonData).then((res) => {
      if (res.data.status === "ok") {
        const newData = valuesData.filter((value) => {
          return value.email !== event.target.id;
        });
        setData(newData);
        props.onDelete(valuesData);
        alert("delete successfully");
      }
    });
  };

  return (
    <ul className="itemList">
      {data.map((list) => {
        return (
          <div key={list._id} className="containerItem">
            <Item {...list} />
            <i
              id={list.email}
              className="fa fa-minus-square"
              onClick={handleIconOnclick}
            />
          </div>
        );
      })}
    </ul>
  );
};
export default Transaction;
