import Footer from "../common/Footer";
import Navbar from "../common/Navbar";
import Features from "./Features";
import Hero from "./Hero";
import Pricing from "./Pricing";
import Testimonials from "./Testimonials";



export default function Landing() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <Features/>
      <Testimonials/>
      <Pricing/>
      <Footer/>
    </>
  );
}
