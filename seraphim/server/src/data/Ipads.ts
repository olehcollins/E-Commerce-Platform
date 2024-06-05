import { Product } from "../types/Products";

export const Ipads: Product[] = [
	{
		name: "iPad Pro 12.9-inch (2021)",
		category: "Tablets",
		image:
			"https://images.unsplash.com/photo-1561154464-82e9adf32764?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		price: 1099.0,
		countInStock: Math.floor(Math.random() * 100) + 200,
		brand: "Apple",
		description:
			"The iPad Pro 12.9-inch (2021) features a stunning Liquid Retina XDR display, powered by the M1 chip for unmatched performance. With up to 2TB of storage, Thunderbolt 4 support, and 5G connectivity, it's the ultimate tool for creativity and productivity.",
		reviews: [
			{
				customer: "Picasso",
				caption: "Impressive display, perfect for digital art creation.",
				stars: 5,
			},
			{ customer: "Monet", caption: "Fast and powerful, great for multitasking.", stars: 4 },
			{
				customer: "Van Gogh",
				caption: "Love the Magic Keyboard, makes typing a breeze.",
				stars: 5,
			},
			{ customer: "Da Vinci", caption: "Excellent battery life, lasts all day.", stars: 4 },
			{ customer: "Michelangelo", caption: "Sleek design, feels premium and durable.", stars: 5 },
		],
	},
	{
		name: "iPad Air 4th Generation (2020)",
		category: "Tablets",
		image:
			"https://images.unsplash.com/photo-1585770536735-27993a080586?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		price: 599.0,
		countInStock: Math.floor(Math.random() * 100) + 200,
		brand: "Apple",
		description:
			"The iPad Air 4th Generation (2020) boasts a 10.9-inch Liquid Retina display, powered by the A14 Bionic chip for exceptional performance. With support for Apple Pencil 2 and Magic Keyboard, it offers versatility and creativity on the go.",
		reviews: [
			{
				customer: "Shakespeare",
				caption: "Love the sleek design, feels elegant and modern.",
				stars: 5,
			},
			{
				customer: "Jane Austen",
				caption: "Great for reading, display is crisp and clear.",
				stars: 4,
			},
			{
				customer: "Charles Dickens",
				caption: "Fast and responsive, handles apps and games smoothly.",
				stars: 5,
			},
			{ customer: "Mark Twain", caption: "Battery life is impressive, lasts for days.", stars: 4 },
			{
				customer: "Ernest Hemingway",
				caption: "Lightweight and portable, perfect for travel.",
				stars: 5,
			},
		],
	},
	{
		name: "iPad Pro 11-inch (2018)",
		category: "Tablets",
		image:
			"https://images.unsplash.com/photo-1544244015-9c72fd9c866d?q=80&w=3082&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		price: 799.0,
		countInStock: Math.floor(Math.random() * 100) + 200,
		brand: "Apple",
		description:
			"The iPad Pro 11-inch (2018) delivers powerful performance and versatility for everyday tasks. With its stunning display and support for Apple Pencil and Smart Keyboard, it's perfect for work and creativity on the go.",
		reviews: [
			{ customer: "Newton", caption: "Fast and responsive, perfect for multitasking.", stars: 5 },
			{
				customer: "Einstein",
				caption: "Love the display, colors are vibrant and clear.",
				stars: 4,
			},
			{ customer: "Hawking", caption: "Battery life is excellent, lasts all day.", stars: 5 },
			{ customer: "Curie", caption: "Lightweight and portable, easy to carry around.", stars: 4 },
			{ customer: "Tesla", caption: "Great for entertainment, display is immersive.", stars: 5 },
		],
	},
	{
		name: "iPad 9th Generation (2021)",
		category: "Tablets",
		image:
			"https://images.unsplash.com/photo-1637152736123-8a027366b07a?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		price: 329.0,
		countInStock: Math.floor(Math.random() * 100) + 200,
		brand: "Apple",
		description:
			"The iPad 9th Generation (2021) is the perfect combination of performance and affordability. With its 10.2-inch Retina display and powerful A13 Bionic chip, it's great for everyday use, whether for work, school, or entertainment.",
		reviews: [
			{ customer: "Edison", caption: "Great value for the price, highly recommend.", stars: 5 },
			{ customer: "Ford", caption: "Simple and easy to use, perfect for beginners.", stars: 4 },
			{ customer: "Wright", caption: "Love the battery life, lasts all day.", stars: 5 },
			{ customer: "Bell", caption: "Fast and responsive, no lag during use.", stars: 4 },
			{ customer: "Gates", caption: "Great for productivity, multitasking is a breeze.", stars: 5 },
		],
	},
	{
		name: "iPad mini 6th Generation (2021)",
		category: "Tablets",
		image:
			"https://images.unsplash.com/photo-1569697150535-94fb89f890be?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		price: 499.0,
		countInStock: Math.floor(Math.random() * 100) + 200,
		brand: "Apple",
		description:
			"The iPad mini 6th Generation (2021) packs power and portability into a compact design. With its 8.3-inch Liquid Retina display, A15 Bionic chip, and support for Apple Pencil 2, it's perfect for staying productive on the go.",
		reviews: [
			{
				customer: "Einstein",
				caption: "Amazing performance, surprisingly fast for its size.",
				stars: 5,
			},
			{
				customer: "Curie",
				caption: "Love the compact design, fits perfectly in my bag.",
				stars: 4,
			},
			{
				customer: "Tesla",
				caption: "Battery life is impressive, lasts all day with heavy use.",
				stars: 5,
			},
			{
				customer: "Edison",
				caption: "Great for reading and watching videos, display is crisp and clear.",
				stars: 4,
			},
			{ customer: "Newton", caption: "Highly recommend, great value for the price.", stars: 5 },
		],
	},
	{
		name: "iPad Pro (12.9-inch)",
		category: "Tablets",
		image:
			"https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		price: 799.0,
		countInStock: Math.floor(Math.random() * 100) + 200,
		brand: "Apple",
		description:
			"The iPad Pro (12.9-inch) features a large, stunning display, powerful performance with the A9X chip, and support for the Apple Pencil. It's perfect for multitasking, creative work, and entertainment.",
		reviews: [
			{
				customer: "John",
				caption: "Love the large display and the Apple Pencil support.",
				stars: 5,
			},
			{ customer: "Emily", caption: "Fast and responsive, great for multitasking.", stars: 4 },
			{
				customer: "Daniel",
				caption: "Impressive performance, handles demanding tasks with ease.",
				stars: 5,
			},
			{
				customer: "Sophie",
				caption: "Sleek design and lightweight, easy to carry around.",
				stars: 4,
			},
			{ customer: "Adam", caption: "Excellent battery life, lasts all day.", stars: 5 },
		],
	},
	{
		name: "iPad Pro (9.7-inch)",
		category: "Tablets",
		image:
			"https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?q=80&w=3104&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		price: 699.0,
		countInStock: Math.floor(Math.random() * 100) + 200,
		brand: "Apple",
		description:
			"The iPad Pro (9.7-inch) offers a compact yet powerful tablet experience. With its Retina display, A9X chip, and support for the Apple Pencil and Smart Keyboard, it's ideal for productivity and creativity on the go.",
		reviews: [
			{
				customer: "Michael",
				caption: "Great size for portability, yet powerful performance.",
				stars: 4,
			},
			{
				customer: "Emma",
				caption: "Love the True Tone display and the Apple Pencil integration.",
				stars: 5,
			},
			{
				customer: "Oliver",
				caption: "Fast and responsive, no lag even with multiple apps open.",
				stars: 4,
			},
			{ customer: "Ava", caption: "Sleek design and lightweight, perfect for travel.", stars: 5 },
			{
				customer: "William",
				caption: "Impressed by the battery life and overall performance.",
				stars: 5,
			},
		],
	},
	{
		name: "iPad (5th generation)",
		category: "Tablets",
		image:
			"https://images.unsplash.com/photo-1514782831304-632d84503f6f?q=80&w=3135&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		price: 329.0,
		countInStock: Math.floor(Math.random() * 100) + 200,
		brand: "Apple",
		description:
			"The iPad (5th generation) offers a great balance of performance and affordability. With its Retina display, A9 chip, and support for the Apple Pencil, it's perfect for everyday tasks, gaming, and entertainment.",
		reviews: [
			{ customer: "Sophia", caption: "Great value for the price, reliable performance.", stars: 4 },
			{
				customer: "James",
				caption: "Love the Retina display and the smooth performance.",
				stars: 5,
			},
			{
				customer: "Isabella",
				caption: "Battery life could be better, but overall satisfied.",
				stars: 4,
			},
			{ customer: "Mia", caption: "Sleek design and easy to use, perfect for my needs.", stars: 5 },
			{
				customer: "Lucas",
				caption: "Impressed by the camera quality and the overall experience.",
				stars: 5,
			},
		],
	},
];
