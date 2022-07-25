// import logo from './logo.svg';
// import './App.css';
// import './styles.css';
import './st.css';
import DigitButtons from './DigitButtons';
import { useReducer } from 'react';
import OperationButtons from './OperationButtons';

export const ACTIONS = {
  ADD_DIGIT : "add-digit",
  CHOOSE_OPERATION : "choose-operation",
  CLEAR : 'clear',
  DELETE_DIGIT : 'delete-digit',
  EVALUATE : 'evaluate'
}

const reducer =(state,{type,payload})=>{
  switch(type){
    case ACTIONS.ADD_DIGIT:   //Case to add the clicked digit (1,2,3,4,5....)
      if(state.overwrite){
        return{
          ...state,
          currentOperand: payload.digit,
          overwrite: false
        }
      }
      if(payload.digit === "0" && state.currentOperand === "0") return state;
      if(payload.digit === "." && state.currentOperand.includes(".")) return state;
      else{
        return{
          ...state,
          currentOperand : `${state.currentOperand || ""}${payload.digit}`
        }
      }
      

    case ACTIONS.CHOOSE_OPERATION: //case to do the actual operations on the digits (+,-,*,/)
      if(state.currentOperand == null && state.previousOperand == null){
        return state
      } 
      if(state.currentOperand == null)
      {
        return{
          ...state,
          operation: payload.operation
        }
      }
      if(state.previousOperand == null){
        return{
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }
      return{
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null
      }


    case ACTIONS.CLEAR: //case to clear the screen (AC)
      return {}
    case ACTIONS.EVALUATE: //case to display the output i.e mechanism for (=)
      if(state.operation == null || state.currentOperand == null || state.previousOperand == null)
      {
        return state;
      }
      else
      {
        return{
          ...state,
          overwrite: true,
          previousOperand: null,
          operation: null,
          currentOperand: evaluate(state)
        }
      }
      

      case ACTIONS.DELETE_DIGIT: //case to delete the last digit (DEL)
        // const cur = parseFloat(currentOperand);
        if(state.overwrite)
        {
          return{
          ...state,
          currentOperand: null,
          overwrite: false
        }
      }
      if(state.currentOperand == null) return state;
      if(state.currentOperand.length == 1) 
      {
        return{
          ...state,
          currentOperand: null
        }
      }
      else{
        return{
          ...state,
          currentOperand: state.currentOperand.slice(0,-1)
        }
      }
  }
}


//Function to perform the operations
const evaluate = ({currentOperand,previousOperand,operation}) =>{
  const curr = parseFloat(currentOperand);
  const prev = parseFloat(previousOperand);
  if(isNaN(curr) || isNaN(prev)){
    return "";
  }
  let comp = "";
  switch(operation){
    case "+":
      comp = prev + curr;
      break;
    case "-":
      comp = prev - curr;
      break;
    case "*":
      comp = prev * curr;
      break;
    case "/":
      comp = prev / curr;
      break;
    case "%":
      comp = prev % curr;
      break;
  } 
  return comp.toString();
}


//main function
function App() {
  const [{currentOperand,previousOperand,operation}, dispatch] = useReducer(reducer,{});

  // dispatch({type: ACTIONS.ADD_DIGIT,payload: {digit: 1}})

  return (
    <div className="calculator-grid">
      
      <div className="output">
        <div className="previous-operand">{previousOperand} {operation}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      {/* <button className="span-two" onClick={() =>{dispatch ( { type : ACTIONS.CLEAR } ) }}>AC</button> */}
      <button onClick={() =>{dispatch ( { type : ACTIONS.CLEAR } ) }}>AC</button>

      <button onClick={() =>{dispatch ( { type : ACTIONS.DELETE_DIGIT } ) }}>DEL</button>
      <OperationButtons operation = "%" dispatch = {dispatch}/>

      <OperationButtons operation = "/" dispatch = {dispatch}/>
      <DigitButtons digit = "1" dispatch = {dispatch}/>
      <DigitButtons digit = "2" dispatch = {dispatch}/>
      <DigitButtons digit = "3" dispatch = {dispatch}/>
      <OperationButtons operation = "*" dispatch = {dispatch}/>
      <DigitButtons digit = "4" dispatch = {dispatch}/>
      <DigitButtons digit = "5" dispatch = {dispatch}/>
      <DigitButtons digit = "6" dispatch = {dispatch}/>
      <OperationButtons operation = "-" dispatch = {dispatch}/>
      <DigitButtons digit = "7" dispatch = {dispatch}/>
      <DigitButtons digit = "8" dispatch = {dispatch}/>
      <DigitButtons digit = "9" dispatch = {dispatch}/>
      <OperationButtons operation = "+" dispatch = {dispatch}/>
      <DigitButtons digit = "." dispatch = {dispatch}/>
      <DigitButtons digit = "0" dispatch = {dispatch}/>
      <button className='span-two' onClick={() =>{dispatch ( { type : ACTIONS.EVALUATE } ) }}>=</button>
    </div>
  );
}

export default App;
