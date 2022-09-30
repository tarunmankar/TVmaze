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
                        placeholder="Ex. Tom Cruise"
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
                      <a href={element.person.url} className="border border-dark">
                      {element.person.image ? (
                        <img
                          src={element.person.image.medium}
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
                      <h3 className="text-primary text-center m-2">{element.person.name}</h3>
                      <p className="text-center"><b> Gender :</b> {element.person.gender ? element.person.gender : "Not Avilable"}<br/>
                      <b> Date of birth :</b> {element.person.birthday ? element.person.birthday : "Not Avilable"}</p>
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
