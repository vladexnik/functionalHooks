import {Component,useState,useEffect,useCallback,useMemo} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

const calcValue=()=>{
    console.log('random');

    return Math.floor(Math.random() * (50-1)+1);
}

const countTotal=(num)=>{
    console.log('counting...');
    return num+10;
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

    const getSomeImages=useCallback(()=>{
        console.log('fetching');
        return [
             'https://hcsalavat.ru/upload/iblock/b5a/grhqxdtfoo1nh4nm0x3pwo18qiwdvmzj.png',
             'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzYGCzee47v4L_ajZISH1Ah2eqoVKtxU6YiAzF4pmvtm4zHuyhG0A70r3wWu2sgY4u790&usqp=CAU'    
            ]}, []) 
            // мемоизир ф-ия
            // может быть пересоздана, когда деств-но нужно(при обновлении слайдов)
            


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

    // мемоизрованная переменная
    const total=useMemo(()=>
    countTotal(slide),[slide]);

    const style=useMemo(()=>({
        color: slide>16 ? 'red' : 'black'
        }),[slide]
    )



    useEffect(()=>{
        console.log('style changed')
    },[style]); // сравнивает новую ссылку на объект с предыд

    return (
        <Container>
            <div className="slider w-50 m-auto">
                <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />

                    <Slide getSomeImages={getSomeImages}/>

                <div style={style} className="text-center mt-5">Active slide {slide} <br/> 
                {autoplay ? 'auto' : null}  
                {/* строка режима включения */}
                </div>

                <div className="text-center mt-5">Total slides: {total}<br/> 
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
const Slide=({getSomeImages})=>{
    const [images,setImages]=useState([]);

    useEffect(()=>{
        setImages(getSomeImages())
    },[getSomeImages]) // когда эта ф-ия изменится, то только тогда useEffect запуск-ся повторно

    return(
        <>
            {images.map((url,i)=>{
                <img key={i} className='d-block w-100' src={url} alt='slide'></img>          
            })}
                                
        </>
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
