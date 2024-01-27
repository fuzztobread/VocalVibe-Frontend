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
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [token.access]);

  return (
    <>
      <Navbar />
      <div>
        <table className="table-fixed text-white">
          <thead>
            <tr>
              <th>#</th>
              <th>Emotion</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {history &&
              history.map((item, index) => (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{item.predicted_value}</td>
                  <td>{moment(item.created_at).format("YYYY-MM-DD HH:mm:ss")}</td>
                </tr>
              ))}
            {!history && (
              <tr>
                <td colSpan="3">Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PredictedPage;
