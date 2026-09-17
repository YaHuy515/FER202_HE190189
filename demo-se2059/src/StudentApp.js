import React, { useEffect, useState } from 'react';
import './App.css';
import {
  Student,
  createScores,
  extractStudentInfo,
  addScores,
  processScores,
  evaluatePerformance
} from './StudentManagement';

function App() {
  const [evaluation, setEvaluation] = useState('Evaluating...');

  // Khởi tạo danh sách điểm bằng Rest Parameter
  const initialScores = createScores(8, 9, 10);

  // Thêm điểm bằng Spread Operator
  const updatedScores = addScores(initialScores, [7, 6]);

  // Khởi tạo đối tượng Student
  const student = new Student("Trần Ngọc Đại", 21, updatedScores);

  // Sử dụng Destructuring
  const { name, age } = extractStudentInfo(student);

  // Sử dụng Array Methods
  const { passingScores, formattedScores, totalScore } = processScores(student.scores);

  // Xử lý Promise
  useEffect(() => {
    evaluatePerformance(student.calculateAverageScore()).then((result) => {
      setEvaluation(result);
    });
  }, [student]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Bài tập JS ES6 - Student Management</h1>
      
      <section>
        <h2>1 & 2. Person & Student Class</h2>
        <p><strong>Thông tin:</strong> {student.displayFullStudentInformation()}</p>
      </section>

      <section>
        <h2>3, 4 & 5. Rest, Destructuring & Spread</h2>
        <p><strong>Destructuring (Tên & Tuổi):</strong> {name} - {age} tuổi</p>
        <p><strong>Danh sách điểm (Spread & Rest):</strong> {updatedScores.join(', ')}</p>
      </section>

      <section>
        <h2>6. Array Methods</h2>
        <p><strong>Điểm đạt (&gt;= 5 - filter):</strong> {passingScores.join(', ')}</p>
        <p><strong>Định dạng điểm (map):</strong> {formattedScores.join(' | ')}</p>
        <p><strong>Tổng điểm (reduce):</strong> {totalScore}</p>
      </section>

      <section>
        <h2>7. Promise Evaluation</h2>
        <p><strong>Đánh giá học tập:</strong> {evaluation}</p>
      </section>
    </div>
  );
}

export default App;