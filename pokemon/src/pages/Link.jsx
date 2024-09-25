import React from "react";
import { Outlet } from "react-router-dom";

export function Link() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default Link