import React from "react";

import { EventDescriptions } from "../CssComponent";

interface ChildPropsType {
  x: number | undefined;
  y: number | undefined;
  description: string | undefined;
}

function DescriptionEvent({ x, y, description }: ChildPropsType) {
  return (
    <div>
      <>
        <EventDescriptions theme={{ x: x, y: y }}>
          {description}
        </EventDescriptions>
      </>
    </div>
  );
}

export default DescriptionEvent;
