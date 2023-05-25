import {useRef,useState,useEffect} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

const Form = () => {
    const [text,setText]=useState('');
    const myRef = useRef(1);

    useEffect(()=>{
        console.log(myRef.current)
    })

    const focusFirstTI = () => {
        myRef.current.focus();
    }

    return (
        <Container>
            <form className="w-50 border mt-5 p-3 m-auto">
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                    <input onChange={(e)=>setText(e.target.value)} type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                    <textarea onClick={()=>myRef.current++} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
            </form>
            <TextInputWithFocusButton/>
        </Container>
    )
}

const TextInputWithFocusButton=()=> {
    const inputEl = useRef(null);
    const onButtonClick = () => {
      // `current` указывает на смонтированный элемент `input`
      inputEl.current.focus();
    };
    return (
      <>
        <input ref={inputEl} type="text" />
        <button onClick={onButtonClick}>Установить фокус на поле ввода</button>
      </>
    );
  }

function App() {
    return (
        <Form/>
        
    );
}

export default App;
