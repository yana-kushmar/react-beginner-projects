import React from 'react';
import {Block} from './Block';
import './index.scss';




function App() {



    // const [rates, setRates] = React.useState({})
    const ratesRef = React.useRef({})

    const [fromCurrency, setFromCurrency] = React.useState("RUB")
    const [toCurrency, setToCurrency] = React.useState("USD")

    const [fromPrice, setFromPrice] = React.useState(0)
    const [toPrice, setToPrice] = React.useState(1)


    React.useEffect(() => {

        const myHeaders = new Headers();
        myHeaders.append("apikey", "mUjCEn5f7csDDYAQ0Wrq5zYFKkMv4bpU");

        const requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders
        };

        fetch('https://data.fixer.io/api/latest', requestOptions)
            .then(res => res.json())
            .then(json => {
                console.log(json)
                ratesRef.current = json.rates

                onChangeToPrice(1)

            }).catch(err => {
            console.warn(err)
            alert("Не удалось получить информацию ")
        })
    }, [])


    const onChangeFromPrice = (value) => {
        const prise = value /  ratesRef.current[fromCurrency]
        const result = prise *  ratesRef.current[toCurrency]
        setToPrice(+result.toFixed(3))
        setFromPrice(value)
    }

    const onChangeToPrice = (value) => {
        const result = (ratesRef.current[fromCurrency] /  ratesRef.current[toCurrency]) * value
        setFromPrice(+result.toFixed(3))
        setToPrice(value)
    }

    React.useEffect(() => {
        onChangeFromPrice(fromPrice)
    }, [fromCurrency])

    React.useEffect(() => {
        onChangeToPrice(toPrice)
    }, [toCurrency])


    return (
        <div className="App">
            <Block value={fromPrice}
                   currency={fromCurrency}
                   onChangeCurrency={setFromCurrency}
                   onChangeValue={onChangeFromPrice}

            />
            <Block value={toPrice}
                   currency={toCurrency}
                   onChangeCurrency={setToCurrency}
                   onChangeValue={onChangeToPrice}
            />
        </div>
    );
}

export default App;
