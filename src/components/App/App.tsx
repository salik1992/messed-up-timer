import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '../../store'
import './App.scss'

export function App() {
    return (
        <Provider store={store}>
            <BrowserRouter basename="messed-up-timer">
                <Routes>
                    <Route path="/" Component={() => <></>} />
                    <Route path="/timer" Component={() => <></>} />
                    <Route path="/settings" Component={() => <></>} />
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}
