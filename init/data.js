const sampleListings = [
  {
    title: "Renovated Horse Farm Bunkhouse",
    description:
      "Stay at a western-themed bunkhouse on a 12-acre horse farm. Equestrians will love the horse-friendly policy and peaceful countryside views.",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
    price: 950,
    location: "Lexington",
    country: "United States",
  },
  {
    title: "Coastal Houseboat Retreat",
    description:
      "Live as a coastal nomad in a cozy houseboat. Enjoy tranquil waterfront vistas, canal access, and seaside town charm.",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b",
    price: 1300,
    location: "Bay St. Louis",
    country: "United States",
  },
  {
    title: "Barndominium with Twin Silos",
    description:
      "Experience rustic meets luxury in a barn-style home with silos, stone fireplace, home theater, gym, and deck, perfect for group getaways.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    price: 2400,
    location: "Lake Geneva",
    country: "United States",
  },
  {
    title: "Sprawling Private Castle",
    description:
      "Live like royalty in a 7,000-sqft castle on 100 acres with medieval furnishings, private hiking trails, indoor pool, and fishing lake.",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    price: 3000,
    location: "Ozarks",
    country: "United States",
  },
  {
    title: "Lookout Tower with 360° Views",
    description:
      "Quaint home with lookout tower, private trail network, and wood-burning stove. Perfect for foliage season and relaxation.",
    image: "https://images.unsplash.com/photo-1460474647541-4edd0cd0c746",
    price: 1200,
    location: "New Hampshire",
    country: "United States",
  },
  {
    title: "Boston South Shore Hideaway",
    description:
      "A coastal retreat on the South Shore near Plymouth Rock. Middle-of-woods coziness with beach and lighthouse access.",
    image: "https://images.unsplash.com/photo-1499346030926-9a72daac6c63",
    price: 1400,
    location: "Boston",
    country: "United States",
  },
  {
    title: "Tropical East Coast Sanctuary",
    description:
      "Spa-like tropical retreat with soaking tub, tiki huts, hammocks, and lagoon dolphin-watching.",
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd",
    price: 1700,
    location: "Florida",
    country: "United States",
  },
  {
    title: "Epic Mountain Castle",
    description:
      "Live a renaissance fantasy in a blue-ridge castle with drawbridge, hot tub on terrace, and luxury décor.",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
    price: 2700,
    location: "Blue Ridge",
    country: "United States",
  },
  {
    title: "Hatfield Cabin with Roller Rink",
    description:
      "Family-friendly cabin featuring in-home roller rink, full bar, game tables, and firepit, just steps from a lake.",
    image: "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f",
    price: 1600,
    location: "Hatfield",
    country: "United States",
  },
  {
    title: "Lakefront Cabin with Yurt",
    description:
      "Charming lakeside cabin with waterside yurt, private docks, fire pit, and coffee bar for scenic gatherings.",
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece",
    price: 1350,
    location: "Minnesota",
    country: "United States",
  },
  {
    title: "Converted Train Car Studio",
    description:
      "Railroad history meets modern comfort in a caboose studio with a kitchenette, queen bed, and full bath.",
    image: "https://images.unsplash.com/photo-1499696011074-7a3b4b81b745",
    price: 950,
    location: "Joplin",
    country: "United States",
  },
  {
    title: "Vibrant Themed Tulsa Retreat",
    description:
      "Colorful, pink-and-flamingo-themed home with hot tub, modern kitchen, and walkable access to arts and entertainment.",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
    price: 1100,
    location: "Tulsa",
    country: "United States",
  },
  {
    title: "Shipping Container River Home",
    description:
      "Sustainable home on a 400-acre farm, direct river access, star-viewing deck, and cozy modern living for four.",
    image: "https://images.unsplash.com/photo-1444065381814-865dc9da92c0",
    price: 1400,
    location: "Branson",
    country: "United States",
  },
  {
    title: "Disney Themed Pool Home",
    description:
      "Kids’ paradise near Disney with private pool, foosball arcade, and playful décor for memorable family trips.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
    price: 1250,
    location: "Orlando",
    country: "United States",
  },
  {
    title: "Renovated Schoolhouse Studio",
    description:
      "Old-school desks, chalkboards, yard games, and books in a schoolhouse turned vacation rental for a touch of nostalgia.",
    image: "https://images.unsplash.com/photo-1529676468690-849469c6ab9d",
    price: 800,
    location: "West Virginia",
    country: "United States",
  },
  {
    title: "Modern Treehouse Island Retreat",
    description:
      "Upscale treehouse for six, panoramic windows, private deck, near beaches and historic sites.",
    image: "https://images.unsplash.com/photo-1460474647541-4edd0cd0c746",
    price: 2000,
    location: "Hilton Head Island",
    country: "United States",
  },
  {
    title: "Rustic Phoenix Saloon Cabin",
    description:
      "Western saloon-style cabin with stocked kitchen, porch, desert scenery, and quick access to lake and golf.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    price: 1100,
    location: "Phoenix",
    country: "United States",
  },
  {
    title: "Charming California Studio",
    description:
      "Spanish architecture, lush gardens, and close to beaches. Sip coffee under the trees or unwind by the fire pit.",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b",
    price: 1200,
    location: "Long Beach",
    country: "United States",
  },
  {
    title: "Vermont Baseball Family Haven",
    description:
      "Classic MLB memorabilia, firepit, spacious yard, mountain access for a big-league getaway.",
    image: "https://images.unsplash.com/photo-1529676468690-849469c6ab9d",
    price: 1450,
    location: "Killington",
    country: "United States",
  },
  {
    title: "Colorful Florida River Oasis",
    description:
      "Bright riverside home with private kayaks, river-adjacent mermaid shows, and outdoor kitchen/bar.",
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd",
    price: 1350,
    location: "Weeki Wachee",
    country: "United States",
  },
  {
    title: "Fort Worth Trackside Condo",
    description:
      "Condo with 12-seat viewing gallery over Texas Motor Speedway, pool, and quick Dallas access.",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
    price: 1700,
    location: "Fort Worth",
    country: "United States",
  }
];
 module.exports={sampleListings}
