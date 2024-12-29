import React, { useContext } from 'react';
import NotesList from '../Eventslist';
import { AuthContext } from '../../../context/AuthContext';
import { PlusOutlined, SearchOutlined } from "@ant-design/icons"
import { Link } from 'react-router-dom';
import EventsList from '../Eventslist';
const Home = () => {
  const { user } = useContext(AuthContext)
  return (
    <mian className="frontend ">

      <div className="container-fluid p-4 app-background ">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1>Hi, {user.name}</h1>
            <h4>Welcome to the best Event Planner Platform</h4>
          </div>

        </div>

        <div className="mt-3">
          <div className="input-group  ">
            <span className="input-group-text">
              <SearchOutlined />
            </span>
            <input type="text" className="form-control" placeholder="Search" />
          </div>
        </div>

        <div className="mt-4">
          <h5 className="fw-bold">All Events </h5>
        </div>
        <EventsList />
        <div className='text-center '>
          <Link to="/Add" className="btn btn-dark">
            <PlusOutlined />
            <span >Add Event</span>
          </Link>
        </div>
      </div>
    </mian>
  );
};

export default Home;
