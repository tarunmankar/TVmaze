import React, { useState, useEffect } from "react";

function Actor() {
  const [inputVal, setInputVal] = useState("");
  const [actorsData, setActorsData] = useState([]);

  let dataUrl = "";
  if (inputVal.length > 0) {
    dataUrl = `https://api.tvmaze.com/search/people?q=${inputVal}`;
  } 

  const getActorsData = async () => {
    try {
      let respone = await fetch(dataUrl);
      let resData = await respone.json();
      setActorsData(resData);
    } 
    catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getActorsData();
  }, [inputVal]);

  console.log(actorsData);
  
  return (
    <>
      <section className="mt-5">
        <div className="container d-flex justify-content-center">
          <div className="row">
            <p style={{color:"white", fontSize:"16px"}}>Enter Actor Name</p>
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

      <section >
        <div className="bg-dark h-100">
          <div className="container mt-4">
            <div className="row d-flex justify-content-center">
              {actorsData.map((element) => {
                return (
                  <div className="col-md-3 mb-3">
                    <div className="card">
                      <a href={element.person.url} >
                      {element.person.image ? (
                        <img
                          src={element.person.image.medium}
                          className="poster"
                          style={{ width: "100%"}}
                          alt={
                            element.person.name != null
                              ? element.person.name
                              : "Not found"
                          }
                        />
                      ) : (
                          <img
                            src="https://st3.depositphotos.com/1322515/35964/v/600/depositphotos_359648638-stock-illustration-image-available-icon.jpg"
                            style={{ width: "100%" }}
                            alt = "Not Found"
                          />
                      )}
                      </a>
                      <h4 className="text-primary text-center pt-2">{element.person.name}</h4>
                    </div>
                  </div>
                );
              })}
            </div>
         </div>
      </div>
     </section>
    </>
  );
}

export default Actor;
