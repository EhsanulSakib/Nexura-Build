import About from "../../components/about/About";
import Banner from "../../components/banner/Banner"
import HomeCoupons from "../../components/homeCoupons/HomeCoupons";


const Home = () => {
    return (
        <div className="min-h-screen">
            <Banner></Banner>
            <About></About>
            <h2 className="text-center text-2xl lg:text-3xl font-bold">See All Coupons</h2>
            <HomeCoupons></HomeCoupons>
        </div>
    );
};

export default Home;