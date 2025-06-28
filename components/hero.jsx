// "use client";

// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import Image from "next/image";

// const HeroSection = () => {
//   return (
//     <div className="pb-20 px-4">
//       <div className="container mx-auto text-center">
//         <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title">
//           Manage Your Finances <br />
//           With Intelligence
//         </h1>
//         <p>
//           An AI-powered financial management platform that helps you
//           track,analyze and optimize your spending with real-time insights.
//         </p>
//         <div>
//           <Link href="/dashboard">
//             <Button size="lg" className="px-8">
//               Get Started
//             </Button>
//           </Link>
//           <Link href="https://www.youtube.com">
//             <Button size="lg" variant="outline" className="px-8">
//               Watch Demo
//             </Button>
//           </Link>
//         </div>
//         <div>
//           <div>
//             <Image
//               src="/banner.jpeg"
//               alt="Dashboard Preview"
//               width={1280}
//               height={720}
//               className=" rounded-lg shadow-2xl mx-auto"
//               priority
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";

const HeroSection = () => {
  const imageRef=useRef()
  useEffect(()=>{
      const imageElement=imageRef.current;
      const handleScroll=()=>{
        const scrollPosition=window.scrollY
         const threshold=100;
          if(scrollPosition>threshold){
            imageElement.classList.add("scrolled")
          }
          else{
            imageElement.classList.remove("scrolled")
          }
      }
      window.addEventListener("scroll",handleScroll)
      return ()=>window.removeEventListener("scroll",handleScroll)
    },[])
  return (
    <div className="pb-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title">
          Manage Your Finances <br />
          With Intelligence
        </h1>
        <p className="text-lg max-w-2xl mx-auto text-muted-foreground">
          An AI-powered financial management platform that helps you track,
          analyze and optimize your spending with real-time insights.
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <Link href="/dashboard">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
          <Link href="https://www.youtube.com">
            <Button size="lg" variant="outline" className="px-8">
              Watch Demo
            </Button>
          </Link>
        </div>
          <div className="hero-image-wrapper">
        <div ref={imageRef} className="hero-image mt-10">
          <Image
            src="/banner.jpeg"
            alt="Dashboard Preview"
            width={1280}
            height={720}
            className="rounded-lg shadow-2xl mx-auto"
            priority
          />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
