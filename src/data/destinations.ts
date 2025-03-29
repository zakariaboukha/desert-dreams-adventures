
export interface Destination {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: number;
  image: string;
  description: string;
  longDescription: string;
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
  includes: string[];
  excludes: string[];
  reviews: {
    author: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

export const destinations: Destination[] = [
  {
    id: "sahara-expedition",
    title: "Sahara Desert Expedition",
    location: "Sahara Desert",
    duration: "5 Days",
    price: 1299,
    image: "/images/sahara-expedition.jpg",
    description: "An unforgettable 5-day journey through the iconic Sahara Desert with our expert guides and 4x4 vehicles.",
    longDescription: "Embark on an unforgettable 5-day journey through the iconic Sahara Desert. This expedition takes you deep into the heart of the world's largest hot desert, where you'll experience the majesty of golden dunes, sleep under the stars in traditional desert camps, and discover ancient desert cultures. Our experienced guides will lead you in comfortable 4x4 vehicles through this breathtaking landscape, ensuring both adventure and safety throughout your journey.",
    itinerary: [
      {
        day: 1,
        title: "Arrival & Desert Gateway",
        description: "Arrive at the meeting point and transfer to our first desert camp. Enjoy a welcome dinner and orientation while watching the sunset over the dunes."
      },
      {
        day: 2,
        title: "Dune Discovery",
        description: "After breakfast, begin your 4x4 adventure through spectacular dune landscapes. Visit a desert oasis for lunch, then continue to our remote camp for stargazing and dinner."
      },
      {
        day: 3,
        title: "Desert Villages & Culture",
        description: "Explore traditional desert villages and meet local nomadic communities. Learn about desert survival techniques and traditional crafts before returning to camp."
      },
      {
        day: 4,
        title: "Great Dunes & Sunset Safari",
        description: "Journey to the region's highest dunes for breathtaking views. Experience an exhilarating dune bashing session followed by a special sunset dinner on the dunes."
      },
      {
        day: 5,
        title: "Farewell Desert",
        description: "Enjoy a sunrise camel ride before breakfast. Return to the departure point with photo stops along the way, arriving by early afternoon."
      }
    ],
    includes: [
      "4 nights accommodation in desert camps",
      "All meals and water",
      "4x4 transportation throughout",
      "Expert English-speaking guides",
      "Camel ride experience",
      "Stargazing sessions",
      "Cultural visits and activities"
    ],
    excludes: [
      "International and domestic flights",
      "Travel insurance",
      "Personal expenses",
      "Alcoholic beverages",
      "Tips for guides and staff"
    ],
    reviews: [
      {
        author: "James Wilson",
        rating: 5,
        comment: "Absolutely incredible experience! The guides were knowledgeable and friendly, the camps were comfortable, and the desert landscapes were breathtaking. Highly recommend!",
        date: "March 15, 2023"
      },
      {
        author: "Emma Thompson",
        rating: 4,
        comment: "Great tour overall. The stargazing was magical and the food was surprisingly good. Only minor issue was that one day felt a bit rushed.",
        date: "February 3, 2023"
      },
      {
        author: "Ahmed Al-Farsi",
        rating: 5,
        comment: "As someone who grew up near the desert, I was impressed by how authentic and respectful this tour was. The guides shared deep knowledge about desert ecology and culture.",
        date: "April 22, 2023"
      }
    ]
  },
  {
    id: "desert-oasis",
    title: "Desert Oasis Tour",
    location: "Eastern Desert",
    duration: "3 Days",
    price: 899,
    image: "/images/desert-oasis.jpg",
    description: "Discover hidden desert oases, natural springs, and lush palm groves in this refreshing desert experience.",
    longDescription: "Discover the surprising lushness hidden within the desert on our 3-day Oasis Tour. This journey takes you to several stunning desert oases, where crystal-clear springs create pockets of vibrant green life amid the golden sands. You'll marvel at ancient irrigation systems, relax under date palms, and learn how these vital water sources have sustained desert communities for thousands of years. This tour combines relaxation with cultural discovery for a unique desert experience.",
    itinerary: [
      {
        day: 1,
        title: "Gateway Oasis",
        description: "Meet at the departure point and drive to our first major oasis. Explore ancient irrigation systems and enjoy lunch under palm trees before checking into your comfortable oasis accommodation."
      },
      {
        day: 2,
        title: "Hidden Springs",
        description: "Journey to lesser-known springs and hidden oases. Swim in natural desert pools, enjoy a picnic lunch, and learn about oasis agriculture before returning for dinner and entertainment."
      },
      {
        day: 3,
        title: "Desert Gardens",
        description: "Visit a traditional desert garden farm to learn about sustainable desert agriculture. After lunch, return to the departure point, arriving by late afternoon."
      }
    ],
    includes: [
      "2 nights accommodation in oasis hotels",
      "All meals and bottled water",
      "Transportation in air-conditioned vehicles",
      "Expert guides",
      "Swimming opportunities at natural springs",
      "Cultural demonstrations"
    ],
    excludes: [
      "Flights",
      "Travel insurance",
      "Personal expenses",
      "Tips",
      "Optional activities"
    ],
    reviews: [
      {
        author: "Sophia Chen",
        rating: 5,
        comment: "A refreshing take on desert tourism! The contrast between the arid desert and lush oases was spectacular. Great photography opportunities.",
        date: "May 12, 2023"
      },
      {
        author: "Michael Brown",
        rating: 4,
        comment: "Thoroughly enjoyed the tour. The natural springs were perfect for cooling off, and the oasis accommodations were charming and comfortable.",
        date: "June 5, 2023"
      },
      {
        author: "Olivia Martinez",
        rating: 5,
        comment: "This tour exceeded expectations. Our guide was extremely knowledgeable about desert ecology and the historical importance of these oases. A truly educational experience.",
        date: "April 18, 2023"
      }
    ]
  },
  {
    id: "canyon-adventure",
    title: "Desert Canyon Adventure",
    location: "Western Desert Canyons",
    duration: "4 Days",
    price: 1099,
    image: "/images/canyon-adventure.jpg",
    description: "Explore magnificent desert canyons carved by ancient waters, with spectacular geology and hidden rock art.",
    longDescription: "Explore the hidden wonders of desert canyons on this 4-day adventure. Witness the spectacular geology of these natural formations carved by ancient waters thousands of years ago. Our journey takes you through narrow slot canyons, past towering rock formations, and to hidden grottos with prehistoric rock art. You'll hike through varied terrain with expert guides who bring the geological and human history of these remarkable landscapes to life.",
    itinerary: [
      {
        day: 1,
        title: "Gateway to the Canyons",
        description: "Meet at the departure point and transfer to the canyon region. After lunch, take an introductory hike to viewpoints overlooking the canyon system. Overnight at canyon lodge."
      },
      {
        day: 2,
        title: "Ancient Waterways",
        description: "Full day exploring the main canyon system with its variety of geological features. Visit ancient water collection systems and rock art sites. Return to lodge for dinner."
      },
      {
        day: 3,
        title: "Hidden Slot Canyons",
        description: "Adventure to narrow slot canyons with their dramatic light effects. Picnic lunch in a canyon grotto, then continue exploring lesser-visited areas."
      },
      {
        day: 4,
        title: "Canyon Rims",
        description: "Morning hike to canyon rim viewpoints for panoramic vistas. After lunch, return to departure point, arriving by late afternoon."
      }
    ],
    includes: [
      "3 nights accommodation at canyon lodge",
      "All meals",
      "Transportation to and from canyon areas",
      "Expert geology and hiking guides",
      "Hiking equipment",
      "Park entrance fees"
    ],
    excludes: [
      "Flights",
      "Travel insurance",
      "Personal hiking gear",
      "Tips",
      "Optional activities"
    ],
    reviews: [
      {
        author: "Daniel Jackson",
        rating: 5,
        comment: "The canyons were absolutely spectacular! Our guide had amazing knowledge of geology and made the formations come alive with fascinating explanations.",
        date: "March 3, 2023"
      },
      {
        author: "Laura Williams",
        rating: 4,
        comment: "Great hiking adventure with breathtaking scenery. The slot canyons were magical with their light effects. Be prepared for some challenging hikes though!",
        date: "April 29, 2023"
      },
      {
        author: "Robert Chen",
        rating: 5,
        comment: "An unforgettable experience. The rock art was fascinating and the guides did a great job explaining the prehistoric cultures that created it. Highly recommended!",
        date: "May 22, 2023"
      }
    ]
  },
  {
    id: "sunset-safari",
    title: "Sunset Desert Safari",
    location: "Red Dune Region",
    duration: "2 Days",
    price: 599,
    image: "/images/sunset-safari.jpg",
    description: "Experience the magic of the desert at sunset with dune bashing, camel rides, and an overnight desert camp.",
    longDescription: "Experience the magical transformation of the desert as day turns to night on our 2-day Sunset Safari. This adventure focuses on the spectacular colors and changing moods of the desert during the golden hours. Enjoy thrilling dune bashing in 4x4 vehicles, peaceful camel rides along the dune crests, and an unforgettable night in a traditional desert camp. This is the perfect short desert getaway that captures the essence of desert beauty and adventure.",
    itinerary: [
      {
        day: 1,
        title: "Sunset Adventure",
        description: "Afternoon departure in 4x4 vehicles to the red dune region. Experience exciting dune bashing followed by a camel ride to watch the sunset. Evening features traditional dinner, entertainment, and overnight in desert camp."
      },
      {
        day: 2,
        title: "Desert Morning",
        description: "Optional sunrise viewing followed by breakfast at camp. Morning activities include sandboarding and desert wildlife spotting before returning to departure point by noon."
      }
    ],
    includes: [
      "1 night in traditional desert camp",
      "Dinner and breakfast",
      "4x4 dune bashing experience",
      "Camel ride",
      "Evening entertainment",
      "Sandboarding"
    ],
    excludes: [
      "Transfers from hotels (available at extra cost)",
      "Travel insurance",
      "Personal expenses",
      "Tips",
      "Optional activities"
    ],
    reviews: [
      {
        author: "Jessica Miller",
        rating: 5,
        comment: "Perfect weekend getaway! The sunset views were incredible and the dune bashing was such a thrill. The camp was much more comfortable than I expected.",
        date: "June 15, 2023"
      },
      {
        author: "Thomas Wright",
        rating: 4,
        comment: "Great value for money. The sunset colors were amazing and the traditional dinner was delicious. Just wish we had more time!",
        date: "May 30, 2023"
      },
      {
        author: "Aisha Khalid",
        rating: 5,
        comment: "A magical experience! Sleeping under the stars in the desert was unforgettable. The guides were friendly and professional, making sure everyone had a great time.",
        date: "April 8, 2023"
      }
    ]
  }
];

export const getDestinationById = (id: string): Destination | undefined => {
  return destinations.find(destination => destination.id === id);
};
