import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../components/global/Container";
import AllBlogs from "../../components/home/AllBlogs";
import Hero from "../../components/home/Hero";
import Trending from "../../components/home/Trending";
import Login from "../login/index"; // Import the Login component

const Home = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to control the sidebar visibility

  useEffect(() => {
    // You can add a check to see if the user is logged in and close the sidebar
    // Example: if (user) setIsSidebarOpen(false);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle the sidebar visibility
  };

  return (
    <>
      <Hero />
      <Trending />
      <Container>
        <AllBlogs />
      </Container>
    </>
  );
};

export default Home;
