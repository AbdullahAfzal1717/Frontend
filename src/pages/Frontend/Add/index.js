import React, { useContext, useState } from "react";
// import { HomeContext } from "../../../context/HomeContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { message } from "antd";

export default function Add() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const { user, setIsAppLoading } = useContext(AuthContext);
  console.log("first", user)
  // const { addItems } = useContext(HomeContext);
  const navigate = useNavigate("");
  // const {id} = useContext(HomeContext);
  // const {setId} = useContext(HomeContext);
  const id =
    Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
  // const getRandomId = () => Math.random().toString(36).slice(2)

  // setId(getRandomId());

  const handlesubmit = async (e) => {
    e.preventDefault();
    // addItems({ name, title, description, category, id });
    let data = {
      title,
      description,
      category,
      location,
      id,
      createdBy: user.uid,
    };
    addItem(data)
  };

  const addItem = async (data) => {
    setIsAppLoading(true);
    try {
      axios.post("https://hackthonfinal.vercel.app/events/create", data)
        .then(({ status, data }) => {
          console.log("status", status)
          if (status === 201) {
            message.success(data.message)
          }
        })
        .catch((err) => {
          message.error("Failed to add document")
          console.error("Error adding document: ", err);
        })
    } catch (e) {
      console.error("Error ", e);
    } finally {
      setIsAppLoading(false);
    }
    navigate("/");
    // console.log(process.env.REACT_APP_NAME);
  };

  return (
    <main className="frontend py-5">
      <div className="container">
        <div className="row">
          <div className="col">
            <div
              className="card border-none mx-auto p-3 p-md-4"
              style={{ maxWidth: 400 }}
            >
              <h2 className="text-dark text-center mb-4">Add-Event</h2>
              <form onSubmit={handlesubmit}>
                <div className="row">

                  <div className="col-12 mb-4">
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      placeholder="Enter title here"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="col-12 mb-4">
                    <textarea
                      type="text"
                      className="form-control"
                      name="description"
                      placeholder="Enter description here"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="col-12 mb-4">
                    <input
                      type="text"
                      className="form-control"
                      name="category"
                      placeholder="Enter Subject here"
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </div>
                  <div className="col-12 mb-4">
                    <input
                      type="text"
                      className="form-control"
                      name="loccation"
                      placeholder="Enter Subject here"
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <div className="col-12">
                    <button className="btn btn-dark w-100">Add</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
