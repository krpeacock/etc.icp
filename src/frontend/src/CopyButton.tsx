import React, { MouseEvent } from "react";

const CopyButton = (props: { text: string }) => {
  const [active, setActive] = React.useState(false);
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(props.text);
    setActive(true);
    setInterval(() => setActive(false), 4_000);
  };
  return (
    <button className="" onClick={handleClick} disabled={active}>
      {active ? "copied!" : "copy to clipboard"}
    </button>
  );
};

export default CopyButton;
