import React, { useReducer } from 'react';

// ==========================================
// 1. COUNTER REDUCER
// ==========================================
function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div className="text-center py-3">
      <div style={{ fontSize: '2.5rem', fontWeight: 600, color: '#61dafb', marginBottom: '16px' }}>
        Count: {state.count}
      </div>

      <div className="d-flex justify-content-center align-items-center gap-3">
        <button 
          className="btn btn-light fw-bold px-3 py-2 fs-5" 
          onClick={() => dispatch({ type: 'DECREMENT' })}
        >
          &minus;
        </button>
        <button 
          className="btn btn-light fw-bold px-3 py-2 fs-5" 
          onClick={() => dispatch({ type: 'INCREMENT' })}
        >
          &#43;
        </button>
        <button 
          className="btn btn-secondary px-4 py-2"
          onClick={() => dispatch({ type: 'RESET' })}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 2. QUESTION BANK REDUCER
// ==========================================
const initialQuizState = {
  questions: [
    {
      id: 1,
      question: "What is the capital of Australia?",
      options: ["Sydney", "Canberra", "Melbourne", "Perth"],
      answer: "Canberra"
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars"
    },
    {
      id: 3,
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      answer: "Pacific Ocean"
    }
  ],
  currentQuestion: 0,
  selectedOption: "",
  score: 0,
  showScore: false
};

function quizReducer(state, action) {
  switch (action.type) {
    case 'SELECT_OPTION':
      return {
        ...state,
        selectedOption: action.payload
      };

    case 'NEXT_QUESTION': {
      const currentQ = state.questions[state.currentQuestion];
      const isCorrect = state.selectedOption === currentQ.answer;
      const nextScore = isCorrect ? state.score + 1 : state.score;
      const isLast = state.currentQuestion + 1 >= state.questions.length;

      if (isLast) {
        return {
          ...state,
          score: nextScore,
          showScore: true
        };
      }

      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        selectedOption: "",
        score: nextScore
      };
    }

    case 'RESTART_QUIZ':
      return {
        ...state,
        currentQuestion: 0,
        selectedOption: "",
        score: 0,
        showScore: false
      };

    default:
      return state;
  }
}

function QuestionBank() {
  const [state, dispatch] = useReducer(quizReducer, initialQuizState);
  const { questions, currentQuestion, selectedOption, score, showScore } = state;
  const currentQ = questions[currentQuestion];

  return (
    <div style={{ backgroundColor: '#282c34', color: '#ffffff', borderRadius: '6px', padding: '30px 24px', textAlign: 'center', maxWidth: '520px', margin: '0 auto' }}>
      {showScore ? (
        <div>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '24px' }}>
            Your Score: {score}/{questions.length}
          </h2>
          <button 
            className="btn btn-light fw-bold px-4 py-2"
            onClick={() => dispatch({ type: 'RESTART_QUIZ' })}
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <div>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 600, marginBottom: '12px', color: '#f8fafc' }}>
            Question {currentQuestion + 1}
          </h3>
          <p style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '22px' }}>
            {currentQ.question}
          </p>

          {/* Options */}
          <div className="d-flex justify-content-center gap-2 mb-4 flex-wrap">
            {currentQ.options.map((opt) => (
              <button
                key={opt}
                className={`btn ${selectedOption === opt ? 'btn-primary' : 'btn-light'}`}
                style={{ padding: '7px 16px', fontSize: '15px' }}
                onClick={() => dispatch({ type: 'SELECT_OPTION', payload: opt })}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Next Button */}
          <div>
            <button
              className="btn btn-secondary px-4 py-2 fw-bold"
              disabled={!selectedOption}
              onClick={() => dispatch({ type: 'NEXT_QUESTION' })}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Exercise15() {
  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '30px 20px 80px', color: '#1a1a1a', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div className="card shadow-sm border-0 p-4 mb-4">
        <h1 style={{ fontSize: '1.85rem', fontWeight: 700, marginBottom: '6px' }}>Exercise 15: React Hook (useReducer)</h1>
        <hr style={{ borderTop: '2px solid #0f172a', margin: '10px 0 16px' }} />
        <h2 style={{ fontSize: '1.15rem', fontStyle: 'italic', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>Objectives and Outcomes</h2>
        <p style={{ color: '#475569', fontSize: '0.95rem', marginBottom: 0 }}>
          <code>useReducer</code> is a React hook that allows you to manage state and state transitions within a functional component. It is an alternative to using the <code>useState</code> hook when you have more complex state logic that involves multiple actions.
        </p>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px' }}>Exercises</h3>

      {/* Bài 1 */}
      <div className="card shadow-sm border-0 p-4 mb-4">
        <h4 className="fw-bold mb-2">1. Counter with useReducer</h4>
        <p className="text-secondary small">Quản lý state count thông qua <code>counterReducer</code> và các actions: <code>INCREMENT</code>, <code>DECREMENT</code>, <code>RESET</code>.</p>
        <div style={{ backgroundColor: '#282c34', color: '#fff', borderRadius: '6px', padding: '24px' }}>
          <Counter />
        </div>
      </div>

      {/* Bài 2 */}
      <div className="card shadow-sm border-0 p-4 mb-4">
        <h4 className="fw-bold mb-2">2. Create a Question Bank (Quiz App)</h4>
        <p className="text-secondary small">Sử dụng <code>useReducer</code> để quản lý trạng thái câu hỏi, lựa chọn đáp án, tính điểm và chuyển câu.</p>
        <div style={{ backgroundColor: '#1e293b', borderRadius: '6px', padding: '24px' }}>
          <QuestionBank />
        </div>
      </div>

      <div className="card shadow-sm border-0 p-4 text-center">
        <h5 className="fw-bold mb-2">Conclusion</h5>
        <p className="text-secondary small mb-0">In conclusion, the useReducer hook in React provides a way to manage state and state transitions within functional components.</p>
      </div>
    </div>
  );
}
