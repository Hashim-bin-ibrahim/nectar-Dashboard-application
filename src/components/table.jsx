"use client";
import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "antd";
import moment from "moment"; 
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Link from "next/link";

import "./style.css";

export default function TableComponent() {
  const [layouts, setLayouts] = useState([]);
  const [deleteLayoutName, setDeleteLayoutName] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  useEffect(() => {
    const storedLayouts = JSON.parse(sessionStorage.getItem("layouts") || "[]");
    setLayouts(storedLayouts);
  }, []);

  const columns = [
    {
      title: "Dashboard Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date Created",
      dataIndex: "date",
      key: "date",
      render: (text, record) =>
        moment(record.date).format("MMMM D, YYYY HH:mm A"),
    },
    {
      title: "Edit",
      key: "edit",
      render: (text, record) => (
        <Link href={`/edit/${record.name}`}>
          <Button type="primary" icon={<EditOutlined />} />
        </Link>
      ),
    },
    {
      title: "Delete",
      key: "delete",
      render: (text, record) => (
        <Button
          type="danger"
          icon={<DeleteOutlined />}
          onClick={() => showDeleteModal(record.name)}
        />
      ),
    },
  ];

  const showDeleteModal = (name) => {
    setDeleteLayoutName(name);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteLayout = () => {
    const updatedLayouts = layouts.filter(
      (layout) => layout.name !== deleteLayoutName
    );
    setLayouts(updatedLayouts);
    sessionStorage.setItem("layouts", JSON.stringify(updatedLayouts));
    setIsDeleteModalVisible(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
  };

  return (
    <div className="container position-relative tab">
      <Table dataSource={layouts} columns={columns} />

      <Modal
        title="Delete Layout"
        open={isDeleteModalVisible}
        onOk={handleDeleteLayout}
        onCancel={handleCancelDelete}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>
          Are you sure you want to delete the dashboard with name "
          {deleteLayoutName}"?
        </p>
      </Modal>
    </div>
  );
}
