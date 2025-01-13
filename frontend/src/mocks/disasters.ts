import { IDisasters } from "@/types/structures";

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
    location: { lat: -33.860664, lng: 151.208138 }
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
    location: { lat: -33.860664, lng: 151.208138 }
  },
];
