import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PasswordShowAndHide from "./PasswordShowAndHide.jsx";
import "../../styles/auth/auth.scss";
import Alert from "../Alert";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { login } from "../../actions/auth";

function Login(props) {
  const [inputs, setInputs] = useState("");
  const { t } = useTranslation();
  const error = useSelector((state) => state.errors.login);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login());
    console.log(isAuthenticated);
  };

  const handleChange = (event) => {
    setInputs({ ...inputs, [event.target.id]: event.target.value });
  };

  return (
    <Fragment>
      {error ? <Alert title="error" text={error} /> : null}
      <div className="main">
        <h1>{t("login.submit")}</h1>
        <div className="logo">
          <h3>dwb</h3>
        </div>
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          style={{ WebkitAppearance: "none" }}
        >
          <input
            type="username"
            id="username"
            onChange={handleChange}
            placeholder={t("auth.username")}
            style={{ WebkitAppearance: "none" }}
            required
          />
          <i className="fa fa-user"></i>
          <i className="fa fa-lock"></i>
          <PasswordShowAndHide onChange={handleChange} />
          <input
            type="submit"
            value={t("login.submit")}
            style={{ WebkitAppearance: "none" }}
          />
          <h4>
            {t("login.notRegistered")} &nbsp; <Link to="/register" />
          </h4>
        </form>
      </div>
    </Fragment>
  );
}

export default Login;
