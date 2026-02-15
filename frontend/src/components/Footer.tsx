import React from "react";
import { footerStyles } from "../assets/dummyStyles";

function Footer() {
  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.container}>
        <div className={footerStyles.copyright}>
          &copy; {new Date().getFullYear()} InvoiceGenie. All rights reserved.
        </div>
        <div className={footerStyles.links}>
          <a href="/terms" className={footerStyles.link}>
            Terms of Service
          </a>
          <a href="/privacy" className={footerStyles.link}>
            Privacy Policy
          </a>
          <a href="/contact" className={footerStyles.link}>
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
