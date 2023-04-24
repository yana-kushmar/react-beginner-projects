import './index.scss';
import React from "react";

const questions = [
    {
        title: 'React - это ... ?',
        variants: ['библиотека', 'фреймворк', 'приложение'],
        correct: 0,
    },
    {
        title: 'Компонент - это ... ',
        variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
        correct: 1,
    },
    {
        title: 'Что такое JSX?',
        variants: [
            'Это простой HTML',
            'Это функция',
            'Это тот же HTML, но с возможностью выполнять JS-код',
        ],
        correct: 2,
    },
];

function Result({correct}) {
    return (
        <div className="result">
            <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png"/>
            <h2>Вы отгадали {correct} ответа из {questions.length}</h2>
            <a href="/">
            <button>Попробовать снова</button>
            </a>
        </div>
    );
}

const Game = ({question, onClickVariants, step}) => {



    const persentage = Math.round(step / question.length * 100)

    return (
        <>
            <div className="progress">

                <div style={{width: `${persentage}%`}} className="progress__inner"></div>

                <h1>{question.title}</h1>
                <ul>
                    {
                        question.variants.map((el, index) => {
                            <li  onClick={() => onClickVariants(index)
                                key={el}
                               }>
                                {el}
                            </li>
                        })
                    }
                </ul>
            </div>
        </>
    );
}


const App = () => {
    const [step, setStep] = React.useState(0)
    const [correct, setCorrect] = React.useState(0)

    const question = questions[step]

    const onClickVariants = (index) => {
        console.log(step, index)
        setStep(step + 1)

        if (index === question.correct) {
            setCorrect(correct + 1)
        }
    }


    return (
        <div className="App">
            {
                step !== questions.lenght


                    ? (<Game  question={question} onClickVariants={onClickVariants} step={step}/>)
                    : (<Result correct={correct}/>)
            }

        </div>
    );
}

export default App;
