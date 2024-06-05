import { Product } from "../types/Products";

export const Phones: Product[] = [
	{
		name: "Iphone 15 Pro",
		category: "Phones",
		image:
			"https://images.unsplash.com/photo-1710023038502-ba80a70a9f53?q=80&w=3164&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		price: 1100.05,
		countInStock: 205,
		brand: "Apple",
		description:
			"The latest iPhone, the iPhone 15 Pro, features a 6.1-inch Super Retina XDR display with a resolution of 2532 x 1170 pixels. It is powered by Apple's A15 Bionic chip with a 6-core CPU, 5-core GPU, and a 16-core Neural Engine. The device comes with various storage options, including 128GB, 256GB, and 512GB. The dual-camera system includes a 12MP wide and a 12MP ultra-wide lens, while the front camera is a 12MP TrueDepth camera. The iPhone 14 supports 5G connectivity, Face ID, and runs on iOS 15. It is water and dust resistant with an IP68 rating and offers improved battery life with up to 20 hours of video playback.",
		reviews: [
			{
				customer: "beethoven",
				caption: "Fantastic performance, extremely fast and responsive.",
				stars: 5,
			},
			{
				customer: "mozart",
				caption: "Great camera quality, especially in low light conditions.",
				stars: 4,
			},
			{
				customer: "bach",
				caption: "Excellent battery life, lasts all day with heavy use.",
				stars: 5,
			},
			{
				customer: "liszt",
				caption: "Smooth and fast, no lag even with multiple apps open.",
				stars: 4,
			},
			{
				customer: "vivaldi",
				caption: "Stylish design, feels premium and looks beautiful.",
				stars: 5,
			},
			{
				customer: "haydn",
				caption: "Very expensive, but the features justify the cost.",
				stars: 3,
			},
			{ customer: "handel", caption: "Good but not great, expected more improvements.", stars: 3 },
			{ customer: "schubert", caption: "Superb display, colors are vibrant and clear.", stars: 5 },
			{
				customer: "brahms",
				caption: "Disappointing battery, doesn't last as long as expected.",
				stars: 2,
			},
			{
				customer: "tchaikovsky",
				caption: "Worth the upgrade, significant improvements over the previous model.",
				stars: 4,
			},
		],
	},
	{
		name: "Iphone 14 Pro",
		category: "Phones",
		image:
			"https://images.unsplash.com/photo-1679027554905-26e911504796?q=80&w=3164&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		price: 910.4,
		countInStock: 205,
		brand: "Apple",
		description:
			"The latest iPhone, the iPhone 14 pro, features a 6.1-inch Super Retina XDR display with a resolution of 2532 x 1170 pixels. It is powered by Apple's A15 Bionic chip with a 6-core CPU, 5-core GPU, and a 16-core Neural Engine. The device comes with various storage options, including 128GB, 256GB, and 512GB. The dual-camera system includes a 12MP wide and a 12MP ultra-wide lens, while the front camera is a 12MP TrueDepth camera. The iPhone 14 supports 5G connectivity, Face ID, and runs on iOS 15. It is water and dust resistant with an IP68 rating and offers improved battery life with up to 20 hours of video playback.",
		reviews: [
			{ customer: "plato", caption: "Incredible camera, captures details beautifully.", stars: 5 },
			{
				customer: "aristotle",
				caption: "Fast performance, handles all tasks effortlessly.",
				stars: 4,
			},
			{
				customer: "socrates",
				caption: "Battery life could be better, needs frequent charging.",
				stars: 3,
			},
			{ customer: "descartes", caption: "Elegant design, feels premium in hand.", stars: 5 },
			{ customer: "kant", caption: "User-friendly interface, very intuitive to use.", stars: 4 },
			{
				customer: "nietzsche",
				caption: "Pricey, but worth it for the advanced features.",
				stars: 4,
			},
			{ customer: "hume", caption: "Impressive display, sharp and vibrant colors.", stars: 5 },
			{ customer: "locke", caption: "Excellent build quality, very durable.", stars: 5 },
			{ customer: "hobbes", caption: "Face ID is super fast and reliable.", stars: 4 },
			{ customer: "rousseau", caption: "Good phone, but not a significant upgrade.", stars: 3 },
		],
	},
	{
		name: "Iphone 13 Pro",
		category: "Phones",
		image:
			"https://images.unsplash.com/photo-1714571889114-a2ef230cb5fc?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		price: 750.7,
		countInStock: 205.0,
		brand: "Apple",
		description:
			"The iPhone 13 Pro features a 6.1-inch Super Retina XDR display with a resolution of 2532 x 1170 pixels. It is powered by Apple's A15 Bionic chip with a 6-core CPU, 5-core GPU, and a 16-core Neural Engine. The device offers various storage options, including 128GB, 256GB, 512GB, and 1TB. The triple-camera system includes a 12MP wide, 12MP ultra-wide, and 12MP telephoto lens, while the front camera is a 12MP TrueDepth camera. The iPhone 13 Pro supports 5G connectivity, Face ID, and runs on iOS 15. It is water and dust resistant with an IP68 rating and offers improved battery life with up to 22 hours of video playback.",
		reviews: [
			{ customer: "socrates", caption: "Amazing performance, smooth and responsive.", stars: 5 },
			{ customer: "plato", caption: "Stunning display, ProMotion is a game-changer.", stars: 5 },
			{ customer: "aristotle", caption: "Great battery life, lasts all day with ease.", stars: 4 },
			{
				customer: "descartes",
				caption: "Fantastic camera, photos are incredibly detailed.",
				stars: 5,
			},
			{ customer: "kant", caption: "A bit pricey, but the features justify it.", stars: 4 },
			{ customer: "nietzsche", caption: "Very sleek design, feels premium and robust.", stars: 5 },
			{ customer: "hume", caption: "Face ID works flawlessly, very convenient.", stars: 5 },
			{ customer: "locke", caption: "User-friendly interface, easy to navigate.", stars: 4 },
			{ customer: "hobbes", caption: "Build quality is top-notch, very durable.", stars: 5 },
			{
				customer: "rousseau",
				caption: "Not a huge upgrade from previous models, but still great.",
				stars: 3,
			},
		],
	},
	{
		name: "Iphone 11 Pro Max",
		category: "Phones",
		image:
			"https://images.unsplash.com/photo-1605636808063-ba999ff935eb?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		price: 550.02,
		countInStock: 205,
		brand: "Apple",
		description:
			"The iPhone 11 Pro Max features a 6.2-inch Super Retina XDR display with a resolution of 2436 x 1125 pixels. It is powered by Apple's A13 Bionic chip with a 6-core CPU, 4-core GPU, and an 8-core Neural Engine. The device offers storage options including 64GB, 256GB, and 512GB. The triple-camera system includes a 12MP wide, 12MP ultra-wide, and 12MP telephoto lens, while the front camera is a 12MP TrueDepth camera. The iPhone 11 Pro supports 4G LTE connectivity, Face ID, and runs on iOS 13, upgradable to later versions. It is water and dust resistant with an IP68 rating and provides up to 18 hours of video playback.",
		reviews: [
			{ customer: "davinci", caption: "Impressive technology, a masterpiece in design.", stars: 5 },
			{
				customer: "michelangelo",
				caption: "Exceptional camera quality, captures art perfectly.",
				stars: 5,
			},
			{
				customer: "rafael",
				caption: "Smooth performance, handles everything seamlessly.",
				stars: 4,
			},
			{
				customer: "donatello",
				caption: "Beautiful display, colors are vibrant and true to life.",
				stars: 5,
			},
			{ customer: "titian", caption: "Battery life is solid, lasts throughout the day.", stars: 4 },
			{ customer: "rembrandt", caption: "Expensive, but the features make it worth it.", stars: 4 },
			{
				customer: "vermeer",
				caption: "Excellent build quality, feels premium and sturdy.",
				stars: 5,
			},
			{ customer: "goya", caption: "Face ID is quick and reliable, enhances security.", stars: 5 },
			{ customer: "elgreco", caption: "User-friendly interface, very easy to use.", stars: 4 },
			{
				customer: "caravaggio",
				caption: "Not a massive leap from previous models, but still excellent.",
				stars: 3,
			},
		],
	},
	{
		name: "Iphone 12 Pro",
		category: "Phones",
		image:
			"https://images.unsplash.com/photo-1601220363009-f7e66d095649?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		price: 650.06,
		countInStock: 205,
		brand: "Apple",
		description:
			"The iPhone 12 Pro features a 6.1-inch Super Retina XDR display with a resolution of 2532 x 1170 pixels. It is powered by Apple's A14 Bionic chip with a 6-core CPU, 4-core GPU, and a 16-core Neural Engine. The device offers storage options including 128GB, 256GB, and 512GB. The triple-camera system includes a 12MP wide, 12MP ultra-wide, and 12MP telephoto lens, while the front camera is a 12MP TrueDepth camera. The iPhone 12 Pro supports 5G connectivity, Face ID, and runs on iOS 14, upgradable to later versions. It is water and dust resistant with an IP68 rating and provides up to 17 hours of video playback.",
		reviews: [
			{
				customer: "einstein",
				caption: "Remarkable performance, feels like a quantum leap in technology.",
				stars: 5,
			},
			{
				customer: "newton",
				caption: "Outstanding camera quality, captures every detail with precision.",
				stars: 5,
			},
			{ customer: "galileo", caption: "Smooth operation, even with heavy multitasking.", stars: 4 },
			{ customer: "curie", caption: "Bright and vibrant display, a pleasure to use.", stars: 5 },
			{
				customer: "tesla",
				caption: "Battery life is impressive, powers through the day.",
				stars: 4,
			},
			{
				customer: "bohr",
				caption: "Price is high, but the advanced features justify it.",
				stars: 4,
			},
			{
				customer: "feynman",
				caption: "Exceptional build quality, feels durable and robust.",
				stars: 5,
			},
			{
				customer: "hawking",
				caption: "Face ID works perfectly, adds an extra layer of convenience.",
				stars: 5,
			},
			{
				customer: "planck",
				caption: "User interface is intuitive and easy to navigate.",
				stars: 4,
			},
			{
				customer: "heisenberg",
				caption: "Great phone, though not a significant upgrade from the last model.",
				stars: 3,
			},
		],
	},

	{
		name: "iPhone X",
		category: "Phones",
		image:
			"https://images.unsplash.com/photo-1510166150654-85d6103a2414?q=80&w=2780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		price: 799.0,
		countInStock: Math.floor(Math.random() * 100) + 200,
		brand: "Apple",
		description:
			"The iPhone X features a stunning 5.8-inch Super Retina display, advanced Face ID for secure authentication, and the powerful A11 Bionic chip for smooth performance. With its dual-camera system and wireless charging capability, it offers a seamless user experience.",
		reviews: [
			{
				customer: "John",
				caption: "Love the edge-to-edge display and the Face ID feature.",
				stars: 5,
			},
			{ customer: "Emily", caption: "Fast and reliable, great camera quality.", stars: 4 },
			{ customer: "Daniel", caption: "Beautiful design and smooth performance.", stars: 5 },
			{
				customer: "Sophie",
				caption: "Battery life could be better, but overall satisfied.",
				stars: 4,
			},
			{
				customer: "Adam",
				caption: "Impressed by the build quality and the camera features.",
				stars: 5,
			},
		],
	},
	{
		name: "iPhone 8",
		category: "Phones",
		image:
			"https://images.unsplash.com/photo-1505156868547-9b49f4df4e04?q=80&w=2263&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		price: 599.0,
		countInStock: Math.floor(Math.random() * 100) + 200,
		brand: "Apple",
		description:
			"The iPhone 8 features a 4.7-inch Retina HD display, A11 Bionic chip, and advanced camera system for stunning photos and videos. With wireless charging capability and water and dust resistance, it's designed to withstand everyday use.",
		reviews: [
			{
				customer: "Michael",
				caption: "Great value for the price, reliable performance.",
				stars: 4,
			},
			{ customer: "Emma", caption: "Love the compact size and the camera quality.", stars: 5 },
			{
				customer: "Oliver",
				caption: "Battery life could be better, but overall satisfied.",
				stars: 4,
			},
			{
				customer: "Ava",
				caption: "Fast and responsive, no lag even with multiple apps open.",
				stars: 5,
			},
			{
				customer: "William",
				caption: "Impressed by the build quality and the durability.",
				stars: 5,
			},
		],
	},
	{
		name: "iPhone 11 Pro",
		category: "Phones",
		image:
			"https://images.unsplash.com/photo-1571380401583-72ca84994796?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		price: 999.0,
		countInStock: Math.floor(Math.random() * 100) + 200,
		brand: "Apple",
		description:
			"The iPhone 11 Pro features a 5.8-inch Super Retina XDR display, triple-camera system, and A13 Bionic chip for unparalleled performance. With its all-day battery life and water and dust resistance, it's the ultimate iPhone for power users.",
		reviews: [
			{
				customer: "Sophia",
				caption: "Love the camera quality and the Night mode feature.",
				stars: 5,
			},
			{ customer: "James", caption: "Fast and reliable, no issues with performance.", stars: 5 },
			{
				customer: "Isabella",
				caption: "Great display and battery life, highly recommend.",
				stars: 5,
			},
			{ customer: "Mia", caption: "Impressed by the build quality and the design.", stars: 5 },
			{
				customer: "Lucas",
				caption: "The Face ID feature works flawlessly, very convenient.",
				stars: 5,
			},
		],
	},
];
