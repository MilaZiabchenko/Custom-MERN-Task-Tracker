import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import { Home, About, TaskDetails, NotFound, ErrorBoundary } from './pages';
import { TasksProvider } from './context/TasksContext';
import './App.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />} errorElement={<ErrorBoundary />}>
      <Route index element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='task/:taskId' element={<TaskDetails />} />
      <Route path='not-found' element={<NotFound />} />
      <Route path='*' element={<NotFound />} />
    </Route>
  )
);

const App = () => (
  <TasksProvider>
    <RouterProvider router={router} />
  </TasksProvider>
);

export default App;
