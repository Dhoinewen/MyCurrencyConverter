import React from 'react';
import s from './Header.module.css'

const Header = ({rateUSD, rateEUR}) => {
    return (
        <header className={s.header}>
            <div>
                <h2>Convert your money</h2>
            </div>
            <div className={s.currency}>
                <span> 1 USD = {rateUSD} UAH</span>
                <span> 1 EUR = {rateEUR} UAH</span>
            </div>
        </header>
    );
};

export default Header;