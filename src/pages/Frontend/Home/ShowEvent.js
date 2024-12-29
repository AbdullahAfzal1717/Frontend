import React, { useContext } from 'react';
import { HomeContext } from '../../../context/HomeContext';
import { AuthContext } from '../../../context/AuthContext';

const ShowEvent = () => {
    const { currentEvent } = useContext(HomeContext)
    const { createdBy } = currentEvent
    const { setIsAppLoading } = useContext(AuthContext);




    return (
        <main>

            <div className="container my-5">
                <div className="card shadow-lg border-0 rounded">
                    <div className="card-body">
                        <h2 className="card-title text-dark fw-bold">{currentEvent.title}</h2>
                        <h5 className="card-subtitle mb-2 text-secondary">{currentEvent.category}</h5>
                        <h5 className="card-subtitle mb-3 text-muted">
                            <i className="bi bi-geo-alt-fill text-danger"></i> {currentEvent.location}
                        </h5>

                        <div className="mb-4">
                            <p className="card-text text-justify">{currentEvent.description}</p>
                        </div>

                        <div className="text-center my-3">
                            <button className="btn btn-primary btn-lg px-4">
                                <i className="bi bi-person-plus-fill"></i> Join Event
                            </button>
                        </div>

                        <div className="d-flex justify-content-between align-items-center border-top pt-3">
                            <span className="text-muted">
                                <i className="bi bi-person-circle"></i> Created By: {createdBy}
                            </span>
                            <span className="text-muted">
                                <i className="bi bi-calendar-event"></i> {currentEvent.date || "N/A"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    );
};

export default ShowEvent;
