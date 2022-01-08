import React, { useRef } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";
import Styles from "./form.module.css";

function Form() {
  const form = useRef();
  const [data, setData] = React.useState({
    fname: "",
    lname: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:2000/users", data)
      .then(function (response) {
        if (response.statusText === "OK") {
          alert("Account Created Succesfully");
          sendEmail(e);
        }
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function sendEmail(e) {
    // e.preventDefault();
    emailjs
      .sendForm(
        "service_n8alqms",
        "template_jp7cf4d",
        form.current,
        "user_VKtgECC5W94vS4L3nJ5bI"
      )
      .then(
        (result) => {
          console.log(result.text, "mail sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
  }

  return (
    <div className={Styles.loginform}>
      <div>
        <h1>Create An Account</h1>
      </div>
      <div>
        <form ref={form} action="/" onSubmit={handleSubmit}>
          <div className={Styles.divEle}>
            <input
              type="text"
              name="fname"
              placeholder="First Name"
              value={data.fname}
              onChange={handleChange}
              required
            />
          </div>
          <div className={Styles.divEle}>
            <input
              type="text"
              name="lname"
              placeholder="Last Name"
              value={data.lname}
              onChange={handleChange}
              required
            />
          </div>
          <div className={Styles.divEle}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={data.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className={Styles.divEle}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={Styles.divEle}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
              required
            />
          </div>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}

export default Form;
