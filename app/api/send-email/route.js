// "use client";
// import { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import { Button } from "@heroui/button";
// import Partners from "@/components/partners";
// import { FaArrowRight, FaArrowLeft, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";

// export default function BookingPage() {
//   const [slideIndex, setSlideIndex] = useState(0);
//   const carouselRef = useRef(null);
//   const [carouselWidth, setCarouselWidth] = useState(0);
//   const [isAutoScrolling, setIsAutoScrolling] = useState(true);
//   const autoScrollInterval = 5000;

//   // Form state
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     eventDate: "",
//     eventType: "",
//     message: ""
//   });
//   const [formErrors, setFormErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'
//   const [statusMessage, setStatusMessage] = useState("");

//   const images = [
//     "/gallery/crowd.png",
//     "/gallery/uganda_must_laugh-1.jpg",
//     "/gallery/bg_booking.webp",
//     "/bg_hero.webp",
//     "/bg_hero.webp",
//   ];

//   useEffect(() => {
//     const handleResize = () => {
//       if (carouselRef.current) {
//         setCarouselWidth(carouselRef.current.clientWidth);
//       }
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     if (!isAutoScrolling) return;

//     const interval = setInterval(() => {
//       setSlideIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, autoScrollInterval);

//     return () => clearInterval(interval);
//   }, [isAutoScrolling, images.length]);

//   const handleNext = () => {
//     setIsAutoScrolling(false);
//     setSlideIndex((prev) => (prev + 1) % images.length);
//   };

//   const handlePrev = () => {
//     setIsAutoScrolling(false);
//     setSlideIndex((prev) => (prev - 1 + images.length) % images.length);
//   };

//   const pauseAutoScroll = () => setIsAutoScrolling(false);
//   const resumeAutoScroll = () => setIsAutoScrolling(true);

//   // Form handling
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
    
//     // Clear error for this field when user starts typing
//     if (formErrors[name]) {
//       setFormErrors({ ...formErrors, [name]: "" });
//     }
//   };

//   const validateForm = () => {
//     const errors = {};
//     if (!formData.name) errors.name = "Name is required";
//     if (!formData.email) {
//       errors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       errors.email = "Email is invalid";
//     }
//     if (!formData.phone) errors.phone = "Phone number is required";
//     if (!formData.eventDate) errors.eventDate = "Event date is required";
//     if (!formData.eventType) errors.eventType = "Event type is required";
//     if (!formData.message) errors.message = "Message is required";

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitStatus(null);
    
//     if (!validateForm()) return;
    
//     setIsSubmitting(true);
    
//     try {
//       const response = await fetch('/api/send-email', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
      
//       const data = await response.json();
      
//       if (!response.ok) {
//         throw new Error(data.error || 'Failed to submit form');
//       }
      
//       // Success
//       setSubmitStatus('success');
//       setStatusMessage('Your booking request has been sent successfully! We will contact you soon.');
      
//       // Reset form
//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         eventDate: "",
//         eventType: "",
//         message: ""
//       });
      
//     } catch (error) {
//       console.error('Form submission error:', error);
//       setSubmitStatus('error');
//       setStatusMessage(error.message || 'Something went wrong. Please try again later.');
//     } finally {
//       setIsSubmitting(false);
      
//       // Auto-clear status after 5 seconds
//       setTimeout(() => {
//         if (submitStatus === 'success') {
//           setSubmitStatus(null);
//         }
//       }, 5000);
//     }
//   };

//   return (
//     <section className="w-full bg-black text-white">
//       {/* Hero Section */}
//       <div className="relative w-full h-screen">
//         <div 
//           className="absolute inset-0 w-full h-full overflow-hidden"
//           onMouseEnter={pauseAutoScroll}
//           onMouseLeave={resumeAutoScroll}
//         >
//           <div 
//             ref={carouselRef}
//             className="relative w-full h-full"
//           >
//             <div 
//               className="absolute flex transition-transform duration-1000 ease-in-out h-full"
//               style={{
//                 transform: `translateX(-${slideIndex * 100}%)`,
//                 width: `${images.length * 100}%`
//               }}
//             >
//               {images.map((image, index) => (
//                 <div 
//                   key={index} 
//                   className="relative h-full"
//                   style={{ width: `${100 / images.length}%` }}
//                 >
//                   <Image
//                     src={image}
//                     alt={`Gallery image ${index + 1}`}
//                     layout="fill"
//                     objectFit="cover"
//                     className="brightness-50"
//                     priority={index === 0}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
          
