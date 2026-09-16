// import React from "react";
// //import image10 from "../assets/history.png";
// import image10 from "../../assets/history.png";
// function History() {
//   return (
//     <div className="container py-5">

//       <div className="text-center mb-5">
//         {/* <h1>Our History</h1> */}
//         <p className="text-muted">
//           A Journey of Elegance and Tradition
//         </p>
//       </div>

//       <div className="row align-items-center">

//         <div className="col-lg-6">
//           <img
//             src={image10}
//             className="img-fluid rounded shadow"
//             alt="Kavi Shawls"
//           />
//         </div>

//         <div className="col-lg-6">

//           <h3>Kavi Shawls Since 2018</h3>

//           <p>
//             Kavi Shawls was founded with a vision to preserve the beauty of
//             traditional craftsmanship while offering modern luxury shawls.
//             Every shawl is carefully selected to provide comfort, elegance,
//             and premium quality.
//           </p>

//           <p>
//             Our collections are inspired by Kashmiri artistry and timeless
//             fashion, making every piece unique and suitable for every season.
//           </p>

//           <p>
//             Today, Kavi Shawls proudly serves customers across India through
//             our online store, delivering luxury and warmth to every home.
//           </p>

//         </div>

//       </div>

//       <div className="row text-center mt-5">

//         <div className="col-md-4">
//           <h2>1000+</h2>
//           <p>Happy Customers</p>
//         </div>

//         <div className="col-md-4">
//           <h2>200+</h2>
//           <p>Luxury Designs</p>
//         </div>

//         <div className="col-md-4">
//           <h2>7+</h2>
//           <p>Years of Excellence</p>
//         </div>

//       </div>

//     </div>
//   );
// }

// export default History;


import React from "react";
import image10 from "../../assets/history.webp";

function History() {
  return (
    <div className="container py-5">

      <div className="text-center mb-4 mb-lg-5">
        <p className="text-muted">
          A Journey of Elegance and Tradition
        </p>
      </div>

      <div className="row align-items-center g-4 g-lg-5">

        <div className="col-12 col-lg-6 mb-4 mb-lg-0">
          <img
            src={image10}
            className="img-fluid rounded shadow w-100"
            alt="Kavi Shawls"
          />
        </div>

        <div className="col-12 col-lg-6">

          <h3 className="mb-3">Kavi Shawls Since 2018</h3>

          <p className="mb-3">
            Kavi Shawls was founded with a vision to preserve the beauty of
            traditional craftsmanship while offering modern luxury shawls.
            Every shawl is carefully selected to provide comfort, elegance,
            and premium quality.
          </p>

          <p className="mb-3">
            Our collections are inspired by Kashmiri artistry and timeless
            fashion, making every piece unique and suitable for every season.
          </p>

          <p className="mb-0">
            Today, Kavi Shawls proudly serves customers across India through
            our online store, delivering luxury and warmth to every home.
          </p>

        </div>

      </div>

      <div className="row text-center mt-5 g-4">

        <div className="col-6 col-md-4">
          <h2>1000+</h2>
          <p className="mb-0">Happy Customers</p>
        </div>

        <div className="col-6 col-md-4">
          <h2>200+</h2>
          <p className="mb-0">Luxury Designs</p>
        </div>

        <div className="col-12 col-md-4">
          <h2>7+</h2>
          <p className="mb-0">Years of Excellence</p>
        </div>

      </div>

    </div>
  );
}

export default History;