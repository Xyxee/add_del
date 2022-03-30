import { useState } from "react";
import axios from "axios";
const Form = (props) => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    sex: "",
    nameError: false,
    emailError: false,
    phoneError: false,
    sexError: false,
  });

  const handleOnchange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
      [event.target.name + "Error"]: false,
    });
  };

  const handleChangeName = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value.replace(/[^a-zA-Zก-ฮะ-์]/gi, ""),
      nameError: false,
    });
  };
  const handleChangeNumber = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value.replace(/\D/g, ""),
      [event.target.name + "Error"]: false,
    });
  };

  const handleOnsubmit = (event) => {
    event.preventDefault();

    if (!values.firstName || !values.lastName) {
      setValues({ ...values, nameError: true });
      return;
    }
    if (!values.email.includes("@") || !values.email.includes(".")) {
      setValues({ ...values, emailError: true });
      return;
    }
    if (!values.phone) {
      setValues({ ...values, phoneError: true });
      return;
    }
    if (!values.sex) {
      setValues({ ...values, sexError: true });
      return;
    }
    const jsonData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      sex: values.sex,
    };

    axios
      .post("http://localhost:3333/append", jsonData)
      .then((res) => {
        if (
          res.data.message !== undefined &&
          res.data.message.includes("duplicate")
        ) {
          alert(jsonData.email + " ลงทะเบียนซ้ำ");
        }
        if (res.data.status === "ok") {
          props.onAppend(res.data.result);
          setValues({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            sex: "",
          });
        }
        setValues({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          sex: "",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <form onSubmit={handleOnsubmit}>
      <h1 style={{ textAlign: "center" }}>Demo Form</h1>
      <input
        name="firstName"
        value={values.firstName}
        type="text"
        onChange={handleChangeName}
        placeholder="First name"
      />

      <input
        name="lastName"
        value={values.lastName}
        type="text"
        onChange={handleChangeName}
        placeholder="Last name"
      />
      {values.nameError ? (
        <p className="textError">ชื่อ-นามสกุลที่คุณป้อนไม่ถูกต้อง</p>
      ) : (
        ""
      )}
      <input
        name="email"
        value={values.email}
        type="email"
        onChange={handleOnchange}
        placeholder="email"
      />
      {values.emailError ? (
        <p className="textError">อีเมลที่คุณป้อนไม่ถูกต้อง</p>
      ) : (
        ""
      )}
      <input
        name="phone"
        value={values.phone}
        type="text"
        onChange={handleChangeNumber}
        placeholder="phone"
      />
      {values.phoneError ? (
        <p className="textError">เบอร์โทรศัพท์ที่คุณป้อนไม่ถูกต้อง</p>
      ) : (
        ""
      )}
      <div className="gender">
        <label htmlFor="male">Male</label>
        <input
          type="radio"
          name="sex"
          onChange={handleOnchange}
          id="male"
          value="male"
          checked={values.sex === "male" ? true : false}
        />
        <label htmlFor="female">Female</label>
        <input
          type="radio"
          name="sex"
          onChange={handleOnchange}
          id="female"
          value="female"
          checked={values.sex === "female" ? true : false}
        />
        {values.sexError ? (
          <p className="textError">เพศที่คุณป้อนไม่ถูกต้อง</p>
        ) : (
          ""
        )}
      </div>
      <button type="submit">Update</button>
    </form>
  );
};
export default Form;
