const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            shops: [
                {
                    id: 1,
                    name: "Vintage Vogue",
                    description: "Descubre tesoros de moda vintage en cada caja.",
                    rating: 4.7,
                    image: "/api/placeholder/300/200",
                    totalSales: 1254,
                    activeBoxes: 5
                },
                {
                    id: 2,
                    name: "Tech Treasures",
                    description: "Gadgets y accesorios tecnológicos sorpresa.",
                    rating: 4.5,
                    image: "/api/placeholder/300/200",
                    totalSales: 987,
                    activeBoxes: 3
                },
                {
                    id: 3,
                    name: "Gourmet Delights",
                    description: "Explora sabores gourmet de todo el mundo.",
                    rating: 4.8,
                    image: "/api/placeholder/300/200",
                    totalSales: 1532,
                    activeBoxes: 4
                },
                {
                    id: 4,
                    name: "Fitness Fanatic",
                    description: "Equipo y accesorios sorpresa para entusiastas del fitness.",
                    rating: 4.6,
                    image: "/api/placeholder/300/200",
                    totalSales: 756,
                    activeBoxes: 2
                },
                {
                    id: 5,
                    name: "Book Worm's Paradise",
                    description: "Libros de diversos géneros para lectores ávidos.",
                    rating: 4.9,
                    image: "/api/placeholder/300/200",
                    totalSales: 2103,
                    activeBoxes: 6
                }
            ],
            mysteryBoxes: [
                {
                    id: 101,
                    storeId: 1,
                    name: "Retro Glam Box",
                    description: "Una selección de accesorios y ropa vintage de los años 50 y 60.",
                    price: 49.99,
                    size: "Medium",
                    possibleItems: ["Vestido vintage", "Gafas de sol retro", "Broche antiguo", "Pañuelo de seda"],
                    image: "/api/placeholder/300/300"
                },
                {
                    id: 102,
                    storeId: 2,
                    name: "Gadget Surprise",
                    description: "Accesorios tech innovadores y útiles para tu día a día.",
                    price: 79.99,
                    size: "Small",
                    possibleItems: ["Auriculares inalámbricos", "Powerbank", "Soporte para smartphone", "Cable multiusos"],
                    image: "/api/placeholder/300/300"
                },
                {
                    id: 103,
                    storeId: 3,
                    name: "World Flavors Box",
                    description: "Descubre sabores exóticos de diferentes partes del mundo.",
                    price: 59.99,
                    size: "Large",
                    possibleItems: ["Salsa picante artesanal", "Mezcla de especias exóticas", "Snacks internacionales", "Té gourmet"],
                    image: "/api/placeholder/300/300"
                },
                {
                    id: 104,
                    storeId: 4,
                    name: "Workout Wonder",
                    description: "Equipamiento sorpresa para potenciar tus entrenamientos.",
                    price: 69.99,
                    size: "Medium",
                    possibleItems: ["Bandas de resistencia", "Botella de agua inteligente", "Toalla de microfibra", "Suplementos deportivos"],
                    image: "/api/placeholder/300/300"
                },
                {
                    id: 105,
                    storeId: 5,
                    name: "Literary Adventure",
                    description: "Una selección cuidadosa de libros de diversos géneros.",
                    price: 39.99,
                    size: "Large",
                    possibleItems: ["Novela bestseller", "Libro de poesía", "Cómic o novela gráfica", "Marcapáginas artesanal"],
                    image: "/api/placeholder/300/300"
                }
            ]
        },
        actions: {
            getMessage: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
                    const data = await resp.json();
                    setStore({ message: data.message });
                    return data;
                } catch (error) {
                    console.error("Error loading message from backend", error);
                }
            },
            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });
                setStore({ demo: demo });
            }
        }
    };
};

export default getState;