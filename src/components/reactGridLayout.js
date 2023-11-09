"use client";
import React, { useState, useEffect, createContext } from "react";
import "./style.css";
import { Responsive, WidthProvider } from "react-grid-layout";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import PieChart from "./pieChart";
import BarChart from "./barChart";
import { Button, Modal } from "antd";
import { useRouter } from "next/navigation";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default function DragFromOutsideLayout({ uniqueId }) {
  const router = useRouter();

  const [modal, contextHolder] = Modal.useModal();
  const [mounted, setmounted] = useState(false);
  const [uniqueName, setUniqueName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const data = JSON.parse(sessionStorage.getItem("layouts") || "[]");
  const uniqueData = data.filter((item) => item.name == uniqueId);

  const [layout, setLayout] = useState([
    { i: "pie-chart", x: 0, y: 0, w: 4, h: 4, static: false },
    { i: "bar-chart", x: 4, y: 0, w: 4, h: 4, static: false },
  ]);

  const [chartDimensions, setChartDimensions] = useState({
    "pie-chart": { width: 400, height: 400 },
    "bar-chart": { width: 400, height: 400 },
  });

  useEffect(() => {
    setmounted(true);
  }, []);

  const handleSaveLayout = () => {
    if (uniqueName === "") {
      setErrorMessage("Please Enter a unique name to save your dashboard.");
    } else {
      setUniqueName("");

      const existingNames = JSON.parse(
        sessionStorage.getItem("layouts") || "[]"
      );
      const dashBoardNames = existingNames.map((item) => item.name);

      if (uniqueId || uniqueId === uniqueName) {
        // Editing an existing layout
        const layoutToUpdate = existingNames.find(
          (item) => item.name === uniqueId
        );
        if (layoutToUpdate) {
          layoutToUpdate.name = uniqueName;
          layoutToUpdate.layout = layout;
          layoutToUpdate.date = new Date().toISOString();
        }
      } else {
        if (dashBoardNames.includes(uniqueName)) {
          setErrorMessage(
            "Name already exists. Please choose a different name."
          );
          return;
        }

        const currentDate = new Date();

        const newLayout = {
          name: uniqueName,
          layout: layout,
          date: currentDate.toISOString(),
        };

        existingNames.push(newLayout);
      }

      sessionStorage.setItem("layouts", JSON.stringify(existingNames));

      modal.info(config);
      // router.push("/");
    }
  };

  const onResize = (layout, oldItem, newItem) => {
    setChartDimensions((prevDimensions) => ({
      ...prevDimensions,
      [newItem.i]: {
        width: newItem.w * 100,
        height: newItem.h * 100,
      },
    }));
  };

  const onDrop = (elemParams) => {
    alert(
      `Element parameters:\n${JSON.stringify(
        elemParams,
        ["x", "y", "w", "h"],
        2
      )}`
    );
  };

  const config = {
    title: "Notification!",
    content: (
      <>
        {uniqueId ? <h1>successfully Updated</h1> : <h1>successfully Saved</h1>}
      </>
    ),
  };

  return (
    <div>
      <div className="input_wrapper">
        <input
          className="name_input"
          type="text"
          placeholder="Enter a unique name"
          onChange={(e) => {
            setUniqueName(e.target.value);
            setErrorMessage("");
          }}
          defaultValue={uniqueId ? uniqueData?.[0]?.name : uniqueName}
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <Button onClick={handleSaveLayout} type="primary" size="large">
          Save Layout
        </Button>
        {contextHolder}
      </div>

      <ResponsiveReactGridLayout
        rowHeight={30}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        layout={layout}
        // onLayoutChange={onLayoutChange}
        onResize={onResize}
        onDrop={onDrop}
        measureBeforeMount={false}
        useCSSTransforms={mounted}
        isDroppable={true}
        margin={[10, 10]}
        isResizable={true}
        droppingItem={{ i: "xx", h: 50, w: 250 }}
      >
        {layout.map((item) => (
          <div key={item.i} data-grid={item} className="chart-item ">
            {item.i === "pie-chart" ? (
              <PieChart
                width={chartDimensions["pie-chart"].width}
                height={chartDimensions["pie-chart"].height}
              />
            ) : item.i === "bar-chart" ? (
              <BarChart
                width={chartDimensions["bar-chart"].width}
                height={chartDimensions["bar-chart"].height}
              />
            ) : null}
          </div>
        ))}
      </ResponsiveReactGridLayout>
    </div>
  );
}