//           {/* Gallery Navigation */}
//           <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2 z-10">
//             {images.map((_, index) => (
//               <button
//                 key={index}
//                 className={`w-3 h-3 rounded-full transition-all ${
//                   index === slideIndex ? "bg-white w-6" : "bg-gray-500"
//                 }`}
//                 onClick={() => {
//                   setIsAutoScrolling(false);
//                   setSlideIndex(index);
//                 }}
//                 aria-label={`View image ${index + 1}`}
//               />
//             ))}
//           </div>
          
//           <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-4 z-10">
//             <Button
//               className="rounded-full bg-black/40 hover:bg-white hover:text-black transition-colors"
//               size="sm"
//               onClick={handlePrev}
//               aria-label="Previous image"
//             >
//               <FaArrowLeft className="h-4 w-4" />
//             </Button>
//             <Button
//               className="rounded-full bg-black/40 hover:bg-white hover:text-black transition-colors"
//               size="sm"
//               onClick={handleNext}
//               aria-label="Next image"
//             >
//               <FaArrowRight className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>

//         <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7 }}
//             className="px-6 text-center max-w-4xl"
//           >
//             <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
//               Comedy Specials, Private Functions, MCeeing and More
//             </h1>
          
//             <Button 
//               className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-colors text-lg"
//               href="#booking-form"
//             >
//               Book Now
//             </Button>
//           </motion.div>
//         </div>
//       </div>

//       {/* Booking Information Section */}
//       <div id="booking-form" className="bg-gradient-to-b from-black to-gray-900">
//         <div className="max-w-6xl mx-auto px-6 py-20">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true, margin: "-100px" }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-3xl sm:text-4xl font-bold mb-4">How to Book</h2>
//             <p className="text-lg text-gray-300 max-w-3xl mx-auto">
//               Bring the laughter to your next event with Hilary Okello. Fill out the form below or contact us directly to discuss your booking needs.
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
//             {/* Booking Form */}
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               viewport={{ once: true }}
//               className="lg:col-span-3 bg-gray-900 rounded-xl p-6 sm:p-8"
//             >
//               <h3 className="text-2xl font-bold mb-6">Request a Booking</h3>
              
//               {/* Form status messages */}
//               {submitStatus === 'success' && (
//                 <div className="mb-6 bg-green-900/50 border border-green-500 text-green-100 px-4 py-3 rounded flex items-center">
//                   <FaCheckCircle className="h-5 w-5 mr-2" />
//                   <span>{statusMessage}</span>
//                 </div>
//               )}
              
