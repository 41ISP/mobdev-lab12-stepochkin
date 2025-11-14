import { useState, useEffect } from 'react'
import axios from 'axios'

function Trivia() {
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    loadQuestions()
  }, [])

  const loadQuestions = () => {
    axios.get('https://opentdb.com/api.php?amount=10')
      .then(res => {
        const data = res.data.results.map(q => {
          const answers = [...q.incorrect_answers, q.correct_answer].sort()
          return {
            question: q.question,
            answers: answers,
            correct: q.correct_answer
          }
        })
        setQuestions(data)
      })
  }

  const checkAnswer = (answer) => {
    setSelected(answer)
    if(answer === questions[current].correct) {
      setScore(score + 1)
    }
    
    setTimeout(() => {
      if(current + 1 < questions.length) {
        setCurrent(current + 1)
        setSelected(null)
      } else {
        setFinished(true)
      }
    }, 1000)
  }

  const restart = () => {
    setCurrent(0)
    setScore(0)
    setFinished(false)
    setSelected(null)
    loadQuestions()
  }

  if(questions.length === 0) {
    return <div className="loading">Загрузка...</div>
  }

  if(finished) {
    return (
      <div className="container">
        <div style={{background: 'white', maxWidth: '600px', margin: '50px auto', padding: '30px', textAlign: 'center'}}>
          <h2>Результат</h2>
          <p style={{fontSize: '24px', margin: '20px 0'}}>
            Ваш счет: {score} из {questions.length}
          </p>
          <button className="btn" onClick={restart}>Начать заново</button>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <h1 className="page-title">Викторина</h1>
      
      <div style={{background: 'white', maxWidth: '700px', margin: '20px auto', padding: '30px'}}>
        <p style={{marginBottom: '20px'}}>Вопрос {current + 1} из {questions.length} | Счет: {score}</p>
        
        <h3 dangerouslySetInnerHTML={{__html: questions[current].question}}></h3>
        
        <div style={{marginTop: '30px'}}>
          {questions[current].answers.map((answer, i) => {
            let btnStyle = {
              display: 'block',
              width: '100%',
              margin: '10px 0',
              padding: '15px',
              fontSize: '16px',
              border: '2px solid #2196F3',
              background: 'white',
              cursor: 'pointer'
            }
            
            if(selected) {
              if(answer === questions[current].correct) {
                btnStyle.background = '#4CAF50'
                btnStyle.color = 'white'
              } else if(answer === selected) {
                btnStyle.background = 'red'
                btnStyle.color = 'white'
              }
            }
            
            return (
              <button 
                key={i}
                style={btnStyle}
                onClick={() => checkAnswer(answer)}
                disabled={selected !== null}
                dangerouslySetInnerHTML={{__html: answer}}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Trivia
