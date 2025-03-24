import BackgroundGradient from "@/components/common/Backgroundwhite";
import Intro from "./intro";
import NewProduct from "./news";
import Products from "./products";
import Text from "./text";

export default function TrafikaMain() {
    return (
        <section className="trafika__main">
            <BackgroundGradient />
            <Intro />
            <Text />
            <NewProduct />
            <Products />
        </section>
    )
}

