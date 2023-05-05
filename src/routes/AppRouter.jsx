import { Route, Routes } from "react-router-dom"
import { HomePage, ArticlePage, UserPage } from "../pages"



export const AppRouter = () => {
    return(
        
        <Routes>
            {/* HomePage */}
            <Route path="/*" element={ < HomePage /> }/>

            {/* ArticlePage */}
            <Route path="/articles" element={ <ArticlePage /> } />


            {/* UserPage */}
            <Route path="/users" element={ <UserPage /> }/>
            
        </Routes>


    )
}
