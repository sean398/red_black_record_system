import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import Router from './router';

const App = () => {
    return (
        <div className="App container-fluid">
            <Router />
        </div>
    );
};

export default App;
