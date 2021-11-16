import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer'
const Layout = ({children : WrappedComponent}) => {
    return (
        <>
        <Navbar/>
        {WrappedComponent}
        <Footer/>
        </>
    )
};

export default Layout;