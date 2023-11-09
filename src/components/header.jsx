"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image"; // Import the Image component

export default function Header({ child }) {
  return (
    <nav className="navbar navbar-light  d-flex justify-content-flex-start align-items-center nav">
      <div className="container ">
        <a className="navbar-brand" href="/">
          <Image
            src="/nectar-logo.svg" 
            alt=""
            width={60} 
            height={40} 
          />
        </a>
        {!child && (
          <Link
            href={"/dashboard"}
            style={{ textDecoration: "none", color: "white" }}
          >
            <button className="btn btn-success">Create New DashBoard</button>
          </Link>
        )}
      </div>
    </nav>
  );
}