//               {submitStatus === 'error' && (
//                 <div className="mb-6 bg-red-900/50 border border-red-500 text-red-100 px-4 py-3 rounded">
//                   <p className="font-bold">Error</p>
//                   <p>{statusMessage}</p>
//                 </div>
//               )}
              
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium mb-1 text-gray-300">Full Name</label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       className={`w-full px-4 py-2 bg-gray-800 border ${formErrors.name ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500`}
//                       placeholder="Your name"
//                     />
//                     {formErrors.name && <p className="mt-1 text-red-500 text-xs">{formErrors.name}</p>}
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-1 text-gray-300">Email</label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       className={`w-full px-4 py-2 bg-gray-800 border ${formErrors.email ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500`}
//                       placeholder="your@email.com"
//                     />
//                     {formErrors.email && <p className="mt-1 text-red-500 text-xs">{formErrors.email}</p>}
//                   </div>
//                 </div>
                
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium mb-1 text-gray-300">Phone</label>
//                     <input
//                       type="tel"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                       className={`w-full px-4 py-2 bg-gray-800 border ${formErrors.phone ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500`}
//                       placeholder="Your phone number"
//                     />
//                     {formErrors.phone && <p className="mt-1 text-red-500 text-xs">{formErrors.phone}</p>}
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-1 text-gray-300">Event Date</label>
//                     <input
//                       type="date"
//                       name="eventDate"
//                       value={formData.eventDate}
//                       onChange={handleInputChange}
//                       className={`w-full px-4 py-2 bg-gray-800 border ${formErrors.eventDate ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500`}
//                     />
//                     {formErrors.eventDate && <p className="mt-1 text-red-500 text-xs">{formErrors.eventDate}</p>}
//                   </div>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium mb-1 text-gray-300">Event Type</label>
//                   <select 
//                     name="eventType"
//                     value={formData.eventType}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-2 bg-gray-800 border ${formErrors.eventType ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500`}
//                   >
//                     <option value="">Select event type</option>
//                     <option value="corporate">Corporate Event</option>
//                     <option value="private">Private Function</option>
//                     <option value="wedding">Wedding</option>
//                     <option value="comedy">Comedy Show</option>
//                     <option value="other">Other</option>
//                   </select>
//                   {formErrors.eventType && <p className="mt-1 text-red-500 text-xs">{formErrors.eventType}</p>}
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium mb-1 text-gray-300">Message</label>
//                   <textarea
//                     name="message"
//                     value={formData.message}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-2 bg-gray-800 border ${formErrors.message ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 h-32`}
//                     placeholder="Tell us about your event and requirements"
//                   ></textarea>
//                   {formErrors.message && <p className="mt-1 text-red-500 text-xs">{formErrors.message}</p>}
//                 </div>
                
//                 <Button 
//                   type="submit"
//                   className={`w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? 'Submitting...' : 'Submit Request'}
//                 </Button>
//               </form>
//             </motion.div>

//             {/* Contact Information */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6, delay: 0.4 }}
//               viewport={{ once: true }}
//               className="lg:col-span-2"
//             >
//               <div className="bg-gray-900 rounded-xl p-6 sm:p-8 mb-8">
//                 <h3 className="text-2xl font-bold mb-6">Contact Details</h3>
//                 <div className="space-y-6">
//                   <div className="flex items-start">
//                     <div className="bg-red-600 p-3 rounded-full mr-4">
//                       <FaPhone className="h-5 w-5" />
//                     </div>
//                     <div>
//                       <h4 className="text-lg font-semibold mb-1">Phone</h4>
//                       <p className="text-gray-300">+256 752 734280</p>
//                       <p className="text-gray-300">+256 784 704143</p>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-start">
//                     <div className="bg-red-600 p-3 rounded-full mr-4">
//                       <FaEnvelope className="h-5 w-5" />
//                     </div>
//                     <div>
//                       <h4 className="text-lg font-semibold mb-1">Email</h4>
//                       <a href="mailto:info@hilaryokello.com" className="text-gray-300 hover:text-white hover:underline transition-colors">
//                         info@hilaryokello.com
//                       </a>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-start">
//                     <div className="bg-red-600 p-3 rounded-full mr-4">
//                       <FaMapMarkerAlt className="h-5 w-5" />
//                     </div>
//                     <div>
//                       <h4 className="text-lg font-semibold mb-1">Location</h4>
//                       <p className="text-gray-300">Kampala, Uganda</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="bg-gray-900 rounded-xl p-6 sm:p-8">
//                 <h3 className="text-2xl font-bold mb-4">Availability</h3>
//                 <p className="text-gray-300 mb-4">
//                   Currently booking events for the upcoming season. Availability may vary, so please contact well in advance to secure your preferred date.
//                 </p>
//                 <div className="flex items-center">
//                   <FaCalendarAlt className="h-5 w-5 text-red-500 mr-2" />
//                   <span className="text-gray-300">Now booking for 2025</span>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>

//       {/* Partners Section */}
//       <div className="py-16 bg-black">
//         <Partners />
//       </div>
//     </section>
//   );
// }