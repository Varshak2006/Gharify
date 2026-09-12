// import { useEffect, useState } from "react";
// import "./Services.css"
// import API from "../services/api";

// const serviceImages = {
//   "Home Tutor": "/images/tutor.jpg",
//   "Cleaning": "/images/cleaning.jpg",
//   "Cook": "/images/cook.jpg",
//   "Baby Sitter": "/images/babysitter.jpg",
//   "Care Taker": "/images/caretaker.jpg",
//   "Plumber": "/images/plumber.jpg",
//   "Mechanic": "/images/mechanic.jpg",
//   "Electrician": "/images/electrician.jpg",
//   "Painter": "/images/painter.jpg",
//   "Helper": "/images/helper.jpg",
//   "Laundry": "/images/laundry.jpg",
//   "Pest Control": "/images/pestcontrol.jpg"

// };  export default function Services(){
//     const [search, setSearch] = useState("");
//     const [selectedService,setSelectedService]=useState(null);
//     const [ratings, setRatings] = useState({});
//     const [providers, setProviders] = useState({});
//     const [selectedProvider, setSelectedProvider] = useState(null);
// const [selectedGroup, setSelectedGroup] = useState(null);
// const [selectedSubService, setSelectedSubService] = useState(null);
// const [bookingStep, setBookingStep] = useState(1);
//     const [bookingForm, setBookingForm] = useState({
//   bookingDate: "",
//   bookingTime: "",
//   houseNo: "",
//   street:"",
//   city:"",
//   pincode:""
// });

//     const [services,setServices]=useState([]);
//     useEffect(() => {

//     fetchServices();

//     fetchRatings();

// }, []);
//     const fetchServices=async ()=>{
//         try{
//             const res=await API.get("/services");
//             setServices(res.data);

//         }catch(error){
//             console.log(error);
//         }
//     };
// //     const fetchRatings = async () => {

// //   try {

// //     const providerRes = await API.get(
// //       "/auth/all-users-public"
// //     );

// //     const providers = providerRes.data.filter(
// //       (user) => user.role === "provider"
// //     );

// // //     const ratingsData = {};
// // // const providersData = {};
// // //     for (const provider of providers) {
// // //  if(!provider.serviceType) continue;
// // //       const res = await API.get(`/reviews/provider/${provider._id}/rating`);

// // //       ratingsData[provider.serviceType] = {
// // //         averageRating: res.data.averageRating,
// // //         totalReviews: res.data.totalReviews,
// // //         providerName:provider.name
// // //       };
// // // providersData[provider.serviceType] = provider;

// //   //  }
// // const providersData = {};
// // const ratingsData = {};

// // for (const provider of providers) {

// //   if (!provider.serviceType) continue;

// //   const res = await API.get(
// //     `/reviews/provider/${provider._id}/rating`
// //   );

// //   if (!providersData[provider.serviceType]) {
// //     providersData[provider.serviceType] = [];
// //   }

// //   providersData[provider.serviceType].push({
// //     ...provider,
// //     averageRating: res.data.averageRating,
// //     totalReviews: res.data.totalReviews
// //   });

// // }

// // setRatings(ratingsData);
// // setProviders(providersData);

// // console.log("Providers Data:", providersData);

// //     setRatings(ratingsData);
// //     setProviders(providersData);
// //     console.log("Providers Data:", providersData);
// // console.log(ratingsData);
// //   } catch (error) {

// //     console.log(error);

// //   }

// // };
// const fetchRatings = async () => {

//   try {

//     const providerRes = await API.get(
//       "/auth/all-users-public"
//     );

//     const providers = providerRes.data.filter(
//       (user) => user.role === "provider"
//     );

//     const providersData = {};

//     for (const provider of providers) {

//       if (!provider.serviceType) continue;

//       const res = await API.get(
//         `/reviews/provider/${provider._id}/rating`
//       );

//       if (!providersData[provider.serviceType]) {
//         providersData[provider.serviceType] = [];
//       }

//       providersData[provider.serviceType].push({
//         ...provider,
//         averageRating: res.data.averageRating,
//         totalReviews: res.data.totalReviews
//       });

//     }

//     setProviders(providersData);

