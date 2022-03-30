import "./App.css";
import Form from "./Component/Form";
import DataContext from "./DataContext/DataContext";
import { useState } from "react";
import Transaction from "./Component/Transaction";
//import axios from "axios";
function App() {
  const [dataValues, setData] = useState([]);
  const appendData = (newData) => {
    setData((prevData) => {
      return [newData, ...prevData];
    });
  };
  const deleteData = (newData) => {
    setData(newData);
  };

  return (
    <DataContext.Provider value={dataValues}>
      <div className="App">
        <Form onAppend={appendData}></Form>
        <Transaction listData={dataValues} onDelete={deleteData}></Transaction>
      </div>
    </DataContext.Provider>
  );
}

export default App;
