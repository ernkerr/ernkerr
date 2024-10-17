// import { useState } from "react";
// import CustomizeCar from "../CustomizeCar/CustomizeCar.jsx";

// const CustomizeCarModal = ({
//   formData,
//   setFormData,
//   selectedCar,
//   carIndex,
// }) => {
//   const [modal, setModal] = useState(false);

//   const toggleModal = () => {
//     setModal(!modal);
//   };

//   const handleSaveCar = () => {
//     // add car to formData
//     const updatedCar = {
//       carColor: formData.carColor,
//       seatNames: formData.seatNames,
//       seatDistribution: formData.seatDistribution,
//       // TODO : add row information after refactor
//     };

//     // Update the specific car at carIndex
//     const updatedCars = formData.cars.map((car, index) =>
//       index === carIndex ? updatedCar : car
//     );

//     setFormData((prevData) => ({
//       ...prevData,
//       cars: updatedCars,
//     }));

//     toggleModal();

//     //functionality to send car to database with formData
//     console.log("Updated car to database");
//   };

//   return (
//     <>
//       <button
//         onClick={toggleModal}
//         className="glow-button"
//         style={{
//           background: formData?.tripBackground?.scrim || "transparent",
//           border: ` 2px solid ${formData.glowColor}`,
//           boxShadow: `0 0 10px ${formData.glowColor}, 0 0 5px ${formData.glowColor}, 0 0 15px ${formData.lighterGlowColor}`,
//         }}
//       >
//         customize your car
//       </button>

//       {modal && (
//         <div className="modal">
//           <div className="overlay">
//             <div className="modal-content">
//               <CustomizeCar formData={formData} setFormData={setFormData} />
//               <button className="close-modal-btn" onClick={toggleModal}>
//                 x
//               </button>
//               <button
//                 className="glow-button"
//                 style={{
//                   background: formData?.tripBackground?.scrim || "transparent",
//                   border: ` 2px solid ${formData.glowColor}`,
//                   boxShadow: `0 0 10px ${formData.glowColor}, 0 0 5px ${formData.glowColor}, 0 0 15px ${formData.lighterGlowColor}`,
//                 }}
//                 onClick={handleSaveCar}
//               >
//                 save car
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default CustomizeCarModal;
