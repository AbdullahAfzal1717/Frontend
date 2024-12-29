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
        navigate("/Note")
    }





    const getitems = useCallback(async () => {
        try {
            const res = await axios.get(`https://hackthonfinal.vercel.app/events/get/${user.uid}`);
            if (res.status === 200) {
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
        <div className="mt-2">
            {events.map((event) => (
                <div key={event.id} className="note-item p-3 mb-3 rounded d-flex justify-content-between align-items-center">
                    <div>
                        <strong>{event.category}</strong>
                        <br></br>
                        <small>{event.location} </small>

                    </div>
                    <div className='d-inline'>
                        <form onSubmit={handleNavigate} className='d-inline'>

                            <button className='btn btn-dark' onClick={() => {
                                setCurrentEvent(event)
                            }}>View Event</button>
                        </form>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EventsList;
