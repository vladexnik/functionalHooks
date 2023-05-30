import {useRef,useState,useEffect} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';



// для повт исп-ия логики с сост-ем
// создали свой хук, теперь есть общие методы
// создали отдельную функцию, содержит внутри себя сост-ие и различные методы
// и возвр-ет эти сущности в виде объекта
// затем создаём перем-ые для объектов в кач-ве вызова ф-ии и используем методы
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
    

    const input=useInputWithValidate(''); // создание нового объекта с полями с уник-ыми значениями
    const textArea=useInputWithValidate('');

    const myRef = useRef(1);

    // const [text,setText]=useState('');
    // const [textArea,setTextArea]=useState('');
    // const validateInput=(text2)=>{
    //    return text2.search(/\d/)>=0;  // ? true : false;
    // }
    // const color=validateInput(text) ? 'text-danger' : null;

    const color=input.validateInput() ? 'text-danger' : null;
    const color2=textArea.validateInput() ? 'text-primary' : null;



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
                        // value={`${text} / ${textArea}`}
                        value={`${input.value} / ${textArea.value}`}  
                        type="text"
                        className="form-control" 
                        readOnly/>
                    <label htmlFor="exampleFormControlInput1" className="form-label mt-3">Email address</label>
                    <input
                        value={input.value}
                        onChange={input.onChange}
                        //value={text} 
                        // onChange={(e)=>setText(e.target.value)} 
                        type="email"
                        className={`form-control ${color}`} 
                        id="exampleFormControlInput1" 
                        placeholder="name@example.com"/>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                    <textarea
                        onChange={textArea.onChange}
                        value={textArea.value} 
                        // onChange={e=> setTextArea(e.target.value)}
                        // onClick={()=>myRef.current++} 
                        className={`form-control ${color2}`}
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
