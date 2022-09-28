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
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="form-control"
                placeholder="Search by Actors name...."
              />
            </div>
          </div>
        </div>
      </section>

      <section >
        <div className="container mt-4">
          <div className="row">
            {actorsData.map((element) => {
              return (
                <div className="col-md-3 mb-3">
                  <div className="card">
                    <a href={element.person.url} >
                    {element.person.image ? (
                      <img
                        src={element.person.image.medium}
                        className="poster"
                        style={{ width: "255px", height: "325px" }}
                        alt={
                          element.person.name != null
                            ? element.person.name
                            : "Not found"
                        }
                      />
                    ) : (
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png"
                          style={{ width: "250px", height: "325px" }}
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
      </section>
    </>
  );
}

export default Actor;
