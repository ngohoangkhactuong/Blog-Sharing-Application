const Banner = () => {
    const bannerData = {
        imgSrc: "/banner1.png"
    };

    return (
        <div className="relative w-full min-h-[80vh] flex items-center justify-center bg-white text-white shadow-sm">
            <img
                src={bannerData.imgSrc}
                alt="banner"
            />
        </div>
    );
};

export default Banner;
