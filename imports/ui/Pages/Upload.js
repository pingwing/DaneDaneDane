import React, { Component } from "react";
import { Page } from "../Layout/Page";
import CheckData from "./UploadSteps/CheckData";

import StepZilla from "react-stepzilla";
import "./StepZilla.css";
import "react-sortable-tree/style.css";

export default class Upload extends Component {
  constructor(props = {}) {
    super(props);
  }

  render() {
    const steps = [
      {
        name: "Sprawdź zbiór",
        component: <CheckData />
      }
    ];

    return (
      <Page>
        <div className="step-progress">
          <StepZilla steps={steps} />
        </div>
      </Page>
    );
  }
}
