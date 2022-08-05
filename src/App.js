import './App.css';
import {useEffect, useMemo, useState} from "react";
import Header from "./components/Header/Header";
import CurrencyItem from "./components/CurrencyItem/CurrencyItem";


const BASE_URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'

function App() {
    const USD = "USD"
    const EUR = "EUR"
    const UAH = "UAH"
    const [allData, setAllData] = useState()
    const [fromCurrency, setFromCurrency] = useState(UAH)
    const [toCurrency, setToCurrency] = useState(USD)
    const [rate, setRate] = useState(1)
    const [amount, setAmount] = useState(100)
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
    const [isLoading, setIsLoading] = useState(true)



    useEffect(() => {
        setIsLoading(true)
        fetch(BASE_URL)
            .then(responce => responce.json())
            .then(data => {
                setAllData(data)
                setIsLoading(false)
            })
    }, [])



    const allCurrencies = useMemo(() => {
        if (isLoading === false) {
            return allData.map(value => {
                return value.cc
            })
        }
    }, [allData, isLoading])


    const getRate = currency => {
        if (isLoading === false) {
            return (allData.find(usd => usd.cc === currency)).rate
        }
    }



    let toAmount, fromAmount
    if (amountInFromCurrency) {
        fromAmount = amount
        toAmount = amount * rate || amount / getRate(USD)
    } else {
        toAmount = (amount)
        fromAmount = amount / rate
    }


    useEffect(() => {
        if (fromCurrency === UAH) {
            if (toCurrency === UAH) {
                setRate(1)
            } else {
                setRate(1 / getRate(toCurrency))
            }
        }else {
            if (toCurrency === UAH) {
                setRate(1 / getRate(toCurrency))
            }
            else {
                setRate(getRate(fromCurrency)/getRate(toCurrency))
            }
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
        isLoading ? <h1>Loading...</h1> :
            <div className="App">
                <Header
                    rateUSD={getRate(USD)}
                    rateEUR={getRate(EUR)}
                />

                <div className='main'>
                    <CurrencyItem
                        currencies={allCurrencies}
                        selectedCurrency={fromCurrency}
                        onChangeCurrency={e => setFromCurrency(e.target.value)}
                        onChangeAmount={handleFromAmountChange}
                        amount={fromAmount}
                    />
                    <div className='central'>=</div>
                    <CurrencyItem
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
