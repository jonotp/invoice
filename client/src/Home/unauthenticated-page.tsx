import { Button } from "@material-ui/core";
import React from "react";
import IconFeather from "../Icon/feather";
import IconUnlock from "../Icon/unlock";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SignInButton from "../SignIn/button";
import UIMaterialButton from "../UI/material-button";
import SignUpButton from "../SignUp/button";
import InvoiceButton from "../Invoice/button";
import "./home.scss";

const HomeUnauthenticatedPage = () => {
  return (
    <section className="unauthenticated-home-page">
      <div className="top-layer"> </div>
      <div className="middle-layer"> </div>
      <div className="bottom-layer"></div>
      <section className="invoice">
        <div style={{ gridArea: "invoice-text" }}>
          <h1>A New Way To Invoice</h1>
          <p>
            <u>Invoice Lite</u> is designed to be lightweight and simple so you
            can focus on your product and services
          </p>
          <Button variant="contained" color="primary">
            <InvoiceButton label="Try It Now!" />
          </Button>
        </div>
        <div className="icon-container" style={{ gridArea: "invoice-icon" }}>
          <IconFeather height="180px" width="180px" />
        </div>
      </section>
      <section className="create-account">
        <div className="icon-container">
          <div className="lock-hole"></div>
          <IconUnlock />
        </div>
        <div>
          <h2>Unlock More</h2>
          <p>
            By creating an account you can keep track of all your invoices,
            customers and products
          </p>
          <div className="create-account-buttons">
            <Button variant="outlined" color="primary">
              <SignUpButton label="Create Account" />
            </Button>
            <span>or</span>
            <UIMaterialButton variant="outlined" color="secondary">
              <SignInButton label="Sign In Now" />
            </UIMaterialButton>
          </div>
        </div>
      </section>
      <section className="footer">
        <div>
          <h2>
            Build It Together <FavoriteIcon />
          </h2>

          <p>
            Have useful feedback, or something on your mind, let us know by
            dropping an email to
          </p>
          <a href="mailto:jpham.developments@gmail.com?subject=Invoice Generator Feedback">
            jpham.developments@gmail.com
          </a>
        </div>
      </section>
    </section>
  );
};

export default HomeUnauthenticatedPage;
