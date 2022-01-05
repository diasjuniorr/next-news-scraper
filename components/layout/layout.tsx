import Header from "../header"
import Footer from "../footer"
import { Breakpoint } from "@mui/material"

export default function Layout({children, maxWidth = "lg"}: {children: React.ReactNode, maxWidth?: Breakpoint}) {
    return  (
        <>
            <Header maxWidth={maxWidth}/>
                {children}
            <Footer />
        </>
    )
}