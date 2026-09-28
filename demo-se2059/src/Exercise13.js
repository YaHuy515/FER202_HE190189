import React, { useState, useEffect } from 'react';

const FALLBACK_POSTS = {
  1: [
    { id: 1, title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit", body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto" },
    { id: 2, title: "qui est esse", body: "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis" }
  ],
  2: [
    { id: 11, title: "et ea vero quia laudantium autem", body: "delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus accusamus in eum beatae sit vel qui neque voluptates ut commodi qui incidunt" },
    { id: 12, title: "in quo qui reprehenderit doloremque", body: "itaque id aut magnam praesentium quia et ea odit et ea voluptas et sapiente quia nihil amet occaecati quia id voluptatem" }
  ],
  3: [
    { id: 21, title: "asperiores ea ipsam voluptatibus modi minima quia sint", body: "repellat aliquid praesentium dolorem quo sed totam minus non quo nihil blanditiis illum tempora iste voluptatem" }
  ]
};

// 1. UserPosts Component
function UserPosts({ userId }) {
  const [posts, setPosts] = useState(FALLBACK_POSTS[userId] || FALLBACK_POSTS[1]);
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState('Local Cache');

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        if (!response.ok) throw new Error('Network error');
        const data = await response.json();
        if (isMounted) {
          setPosts(data.slice(0, 3));
          setSource('JSONPlaceholder API (Real-time)');
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setPosts(FALLBACK_POSTS[userId] || FALLBACK_POSTS[1]);
          setSource('Offline Fallback Data');
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="small text-white">Danh sách bài viết của <strong>User ID = {userId}</strong>:</span>
        <span className="badge bg-secondary font-monospace" style={{ fontSize: '11px' }}>Nguồn: {source}</span>
      </div>

      {loading ? (
        <div className="text-center py-3 text-info small">Đang tải bài viết...</div>
      ) : (
        <div style={{ maxHeight: '260px', overflowY: 'auto' }}>
          {posts.map((post) => (
            <div key={post.id} style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '4px', padding: '10px 14px', marginBottom: '8px' }}>
              <h6 style={{ color: '#61dafb', marginBottom: '4px' }}>#{post.id}: {post.title}</h6>
              <p style={{ color: '#cbd5e1', fontSize: '13px', marginBottom: 0 }}>{post.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 2. CountdownTimer Component
function CountdownTimer({ initialValue = 10 }) {
  const [timeRemaining, setTimeRemaining] = useState(initialValue);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning || timeRemaining <= 0) {
      return;
    }

    const timerId = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [timeRemaining, isRunning]);

  return (
    <div className="text-center py-2">
      <div className="mb-2">
        {timeRemaining > 0 ? (
          <span className="badge bg-warning text-dark">ĐANG ĐẾM NGƯỢC</span>
        ) : (
          <span className="badge bg-danger">ĐÃ DỪNG TẠI 0</span>
        )}
      </div>

      <div style={{ fontSize: '1.75rem', fontWeight: 500, margin: '10px 0' }}>
        Time Remaining: <span className="fw-bold" style={{ color: timeRemaining > 0 ? '#ffc107' : '#ff6b6b' }}>{timeRemaining}</span>
      </div>

      <div className="d-flex justify-content-center gap-2 mt-3">
        {timeRemaining > 0 && (
          <button 
            className="btn btn-sm btn-outline-light"
            onClick={() => setIsRunning(prev => !prev)}
          >
            {isRunning ? 'Tạm dừng (Pause)' : 'Tiếp tục (Resume)'}
          </button>
        )}
        <button 
          className="btn btn-sm btn-light"
          onClick={() => {
            setTimeRemaining(initialValue);
            setIsRunning(true);
          }}
        >
          Reset ({initialValue}s)
        </button>
        <button 
          className="btn btn-sm btn-light"
          onClick={() => {
            setTimeRemaining(30);
            setIsRunning(true);
          }}
        >
          Đặt 30s
        </button>
      </div>
    </div>
  );
}

// 3. WindowSize Component
function WindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="text-center py-2">
      <p className="text-secondary small mb-2">Thử kéo co giãn kích thước cửa sổ trình duyệt:</p>
      <div style={{ fontSize: '1.45rem', fontWeight: 500 }}>
        Window size: <span className="text-info fw-bold">{windowSize.width}</span> px &times; <span className="text-info fw-bold">{windowSize.height}</span> px
      </div>
    </div>
  );
}

// 4. ValidatedInput Component
function ValidatedInput({ validationFunction, errorMessage }) {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setIsValid(validationFunction(value));
  }, [value, validationFunction]);

  return (
    <div className="d-flex flex-column align-items-center py-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="form-control text-center"
        style={{
          maxWidth: '280px',
          backgroundColor: isValid ? '#fff' : '#fff5f5',
          borderColor: isValid ? '#cbd5e1' : '#dc3545'
        }}
        placeholder="Nhập tối thiểu 5 ký tự..."
      />
      {!isValid && (
        <p className="text-danger small mt-2 mb-0 fw-bold">
          ⚠️ {errorMessage}
        </p>
      )}
      {isValid && value.length >= 5 && (
        <p className="text-success small mt-2 mb-0">
          ✓ Dữ liệu hợp lệ ({value.length} ký tự)
        </p>
      )}
    </div>
  );
}

