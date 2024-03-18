import React from "react";
import { v4 } from "uuid";

const HorizontalRule = () => {
  return React.createElement("hr", { className: "my-2",key: v4()  });
};

export default HorizontalRule;
