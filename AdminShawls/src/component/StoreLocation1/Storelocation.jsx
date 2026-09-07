
import React from "react";

function StoreLocation() {
  // Your office coordinates
  const latitude = 31.6690423;
  const longitude = 74.8468949;

  // Open Google Maps button
  const googleMapsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=31.6690423,74.8468949";

  return (
    <>
      <style>{`

        /* =========================================
           MAIN SECTION
        ========================================= */

        .store-location {
          width: 100%;
          padding: 80px 7%;
          background: #faf8f5;
          box-sizing: border-box;
        }


        /* =========================================
           HEADER
        ========================================= */

        .store-header {
          text-align: center;
          margin-bottom: 55px;
        }

        .store-subtitle {
          display: block;
          font-size: 13px;
          letter-spacing: 4px;
          font-weight: 600;
          color: #a67c52;
          margin-bottom: 12px;
        }

        .store-header h2 {
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 48px;
          font-weight: 600;
          color: #2c211b;
        }

        .heading-line {
          width: 70px;
          height: 2px;
          background: #b08a60;
          margin: 18px auto;
        }

        .store-header p {
          margin-top: 15px;
          color: #777;
          font-size: 16px;
        }


        /* =========================================
           MAIN CONTENT
        ========================================= */

        .store-wrapper {
          max-width: 1250px;
          margin: auto;

          display: grid;
          grid-template-columns: 0.9fr 1.1fr;

          gap: 50px;
          align-items: stretch;
        }


        /* =========================================
           LEFT SIDE
        ========================================= */

        .store-details {
          background: #ffffff;
          padding: 45px;

          border-radius: 18px;

          box-shadow: 0 10px 35px rgba(0, 0, 0, 0.08);

          border: 1px solid #eee6de;
        }

        .small-heading {
          font-size: 12px;
          letter-spacing: 3px;
          color: #a67c52;
          font-weight: 600;
        }

        .store-details h1 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 42px;
          color: #2c211b;
          margin: 10px 0 20px;
        }

        .store-description {
          color: #777;
          line-height: 1.8;
          font-size: 15px;
          margin-bottom: 30px;
        }


        /* =========================================
           DETAILS
        ========================================= */

        .detail-item {
          display: flex;
          gap: 18px;
          margin-bottom: 25px;
          align-items: flex-start;
        }

        .detail-icon {
          min-width: 45px;
          width: 45px;
          height: 45px;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #f3ece4;
          border-radius: 50%;

          font-size: 19px;
        }

        .detail-item h3 {
          margin: 0 0 6px;

          font-family: Georgia, "Times New Roman", serif;

          font-size: 18px;
          color: #34271f;
        }

        .detail-item p {
          margin: 0;

          color: #777;

          font-size: 14px;

          line-height: 1.7;
        }


        /* =========================================
           BUSINESS HOURS
        ========================================= */

        .business-hours {
          margin-top: 30px;

          padding-top: 25px;

          border-top: 1px solid #eee3d8;
        }

        .business-hours h3 {
          font-family: Georgia, "Times New Roman", serif;

          color: #34271f;

          font-size: 20px;

          margin-bottom: 18px;
        }

        .hours-row {
          display: flex;

          justify-content: space-between;

          gap: 20px;

          padding: 10px 0;

          font-size: 14px;

          color: #777;

          border-bottom: 1px dashed #e8ded4;
        }


        /* =========================================
           MAP CARD
        ========================================= */

        .store-map {
          background: #ffffff;

          padding: 15px;

          border-radius: 18px;

          box-shadow: 0 10px 35px rgba(0, 0, 0, 0.08);

          border: 1px solid #eee6de;

          display: flex;
          flex-direction: column;
        }


        /* =========================================
           MAP TITLE
        ========================================= */

        .map-title {
          display: flex;

          align-items: center;

          gap: 12px;

          padding: 15px 15px 18px;
        }

        .map-title > span {
          font-size: 25px;
        }

        .map-title h3 {
          margin: 0;

          font-family: Georgia, "Times New Roman", serif;

          color: #34271f;

          font-size: 21px;
        }

        .map-title p {
          margin: 3px 0 0;

          font-size: 13px;

          color: #999;
        }


        /* =========================================
           MAP
        ========================================= */

        .map-container {
          width: 100%;

          height: 450px;

          overflow: hidden;

          border-radius: 12px;

          background: #eee;
        }

        .map-container iframe {
          width: 100%;
          height: 100%;

          display: block;

          border: none;
        }


        /* =========================================
           BUTTON
        ========================================= */

        .direction-btn {
          display: inline-flex;

          align-items: center;
          justify-content: center;

          width: fit-content;

          margin: 18px 15px 10px;

          padding: 13px 25px;

          background: #2c211b;

          color: white;

          text-decoration: none;

          border-radius: 30px;

          font-size: 14px;

          transition: all 0.3s ease;
        }

        .direction-btn:hover {
          background: #a67c52;

          color: white;

          transform: translateY(-2px);
        }


        /* =========================================
           LARGE TABLET
        ========================================= */

        @media (max-width: 1100px) {

          .store-location {
            padding: 70px 5%;
          }

          .store-wrapper {
            grid-template-columns: 1fr 1fr;
            gap: 25px;
          }

          .store-details {
            padding: 30px;
          }

          .store-details h1 {
            font-size: 36px;
          }

          .map-container {
            height: 420px;
          }
        }


        /* =========================================
           TABLET
        ========================================= */

        @media (max-width: 850px) {

          .store-location {
            padding: 60px 5%;
          }

          .store-wrapper {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .store-details {
            padding: 35px;
          }

          .map-container {
            height: 430px;
          }
        }


        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 576px) {

          .store-location {
            padding: 45px 15px;
          }

          .store-header {
            margin-bottom: 35px;
          }

          .store-subtitle {
            font-size: 11px;
            letter-spacing: 3px;
          }

          .store-header h2 {
            font-size: 35px;
          }

          .store-header p {
            font-size: 14px;
            line-height: 1.6;
          }


          /* Details */

          .store-details {
            padding: 25px 20px;

            border-radius: 15px;
          }

          .store-details h1 {
            font-size: 31px;

            line-height: 1.2;
          }

          .store-description {
            font-size: 14px;

            line-height: 1.7;
          }


          /* Detail items */

          .detail-item {
            gap: 12px;

            margin-bottom: 22px;
          }

          .detail-icon {
            min-width: 40px;

            width: 40px;

            height: 40px;

            font-size: 16px;
          }

          .detail-item h3 {
            font-size: 17px;
          }

          .detail-item p {
            font-size: 13px;
          }


          /* Hours */

          .hours-row {
            flex-direction: column;

            gap: 4px;

            font-size: 13px;
          }


          /* Map */

          .store-map {
            padding: 10px;

            border-radius: 15px;
          }

          .map-title {
            padding: 10px;

            gap: 10px;
          }

          .map-title > span {
            font-size: 21px;
          }

          .map-title h3 {
            font-size: 19px;
          }

          .map-container {
            height: 350px;

            border-radius: 10px;
          }


          /* Button */

          .direction-btn {
            width: calc(100% - 20px);

            margin: 15px 10px 8px;

            box-sizing: border-box;

            padding: 13px 15px;

            font-size: 14px;
          }
        }


        /* =========================================
           VERY SMALL MOBILE
        ========================================= */

        @media (max-width: 380px) {

          .store-location {
            padding: 40px 10px;
          }

          .store-header h2 {
            font-size: 31px;
          }

          .store-details {
            padding: 22px 16px;
          }

          .store-details h1 {
            font-size: 28px;
          }

          .map-container {
            height: 300px;
          }
        }

      `}</style>


      {/* =========================================
          PAGE
      ========================================= */}

      <section className="store-location">


        {/* HEADER */}

        <div className="store-header">

          <span className="store-subtitle">
            VISIT US
          </span>

          <h2>
            Our Store
          </h2>

          <div className="heading-line"></div>

          <p>
            Experience the elegance of Kavi Shawls at our store.
          </p>

        </div>


        {/* CONTENT */}

        <div className="store-wrapper">


          {/* =====================================
              STORE INFORMATION
          ===================================== */}

          <div className="store-details">

            <span className="small-heading">
              KAVI SHAWLS
            </span>

            <h1>
              Visit Our Store
            </h1>

            <p className="store-description">
              Discover our premium collection of luxurious
              shawls, carefully selected to bring elegance,
              comfort and style to every occasion.
            </p>


            {/* Address */}

            <div className="detail-item">

              <div className="detail-icon">
                📍
              </div>

              <div>

                <h3>
                  Address
                </h3>

                <p>
                  Street No. 7A, SJS Avenue, 124,
                  <br />
                  Airport Rd, Gumtala,
                  <br />
                  Amritsar, Punjab - 143008
                </p>

              </div>

            </div>


            {/* Phone */}

            <div className="detail-item">

              <div className="detail-icon">
                📞
              </div>

              <div>

                <h3>
                  Phone
                </h3>

                <p>
                  +91 98765 43210
                </p>

              </div>

            </div>


            {/* Email */}

            <div className="detail-item">

              <div className="detail-icon">
                ✉️
              </div>

              <div>

                <h3>
                  Email
                </h3>

                <p>
                  support@kavishawls.com
                </p>

              </div>

            </div>


            {/* Business Hours */}

            <div className="business-hours">

              <h3>
                Business Hours
              </h3>

              <div className="hours-row">

                <span>
                  Monday - Saturday
                </span>

                <span>
                  10:00 AM - 8:00 PM
                </span>

              </div>

              <div className="hours-row">

                <span>
                  Sunday
                </span>

                <span>
                  11:00 AM - 6:00 PM
                </span>

              </div>

            </div>

          </div>


          {/* =====================================
              GOOGLE MAP
          ===================================== */}

          <div className="store-map">


            <div className="map-title">

              <span>
                📍
              </span>

              <div>

                <h3>
                  Find Us Here
                </h3>

                <p>
                  SEWA EK Ventures, Amritsar
                </p>

              </div>

            </div>


            <div className="map-container">

              <iframe
                src={`https://www.google.com/maps?q=${latitude},${longitude}&z=17&output=embed`}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="SEWA EK Ventures Office Location"
              ></iframe>

            </div>


            {/* Get Directions */}

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="direction-btn"
            >
              📍 Get Directions
            </a>

          </div>


        </div>

      </section>
    </>
  );
}

export default StoreLocation;
