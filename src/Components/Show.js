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
                <div className="container">
                    <div className="row">
                        <div className="col-md-7">
                            <input
                                type="text"
                                value={inputVal}
                                onChange={(e) => setInputVal(e.target.value)}
                                className="form-control"
                                placeholder="Search by Show name...."
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="container mt-4">
                    <div className="row">
                        {showData.map((element) => {
                            return (
                              <div className="col-md-3 mb-3">
                                <div className="card">
                                  <a href={element.show.url} >
                                  {element.show.image ? (
                                    <img
                                      src={element.show.image.medium}
                                        style={{
                                        width: "255px",
                                        height: "325px",
                                        }}
                                      alt={
                                        element.show.name != null
                                          ? element.show.name
                                          : "Not found"
                                      }
                                    />
                                  ) : (
                                      <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png"
                                        style={{
                                        width: "270px",
                                        height: "325px",
                                        }}
                                        alt = {element.show.name}
                                      />
                                  )}
                                  </a>
                                  <h5 className="text-primary text-center pt-2">{element.show.name}</h5>
                                </div>
                              </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Actor;
