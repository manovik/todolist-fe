import TodoList from './components/todo_list/TodoList';
import './main.scss';

const itemsOnPage: number = 10;
const page: number = 1;

function App() {
  return (
    <div className="todos">
      <div className="container">
        <TodoList page={page} itemsOnPage={itemsOnPage} />
      </div>
    </div>
  );
}

export default App;
