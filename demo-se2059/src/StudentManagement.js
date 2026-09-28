import React, { useState, useEffect } from 'react';

/**
 * ====================================================================
 * ES6 ASSIGNMENT - Logic & Data Models
 * ====================================================================
 */

// 1. Create a Person class
export class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    return `Hi, my name is ${this.name} and I am ${this.age} years old.`;
  }
}

// 2. Create a Student class that extends Person
export class Student extends Person {
  constructor(name, age, scores = []) {
    super(name, age);
    this.scores = scores;
  }

  calculateAverageScore() {
    if (!this.scores || this.scores.length === 0) return 0;
    const total = this.scores.reduce((sum, s) => sum + s, 0);
    return (total / this.scores.length).toFixed(2);
  }

  displayFullInfo() {
    return `{ name: "${this.name}", age: ${this.age}, scores: [${this.scores.join(', ')}] }`;
  }
}

// 3. Use Rest Parameter
export const createScores = (...scores) => {
  return scores;
};

// 4. Use Destructuring
export const extractStudentInfo = (studentObj) => {
  const { name, age } = studentObj;
  return { name, age };
};

// 5. Use Spread Operator
export const mergeScores = (existingScores, ...newScores) => {
  return [...existingScores, ...newScores];
};

// 6. Use Array Methods
export const processScores = (scores) => {
  const passingScores = scores.filter((score) => score >= 5);
  const total = scores.reduce((sum, s) => sum + s, 0);
  const average = scores.length > 0 ? (total / scores.length).toFixed(2) : '0.00';
  const mapped = scores.map((score) => ({
    score,
    result: score >= 5 ? 'Pass' : 'Fail'
  }));

  return { passingScores, total, average, mapped };
};

// 7. Use Promise
export const evaluateStudentPerformance = (student) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const avg = parseFloat(student.calculateAverageScore());
      if (avg >= 8) {
        resolve('Excellent Student');
      } else {
        resolve('Need Improvement');
      }
    }, 400);
  });
};

/**
 * ====================================================================
 * React Component UI - Chuẩn xác theo ảnh mẫu
 * ====================================================================
 */
