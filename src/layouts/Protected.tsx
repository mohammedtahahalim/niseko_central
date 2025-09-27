import { Outlet } from "react-router-dom";

export default function Protected() {
  return (
    <div>
      Protected
      <Outlet />
    </div>
  );
}
