import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./router/AppRouter"
import { Provider } from "react-redux"
import { store } from "./store/store"
import { getEnvVariables } from "./helpers/getEnvVariables"


export const CalendarApp = () => {

    console.log(process.env.NODE_ENV);
    console.log('getEnvVariables: ',getEnvVariables());
    
    return (
        <Provider store={store}>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </Provider>
    )
}