//     console.log(
//       "Providers Data:",
//       providersData
//     );

//   } catch (error) {

//     console.log(error);

//   }

// };
// const handleBook = async (serviceId) => {

//   try {

//     if (
//       !bookingForm.bookingDate ||
//       !bookingForm.bookingTime ||
//       !bookingForm.houseNo ||
//       !bookingForm.street ||
//       !bookingForm.city ||
//       !bookingForm.pincode
//     ) {
//       return alert("Please fill all booking details.");
//     }
// if (
//     selectedService.serviceGroups?.length > 0 &&
//     !selectedSubService
// ) {
//     return alert("Please select the type of electrician service.");
// }
//     const token = localStorage.getItem("token");

//     const fullAddress =
//       `${bookingForm.houseNo}, ${bookingForm.street}, ${bookingForm.city} - ${bookingForm.pincode}`;

//     const bookingDateTime =
//       `${bookingForm.bookingDate}T${bookingForm.bookingTime}`;

//   const res = await API.post(
//     "/bookings",
//     {
//         serviceId,
//         bookingDate: bookingDateTime,
//         address: fullAddress,
//         providerId: selectedProvider?._id,
//         serviceGroup: selectedGroup?.groupName,
//         subService: selectedSubService
//     },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       }
//     );

//     alert(res.data.message);

//     setSelectedService(null);
// setSelectedProvider(null);
// setSelectedGroup(null);
// setSelectedSubService(null);
// setBookingStep(1);

// setBookingForm({
//       bookingDate: "",
//       bookingTime: "",
//       houseNo: "",
//       street: "",
//       city: "",
//       pincode: ""
//     });

//   } catch (error) {

//     console.log(error);

//     alert(
//       error.response?.data?.message ||
//       "Booking Failed"
//     );

//   }

// };
//     const filteredServices = services.filter((service) =>
//   service.serviceName
//     .toLowerCase()
//     .includes(search.toLowerCase())
// );
//  return(
//     <div>

//         <h1>Available Services</h1>
//       <input
//   type="text"
//   placeholder="Search service..."
//   value={search}
//   onChange={(e) => setSearch(e.target.value)}
//   className="search-box"
// />  
// <div  className="services-container">
//         {filteredServices.map((service)=>(
//             <div
//   key={service._id}
//   className="service-card"
// >
//   <img
//     src={serviceImages[service.serviceName]}
//     alt={service.serviceName}
//   />

//   <div className="card-content">
//     <h3>{service.serviceName}</h3>

//     <p>{service.description}</p>

//     <p>
//       <strong>₹{service.price}</strong>
//     </p>
// {ratings[service.serviceName] && (

// <div className="rating-box">

// <p>

// ⭐ {ratings[service.serviceName].averageRating}

// ({ratings[service.serviceName].totalReviews} Reviews)

// </p>

// <p>

// 👨‍🔧 {ratings[service.serviceName].providerName}

// </p>

// </div>

// )}
//     <p>{service.category}</p>

//     <button
//       className="book-btn"
//       onClick={() => {setSelectedService(service);
//         setBookingStep(1);}
//       }   >
//       Book Now
//     </button>
//   </div>
// </div>
//         ))}
//         </div>
//         {selectedService && (
// //   <div className="modal-overlay">

// //     <div className="booking-modal">

// //       <h2>Book {selectedService.serviceName}</h2>
// // {selectedService.serviceGroups?.length > 0 && (
// //   <div className="service-selection">

// //     <h3>Choose Service Type</h3>

// //     <div className="group-buttons">

// //       {selectedService.serviceGroups.map((group) => (

// //         <button
// //           key={group.groupName}
// //           type="button"
// //           // className="group-btn"
// //           className={`group-btn ${
// //   selectedGroup?.groupName === group.groupName
// //     ? "selected-group-btn"
// //     : ""
// // }`}
// //           onClick={() => {
// //             setSelectedGroup(group);
// //             setSelectedSubService(null);
// //           }}
// //         >
// //           {group.groupName === "Household" ? "🏠" : "🏢"}
// //           {" "}
// //           {group.groupName}
// //         </button>

// //       ))}

// //     </div>

// //   </div>
// // )}