export default function StudentManagement() {
  // 1 & 2. Person & Student instances
  const person = new Person('Nguyen Van A', 20);
  const student1 = new Student('Nguyen Van A', 20, [8, 9, 10]);

  // 3. Rest Parameter: createScores(8, 9, 10)
  const restScores = createScores(8, 9, 10);

  // 4. Destructuring: extract name and age from student
  const studentForDestruct = { name: 'Nguyen Van A', age: 20 };
  const { name, age } = studentForDestruct;

  // 5. Spread Operator: mergeScores(scores, 7, 6) -> [8, 9, 10, 7, 6]
  const mergedScores = mergeScores(restScores, 7, 6);
  const studentWithAllScores = new Student('Nguyen Van A', 20, mergedScores);

  // 6. Array Methods (filter, reduce, map)
  const { passingScores, total, average, mapped } = processScores(mergedScores);

  // 7. Promise
  const [promiseResult, setPromiseResult] = useState('Evaluating...');

  useEffect(() => {
    evaluateStudentPerformance(studentWithAllScores).then((res) => {
      setPromiseResult(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ backgroundColor: '#fcfcfd', minHeight: '100vh', padding: '40px 20px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        
        {/* Header Title Section */}
        <div style={{ marginBottom: '35px' }}>
          <div style={{ color: '#2563eb', fontWeight: '700', fontSize: '12px', letterSpacing: '0.8px', marginBottom: '8px' }}>
            ES6 ASSIGNMENT
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#0f172a', margin: '0 0 10px 0', letterSpacing: '-0.5px' }}>
            Student Management
          </h1>
          <p style={{ color: '#64748b', fontSize: '15px', margin: 0 }}>
            A practical demonstration of modern JavaScript ES6 features.
          </p>
          <div style={{ borderBottom: '1px solid #e2e8f0', marginTop: '25px' }}></div>
        </div>

        {/* 1. Person Class */}
        <div className="card-box" style={cardStyle}>
          <div style={headerStyle}>
            <span style={badgeStyle}>1</span>
            <h3 style={titleStyle}>Person Class</h3>
          </div>
          <p style={descStyle}>
            Person includes <strong>name</strong>, <strong>age</strong> and the <code style={codePillStyle}>introduce()</code> method.
          </p>
          <div style={gridBoxStyle}>
            <div style={colStyle}>
              <div style={labelStyle}>Name</div>
              <div style={valueStyle}>{person.name}</div>
            </div>
            <div style={colStyle}>
              <div style={labelStyle}>Age</div>
              <div style={valueStyle}>{person.age} years old</div>
            </div>
            <div style={{ ...colStyle, borderRight: 'none', flex: 1.5 }}>
              <div style={labelStyle}>introduce() result</div>
              <div style={valueStyle}>{person.introduce()}</div>
            </div>
          </div>
        </div>

        {/* 2. Student extends Person */}
        <div className="card-box" style={cardStyle}>
          <div style={headerStyle}>
            <span style={badgeStyle}>2</span>
            <h3 style={titleStyle}>Student extends Person</h3>
          </div>
          <p style={descStyle}>
            Student inherits Person and adds the <strong>scores</strong> array, average calculation and full information display.
          </p>
          <div style={gridBoxStyle}>
            <div style={colStyle}>
              <div style={labelStyle}>Scores</div>
              <div style={valueStyle}>[{student1.scores.join(', ')}]</div>
            </div>
            <div style={colStyle}>
              <div style={labelStyle}>Average score</div>
              <div style={valueStyle}>{student1.calculateAverageScore()}</div>
            </div>
            <div style={{ ...colStyle, borderRight: 'none', flex: 1.5 }}>
              <div style={labelStyle}>displayFullInfo()</div>
              <div style={valueStyle}>{student1.displayFullInfo()}</div>
            </div>
          </div>
        </div>

        {/* 3. Rest Parameter */}
        <div className="card-box" style={cardStyle}>
          <div style={headerStyle}>
            <span style={badgeStyle}>3</span>
            <h3 style={titleStyle}>Rest Parameter</h3>
          </div>
          <div style={codeBlockStyle}>
            createScores(8, 9, 10)
          </div>
          <p style={descStyle}>
            Accepts multiple score values and returns an array.
          </p>
          <div style={resultBlockStyle}>
            [{restScores.join(', ')}]
          </div>
        </div>

        {/* 4. Destructuring */}
        <div className="card-box" style={cardStyle}>
          <div style={headerStyle}>
            <span style={badgeStyle}>4</span>
            <h3 style={titleStyle}>Destructuring</h3>
          </div>
          <div style={codeBlockStyle}>
            const &#123; name, age &#125; = student
          </div>
          <p style={descStyle}>
            Extracts name and age from the student object.
          </p>
          <div style={resultBlockStyle}>
            &#123; name: "{name}", age: {age} &#125;
          </div>
        </div>

        {/* 5. Spread Operator */}
        <div className="card-box" style={cardStyle}>
          <div style={headerStyle}>
            <span style={badgeStyle}>5</span>
            <h3 style={titleStyle}>Spread Operator</h3>
          </div>
          <div style={codeBlockStyle}>
            mergeScores(scores, 7, 6)
          </div>
          <p style={descStyle}>
            Merges new scores into the existing score list.
          </p>
          <div style={resultBlockStyle}>
            [{mergedScores.join(', ')}]
          </div>
        </div>

        {/* 6. Array Methods */}
        <div className="card-box" style={cardStyle}>
          <div style={headerStyle}>
            <span style={badgeStyle}>6</span>
            <h3 style={titleStyle}>Array Methods</h3>
          </div>
          
          <div style={{ ...gridBoxStyle, marginBottom: '20px' }}>
            <div style={colStyle}>
              <div style={labelStyle}>filter() · Passing scores</div>
              <div style={valueStyle}>{passingScores.join(', ')}</div>
            </div>
            <div style={{ ...colStyle, borderRight: 'none' }}>
              <div style={labelStyle}>reduce() · Total / Average</div>
              <div style={valueStyle}>{total} / {average}</div>
            </div>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                <th style={{ padding: '8px 4px', textAlign: 'left', fontWeight: '700' }}>Score</th>
                <th style={{ padding: '8px 4px', textAlign: 'left', fontWeight: '700', paddingLeft: '200px' }}>map() result</th>
              </tr>
            </thead>
            <tbody>
              {mapped.map((item, index) => (
                <tr key={index} style={{ borderBottom: index === mapped.length - 1 ? 'none' : '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 4px', fontWeight: '600', color: '#1e293b' }}>{item.score}</td>
                  <td style={{ padding: '10px 4px', paddingLeft: '200px' }}>
                    <span style={{
                      backgroundColor: '#dcfce7',
                      color: '#15803d',
                      fontSize: '11px',
                      fontWeight: '700',
                      padding: '2px 10px',
                      borderRadius: '12px'
                    }}>
                      {item.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 7. Promise */}
        <div className="card-box" style={cardStyle}>
          <div style={headerStyle}>
            <span style={badgeStyle}>7</span>
            <h3 style={titleStyle}>Promise</h3>
          </div>
          <div style={codeBlockStyle}>
            evaluateStudentPerformance(student)
          </div>
          <p style={descStyle}>
            Simulates asynchronous academic performance evaluation.
          </p>
          <div style={{
            backgroundColor: '#dcfce7',
            color: '#15803d',
            borderRadius: '6px',
            padding: '12px 16px',
            fontWeight: '700',
            fontSize: '14px'
          }}>
            {promiseResult}
          </div>
        </div>

      </div>
    </div>
  );
}

// Inline Style Objects matching pixel-perfect to image
const cardStyle = {
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  border: '1px solid #e2e8f0',
  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
  padding: '24px',
  marginBottom: '20px'
};

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '14px'
};

const badgeStyle = {
  width: '24px',
  height: '24px',
  backgroundColor: '#eff6ff',
  color: '#2563eb',
  borderRadius: '6px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: '800',
  fontSize: '13px'
};

const titleStyle = {
  margin: 0,
  fontSize: '16px',
  fontWeight: '700',
  color: '#0f172a'
};

const descStyle = {
  fontSize: '13.5px',
  color: '#64748b',
  margin: '0 0 16px 0',
  lineHeight: '1.5'
};

const codePillStyle = {
  backgroundColor: '#f1f5f9',
  padding: '2px 6px',
  borderRadius: '4px',
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  fontSize: '12.5px',
  color: '#1e293b'
};

const gridBoxStyle = {
  display: 'flex',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  overflow: 'hidden'
};

const colStyle = {
  flex: 1,
  padding: '12px 16px',
  borderRight: '1px solid #e2e8f0'
};

const labelStyle = {
  fontSize: '11.5px',
  color: '#64748b',
  marginBottom: '4px'
};

const valueStyle = {
  fontSize: '13.5px',
  fontWeight: '700',
  color: '#0f172a'
};

const codeBlockStyle = {
  backgroundColor: '#f1f5f9',
  borderRadius: '6px',
  padding: '10px 16px',
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  fontSize: '13.5px',
  color: '#1e293b',
  marginBottom: '12px'
};

const resultBlockStyle = {
  backgroundColor: '#eff6ff',
  borderRadius: '6px',
  padding: '10px 16px',
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  fontSize: '13.5px',
  color: '#1e40af',
  fontWeight: '700'
};