import React, { useContext } from 'react';
import { HomeContext } from '../../../context/HomeContext';
import { AuthContext } from '../../../context/AuthContext';

const ShowEvent = () => {
    const { currentNote } = useContext(HomeContext)
    const { createdBy } = currentNote
    const { setIsAppLoading } = useContext(AuthContext);




    return (
        <div className="container my-5">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h2 className="card-title text-primary">{currentNote.title}</h2>
                    <h5 className="card-subtitle mb-3 text-muted">{currentNote.category}</h5>

                    <div className="mb-4">
                        <p className="card-text">{currentNote.content}</p>
                    </div>


                    <div className="d-flex justify-content-between border-top pt-3">
                        <div>

                            <span>Created By : {createdBy}</span>
                            {/* <span>Created At: {currentNote.dateCreated}</span> */}

                        </div>
                    </div>
                    {/* <div> */}
                    {/* <small className="text-muted d-block">
                                <strong>Last Updated By:</strong> {note.updatedBy}
                            </small>
                            <small className="text-muted d-block">
                                <strong>Last Updated At:</strong> {not} */}
                    {/* </small> */}
                    {/* </div> */}
                    {/* </div> */}
                </div>
            </div>
        </div >
    );
};

export default ShowEvent;
