"use client";
import React from "react";
import Header from "../../../components/header";
import DragFromOutsideLayout from "../../../components/reactGridLayout";

function Editpage({ params }) {
  console.log("params", params);

  return (
    <div>
      <Header child="true" />
      <DragFromOutsideLayout uniqueId={params.id} />
    </div>
  );
}

export default Editpage;
