'use client'
import React from "react";
import Link from "next/link";

export default function Header({ child }) {
  return (
    <nav className="navbar navbar-light  d-flex justify-content-flex-start align-items-center nav">
      <div className="container ">
        <a className="navbar-brand" href="/">
          <img src="../../nectar-logo.svg" alt="" width="60" height="40" />
        </a>
        {!child && (
          <button className="btn btn-success  ">
            <Link
              href={"/dashboard"}
              style={{ textDecoration: "none", color: "white" }}
            >
              Create New DashBoard
            </Link>
          </button>
        )}
      </div>
    </nav>
  );
}
