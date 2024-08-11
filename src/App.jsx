import './App.css';
import Calendar from './components/Calender';
import Header from './components/Header';

function App() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-white dark:bg-[#030207] text-black dark:text-white">
      {/* <Header /> */}
      <div className="flex-grow ">
        <Calendar/>
      </div>
    </div>
  );
}

export default App;
