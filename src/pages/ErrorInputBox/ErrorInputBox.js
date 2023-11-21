import Bottom from "../../components/Footer/Bottom";
import Header1 from "../../components/Navbar/Header1/Header1";
import Navigation from "../../components/Navigation/Navigation";
import "./ErrorInputBox.scss";

const ErrorInputBox = () => {
  return (
    <section className="dont-know">
      <Header1 />
      <section className="input-box-wrapper-error">
        <div className="input-box">
          <Navigation />
          <div className="input-wrapper">
            <div className="input">
              <span>This Feature is not Implemented yet.</span>
              <span>Please Try to Book Flights, Hotels & Train.</span>
              <span>Thanks!</span>
            </div>
          </div>
        </div>
      </section>
      <div style={{ position:"absolute",bottom:"0",width:"100%" }}>
        <Bottom />
      </div>
    </section>
  );
};

export default ErrorInputBox;
