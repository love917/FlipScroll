gsap.registerPlugin(ScrollTrigger,Flip); 


let lenis;

// Function to initialize Lenis for smooth scrolling
const initSmoothScrolling = () => {
   // Instantiate the Lenis object with specified properties
   lenis = new Lenis({
      lerp: 0.1, // Lower values create a smoother scroll effect
      smoothWheel: true // Enables smooth scrolling for mouse wheel events
   });

   // Update ScrollTrigger each time the user scrolls
   lenis.on('scroll', () => ScrollTrigger.update());

   // Define a function to run at each animation frame
   const scrollFn = (time) => {
      lenis.raf(time); // Run Lenis' requestAnimationFrame method
      requestAnimationFrame(scrollFn); // Recursively call scrollFn on each frame
   };
   // Start the animation frame loop
   requestAnimationFrame(scrollFn);
};
initSmoothScrolling();
//-------------------------------------------------------

let triggerFlipOnScroll=(galleryEl, option)=>{
    let settings={
        flip:{
            absolute:false,
            absoluteOnLeave:false,
            scale:true,
            simple:true
        },
        scrollTrigger:{
            start:"center center",
            end:"+=300%"
        }
    }

    settings=Object.assign({},settings,option)//1)
    //console.log(settings)

    let galleryCaption=galleryEl.querySelector(".caption");
    let galleryItems=galleryEl.querySelectorAll(".gallery__item");
    
    //L:최종상태를 캡쳐
    galleryEl.classList.add("gallery--switch");

    //F:초기상태를 캡쳐
    let flipstate=Flip.getState([galleryItems,galleryCaption],{props:'filter,opacity'})

    //✨초기 상태로 되돌리려면 최종 클래스를 제거합니다,
    // 최종상태를 파악하게만하고(목적) 클래스명은 바로 제거한다.
    galleryEl.classList.remove("gallery--switch");

    //I :반전. 뒤집기 애니메이션, 타임라인 만들기
    let tl=Flip.to(flipstate,{
        ease:"none",
        absolute:settings.flip.absolute,
        absoluteOnLeave:settings.flip.absoluteOnLeave,
        scale:settings.flip.scale,
        simple:settings.flip.simple,
        stagger:settings.stagger,
        scrollTrigger:{
            trigger:galleryEl,
            start:settings.scrollTrigger.start,
            end:settings.scrollTrigger.end,
            pin:galleryEl.parentNode,//🟡pin을 부모한테 걸어야함
            scrub:1
        }

    })
    
}

let scroll=()=>{
    let galleries=[//값이 많아지므로 배열로 만들어서, forEach문이 있는 gallery(객체)한테 넘겨줌

        //scale:false --> 이미지 자체가 넓적해지지 않도록 함
        {id:"#gallery-1",options:{flip:{absoluteOnLeave:true,scale:false}}},
        {id:"#gallery-2"},
        {id:"#gallery-3",options:{flip:{absolute:true,scale:false},scrollTrigger:{
            end:"+=400%"
        },stagger:0.05}},
        {id:"#gallery-4"},
        {id:"#gallery-5"},
        {id:"#gallery-6"},
        {id:"#gallery-7"},
        {id:"#gallery-8",options:{flip:{scale:false}}},
        {id:"#gallery-9"},
    ]
    galleries.forEach((gallery)=>{
        let galleryElement=document.querySelector(gallery.id);
        triggerFlipOnScroll(galleryElement,gallery.options)
    })

}
scroll()
//1)
//assign :자바스크립트 문법. 두 객체를 하나의 객체로 합쳐줌(병합)
