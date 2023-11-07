import React from "react";
import "./Offer.css";

function Offer() {
  return (
    <div className="offerDonwloadApp">
      <div className="donwloadhead">
        <h1>Donwload App Now !</h1>
        <p>
          Get India's #1 travel super app, join 100 Million+ happy travellers!
        </p>
      </div>
      <div className="donwloadBox">
        {/* <p>Use code WELCOMEMMT and get upto Rs 1200 off on your first domestic flight booking</p> */}
        <div className="downloadInputbx">
          <input
            style={{
              width: "50px",
              textAlign: "center",
              padding: "10px 0",
              borderRight: "none",
            }}
            readOnly
            type="text"
            value="+91"
          />
          <input
            placeholder="Enter Your Mobile Number"
            type="number"
            style={{ borderLeft: "none" }}
          />
          <button>GET APP LINK</button>
        </div>

        <div className="donwloadButtons">
          <p>MORE WAY TO GET THE APP</p>
          <button>
            {" "}
            <i className="fa fa-play"></i> Google Play
          </button>
          <button>
            {" "}
            <i className="fa fa-apple"></i> Apple Store
          </button>
        </div>
        <div className="downloadQr">
          <img
            src="https://promos.makemytrip.com/notification/xhdpi/QRCodeDT_QR-code.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Offer;
