import { useEffect, useState } from "react";
import TrainCard from "../../components/Train Card/TrainCard";
import TrainInputBox from "../../components/TrainInputBox/TrainInputBox";
import "./Trains.scss";
import axios from "axios";
import { TRAIN_API_LINK, TRAIN_API_LINK_TWO } from "../../config";
import Loading from "../Loading/Loading";
import NoContent from "../NoContent/NoContent";
import Header from "../../components/Navbar/Header/Header";

const Trains = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [trains, setTrains] = useState([]);
  const [filteredTrains, setFilteredTrains] = useState([]);

  const getTrainsData = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(TRAIN_API_LINK);
      setTrains(data.data);
      setFilteredTrains(data.data);
      setIsLoading(false);
    } catch (err) {
      try {
        const { data } = await axios.get(TRAIN_API_LINK_TWO);
        setTrains(data);
        setFilteredTrains(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    getTrainsData();
  }, []);
  return (
    <section>
      <Header/>
    <section className="trains-wrapper">
      <div className="trains">
        <div className="container">
          <TrainInputBox
            trains={trains}
            setFilteredTrains={setFilteredTrains}
          />
        </div>
      </div>
      <div className="available">Available Trains</div>
      {
        <div className="train-tickets">
          {error ? (
            <Error message={error} />
          ) : isLoading ? (
            <Loading />
          ) : filteredTrains.length === 0 ? (
            <NoContent data="Trains" />
          ) : (
            filteredTrains.map((train, idx) => (
              <TrainCard key={idx} train={train} />
            ))
          )}
        </div>
      }
    </section>
    </section>
  );
};

export default Trains;
