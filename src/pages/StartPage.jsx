import img from "../assets/image.jpg"; 
import "../App.css";
import Slideshow from "../components/Slideshow";

export default function StartPage() {
  return (
    <div
      className="img-background"
      style={{
        backgroundImage: `url(${img})`,
      }}
    >
       <div className="startpage-container"> 
       <h1 className="h1-startpage">NUMELE APLICATIEI</h1>
       <h3 className="h3-startpage">Just one click away from your next perfect stay</h3>
       </div>
       <Slideshow />
    </div>
  );
}
