import React from 'react';
import './App.css'

const Main = (props) => {
    const {
        currencies,
        selectedCurrency,
        onChangeCurrency,
        onChangeAmount,
        amount
    } = props
    return (
        <div>
            <input className="input" type="number" onChange={onChangeAmount} value={amount}/>
            <select className='select' value={selectedCurrency} onChange={onChangeCurrency}>
                <option>UAH</option>
                {currencies.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>

        </div>
    );
};

export default Main;