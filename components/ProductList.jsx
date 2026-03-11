import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

function ProductsList() {
    // 1. MASTER LIST: Holds all data from API
    let [products, setProducts] = useState([])
    // 2. DISPLAY LIST: This is what we actually show on the screen
    let [filteredProducts, setFilteredProducts] = useState([])
    
    let [loading, setLoading] = useState(false)
    let [error, setError] = useState(null)
    
    // 3. INPUT STATE: Just holds the text, doesn't filter yet
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate()

    const gotoProduct = (productObj) => {
        navigate('/product', { state: { product: productObj } })
    }

    useEffect(() => {
        async function getProducts() {
            setLoading(true)
            try {
                let res = await fetch("https://fakestoreapi.com/products")
                if (res.status === 200) {
                    let productsData = await res.json()
                    // IMPORTANT: When data loads, both lists are the same
                    setProducts(productsData)
                    setFilteredProducts(productsData) 
                }
                else {
                    throw new Error("Error occured")
                }
            } catch (error) {
                setError(error)
            }
            finally {
                setLoading(false)
            }
        }
        getProducts();
    }, [])

    // 4. BUTTON LOGIC: This only runs when you click "Search"
    const handleSearch = () => {
        // Filter the MASTER list (products), not the display list
        const results = products.filter((product) => 
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
        // Update the DISPLAY list
        setFilteredProducts(results)
    }

    if (loading === true) {
        return <p className='text-center text-2xl'>Loading....</p>
    }
    if (error !== null) {
        return <p className='text-center text-2xl text-red-500'>{error.message}</p>
    }

    return (
        <div>
            {/* Search Section */}
            <div className="text-center mt-6 flex justify-center gap-4">
                <input 
                    type="text" 
                    placeholder="Search category (e.g., men)..." 
                    className="border p-2 rounded w-1/3 border-gray-400"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {/* 5. THE BUTTON */}
                <button 
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 mt-10 text-center'>
                {
                    // 6. DISPLAY: We map over 'filteredProducts'
                    filteredProducts.length > 0 ? (
                        filteredProducts.map((productObj) => (
                            <div onClick={() => gotoProduct(productObj)} key={productObj.id} className='shadow p-10 rounded-2xl cursor-pointer'>
                                <img src={productObj.image} className='h-44 object-contain block mx-auto mb-10' alt={productObj.title}/>
                                <p className="font-bold line-clamp-1">{productObj.title}</p>
                                <p className="text-gray-500 text-sm mt-2">{productObj.category}</p>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-4 text-2xl text-red-500 mt-10">No products found for that category.</p>
                    )
                }
            </div>
        </div>
    )
}

export default ProductsList