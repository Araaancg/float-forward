import { IDisasters, IPin } from "@/interfaces";

export const disasterMock: IDisasters[] = [
  {
    _id: "1234",
    title: "Floods in Eastern Spain",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    country: "Spain",
    city: "Valencia",
    slug: "floods-valencia-2024",
    date: "11-2024",
    images: [
      {
        _id: "1",
        href: "/mocks/disaster-img-1.webp",
        alt: "Vehicles trapped in the water after the floods",
        author: "Alberto Saiz / AP",
        sources: "NBC News",
        link: "https://www.nbcnews.com/news/world/spain-flash-floods-people-killed-valencia-rcna177979",
      },
    ],
    additionalInformation: [],
    pins: [],
  },
  {
    _id: "1234",
    title: "Wildfires in California",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    country: "United States",
    city: "Southern California",
    slug: "california-wildfires-2025",
    date: "01-2025",
    images: [
      {
        _id: "1",
        href: "/mocks/disaster-img-2.webp",
        alt: "Fire spreading through Hollywood Hills",
        author: "Mario Tama / Getty Images",
        sources: "New York Times",
        link: "https://www.nytimes.com/live/2025/01/08/us/california-wildfire-la-palisades",
      },
    ],
    additionalInformation: [],
    pins: [],
  },
];

export const pinMock: IPin = {
  _id: "12312",
  type: {
    _id: "1",
    title: "Missings",
    description: "",
  },
  title: "We need things",
  description: "The old, weathered clock ticked incessantly, each chime a melancholic echo in the dusty attic. A forgotten photograph lay nestled amongst cobwebs, a sepia-toned portrait whispering tales of a bygone era. Dust motes danced in the single shaft of sunlight piercing the gloom, illuminating a tarnished silver locket. A sudden gust of wind rattled the windowpane, momentarily dispelling the oppressive silence.",
  additionalInfo: "The rusty swingset creaked ominously in the fading light, a lone sentinel in the overgrown backyard. A mischievous squirrel chattered from a nearby oak, its bushy tail twitching with agitation. The air hung heavy with the scent of petrichor, the earth releasing its earthy fragrance after a recent downpour. A lone ladybug, its crimson shell gleaming like a miniature jewel, crawled along a weathered brick path. A symphony of crickets chirped in the distance, their incessant chorus a lullaby to the twilight. A forgotten kite, its vibrant colors faded and tattered, lay tangled in the branches of a weeping willow. A lone dandelion, its seed head a delicate sphere of fluff, swayed gently in the breeze. A weathered rocking chair sat abandoned on the porch, its paint peeling in the relentless summer sun. A mischievous breeze rustled through the leaves of the ancient maple tree, casting dancing shadows on the crumbling stone patio. A lone hummingbird, its wings a blur of iridescent green, hovered near a cluster of honeysuckle, its long, slender beak probing for nectar. A discarded toy truck, its wheels rusted and immobile, lay half-buried in the soft earth. A lone robin, its breast a vibrant crimson, perched on a fence post, its melodious song echoing through the still air.",
  latitude: 123907124,
  longitude: 123907124,
  address: "Headington Rd, Headington, Oxford OX3 0BP",
  user: {
    _id: "sdfasdf",
    name: "Arancha Carpintero Guardiola",
    email: "carpinteroaranchag@gmail.com",
    profilePicture: null,
  },
  disasterId: "string",
};
