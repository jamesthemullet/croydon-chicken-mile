export interface Restaurant {
	name: string;
	tagline: string;
	specialty: string;
	address: string;
	image?: string;
	badge?: string;
	lat?: number;
	lng?: number;
	slug: string;
}

export function slugify(value: string): string {
	return value
		.toLowerCase()
		.replace(/'/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

const restaurantData: Omit<Restaurant, "slug">[] = [
	{
		name: "Poor Boys @ BoxPark",
		tagline: "New Orleans Eatery, Reimagined in Croydon",
		specialty: "Chicken",
		address: "99 George St, Croydon CR0 1LD",
		image: "/images/poor-boys-boxpark.jpg",
		lat: 51.3748115,
		lng: -0.0936025,
	},
	{
		name: "RAPS @ BoxPark",
		tagline:
			"Built for fans of soul food who refuse to choose between health and indulgence.",
		specialty: "Chicken",
		address: "99 George St, Croydon CR0 1LD",
		image: "/images/raps-boxpark.jpg",
		lat: 51.3752515,
		lng: -0.0936025,
	},
	{
		name: "Sam's",
		tagline: "The home of great tasting chicken",
		specialty: "Chicken",
		address: "46 High St, Croydon CR0 1YB",
		image: "/images/sams.jpg",
		badge: "4am close on Fri/Sat",
		lat: 51.3722483,
		lng: -0.1005771,
	},
	{
		name: "Rio's Piri Piri",
		tagline: "Newly refurbed",
		specialty: "Chicken",
		address: "48 High St, Croydon CR0 1YB",
		image: "/images/rios-piri-piri.jpg",
		lat: 51.37228012084961,
		lng: -0.10063029825687408,
	},
	{
		name: "Dave's Hot Chicken",
		tagline: "Upper class fried chicken",
		specialty: "Chicken",
		address: "7, 11 High St, Croydon CR0 1QB",
		lat: 51.37342071533203,
		lng: -0.1003,
	},
	{
		name: "Pepe's",
		tagline: "The home of fresh flame grilled chicken",
		specialty: "Chicken",
		address: "52 George St, Croydon CR0 1PD",
		lat: 51.3738299,
		lng: -0.0976982,
	},
	{
		name: "Popeyes",
		tagline: "All the way from Louisiana...don't forget the cajun gravy",
		specialty: "Chicken",
		address: "43 George St, Croydon CR0 1LB",
		lat: 51.3742851,
		lng: -0.0972591,
	},
	{
		name: "Roosters Piri Piri Croydon",
		tagline: "Fresh, grilled and healthy",
		specialty: "Chicken",
		address: "Unit 13, Norfolk House, Wellesley Rd, Croydon CR0 1LH",
		lat: 51.3746507,
		lng: -0.0967463,
	},
	{
		name: "Chick'n Box",
		tagline: "Hotter than your ex",
		specialty: "Chicken",
		address: "79 George St, Croydon CR0 1LD",
		lat: 51.3745907,
		lng: -0.0948675,
	},
	{
		name: "Chicken Valley Croydon",
		tagline: "Joy in every bite",
		specialty: "Chicken",
		address: "100 High St, Croydon CR0 1ND",
		lat: 51.3702522,
		lng: -0.1001995,
	},
	{
		name: "Chicking Croydon",
		tagline: "It's my choice. It's my chicken.",
		specialty: "Chicken",
		address: "282 High St, Croydon CR0 1NG",
		lat: 51.3683786,
		lng: -0.0996001,
	},
	{
		name: "Rooster King - Croydon",
		tagline: "Sizzling taste.",
		specialty: "Chicken",
		address: "10 S End, Croydon CR0 1DL",
		lat: 51.367038,
		lng: -0.099201,
	},
	{
		name: "Southend Chick-Inn Peri Peri",
		tagline: "Chick -Inn.  Peri - Peri.",
		specialty: "Chicken",
		address: "87 S End, Croydon CR0 1BG",
		lat: 51.36477279663086,
		lng: -0.09874819964170456,
	},
	{
		name: "Perfect Fried Chicken - Croydon",
		tagline: "One of the OGs",
		specialty: "Chicken",
		address: "95a S End, Croydon CR0 1BG",
		lat: 51.364376068115234,
		lng: -0.09878550469875336,
	},
	{
		name: "Chicken Tingz",
		tagline: "Things that are chicken",
		specialty: "Chicken",
		address: "123 S End, Croydon CR0 1BJ",
		lat: 51.3638801574707,
		lng: -0.0985528975725174,
	},
	{
		name: "The Green Dragon",
		tagline: "It's actually a really good pub, but guess what they sell?",
		specialty: "Beer. Also chicken",
		address: "58-60 High St, Croydon CR0 1NA",
		lat: 51.37168884277344,
		lng: -0.10061690211296082,
	},
];

export const restaurants: Restaurant[] = restaurantData.map((r) => ({
	...r,
	slug: slugify(r.name),
}));