import { useEffect, useState } from "react";
import "./Services.css";
import API from "../services/api";

const serviceImages = {
  "Home Tutor": "/images/tutor.jpg",
  "Cleaning": "/images/cleaning.jpg",
  "Cook": "/images/cook.jpg",
  "Baby Sitter": "/images/babysitter.jpg",
  "Care Taker": "/images/caretaker.jpg",
  "Plumber": "/images/plumber.jpg",
  "Mechanic": "/images/mechanic.jpg",
  "Electrician": "/images/electrician.jpg",
  "Painter": "/images/painter.jpg",
  "Helper": "/images/helper.jpg",
  "Laundry": "/images/laundry.jpg",
  "Pest Control": "/images/pestcontrol.jpg"
};

export default function Services() {

  const [search, setSearch] = useState("");
  const [selectedService, setSelectedService] = useState(null);

  const [ratings, setRatings] = useState({});
  const [providers, setProviders] = useState({});
  const [selectedProvider, setSelectedProvider] = useState(null);

  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedSubService, setSelectedSubService] = useState(null);

  const [bookingStep, setBookingStep] = useState(1);

  const [bookingForm, setBookingForm] = useState({
    bookingDate: "",
    bookingTime: "",
    houseNo: "",
    street: "",
    city: "",
    pincode: ""
  });

  const [services, setServices] = useState([]);


  // =========================
  // FETCH SERVICES + RATINGS
  // =========================

  useEffect(() => {
    fetchServices();
    fetchRatings();
  }, []);


  const fetchServices = async () => {

    try {

      const res = await API.get("/services");

      setServices(res.data);

    } catch (error) {

      console.log(error);

    }

  };


  const fetchRatings = async () => {

    try {

      const providerRes = await API.get(
        "/auth/all-users-public"
      );

      const allProviders = providerRes.data.filter(
        (user) => user.role === "provider"
      );

      const providersData = {};
      const ratingsData = {};

      for (const provider of allProviders) {

        if (!provider.serviceType) continue;

        const res = await API.get(
          `/reviews/provider/${provider._id}/rating`
        );

        if (!providersData[provider.serviceType]) {
          providersData[provider.serviceType] = [];
        }

        providersData[provider.serviceType].push({
          ...provider,
          averageRating: res.data.averageRating,
          totalReviews: res.data.totalReviews
        });

        // Keep the first provider rating for service card display
        if (!ratingsData[provider.serviceType]) {

          ratingsData[provider.serviceType] = {
            averageRating: res.data.averageRating,
            totalReviews: res.data.totalReviews,
            providerName: provider.name
          };

        }

      }

      setProviders(providersData);
      setRatings(ratingsData);

      console.log(
        "Providers Data:",
        providersData
      );

    } catch (error) {

      console.log(error);

    }

  };


  // =========================
  // BOOKING
  // =========================

  const handleBook = async (serviceId) => {

    try {

      if (
        !bookingForm.bookingDate ||
        !bookingForm.bookingTime ||
        !bookingForm.houseNo ||
        !bookingForm.street ||
        !bookingForm.city ||
        !bookingForm.pincode
      ) {

        return alert(
          "Please fill all booking details."
        );

      }


      if (
        selectedService.serviceGroups?.length > 0 &&
        !selectedSubService
      ) {

        return alert(
          "Please select a service type."
        );

      }


      const token =
        localStorage.getItem("token");


      const fullAddress =
        `${bookingForm.houseNo}, ${bookingForm.street}, ${bookingForm.city} - ${bookingForm.pincode}`;


      const bookingDateTime =
        `${bookingForm.bookingDate}T${bookingForm.bookingTime}`;


      const res = await API.post(
        "/bookings",
        {
          serviceId,
          bookingDate: bookingDateTime,
          address: fullAddress,
          providerId: selectedProvider?._id,
          serviceGroup: selectedGroup?.groupName,
          subService: selectedSubService
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );


      alert(res.data.message);


      // Reset booking

      setSelectedService(null);
      setSelectedProvider(null);
      setSelectedGroup(null);
      setSelectedSubService(null);

      setBookingStep(1);

      setBookingForm({
        bookingDate: "",
        bookingTime: "",
        houseNo: "",
        street: "",
        city: "",
        pincode: ""
      });


    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Booking Failed"
      );

    }

  };


  // =========================
  // FILTER SERVICES
  // =========================

  const filteredServices = services.filter(
    (service) =>
      service.serviceName
        .toLowerCase()
        .includes(search.toLowerCase())
  );


  // =========================
  // RESET BOOKING
  // =========================

  const closeBooking = () => {

    setSelectedService(null);
    setSelectedProvider(null);
    setSelectedGroup(null);
    setSelectedSubService(null);
    setBookingStep(1);

    setBookingForm({
      bookingDate: "",
      bookingTime: "",
      houseNo: "",
      street: "",
      city: "",
      pincode: ""
    });

  };


  return (

    <div className="services-page">

      {/* =========================
          PAGE TITLE
      ========================= */}

      <h1>Available Services</h1>


      {/* =========================
          SEARCH
      ========================= */}

      <input
        type="text"
        placeholder="Search service..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="search-box"
      />


      {/* =========================
          SERVICE CARDS
      ========================= */}

      <div className="services-container">

        {filteredServices.map((service) => (

          <div
            key={service._id}
            className="service-card"
          >

            <img
              src={serviceImages[service.serviceName]}
              alt={service.serviceName}
            />


            <div className="card-content">

              <h3>
                {service.serviceName}
              </h3>


              <p>
                {service.description}
              </p>


              <p>
                <strong>
                  ₹{service.price}
                </strong>
              </p>


              {/* Rating */}

              {ratings[service.serviceName] && (

                <div className="rating-box">

                  <p>
                    ⭐{" "}
                    {ratings[
                      service.serviceName
                    ].averageRating}

                    {" "}

                    (
                    {
                      ratings[
                        service.serviceName
                      ].totalReviews
                    }{" "}
                    Reviews)
                  </p>


                  <p>
                    👨‍🔧{" "}
                    {
                      ratings[
                        service.serviceName
                      ].providerName
                    }
                  </p>

                </div>

              )}


              <p>
                {service.category}
              </p>


              {/* Book Now */}

              <button
                className="book-btn"
                onClick={() => {

                  setSelectedService(service);

                  setSelectedProvider(null);
                  setSelectedGroup(null);
                  setSelectedSubService(null);

                  setBookingStep(1);

                }}
              >
                Book Now
              </button>

            </div>

          </div>

        ))}

      </div>


      {/* =================================================
          BOOKING MODAL
      ================================================= */}

      {selectedService && (

        <div className="modal-overlay">

          <div className="booking-modal">


            {/* =========================
                MODAL TITLE
            ========================= */}

            <h2>
              Book {selectedService.serviceName}
            </h2>


            {/* =========================
                PROGRESS
            ========================= */}

            <div className="booking-progress">

              <span
                className={
                  bookingStep === 1
                    ? "active-step"
                    : "completed-step"
                }
              >
                Service & Professional
              </span>


              <span className="progress-line">
                ─────────
              </span>


              <span
                className={
                  bookingStep === 2
                    ? "active-step"
                    : ""
                }
              >
                 Booking Details
              </span>

            </div>


            {/* =================================================
                STEP 1
            ================================================= */}

            {bookingStep === 1 && (

              <div className="booking-step">


                {/* =========================
                    SERVICE TYPE
                ========================= */}

                {selectedService.serviceGroups?.length > 0 && (

                  <div className="service-selection">

                    <h3>
                      Choose Service Type
                    </h3>


                    <div className="group-buttons">

                      {selectedService.serviceGroups.map(
                        (group) => (

                          <button
                            key={group.groupName}
                            type="button"
                            className={
                              `group-btn ${
                                selectedGroup?.groupName ===
                                group.groupName
                                  ? "selected-group-btn"
                                  : ""
                              }`
                            }
                            onClick={() => {

                              setSelectedGroup(group);

                              setSelectedSubService(null);

                            }}
                          >

                            {
                              group.groupName ===
                              "Household"
                                ? "🏠"
                                : "🏢"
                            }

                            {" "}

                            {group.groupName}

                          </button>

                        )
                      )}

                    </div>

                  </div>

                )}


                {/* =========================
                    SUB SERVICE
                ========================= */}

                {selectedGroup && (

                  <div className="subservice-selection">

                    <h3>
                      {selectedGroup.groupName} Services
                    </h3>


                    <div className="subservice-buttons">

                      {selectedGroup.subServices.map(
                        (subService) => (

                          <button
                            key={subService.name}
                            type="button"
                            className={
                              `subservice-btn ${
                                selectedSubService ===
                                subService.name
                                  ? "selected-subservice-btn"
                                  : ""
                              }`
                            }
                            onClick={() =>
                              setSelectedSubService(
                                subService.name
                              )
                            }
                          >
                            {subService.name}
                          </button>

                        )
                      )}

                    </div>

                  </div>

                )}


                {/* =========================
                    PROFESSIONALS
                ========================= */}

                {providers[
                  selectedService.serviceName
                ]?.length > 0 && (

                  <div className="providers-section">

                    <h3>
                      👨‍🔧 Available Professionals
                    </h3>


                    {providers[
                      selectedService.serviceName
                    ].map((provider) => (

                      <div
                        key={provider._id}
                        className={
                          `provider-card ${
                            selectedProvider?._id ===
                            provider._id
                              ? "selected-provider"
                              : ""
                          }`
                        }
                      >

                        <img
                          src={
                            provider.profileImage
                             ? `${import.meta.env.VITE_API_URL.replace("/api", "")}${provider.profileImage}`
                              : "/images/default-user.png"
                          }
                          alt={provider.name}
                          style={{
                            width: "90px",
                            height: "90px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            marginBottom: "15px",
                            border: "3px solid #2563eb"
                          }}
                        />


                        <h3>
                          {provider.name}
                        </h3>


                        <p>
                          ⭐{" "}
                          {provider.averageRating || 0}

                          {" "}

                          (
                          {provider.totalReviews || 0}
                          {" "}
                          Reviews)
                        </p>


                        <p>
                          <strong>
                            Phone:
                          </strong>{" "}
                          {provider.phone ||
                            "Not provided"}
                        </p>


                        <p>
                          <strong>
                            City:
                          </strong>{" "}
                          {provider.city ||
                            "Not provided"}
                        </p>


                        <p>
                          <strong>
                            Experience:
                          </strong>{" "}
                          {provider.experience ||
                            "Not provided"}
                        </p>


                        <button
                          type="button"
                          className="book-btn"
                          onClick={() =>
                            setSelectedProvider(
                              provider
                            )
                          }
                        >
                          Choose {provider.name}
                        </button>

                      </div>

                    ))}

                  </div>

                )}


                {/* =========================
                    AUTO ASSIGNMENT
                ========================= */}

                <div className="auto-assignment-option">

                  <button
                    type="button"
                    className="auto-select-btn"
                    onClick={() =>
                      setSelectedProvider(null)
                    }
                  >
                    🤖 Let Gharify choose for me
                  </button>


                  {selectedProvider && (

                    <p>
                      Selected Provider:{" "}
                      <strong>
                        {selectedProvider.name}
                      </strong>
                    </p>

                  )}

                </div>


                {/* =========================
                    NEXT BUTTON
                ========================= */}

                <div className="booking-navigation">

                  <button
                    type="button"
                    className="book-btn next-btn"
                    onClick={() => {

                      if (
                        selectedService.serviceGroups
                          ?.length > 0 &&
                        !selectedSubService
                      ) {

                        return alert(
                          "Please select a service type."
                        );

                      }

                      setBookingStep(2);

                    }}
                  >
                    Next →
                  </button>

                </div>


                {/* =========================
                    CANCEL
                ========================= */}

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeBooking}
                >
                  Cancel
                </button>

              </div>

            )}


            {/* =================================================
                STEP 2
            ================================================= */}

            {bookingStep === 2 && (

              <div className="booking-step">


                <h3>
                  Booking Details
                </h3>


                {/* =========================
                    DATE
                ========================= */}

                <input
                  type="date"
                  value={bookingForm.bookingDate}
                  onChange={(e) =>
                    setBookingForm({
                      ...bookingForm,
                      bookingDate:
                        e.target.value
                    })
                  }
                />


                {/* =========================
                    TIME
                ========================= */}

                <input
                  type="time"
                  value={bookingForm.bookingTime}
                  onChange={(e) =>
                    setBookingForm({
                      ...bookingForm,
                      bookingTime:
                        e.target.value
                    })
                  }
                />


                {/* =========================
                    ADDRESS
                ========================= */}

                <input
                  type="text"
                  placeholder="🏠 House No."
                  value={bookingForm.houseNo}
                  onChange={(e) =>
                    setBookingForm({
                      ...bookingForm,
                      houseNo:
                        e.target.value
                    })
                  }
                />


                <input
                  type="text"
                  placeholder="🛣 Street"
                  value={bookingForm.street}
                  onChange={(e) =>
                    setBookingForm({
                      ...bookingForm,
                      street:
                        e.target.value
                    })
                  }
                />


                <input
                  type="text"
                  placeholder="🏙 City"
                  value={bookingForm.city}
                  onChange={(e) =>
                    setBookingForm({
                      ...bookingForm,
                      city:
                        e.target.value
                    })
                  }
                />


                <input
                  type="text"
                  placeholder="📮 Pincode"
                  value={bookingForm.pincode}
                  onChange={(e) =>
                    setBookingForm({
                      ...bookingForm,
                      pincode:
                        e.target.value
                    })
                  }
                />


                <hr />


                {/* =========================
                    BOOKING SUMMARY
                ========================= */}

                <div className="booking-summary">

                  <h3>
                    Booking Summary
                  </h3>


                  <p>
                    <strong>
                      Service:
                    </strong>{" "}
                    {selectedService.serviceName}
                  </p>


                  {selectedGroup && (

                    <p>
                      <strong>
                        Type:
                      </strong>{" "}
                      {selectedGroup.groupName}
                    </p>

                  )}


                  {selectedSubService &&
                    selectedGroup && (

                      <p>
                        <strong>
                          Selected Service:
                        </strong>{" "}
                        {selectedSubService}
                      </p>

                    )}


                  {selectedSubService &&
                    selectedGroup && (

                      <p>
                        <strong>
                          Price:
                        </strong>{" "}
                        ₹
                        {
                          selectedGroup.subServices.find(
                            (sub) =>
                              sub.name ===
                              selectedSubService
                          )?.price
                        }
                      </p>

                    )}


                  {selectedSubService &&
                    selectedGroup && (

                      <p>

                        <strong>
                          Duration:
                        </strong>{" "}

                        {
                          selectedGroup.subServices.find(
                            (sub) =>
                              sub.name ===
                              selectedSubService
                          )?.duration
                        }

                        {" "}

                        {
                          selectedGroup.subServices.find(
                            (sub) =>
                              sub.name ===
                              selectedSubService
                          )?.duration === 1
                            ? selectedGroup.subServices.find(
                                (sub) =>
                                  sub.name ===
                                  selectedSubService
                              )?.durationUnit
                                .replace(
                                  "days",
                                  "day"
                                )
                            : selectedGroup.subServices.find(
                                (sub) =>
                                  sub.name ===
                                  selectedSubService
                              )?.durationUnit
                        }

                      </p>

                    )}


                  <p className="additional-charge-note">

                    ⚠️ Prices shown are base service
                    charges. Final charges may increase
                    if spare materials, extra work, or
                    additional service requirements are
                    needed. The customer will be informed
                    and approval will be taken before any
                    additional charges.

                  </p>

                </div>


                <hr />


                {/* =========================
                    BACK + CONFIRM
                ========================= */}

                <div className="booking-navigation">

                  <button
                    type="button"
                    className="back-btn"
                    onClick={() =>
                      setBookingStep(1)
                    }
                  >
                    ← Back
                  </button>


                  <button
                    type="button"
                    className="book-btn"
                    onClick={() =>
                      handleBook(
                        selectedService._id
                      )
                    }
                  >
                    Confirm Booking
                  </button>

                </div>


                {/* =========================
                    CANCEL
                ========================= */}

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeBooking}
                >
                  Cancel
                </button>

              </div>

            )}

          </div>

        </div>

      )}

    </div>

  );

}