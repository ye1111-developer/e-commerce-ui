import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const Details = () => {
  const { detailProduct, setDetailProduct } = useState(null);

  const { userId } = useParams();
  useEffect(() => {
    const detailFetch = async () => {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${userId}`,
        );
        const data = await response.json();
        setDetailProduct(data);
      } catch (error) {
        console.log(error);
      }
    };
    detailFetch();
  }, [userId]);

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div
        key={detailProduct.id}
        className="flex sm:flex-row flex-col  justify-center items-center gap-6 w-full bg-red-400 p-6"
      >
        <div className="bg-red-900 p-3 mb-4 max-w-md mx-auto">
          <img className="w-full" src={detailProduct.image} alt="product" />
        </div>
        <div>
          <p className="bg-pink-700 p-2 w-fit rounded-xl text-xs text-red-200 uppercase">
            {detailProduct.category}
          </p>
          <p className=" text-lg font-semibold">{detailProduct.title}</p>

          <span className="">{detailProduct.description}</span>
          <p className=" text-lg font-semibold">
            {detailProduct.price}
            <span className="text-xl font-semibold ml-1">RM</span>
          </p>

          <p>
            ⭐{detailProduct.rating.rate},
            <span className="ml-3 text-gray-700 font-semibold">
              {detailProduct.rating.count} sold
            </span>
          </p>
          <div className="flex gap-2 items-center mt-4 cursor-pointer">
            <button className=" cursor-pointer px-4 py-2 bg-red-800 text-red-200 font-semibold rounded-lg">
              Buy Now
            </button>
            <button className=" cursor-pointer px-4 py-2 bg-red-800 text-red-200 font-semibold rounded-lg">
              Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
