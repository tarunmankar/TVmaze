import React, { useState, useEffect } from "react";

function Actor() {
    const [inputVal, setInputVal] = useState("");
    const [showData, setshowData] = useState([]);

    let dataUrl = "";
    if (inputVal.length > 0) {
        dataUrl = `https://api.tvmaze.com/search/shows?q=${inputVal}`;
    } 

    const getshowData = async () => {
        try {
            let respone = await fetch(dataUrl);
            let resData = await respone.json();
            setshowData(resData);
        } 
        catch (error) {
            console.log(error);
        }
    };
    
    useEffect(() => {
        getshowData();
    }, [inputVal]);
   

    return (
        <>
        <section className="mt-5">
          <div className="container d-flex justify-content-center">
              <div className="row">
                  <p style={{color:"white", fontSize:"16px"}}>Enter Show Name</p>
                              <input
                                  type="text"
                                  value={inputVal}
                                  onChange={(e) => setInputVal(e.target.value)}
                                  className="form-control"
                                  placeholder="Ex. Shark Tank"
                              />
              </div>
            </div>
        </section>

         <section>
            <div className="bg-dark h-100">
                <div className="container mt-4">
                    <div className="row d-flex justify-content-center">
                        {showData.map((element) => {
                            return (
                              <div className="col-md-3 mb-3">
                                <div className="card">
                                    <div className="row">
                                        <a href={element.show.url} className="border border-dark" >
                                        {element.show.image ? (
                                            <img
                                            src={element.show.image.medium}
                                                style={{
                                                width: "100%"
                                                }}
                                            alt={
                                                element.show.name != null
                                                ? element.show.name
                                                : "Not found"
                                            }
                                            />
                                        ) : (
                                            <img
                                                src="https://st3.depositphotos.com/1322515/35964/v/600/depositphotos_359648638-stock-illustration-image-available-icon.jpg"
                                                style={{
                                                width: "100%"
                                                }}
                                                alt = {element.show.name}
                                            />
                                        )}
                                        </a>
                                        <h3 className="text-primary text-center pt-2">{element.show.name}</h3>
                                        <p className="text-center"><b>Runtime: </b>{element.show.runtime} min<br/>
                                        <b>Language: </b>{element.show.language}</p>
                                  </div>
                                </div>
                              </div>
                            );
                        })}
                    </div>
                </div>
              </div>
           </section> 
        </ >
    );
}

export default Actor;
