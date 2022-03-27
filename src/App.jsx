import React, { useEffect, useState } from 'react';
import './App.css'
// app looks closely like example format (yes)
// text in textarea shows onchange in result div (yes)
// check and uncheck checkbox (yes)
// console.log input field - onchange (yes)
// match text in input to text area and mark result with <mark></mark>
// 
// case sensitive

const App = () => {
  const [details, setDetails] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event) => {
    setDetails(prev => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      }
    })
  }

  const handleCheck = () => {
    setIsChecked(!isChecked);
    console.log(!isChecked)
  }

  useEffect(() => {
    if(details.source) {
      const result = document.querySelector("[data-testid='result']");
      result.innerHTML = details.source;
    }
    if(details.source && details.term) {
      const newTerm = details.source.replace(new RegExp(details.term, isChecked ? "g" : "gi"), (match) => `<mark>${match}</mark>`)
      const result = document.querySelector("[data-testid='result']");
      result.innerHTML = newTerm;
    }
  }, [details, isChecked]);

  return (
    <div className="flex">
      <div>
        <textarea data-testid="source-text" name="source" rows="5" onChange={handleChange} />
      </div>
      <div className="mt-3">
        <input type="text" data-testid="search-term" name="term" onChange={handleChange} />
      </div>
      <div className="basic-grid">
        <p>case sensitive?</p>
        <input type="checkbox" data-testid="case-sensitive" className="mt-3" onChange={handleCheck} />
      </div>

      <div data-testid="result"></div>
    </div>
  )
}

export default App