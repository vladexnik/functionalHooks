import {Component,useState,useEffect} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

const calcValue=()=>{
    console.log('random');

    return Math.floor(Math.random() * (50-1)+1);
}

const Slider= (props) => {
    
    const slideStateArray=useState();
    console.log(slideStateArray[0]);

    // const [state, setState]=useState({slide: 10, autoplay: false})
    // function changeSlide(i){
    //     setState(state=> ({...state ,slide:state.slide+i})); // нужно возвр объект, как было; 
    //     //деструктуризация чтоб не потерять другие св-ва(autoplay)
    
    //     // setSlide(slide+i); 
    //     // setSlide(slide+i);
    // }
    // function toggleAutoplay(){
    //     setState(state=>({ ...state, autoplay: !state.autoplay}))
    // }


    const [slide,setSlide]=useState(()=>calcValue()); // obj, string,numbers.. for slide
    const [autoplay,setAutoplay]=useState(false);

    function logging(){
        console.log('log!')
    }

    useEffect(()=>{
        console.log('effect');
        document.title=`Slide: ${slide}`;

        window.addEventListener('click',logging);

        return ()=> {
            window.removeEventListener('click',logging);
        }
    }, [slide]);
    useEffect(()=>{
        console.log('autoplay changed')
    }, [autoplay])

    function changeSlide(i){
        setSlide(slide=>  slide+i); // сначала возвр текущ значение slide
        
        // setSlide(slide+i); 
        // setSlide(slide+i);
    }
    function toggleAutoplay(){
        setAutoplay(autoplay=> !autoplay)
    }

    return (
        <Container>
            <div className="slider w-50 m-auto">
                <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
                <div className="text-center mt-5">Active slide {slide} <br/> 
                {autoplay ? 'auto' : null}  
                {/* строка режима включения */}
                </div>
                <div className="buttons mt-3">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(-1)}>-1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={()=> changeSlide(+1)}>+1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={toggleAutoplay}>toggle autoplay</button>
                </div>
            </div>
        </Container>
    )
}


function App() {

    const[slider,showSlider]=useState(true);

  return (
    <>
        <button onClick={()=> showSlider(false)}>Cleck</button>
        {slider ? <Slider/> : null}
    </>
  );
}

export default App;