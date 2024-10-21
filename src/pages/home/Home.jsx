import About from "../../components/about/About";
import Banner from "../../components/banner/Banner"
import HomeCoupons from "../../components/homeCoupons/HomeCoupons";
import Map from "../../components/map/Map";

const Home = () => {
    return (
        <div className="min-h-screen">
            <Banner />
            <About />
            {/* <h2 className="text-center text-2xl lg:text-3xl font-bold">See All Coupons</h2>
            <HomeCoupons /> */}
            <Map />
        </div>
    );
};

export default Home;