import React, { useEffect, useState } from "react";
import FlightCard from "../../components/FlightCard/FlightCard";
import FlightInputBox from "../../components/FlightInputBox/FlightInputBox";
import "./Flights.scss";
import axios from "axios";
import Loading from "../Loading/Loading";
import NoContent from "../NoContent/NoContent";
import Header from "../../components/Navbar/Header/Header";

const Flights = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlight] = useState([]);
  const config = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDFmMTA2YThjMDQ2ZWM5NWVmNjQ5NCIsImlhdCI6MTY5ODgyMDM1OCwiZXhwIjoxNzMwMzU2MzU4fQ.6bVVRMx-QuIPvv_eDU5wTvo5z1RUHzTod7IICQARwcc",
      projectID: "9sa80czkq1na",
      day: "Tue",
    },
  };

  const getFlightsData = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://academics.newtonschool.co/api/v1/bookingportals/flight?day=Tue&search={"source":"AMD","destination":"HYD"}`,
        config
      );
      console.log("res", data);
      //   setFlights(data.data);
      //   setFilteredFlight(data.data);
      setFlights(data.data.flights || []); // Set to an empty array if data.data.flights is undefined
      setFilteredFlight(data.data.flights || []);
      setIsLoading(false);
    } catch (error) {
      console.log("err", error);
      setError("Error fetching flight data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFlightsData();
  }, []);

  return (
    <section>
      <Header />
      <section className="flights-wrapper">
        <div className="flights">
          <div className="container">
            <FlightInputBox
              flights={flights}
              setFilteredFlight={setFilteredFlight}
            />
          </div>
        </div>
        <div className="available">Available Flights</div>
        <div className="flight-tickets">
          {error ? (
            <div>Error: {error}</div>
          ) : isLoading ? (
            <Loading />
          ) : filteredFlights && filteredFlights.length > 0 ? (
            filteredFlights.map((flight, idx) => (
              <FlightCard key={idx} flight={flight} />
            ))
          ) : (
            <NoContent data="Flights" />
          )}
        </div>
      </section>
    </section>
  );
};

export default Flights;
