import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  window.localStorage.clear();
});

test('renders main title and initial todos', () => {
  render(<App />);
  expect(screen.getByText('React Hooks Demo')).toBeInTheDocument();
  expect(screen.getByText('🌙 Dark Mode')).toBeInTheDocument();
  expect(screen.getByText('Thêm công việc')).toBeInTheDocument();
  expect(screen.getByText('Chưa hoàn thành: 3')).toBeInTheDocument();
  expect(screen.getByText('Học React')).toBeInTheDocument();
  expect(screen.getByText('Lại Học React')).toBeInTheDocument();
  expect(screen.getByText('Tiếp tục học React')).toBeInTheDocument();
});

test('toggles dark and light mode', () => {
  render(<App />);
  const themeBtn = screen.getByText('🌙 Dark Mode');
  fireEvent.click(themeBtn);
  expect(screen.getByText('☀️ Light Mode')).toBeInTheDocument();
});

test('can add a new task and updates uncompleted count', () => {
  render(<App />);
  const input = screen.getByPlaceholderText('Nhập công việc...');
  const addBtn = screen.getByText('Thêm');

  fireEvent.change(input, { target: { value: 'Làm bài tập Hooks' } });
  fireEvent.click(addBtn);

  expect(screen.getByText('Làm bài tập Hooks')).toBeInTheDocument();
  expect(screen.getByText('Chưa hoàn thành: 4')).toBeInTheDocument();
});

test('can toggle task completion and update count', () => {
  render(<App />);
  const taskText = screen.getByText('Học React');
  fireEvent.click(taskText);

  expect(screen.getByText('Chưa hoàn thành: 2')).toBeInTheDocument();
});

test('can delete a task', () => {
  render(<App />);
  const deleteButtons = screen.getAllByText('Xóa');
  fireEvent.click(deleteButtons[0]);

  expect(screen.queryByText('Học React')).not.toBeInTheDocument();
  expect(screen.getByText('Chưa hoàn thành: 2')).toBeInTheDocument();
});
