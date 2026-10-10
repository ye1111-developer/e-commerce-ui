import { useEffect, useState } from "react";
import { useContext } from "react";
import { ProductContext } from "../App";
import { Link } from "react-router-dom";
export const Products = () => {
  const [search, setSearch] = useState("");
  const { products, setProducts } = useContext(ProductContext);
  const [loading, setLoading] = useState(true);
  const url = "https://fakestoreapi.com/products";
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);
  const searchproduct = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };
  return (
    <>
      {loading ? (
        <p>Loading.....</p>
      ) : (
        <div>
          <form onSubmit={handleSubmit} className="ml-3 my-5">
            <input
              className="border px-3 "
              placeholder="Search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="submit"
              className="bg-red-400 text-white px-3 py-1 rounded-lg ml-4"
            >
              Search
            </button>
          </form>
          <section className="w-full gap-4 grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 px-1 sm:px-3 ">
            {searchproduct.map((item) => (
              <Link
                to={`/detail/${item.id}`}
                key={item.id}
                className="bg-red-400 p-5 rounded-xl"
              >
                <div className="w-full mb-5 bg-red-900 py-3 rounded-xl overflow-hidden">
                  <img
                    src={item.image}
                    alt="product photo"
                    className="aspect-[4/5] w-30  mx-auto"
                  />
                </div>

                <p className="mb-2">{item.title}</p>
                <p className=" text-lg font-semibold">
                  {item.price}
                  <span className="text-xl font-semibold ml-1">RM</span>
                </p>

                <p>
                  ⭐{item.rating.rate},
                  <span className="ml-3 text-gray-700 font-semibold">
                    {item.rating.count} sold
                  </span>
                </p>
              </Link>
            ))}
          </section>
        </div>
      )}
    </>
  );
};
