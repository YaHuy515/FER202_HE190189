import React from 'react';
import logo from './logo.svg';

function Exsercise4() {
  // Dữ liệu cho phần "Using ES6 and JSX"
  const people = [
    { name: 'Jack', age: 50 },
    { name: 'Michael', age: 9 },
    { name: 'John', age: 40 },
    { name: 'Ann', age: 19 },
    { name: 'Elisabeth', age: 16 }
  ];

  const courses = ['React', 'ReactNative', 'NodeJs'];

  // Xử lý các yêu cầu ES6
  // 1. Tìm người đầu tiên là teenager (10 <= age <= 20)
  const firstTeenager = people.find(p => p.age >= 10 && p.age <= 20);

  // 2. Tìm tất cả người là teenager
  const allTeenagers = people.filter(p => p.age >= 10 && p.age <= 20);

  // 3. Kiểm tra xem TẤT CẢ có phải teenager không
  const isEveryTeenager = people.every(p => p.age >= 10 && p.age <= 20);

  // 4. Kiểm tra xem CÓ ÍT NHẤT MỘT NGƯỜI là teenager không
  const isAnyTeenager = people.some(p => p.age >= 10 && p.age <= 20);
  return (
    <div style={{padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto'}}>
        <h1 style={{textAlign: 'center'}}>Exercise 4: HSX and ES6</h1>
        {/* Bai 1 */}
        <section>
        <h3>1. Design this wevsite as image below</h3>
        <hr style={{width: '100%', margin: '20px auto', borderColor: '#ccc'}}/>
        <div style={{textAlign: 'center'}}>
            <h2 style={{fontSize: '3rem', fontWeight: 'normal'}}>
              Hello <span style={{color: 'blue', fontWeight: 'bold'}}>React</span>
            </h2>
        </div>
        </section>

        {/* Bai 2 */}
        <section>
          <h3>2. Design this wevsite as image below</h3>
          <hr style={{width: '100%', margin: '20px auto', borderColor: '#ccc'}}/>
          <div style={{textAlign: 'center'}}>
              <img src={logo} alt="React logo" style={{width: '180px', height: '180px'}}/>
              <div style={{borderTop: '2px solid #008b8b', width: '220px', margin: '0 auto 5px auto'}}></div>
              <p style={{fontStyle: 'italic', color: '#2b7a78', fontWeight: 'bold'}}>
                  This is the React logo!
              </p>
              <p style={{fontStyle: 'italic', color: 'gray', fontWeight: 'normal', margin: '2px 0'}}>
                  (I dont know why it is here either)
              </p>
              <p>
                The library for wed and native used interfaces
              </p>
          </div>
        </section>

        {/* Bai 3 */}
        <section style={{margin: '30px 0'}}>
        <h3>3. Create a navbar as image below with JSX</h3>
        <hr style={{width: '100%', margin: '20px auto', borderColor: '#ccc'}}/>
        <nav style={{backgroundColor: '#555', padding: '10px', gap: '10px', display: 'flex'}}>
          <a href='#Home' style={{backgroundColor: 'green', color: 'white', padding: '8px 16px', textDecoration: 'none', borderRadius: '3px'}}>Home</a>
          <a href='#search' style={{color: 'white', padding: '8px 16px', textDecoration: 'none'}}>Search</a>
          <a href='#contact' style={{color: 'white', padding: '8px 12px', textDecoration: 'none'}}>Contact</a>
          <a href='login' style={{backgroundColor: 'black', color: 'white', padding: '8px 16px', textDecoration: 'none', borderRadius: '3px'}}>Login</a>
        </nav>
        <hr style={{width: '100%', margin: '20px auto', borderColor: '#ccc'}}/>
        </section>

        {/* Bai 4 */}
        <section style={{margin: '30px 0'}}>
          <h3>4. Display this text</h3>
          <hr style={{width: '100%', margin: '20px auto', borderColor: '#ccc'}}/>
          <h2 style={{fontSize: '2.5rem', fontWeight: 'bold', color: 'blue'}}>This is JSX</h2>
          <hr style={{width: '100%', margin: '20px auto', borderColor: '#ccc'}}/>
        </section>

        {/* Bai 5 */}
        <section>
          <h3>5. Display list of course</h3>
          <hr style={{width: '100%', margin: '20px auto', borderColor: '#ccc'}}/>
          <h2 style={{fontSize: '2.5rem'}}>Course names</h2>
          <ul style={{fontSize: '1.5rem', lineHeight: '1.8'}}>
            {courses.map((course, index) => (
              <li key={index}>{course}</li>
            ))}
          </ul>
        </section>
    </div>
  );

  // return (
  //   <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
  //     <h1 style={{ textAlign: 'center' }}>Exercise 4: JSX and ES6</h1>

  //     {/* 1. Design Hello React */}
  //     <section style={{ margin: '30px 0' }}>
  //       <h3>1. Design this website as image below</h3>
  //       <div style={{ textAlign: 'center' }}>
  //         <h2 style={{ fontSize: '3rem', fontWeight: 'normal' }}>
  //           Hello <span style={{ color: 'blue', fontWeight: 'bold' }}>React</span>
  //         </h2>
  //       </div>
  //     </section>

  //     <hr />

  //     {/* 2. React Logo */}
  //     <section style={{ margin: '30px 0' }}>
  //       <h3>2. Design this website as image below</h3>
  //       <div style={{ textAlign: 'center' }}>
  //         <img src={logo} alt="React logo" style={{ width: '180px', height: '180px' }} />
  //         <div style={{ borderTop: '2px solid #008b8b', width: '220px', margin: '0 auto 5px auto' }}></div>
  //         <p style={{ fontStyle: 'italic', color: '#2b7a78', margin: 0, fontWeight: 'bold' }}>
  //           This is the React logo!
  //         </p>
  //         <p style={{ fontStyle: 'italic', fontSize: '12px', color: '#888', margin: '2px 0' }}>
  //           (I don't know why it is here either)
  //         </p>
  //       </div>
  //     </section>

  //     <hr />

  //     {/* 3. Navbar */}
  //     <section style={{ margin: '30px 0' }}>
  //       <h3>3. Create a navbar as image below with JSX</h3>
  //       <nav style={{ backgroundColor: '#555', padding: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}>
  //         <a href="#home" style={{ backgroundColor: '#28a745', color: 'white', padding: '8px 16px', textDecoration: 'none', borderRadius: '3px' }}>Home</a>
  //         <a href="#search" style={{ color: 'white', textDecoration: 'none', padding: '8px 12px' }}>Search</a>
  //         <a href="#contact" style={{ color: 'white', textDecoration: 'none', padding: '8px 12px' }}>Contact</a>
  //         <a href="#login" style={{ backgroundColor: 'black', color: 'white', padding: '8px 16px', textDecoration: 'none', borderRadius: '3px' }}>Login</a>
  //       </nav>
  //     </section>

  //     <hr />

  //     {/* 4. Display text "This is JSX" */}
  //     <section style={{ margin: '30px 0' }}>
  //       <h3>4. Display this text</h3>
  //       <h2 style={{ color: 'blue', fontSize: '2.5rem', fontWeight: 'bold' }}>
  //         This is JSX
  //       </h2>
  //     </section>

  //     <hr />

  //     {/* 5. Display list of course */}
  //     <section style={{ margin: '30px 0' }}>
  //       <h3>5. Display list of course</h3>
  //       <h2 style={{ fontSize: '2rem' }}>Course names</h2>
  //       <ul style={{ fontSize: '1.5rem', lineHeight: '1.8' }}>
  //         {courses.map((course, index) => (
  //           <li key={index}>{course}</li>
  //         ))}
  //       </ul>
  //     </section>

  //     <hr style={{ border: '2px solid #333', margin: '40px 0' }} />

  //     {/* Section: Using ES6 and JSX */}
  //     <h2>Using ES6 and JSX</h2>
  //     <h3>1. Do all requires that based on the variable as below</h3>
      
  //     <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
  //       <p><strong>First teenager (age 10-20):</strong> {firstTeenager ? `${firstTeenager.name} (${firstTeenager.age})` : 'None'}</p>
  //       <p><strong>All teenagers:</strong> {allTeenagers.map(p => `${p.name} (${p.age})`).join(', ')}</p>
  //       <p><strong>Is EVERY person a teenager?</strong> {isEveryTeenager ? 'true' : 'false'}</p>
  //       <p><strong>Is ANY person a teenager?</strong> {isAnyTeenager ? 'true' : 'false'}</p>
  //     </div>
  //   </div>
  // );
}

export default Exsercise4;