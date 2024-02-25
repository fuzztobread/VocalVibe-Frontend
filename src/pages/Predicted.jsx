import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import axios from "axios";
import moment from "moment"; // Import moment library

const PredictedPage = () => {
  const [history, setHistory] = useState(null);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/predict/history/",
          {
            headers: {
              Authorization: `Bearer ${token.access}`,
            },
          }
        );
        setHistory(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [token.access]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <table className="table-fixed w-full text-white border border-collapse rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-700 text-center">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Emotion</th>
              <th className="px-4 py-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {history && history.length > 0 ? (
              history.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-500" : ""}>
                  <td className="px-4 py-2 border border-gray-400">{index + 1}</td>
                  <td className="px-4 py-2 border border-gray-400">{item.predicted_value}</td>
                  <td className="px-4 py-2 border border-gray-400">
                    {moment(item.created_at).format("YYYY-MM-DD HH:mm:ss")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center p-4">
                  {history === null ? "Loading..." : "No data available"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PredictedPage;
