import React from "react";

import AIResponseRenderer from "./AIResponseRenderer";

interface AIResponseProps {
  text: string;
}

export default React.memo(function AIResponse({
  text,
}: AIResponseProps) {
  return (
    <AIResponseRenderer text={text} />
  );
});