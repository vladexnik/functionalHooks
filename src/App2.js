import {useRef,useState,useEffect} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';



function useInputWithValidate(initialValue){
    const [value,setValue]=useState(initialValue);

    const onChange=(event)=>{
        setValue(event.target.value);
    }
    const validateInput=()=>{
        return value.search(/\d/)>=0;  // ? true : false;
     }
    return {value: value, 
        onChange: onChange, 
        validateInput: validateInput} ;
    // return {value, onChange,validateInput};
}

const Form = () => {
    const [text,setText]=useState('');
    const [textArea,setTextArea]=useState('');
    const myRef = useRef(1);

    const validateInput=(text2)=>{
       return text2.search(/\d/)>=0;  // ? true : false;
    }

    const color=validateInput(text) ? 'text-danger' : null;

    

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
                    <input 
                        value={`${text} / ${textArea}`} 
                        type={text} 
                        className="form-control" 
                        readOnly/>
                    <label htmlFor="exampleFormControlInput1" className="form-label mt-3">Email address</label>
                    <input 
                        onChange={(e)=>setText(e.target.value)} 
                        type="email"
                        // value={text}
                        className={`form-control ${color}`} 
                        id="exampleFormControlInput1" 
                        placeholder="name@example.com"/>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                    <textarea 
                        onChange={e=> setTextArea(e.target.value)}
                        // onClick={()=>myRef.current++} 
                        className="form-control" 
                        id="exampleFormControlTextarea1" 
                        rows="3"></textarea>
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
      console.log(inputEl.current.value)
    };
    return (
      <div className="mt-5 m-auto">
        <input ref={inputEl} type="text" />
        <button onClick={onButtonClick}>Установить фокус на поле ввода</button>
      </div>
    );
  }

function App() {
    return (
        <Form/>
        
    );
}

export default App;