export default function Exercise13() {
  const [selectedUserId, setSelectedUserId] = useState(1);

  const validateMinLength = (val) => {
    if (val.length === 0) return true;
    return val.length >= 5;
  };

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '30px 20px 80px', color: '#1a1a1a', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div className="card shadow-sm border-0 p-4 mb-4">
        <h1 style={{ fontSize: '1.85rem', fontWeight: 700, marginBottom: '6px' }}>Exercise 13: React Hook (useEffect)</h1>
        <hr style={{ borderTop: '2px solid #0f172a', margin: '10px 0 16px' }} />
        <h2 style={{ fontSize: '1.15rem', fontStyle: 'italic', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>Objectives and Outcomes</h2>
        <p style={{ color: '#475569', fontSize: '0.95rem', marginBottom: 0 }}>
          <code>useEffect</code> is a React hook that allows you to perform side effects in functional components. By using the <code>useEffect</code> hook, you can handle side effects in a declarative way within functional components.
        </p>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px' }}>Exercises</h3>

      {/* Bài 1 */}
      <div className="card shadow-sm border-0 p-4 mb-4">
        <h4 className="fw-bold mb-2">1. Data Fetching</h4>
        <p className="text-secondary small">Fetch posts từ JSONPlaceholder API và refetch khi đổi <code>userId</code>.</p>
        
        <div style={{ backgroundColor: '#1e1e1e', color: '#d4d4d4', borderRadius: '6px', padding: '12px 16px', fontFamily: 'monospace', fontSize: '13px', marginBottom: '14px' }}>
          <div><span style={{ color: '#6a9955' }}>// useEffect fetch posts khi mount và khi userId thay đổi:</span></div>
          <div><span style={{ color: '#569cd6' }}>useEffect</span>(() =&gt; &#123;</div>
          <div>&nbsp;&nbsp;<span style={{ color: '#569cd6' }}>const</span> fetchData = <span style={{ color: '#569cd6' }}>async</span> () =&gt; &#123;</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#569cd6' }}>const</span> res = <span style={{ color: '#569cd6' }}>await</span> fetch(<span style={{ color: '#ce9178' }}>`https://jsonplaceholder.typicode.com/posts?userId=$&#123;userId&#125;`</span>);</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#569cd6' }}>const</span> data = <span style={{ color: '#569cd6' }}>await</span> res.json();</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;setPosts(data);</div>
          <div>&nbsp;&nbsp;&#125;;</div>
          <div>&nbsp;&nbsp;fetchData();</div>
          <div>&#125;, [userId]);</div>
        </div>

        <div style={{ backgroundColor: '#282c34', color: '#fff', borderRadius: '6px', padding: '18px' }}>
          <div className="d-flex align-items-center gap-2 mb-3 pb-2 border-bottom border-secondary">
            <span className="small text-white">Chuyển User ID (kích hoạt refetch):</span>
            {[1, 2, 3].map((id) => (
              <button
                key={id}
                className={selectedUserId === id ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-light'}
                onClick={() => setSelectedUserId(id)}
              >
                User {id}
              </button>
            ))}
          </div>
          <UserPosts userId={selectedUserId} />
        </div>
      </div>

      {/* Bài 2 */}
      <div className="card shadow-sm border-0 p-4 mb-4">
        <h4 className="fw-bold mb-2">2. Countdown Timer</h4>
        <p className="text-secondary small">Đếm ngược mỗi giây bằng <code>setInterval</code> trong <code>useEffect</code>, dừng ở 0 và cleanup.</p>

        <div style={{ backgroundColor: '#1e1e1e', color: '#d4d4d4', borderRadius: '6px', padding: '12px 16px', fontFamily: 'monospace', fontSize: '13px', marginBottom: '14px' }}>
          <div><span style={{ color: '#6a9955' }}>// useEffect đếm ngược mỗi giây và cleanup:</span></div>
          <div><span style={{ color: '#569cd6' }}>useEffect</span>(() =&gt; &#123;</div>
          <div>&nbsp;&nbsp;<span style={{ color: '#569cd6' }}>if</span> (timeRemaining &lt;= 0) <span style={{ color: '#569cd6' }}>return</span>;</div>
          <div>&nbsp;&nbsp;<span style={{ color: '#569cd6' }}>const</span> timerId = setInterval(() =&gt; &#123;</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;setTimeRemaining((prev) =&gt; prev - 1);</div>
          <div>&nbsp;&nbsp;&#125;, 1000);</div>
          <div>&nbsp;&nbsp;<span style={{ color: '#569cd6' }}>return</span> () =&gt; clearInterval(timerId);</div>
          <div>&#125;, [timeRemaining]);</div>
        </div>

        <div style={{ backgroundColor: '#282c34', color: '#fff', borderRadius: '6px', padding: '18px' }}>
          <CountdownTimer initialValue={10} />
        </div>
      </div>

      {/* Bài 3 */}
      <div className="card shadow-sm border-0 p-4 mb-4">
        <h4 className="fw-bold mb-2">3. Window Resize Listener</h4>
        <p className="text-secondary small">Lắng nghe sự kiện resize cửa sổ và cleanup khi unmount.</p>
        <div style={{ backgroundColor: '#282c34', color: '#fff', borderRadius: '6px', padding: '18px' }}>
          <WindowSize />
        </div>
      </div>

      {/* Bài 4 */}
      <div className="card shadow-sm border-0 p-4 mb-4">
        <h4 className="fw-bold mb-2">4. Form Input Validation</h4>
        <p className="text-secondary small">Validate dữ liệu đầu vào qua <code>useEffect</code> mỗi khi <code>value</code> thay đổi.</p>
        <div style={{ backgroundColor: '#282c34', color: '#fff', borderRadius: '6px', padding: '18px' }}>
          <ValidatedInput validationFunction={validateMinLength} errorMessage="Độ dài chưa đủ! Cần ít nhất 5 ký tự." />
        </div>
      </div>

      <div className="card shadow-sm border-0 p-4 text-center">
        <h5 className="fw-bold mb-2">Conclusion</h5>
        <p className="text-secondary small mb-0">After learning about the useEffect hook in React, you should now have a good understanding of how to handle side effects in functional components.</p>
      </div>
    </div>
  );
}
