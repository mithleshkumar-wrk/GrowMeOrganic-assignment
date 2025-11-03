import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { motion } from "framer-motion";
import { FaSadTear } from "react-icons/fa";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-r from-pink-100 via-red-100 to-yellow-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="inline-block"
        >
          <FaSadTear className="text-8xl text-red-500 mb-4" />
        </motion.div>

        <h1 className="text-5xl font-extrabold text-red-600 mb-2">
          404 - Page Not Found
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>

        <Button
          label="Go Back Home"
          icon="pi pi-home"
          className="p-button-rounded p-button-warning text-white bg-linear-to-r from-yellow-500 to-red-500 border-none px-5 py-2 rounded-full"
          onClick={() => navigate("/")}
        />
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
