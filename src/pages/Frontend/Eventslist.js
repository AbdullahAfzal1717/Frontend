import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { HomeContext } from '../../context/HomeContext';
import axios from 'axios';



const EventsList = () => {
    const [events, setEvents] = useState([])
    const { currentEvent, setCurrentEvent } = useContext(HomeContext)
    const { user, setIsAppLoading } = useContext(AuthContext)
    const navigate = useNavigate("")

    const handleNavigate = (e) => {
        e.preventDefault()
        navigate("/Event")
    }





    const getitems = useCallback(async () => {
        try {
            const res = await axios.get('https://hackthonfinal.vercel.app/events/get');
            if (res.status === 200) {
                console.log("resDAta", res.data)
                const { events } = res.data;
                console.log("Fetched events:", events);
                setEvents(events || []); // Fallback to empty array if events is undefined
            }
        } catch (err) {
            console.error("Error fetching data:", err.message);
        } finally {
            console.log("Fetch attempt complete");
        }
    }, [user.uid]);
    useEffect(() => {
        getitems();
    }, [getitems]);
    return (
        <div className="row mt-4">
            {events.map((event) => (
                <div key={event.id} className="col-md-4 col-sm-6 mb-4">
                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <h5 className="card-title text-dark fw-bold">{event.category}</h5>
                            <p className="card-text text-muted mb-2">
                                <i className="bi bi-geo-alt-fill text-danger"></i> {event.location}
                            </p>
                            <form onSubmit={handleNavigate}>

                                <button
                                    className="btn btn-dark w-100"
                                    onClick={() => setCurrentEvent(event)}
                                >
                                    View Event
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EventsList;
