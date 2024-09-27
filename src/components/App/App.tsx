import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '../../store'
import { About } from '../About'
import { Main } from '../Main'
import { Settings } from '../Settings'
import { Timer } from '../Timer'
import './App.scss'

export function App() {
    return (
        <Provider store={store}>
            <BrowserRouter basename="messed-up-timer">
                <Routes>
                    <Route path="/" Component={Main} />
                    <Route path="/timer" Component={Timer} />
                    <Route path="/settings" Component={Settings} />
                    <Route path="/about" Component={About} />
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}
