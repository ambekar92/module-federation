/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Outlet, Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div id="wrapper">
        <div id="sidebar-wrapper">
          <ul class="sidebar-nav">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/sample1">Sample1</Link>
            </li>
            <li>
              <Link to="/sample2">Sample2</Link>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default Sidebar;
