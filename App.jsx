import React from "react";
import FormGrid from "./components/FormGrid";

const fieldConfig = [
  {
    name: "select1",
    type: "select",
    options: ["Option 1", "Option 2", "Option 3"],
    initialValue: "",
  },
  {
    name: "select2",
    type: "select",
    options: ["Option A", "Option B", "Option C"],
    initialValue: "",
  },
  {
    name: "multiSelect",
    type: "multiSelect",
    options: ["Multi 1", "Multi 2", "Multi 3"],
    initialValue: [],
    multiple: true,
  },
  { name: "numberInput", type: "number", initialValue: 1 },
  { name: "coordinateInput", type: "text", placeholder: "(1).(2)A3.(4)B" },
];

export default function App() {
  return (
    <div>
      <FormGrid fieldConfig={fieldConfig} />
    </div>
  );
}
