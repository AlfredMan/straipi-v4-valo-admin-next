import * as React from "react";

import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  // return <>{children}</>;
  return (
    <div className="flex absolute inset-0 flex-col bg-gray-100">
      <Header></Header>
      <div className="flex-grow bg-gray-100">
        <div className="overflow-y-scroll w-full h-full">{children}</div>
      </div>
    </div>
  );
}
