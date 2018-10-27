import React from "react";
import "./Page.css";

export const Page = props => (
  <div className="page-container">
    <div className="content">{props.children}</div>
    <div className="footer"> {props.footer}</div>
  </div>
);
