import React from 'react';
import s from './CurrencyItem.module.css'

const CurrencyItem = ({currencies, selectedCurrency, onChangeCurrency, onChangeAmount, amount}) => {
    return (
        <div>
            <input className={s.input} type="number" onChange={onChangeAmount} value={amount}/>
            <select className={s.select} value={selectedCurrency} onChange={onChangeCurrency}>
                <option>UAH</option>
                {currencies.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>

        </div>
    );
};


export default CurrencyItem;