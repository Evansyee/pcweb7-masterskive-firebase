import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PostPageHome from './Views/PostPageHome';
import LoginPage from './Views/LoginPage';
import SignUpPage from './Views/SignUpPage';
import PostPageAdd from './Views/PostPageAdd';
import PostPageDetails from './Views/PostPageDetails';
import PostPageUpdate from './Views/PostPageUpdate';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostPageHome />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/add" element={<PostPageAdd />} />
        <Route path="/post/:id" element={<PostPageDetails />} />
        <Route path="/update/:id" element={<PostPageUpdate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
