import React, { useState } from 'react'
import Actor from './Actors';
import Show from './Show';
const Search = () => {

    const [actor, setActor] = useState(false);
    const [show, setShow] = useState(false);

    const setActorFilter = () => {
        setShow(false);
        setActor(true);
    }

    const setShowFilter = () => {
        setActor(false);
        setShow(true);
       
    }
    return (
        <>
                <div className="container">
                    <div className="row mt-3">
                        <div className="col-md-12 text-center">
                          <p style={{color:"white", fontSize:"20px"}}>Search about your favorite actors and TV shows</p>
                            <input type="radio" name="movie" onChange={() => setActorFilter()} /> 
                                <label className="text-info h4"> Actor </label> &nbsp &nbsp
                            <input type="radio" name="movie" onChange={() => setShowFilter()} /> 
                                <label className="text-info h4"> Show </label>
                        </div>
                    </div>
                </div>
            {actor ? <Actor /> : ""}
            {show ? <Show /> : ""}
        </>
    )
}

export default Search