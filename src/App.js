import './App.css';
import {useEffect, useState} from "react";
import Main from "./main";


const BASE_URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'

function App() {
    const [allData, setAllData] = useState()
    const [allCurrencies, setAllCurrencies] = useState([])
    const [fromCurrency, setFromCurrency] = useState('UAH')
    const [toCurrency, setToCurrency] = useState('USD')
    const [rate, setRate] = useState(1)
    const [amount, setAmount] = useState(1)
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)


    useEffect(() => {
        fetch(BASE_URL)
            .then(responce => responce.json())
            .then(data => {
                const currencies = data.map(aboba => {
                    return aboba.cc
                })
                setAllCurrencies(currencies)
                setAllData(data)
            })
    }, [])


    const checkData = cc => {
        if (allData !== undefined) {
            return (allData.find(usd => usd.cc === cc)).rate
        }
    }


    let toAmount, fromAmount
    if (amountInFromCurrency) {
        fromAmount = amount
        toAmount = amount * rate || amount * checkData("USD")
    } else {
        toAmount = (amount)
        fromAmount = amount / rate
    }


    useEffect(() => {
        setRate(1)
        if (fromCurrency === "UAH") {
            if (toCurrency === "UAH") {
                setRate(1)
            } else {
                setRate(1 / checkData(toCurrency))
            }
        }
        if (toCurrency === "UAH") {
            if (fromCurrency === "UAH") {
                setRate(1)
            } else {
                setRate(1 / checkData(fromCurrency))
            }
        } else {
            setRate(checkData(fromCurrency) / checkData(toCurrency))
        }
    }, [fromCurrency, toCurrency])


    function handleFromAmountChange(e) {
        setAmount(e.target.value)
        setAmountInFromCurrency(true)
    }

    function handleToAmountChange(e) {
        setAmount(e.target.value)
        setAmountInFromCurrency(false)
    }

    return (
        <div className="App">
            <header className='header'>
                <div className="title">
                    <h2>Convert your money</h2>
                </div>
                <div className="currency">
                    <span> 1 USD = {checkData("USD")} UAH</span>
                    <span> 1 EUR = {checkData("EUR")} UAH</span>
                </div>
            </header>
            <div className='main'>
                <Main
                    currencies={allCurrencies}
                    selectedCurrency={fromCurrency}
                    onChangeCurrency={e => setFromCurrency(e.target.value)}
                    onChangeAmount={handleFromAmountChange}
                    amount={fromAmount}
                />
                <div className='central'>=</div>
                <Main
                    currencies={allCurrencies}
                    selectedCurrency={toCurrency}
                    onChangeCurrency={e => setToCurrency(e.target.value)}
                    onChangeAmount={handleToAmountChange}
                    amount={toAmount}
                />
            </div>
        </div>
    );
}

export default App;
