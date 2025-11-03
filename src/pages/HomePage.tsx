import React from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPaintBrush } from "react-icons/fa";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen bg-linear-to-r from-yellow-100 via-pink-100 to-red-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Card
          className="shadow-4 px-8 text-center w-[90vw] md:w-[400px] bg-white/80 backdrop-blur-md rounded-2xl"
          title={
            <div className="flex flex-col items-center text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-yellow-500 via-red-500 to-pink-600">
              <FaPaintBrush className="text-5xl mb-3 animate-bounce" />
              Welcome to <span className="text-red-600">Our Website</span>
            </div>
          }
          subTitle={
            <p className="text-gray-700 font-medium mt-2">
              Explore beautiful artworks from the Art Institute of Chicago
            </p>
          }
        >
          <motion.p
            className="m-0 text-gray-800 text-base mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Browse through hundreds of artworks, learn about artists, and
            discover creativity through history.
          </motion.p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Button
              label="Go to Artworks Table"
              icon="pi pi-arrow-right"
              className="p-button-rounded p-button-warning text-white bg-linear-to-r from-yellow-500 to-red-500 border-none px-5 py-2 rounded-full"
              onClick={() => navigate("/table?page=1")}
            />
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
};

export default HomePage;
