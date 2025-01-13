import { PinTypes, PriorityTypes } from "@/types/enums";
import { IPin } from "@/types/structures";

export const pinListMock: IPin[] = [
  {
    _id: "0",
    type: {
      _id: "1",
      title: PinTypes.MISSINGS,
      description: "",
    },
    title: "We need things",
    description:
      "The old, weathered clock ticked incessantly, each chime a melancholic echo in the dusty attic. A forgotten photograph lay nestled amongst cobwebs, a sepia-toned portrait whispering tales of a bygone era. Dust motes danced in the single shaft of sunlight piercing the gloom, illuminating a tarnished silver locket. A sudden gust of wind rattled the windowpane, momentarily dispelling the oppressive silence.",
    additionalInfo:
      "The rusty swingset creaked ominously in the fading light, a lone sentinel in the overgrown backyard. A mischievous squirrel chattered from a nearby oak, its bushy tail twitching with agitation. The air hung heavy with the scent of petrichor, the earth releasing its earthy fragrance after a recent downpour. A lone ladybug, its crimson shell gleaming like a miniature jewel, crawled along a weathered brick path. A symphony of crickets chirped in the distance, their incessant chorus a lullaby to the twilight. A forgotten kite, its vibrant colors faded and tattered, lay tangled in the branches of a weeping willow. A lone dandelion, its seed head a delicate sphere of fluff, swayed gently in the breeze. A weathered rocking chair sat abandoned on the porch, its paint peeling in the relentless summer sun. A mischievous breeze rustled through the leaves of the ancient maple tree, casting dancing shadows on the crumbling stone patio. A lone hummingbird, its wings a blur of iridescent green, hovered near a cluster of honeysuckle, its long, slender beak probing for nectar. A discarded toy truck, its wheels rusted and immobile, lay half-buried in the soft earth. A lone robin, its breast a vibrant crimson, perched on a fence post, its melodious song echoing through the still air.",
    latitude: -33.8567844,
    longitude: 151.213108,
    address: "Headington Rd, Headington, Oxford OX3 0BP",
    user: {
      _id: "sdfasdf",
      name: "Arancha Carpintero Guardiola",
      email: "carpinteroaranchag@gmail.com",
      profilePicture: null,
    },
    disasterId: "string",
    priority: PriorityTypes.HIGH,
  },
  {
    _id: "1",
    type: {
      _id: "2",
      title: PinTypes.HELP_REQUEST,
      description: "",
    },
    title: "We need things",
    description:
      "The old, weathered clock ticked incessantly, each chime a melancholic echo in the dusty attic. A forgotten photograph lay nestled amongst cobwebs, a sepia-toned portrait whispering tales of a bygone era. Dust motes danced in the single shaft of sunlight piercing the gloom, illuminating a tarnished silver locket. A sudden gust of wind rattled the windowpane, momentarily dispelling the oppressive silence.",
    additionalInfo:
      "The rusty swingset creaked ominously in the fading light, a lone sentinel in the overgrown backyard. A mischievous squirrel chattered from a nearby oak, its bushy tail twitching with agitation. The air hung heavy with the scent of petrichor, the earth releasing its earthy fragrance after a recent downpour. A lone ladybug, its crimson shell gleaming like a miniature jewel, crawled along a weathered brick path. A symphony of crickets chirped in the distance, their incessant chorus a lullaby to the twilight. A forgotten kite, its vibrant colors faded and tattered, lay tangled in the branches of a weeping willow. A lone dandelion, its seed head a delicate sphere of fluff, swayed gently in the breeze. A weathered rocking chair sat abandoned on the porch, its paint peeling in the relentless summer sun. A mischievous breeze rustled through the leaves of the ancient maple tree, casting dancing shadows on the crumbling stone patio. A lone hummingbird, its wings a blur of iridescent green, hovered near a cluster of honeysuckle, its long, slender beak probing for nectar. A discarded toy truck, its wheels rusted and immobile, lay half-buried in the soft earth. A lone robin, its breast a vibrant crimson, perched on a fence post, its melodious song echoing through the still air.",
    latitude: -33.8472767,
    longitude: 151.2188164,
    address: "Headington Rd, Headington, Oxford OX3 0BP",
    user: {
      _id: "sdfasdf",
      name: "Arancha Carpintero Guardiola",
      email: "carpinteroaranchag@gmail.com",
      profilePicture: null,
    },
    disasterId: "string",
    priority: PriorityTypes.HIGH,
  },
  {
    _id: "2",
    type: {
      _id: "3",
      title: PinTypes.HELP_OFFER,
      description: "",
    },
    title: "We need things",
    description:
      "The old, weathered clock ticked incessantly, each chime a melancholic echo in the dusty attic. A forgotten photograph lay nestled amongst cobwebs, a sepia-toned portrait whispering tales of a bygone era. Dust motes danced in the single shaft of sunlight piercing the gloom, illuminating a tarnished silver locket. A sudden gust of wind rattled the windowpane, momentarily dispelling the oppressive silence.",
    additionalInfo:
      "The rusty swingset creaked ominously in the fading light, a lone sentinel in the overgrown backyard. A mischievous squirrel chattered from a nearby oak, its bushy tail twitching with agitation. The air hung heavy with the scent of petrichor, the earth releasing its earthy fragrance after a recent downpour. A lone ladybug, its crimson shell gleaming like a miniature jewel, crawled along a weathered brick path. A symphony of crickets chirped in the distance, their incessant chorus a lullaby to the twilight. A forgotten kite, its vibrant colors faded and tattered, lay tangled in the branches of a weeping willow. A lone dandelion, its seed head a delicate sphere of fluff, swayed gently in the breeze. A weathered rocking chair sat abandoned on the porch, its paint peeling in the relentless summer sun. A mischievous breeze rustled through the leaves of the ancient maple tree, casting dancing shadows on the crumbling stone patio. A lone hummingbird, its wings a blur of iridescent green, hovered near a cluster of honeysuckle, its long, slender beak probing for nectar. A discarded toy truck, its wheels rusted and immobile, lay half-buried in the soft earth. A lone robin, its breast a vibrant crimson, perched on a fence post, its melodious song echoing through the still air.",
    latitude: -33.8209738,
    longitude: 151.2563253,
    address: "Headington Rd, Headington, Oxford OX3 0BP",
    user: {
      _id: "sdfasdf",
      name: "Arancha Carpintero Guardiola",
      email: "carpinteroaranchag@gmail.com",
      profilePicture: null,
    },
    disasterId: "string",
    priority: PriorityTypes.HIGH,
  },
  {
    _id: "3",
    type: {
      _id: "5",
      title: PinTypes.MEDICAL_POINT,
      description: "",
    },
    title: "We need things",
    description:
      "The old, weathered clock ticked incessantly, each chime a melancholic echo in the dusty attic. A forgotten photograph lay nestled amongst cobwebs, a sepia-toned portrait whispering tales of a bygone era. Dust motes danced in the single shaft of sunlight piercing the gloom, illuminating a tarnished silver locket. A sudden gust of wind rattled the windowpane, momentarily dispelling the oppressive silence.",
    additionalInfo:
      "The rusty swingset creaked ominously in the fading light, a lone sentinel in the overgrown backyard. A mischievous squirrel chattered from a nearby oak, its bushy tail twitching with agitation. The air hung heavy with the scent of petrichor, the earth releasing its earthy fragrance after a recent downpour. A lone ladybug, its crimson shell gleaming like a miniature jewel, crawled along a weathered brick path. A symphony of crickets chirped in the distance, their incessant chorus a lullaby to the twilight. A forgotten kite, its vibrant colors faded and tattered, lay tangled in the branches of a weeping willow. A lone dandelion, its seed head a delicate sphere of fluff, swayed gently in the breeze. A weathered rocking chair sat abandoned on the porch, its paint peeling in the relentless summer sun. A mischievous breeze rustled through the leaves of the ancient maple tree, casting dancing shadows on the crumbling stone patio. A lone hummingbird, its wings a blur of iridescent green, hovered near a cluster of honeysuckle, its long, slender beak probing for nectar. A discarded toy truck, its wheels rusted and immobile, lay half-buried in the soft earth. A lone robin, its breast a vibrant crimson, perched on a fence post, its melodious song echoing through the still air.",
    latitude: -33.8690081,
    longitude: 151.2052393,
    address: "Headington Rd, Headington, Oxford OX3 0BP",
    user: {
      _id: "sdfasdf",
      name: "Arancha Carpintero Guardiola",
      email: "carpinteroaranchag@gmail.com",
      profilePicture: null,
    },
    disasterId: "string",
    priority: PriorityTypes.HIGH,
  },
  {
    _id: "4",
    type: {
      _id: "1",
      title: PinTypes.MISSINGS,
      description: "",
    },
    title: "We need things",
    description:
      "The old, weathered clock ticked incessantly, each chime a melancholic echo in the dusty attic. A forgotten photograph lay nestled amongst cobwebs, a sepia-toned portrait whispering tales of a bygone era. Dust motes danced in the single shaft of sunlight piercing the gloom, illuminating a tarnished silver locket. A sudden gust of wind rattled the windowpane, momentarily dispelling the oppressive silence.",
    additionalInfo:
      "The rusty swingset creaked ominously in the fading light, a lone sentinel in the overgrown backyard. A mischievous squirrel chattered from a nearby oak, its bushy tail twitching with agitation. The air hung heavy with the scent of petrichor, the earth releasing its earthy fragrance after a recent downpour. A lone ladybug, its crimson shell gleaming like a miniature jewel, crawled along a weathered brick path. A symphony of crickets chirped in the distance, their incessant chorus a lullaby to the twilight. A forgotten kite, its vibrant colors faded and tattered, lay tangled in the branches of a weeping willow. A lone dandelion, its seed head a delicate sphere of fluff, swayed gently in the breeze. A weathered rocking chair sat abandoned on the porch, its paint peeling in the relentless summer sun. A mischievous breeze rustled through the leaves of the ancient maple tree, casting dancing shadows on the crumbling stone patio. A lone hummingbird, its wings a blur of iridescent green, hovered near a cluster of honeysuckle, its long, slender beak probing for nectar. A discarded toy truck, its wheels rusted and immobile, lay half-buried in the soft earth. A lone robin, its breast a vibrant crimson, perched on a fence post, its melodious song echoing through the still air.",
    latitude: -33.8587568,
    longitude: 151.2058246,
    address: "Headington Rd, Headington, Oxford OX3 0BP",
    user: {
      _id: "sdfasdf",
      name: "Arancha Carpintero Guardiola",
      email: "carpinteroaranchag@gmail.com",
      profilePicture: null,
    },
    disasterId: "string",
    priority: PriorityTypes.HIGH,
  },
  {
    _id: "5",
    type: {
      _id: "4",
      title: PinTypes.COLLECTION_POINT,
      description: "",
    },
    title: "We need things",
    description:
      "The old, weathered clock ticked incessantly, each chime a melancholic echo in the dusty attic. A forgotten photograph lay nestled amongst cobwebs, a sepia-toned portrait whispering tales of a bygone era. Dust motes danced in the single shaft of sunlight piercing the gloom, illuminating a tarnished silver locket. A sudden gust of wind rattled the windowpane, momentarily dispelling the oppressive silence.",
    additionalInfo:
      "The rusty swingset creaked ominously in the fading light, a lone sentinel in the overgrown backyard. A mischievous squirrel chattered from a nearby oak, its bushy tail twitching with agitation. The air hung heavy with the scent of petrichor, the earth releasing its earthy fragrance after a recent downpour. A lone ladybug, its crimson shell gleaming like a miniature jewel, crawled along a weathered brick path. A symphony of crickets chirped in the distance, their incessant chorus a lullaby to the twilight. A forgotten kite, its vibrant colors faded and tattered, lay tangled in the branches of a weeping willow. A lone dandelion, its seed head a delicate sphere of fluff, swayed gently in the breeze. A weathered rocking chair sat abandoned on the porch, its paint peeling in the relentless summer sun. A mischievous breeze rustled through the leaves of the ancient maple tree, casting dancing shadows on the crumbling stone patio. A lone hummingbird, its wings a blur of iridescent green, hovered near a cluster of honeysuckle, its long, slender beak probing for nectar. A discarded toy truck, its wheels rusted and immobile, lay half-buried in the soft earth. A lone robin, its breast a vibrant crimson, perched on a fence post, its melodious song echoing through the still air.",
    latitude: -33.858761,
    longitude: 151.2055688,
    address: "Headington Rd, Headington, Oxford OX3 0BP",
    user: {
      _id: "sdfasdf",
      name: "Arancha Carpintero Guardiola",
      email: "carpinteroaranchag@gmail.com",
      profilePicture: null,
    },
    disasterId: "string",
    priority: PriorityTypes.HIGH,
  },
  {
    _id: "6",
    type: {
      _id: "5",
      title: PinTypes.MEDICAL_POINT,
      description: "",
    },
    title: "We need things",
    description:
      "The old, weathered clock ticked incessantly, each chime a melancholic echo in the dusty attic. A forgotten photograph lay nestled amongst cobwebs, a sepia-toned portrait whispering tales of a bygone era. Dust motes danced in the single shaft of sunlight piercing the gloom, illuminating a tarnished silver locket. A sudden gust of wind rattled the windowpane, momentarily dispelling the oppressive silence.",
    additionalInfo:
      "The rusty swingset creaked ominously in the fading light, a lone sentinel in the overgrown backyard. A mischievous squirrel chattered from a nearby oak, its bushy tail twitching with agitation. The air hung heavy with the scent of petrichor, the earth releasing its earthy fragrance after a recent downpour. A lone ladybug, its crimson shell gleaming like a miniature jewel, crawled along a weathered brick path. A symphony of crickets chirped in the distance, their incessant chorus a lullaby to the twilight. A forgotten kite, its vibrant colors faded and tattered, lay tangled in the branches of a weeping willow. A lone dandelion, its seed head a delicate sphere of fluff, swayed gently in the breeze. A weathered rocking chair sat abandoned on the porch, its paint peeling in the relentless summer sun. A mischievous breeze rustled through the leaves of the ancient maple tree, casting dancing shadows on the crumbling stone patio. A lone hummingbird, its wings a blur of iridescent green, hovered near a cluster of honeysuckle, its long, slender beak probing for nectar. A discarded toy truck, its wheels rusted and immobile, lay half-buried in the soft earth. A lone robin, its breast a vibrant crimson, perched on a fence post, its melodious song echoing through the still air.",
    latitude: -33.852228,
    longitude: 151.2038374,
    address: "Headington Rd, Headington, Oxford OX3 0BP",
    user: {
      _id: "sdfasdf",
      name: "Arancha Carpintero Guardiola",
      email: "carpinteroaranchag@gmail.com",
      profilePicture: null,
    },
    disasterId: "string",
    priority: PriorityTypes.HIGH,
  },
  {
    _id: "7",
    type: {
      _id: "2",
      title: PinTypes.INFORMATION_POINT,
      description: "",
    },
    title: "We need things",
    description:
      "The old, weathered clock ticked incessantly, each chime a melancholic echo in the dusty attic. A forgotten photograph lay nestled amongst cobwebs, a sepia-toned portrait whispering tales of a bygone era. Dust motes danced in the single shaft of sunlight piercing the gloom, illuminating a tarnished silver locket. A sudden gust of wind rattled the windowpane, momentarily dispelling the oppressive silence.",
    additionalInfo:
      "The rusty swingset creaked ominously in the fading light, a lone sentinel in the overgrown backyard. A mischievous squirrel chattered from a nearby oak, its bushy tail twitching with agitation. The air hung heavy with the scent of petrichor, the earth releasing its earthy fragrance after a recent downpour. A lone ladybug, its crimson shell gleaming like a miniature jewel, crawled along a weathered brick path. A symphony of crickets chirped in the distance, their incessant chorus a lullaby to the twilight. A forgotten kite, its vibrant colors faded and tattered, lay tangled in the branches of a weeping willow. A lone dandelion, its seed head a delicate sphere of fluff, swayed gently in the breeze. A weathered rocking chair sat abandoned on the porch, its paint peeling in the relentless summer sun. A mischievous breeze rustled through the leaves of the ancient maple tree, casting dancing shadows on the crumbling stone patio. A lone hummingbird, its wings a blur of iridescent green, hovered near a cluster of honeysuckle, its long, slender beak probing for nectar. A discarded toy truck, its wheels rusted and immobile, lay half-buried in the soft earth. A lone robin, its breast a vibrant crimson, perched on a fence post, its melodious song echoing through the still air.",
    latitude: -33.8737375,
    longitude: 151.222569,
    address: "Headington Rd, Headington, Oxford OX3 0BP",
    user: {
      _id: "sdfasdf",
      name: "Arancha Carpintero Guardiola",
      email: "carpinteroaranchag@gmail.com",
      profilePicture: null,
    },
    disasterId: "string",
    priority: PriorityTypes.HIGH,
  },
  {
    _id: "8",
    type: {
      _id: "3",
      title: PinTypes.HELP_OFFER,
      description: "",
    },
    title: "We need things",
    description:
      "The old, weathered clock ticked incessantly, each chime a melancholic echo in the dusty attic. A forgotten photograph lay nestled amongst cobwebs, a sepia-toned portrait whispering tales of a bygone era. Dust motes danced in the single shaft of sunlight piercing the gloom, illuminating a tarnished silver locket. A sudden gust of wind rattled the windowpane, momentarily dispelling the oppressive silence.",
    additionalInfo:
      "The rusty swingset creaked ominously in the fading light, a lone sentinel in the overgrown backyard. A mischievous squirrel chattered from a nearby oak, its bushy tail twitching with agitation. The air hung heavy with the scent of petrichor, the earth releasing its earthy fragrance after a recent downpour. A lone ladybug, its crimson shell gleaming like a miniature jewel, crawled along a weathered brick path. A symphony of crickets chirped in the distance, their incessant chorus a lullaby to the twilight. A forgotten kite, its vibrant colors faded and tattered, lay tangled in the branches of a weeping willow. A lone dandelion, its seed head a delicate sphere of fluff, swayed gently in the breeze. A weathered rocking chair sat abandoned on the porch, its paint peeling in the relentless summer sun. A mischievous breeze rustled through the leaves of the ancient maple tree, casting dancing shadows on the crumbling stone patio. A lone hummingbird, its wings a blur of iridescent green, hovered near a cluster of honeysuckle, its long, slender beak probing for nectar. A discarded toy truck, its wheels rusted and immobile, lay half-buried in the soft earth. A lone robin, its breast a vibrant crimson, perched on a fence post, its melodious song echoing through the still air.",
    latitude: -33.864167,
    longitude: 151.216387,
    address: "Headington Rd, Headington, Oxford OX3 0BP",
    user: {
      _id: "sdfasdf",
      name: "Arancha Carpintero Guardiola",
      email: "carpinteroaranchag@gmail.com",
      profilePicture: null,
    },
    disasterId: "string",
    priority: PriorityTypes.HIGH,
  },
  {
    _id: "9",
    type: {
      _id: "1",
      title: PinTypes.MISSINGS,
      description: "",
    },
    title: "We need things",
    description:
      "The old, weathered clock ticked incessantly, each chime a melancholic echo in the dusty attic. A forgotten photograph lay nestled amongst cobwebs, a sepia-toned portrait whispering tales of a bygone era. Dust motes danced in the single shaft of sunlight piercing the gloom, illuminating a tarnished silver locket. A sudden gust of wind rattled the windowpane, momentarily dispelling the oppressive silence.",
    additionalInfo:
      "The rusty swingset creaked ominously in the fading light, a lone sentinel in the overgrown backyard. A mischievous squirrel chattered from a nearby oak, its bushy tail twitching with agitation. The air hung heavy with the scent of petrichor, the earth releasing its earthy fragrance after a recent downpour. A lone ladybug, its crimson shell gleaming like a miniature jewel, crawled along a weathered brick path. A symphony of crickets chirped in the distance, their incessant chorus a lullaby to the twilight. A forgotten kite, its vibrant colors faded and tattered, lay tangled in the branches of a weeping willow. A lone dandelion, its seed head a delicate sphere of fluff, swayed gently in the breeze. A weathered rocking chair sat abandoned on the porch, its paint peeling in the relentless summer sun. A mischievous breeze rustled through the leaves of the ancient maple tree, casting dancing shadows on the crumbling stone patio. A lone hummingbird, its wings a blur of iridescent green, hovered near a cluster of honeysuckle, its long, slender beak probing for nectar. A discarded toy truck, its wheels rusted and immobile, lay half-buried in the soft earth. A lone robin, its breast a vibrant crimson, perched on a fence post, its melodious song echoing through the still air.",
    latitude: -33.8636005,
    longitude: 151.2092542,
    address: "Headington Rd, Headington, Oxford OX3 0BP",
    user: {
      _id: "sdfasdf",
      name: "Arancha Carpintero Guardiola",
      email: "carpinteroaranchag@gmail.com",
      profilePicture: null,
    },
    disasterId: "string",
    priority: PriorityTypes.HIGH,
  },
  {
    _id: "10",
    type: {
      _id: "3",
      title: PinTypes.HELP_OFFER,
      description: "",
    },
    title: "We need things",
    description:
      "The old, weathered clock ticked incessantly, each chime a melancholic echo in the dusty attic. A forgotten photograph lay nestled amongst cobwebs, a sepia-toned portrait whispering tales of a bygone era. Dust motes danced in the single shaft of sunlight piercing the gloom, illuminating a tarnished silver locket. A sudden gust of wind rattled the windowpane, momentarily dispelling the oppressive silence.",
    additionalInfo:
      "The rusty swingset creaked ominously in the fading light, a lone sentinel in the overgrown backyard. A mischievous squirrel chattered from a nearby oak, its bushy tail twitching with agitation. The air hung heavy with the scent of petrichor, the earth releasing its earthy fragrance after a recent downpour. A lone ladybug, its crimson shell gleaming like a miniature jewel, crawled along a weathered brick path. A symphony of crickets chirped in the distance, their incessant chorus a lullaby to the twilight. A forgotten kite, its vibrant colors faded and tattered, lay tangled in the branches of a weeping willow. A lone dandelion, its seed head a delicate sphere of fluff, swayed gently in the breeze. A weathered rocking chair sat abandoned on the porch, its paint peeling in the relentless summer sun. A mischievous breeze rustled through the leaves of the ancient maple tree, casting dancing shadows on the crumbling stone patio. A lone hummingbird, its wings a blur of iridescent green, hovered near a cluster of honeysuckle, its long, slender beak probing for nectar. A discarded toy truck, its wheels rusted and immobile, lay half-buried in the soft earth. A lone robin, its breast a vibrant crimson, perched on a fence post, its melodious song echoing through the still air.",
    latitude: -33.869395,
    longitude: 151.198648,
    address: "Headington Rd, Headington, Oxford OX3 0BP",
    user: {
      _id: "sdfasdf",
      name: "Arancha Carpintero Guardiola",
      email: "carpinteroaranchag@gmail.com",
      profilePicture: null,
    },
    disasterId: "string",
    priority: PriorityTypes.HIGH,
  },
  {
    _id: "11",
    type: {
      _id: "4",
      title: PinTypes.COLLECTION_POINT,
      description: "",
    },
    title: "We need things",
    description:
      "The old, weathered clock ticked incessantly, each chime a melancholic echo in the dusty attic. A forgotten photograph lay nestled amongst cobwebs, a sepia-toned portrait whispering tales of a bygone era. Dust motes danced in the single shaft of sunlight piercing the gloom, illuminating a tarnished silver locket. A sudden gust of wind rattled the windowpane, momentarily dispelling the oppressive silence.",
    additionalInfo:
      "The rusty swingset creaked ominously in the fading light, a lone sentinel in the overgrown backyard. A mischievous squirrel chattered from a nearby oak, its bushy tail twitching with agitation. The air hung heavy with the scent of petrichor, the earth releasing its earthy fragrance after a recent downpour. A lone ladybug, its crimson shell gleaming like a miniature jewel, crawled along a weathered brick path. A symphony of crickets chirped in the distance, their incessant chorus a lullaby to the twilight. A forgotten kite, its vibrant colors faded and tattered, lay tangled in the branches of a weeping willow. A lone dandelion, its seed head a delicate sphere of fluff, swayed gently in the breeze. A weathered rocking chair sat abandoned on the porch, its paint peeling in the relentless summer sun. A mischievous breeze rustled through the leaves of the ancient maple tree, casting dancing shadows on the crumbling stone patio. A lone hummingbird, its wings a blur of iridescent green, hovered near a cluster of honeysuckle, its long, slender beak probing for nectar. A discarded toy truck, its wheels rusted and immobile, lay half-buried in the soft earth. A lone robin, its breast a vibrant crimson, perched on a fence post, its melodious song echoing through the still air.",
    latitude: -33.8665445,
    longitude: 151.1989808,
    address: "Headington Rd, Headington, Oxford OX3 0BP",
    user: {
      _id: "sdfasdf",
      name: "Arancha Carpintero Guardiola",
      email: "carpinteroaranchag@gmail.com",
      profilePicture: null,
    },
    disasterId: "string",
    priority: PriorityTypes.HIGH,
  },
  {
    _id: "12",
    type: {
      _id: "5",
      title: PinTypes.MEDICAL_POINT,
      description: "",
    },
    title: "We need things",
    description:
      "The old, weathered clock ticked incessantly, each chime a melancholic echo in the dusty attic. A forgotten photograph lay nestled amongst cobwebs, a sepia-toned portrait whispering tales of a bygone era. Dust motes danced in the single shaft of sunlight piercing the gloom, illuminating a tarnished silver locket. A sudden gust of wind rattled the windowpane, momentarily dispelling the oppressive silence.",
    additionalInfo:
      "The rusty swingset creaked ominously in the fading light, a lone sentinel in the overgrown backyard. A mischievous squirrel chattered from a nearby oak, its bushy tail twitching with agitation. The air hung heavy with the scent of petrichor, the earth releasing its earthy fragrance after a recent downpour. A lone ladybug, its crimson shell gleaming like a miniature jewel, crawled along a weathered brick path. A symphony of crickets chirped in the distance, their incessant chorus a lullaby to the twilight. A forgotten kite, its vibrant colors faded and tattered, lay tangled in the branches of a weeping willow. A lone dandelion, its seed head a delicate sphere of fluff, swayed gently in the breeze. A weathered rocking chair sat abandoned on the porch, its paint peeling in the relentless summer sun. A mischievous breeze rustled through the leaves of the ancient maple tree, casting dancing shadows on the crumbling stone patio. A lone hummingbird, its wings a blur of iridescent green, hovered near a cluster of honeysuckle, its long, slender beak probing for nectar. A discarded toy truck, its wheels rusted and immobile, lay half-buried in the soft earth. A lone robin, its breast a vibrant crimson, perched on a fence post, its melodious song echoing through the still air.",
    latitude: -33.869627,
    longitude: 151.202146,
    address: "Headington Rd, Headington, Oxford OX3 0BP",
    user: {
      _id: "sdfasdf",
      name: "Arancha Carpintero Guardiola",
      email: "carpinteroaranchag@gmail.com",
      profilePicture: null,
    },
    disasterId: "string",
    priority: PriorityTypes.HIGH,
  },
  {
    _id: "13",
    type: {
      _id: "2",
      title: PinTypes.INFORMATION_POINT,
      description: "",
    },
    title: "We need things",
    description:
      "The old, weathered clock ticked incessantly, each chime a melancholic echo in the dusty attic. A forgotten photograph lay nestled amongst cobwebs, a sepia-toned portrait whispering tales of a bygone era. Dust motes danced in the single shaft of sunlight piercing the gloom, illuminating a tarnished silver locket. A sudden gust of wind rattled the windowpane, momentarily dispelling the oppressive silence.",
    additionalInfo:
      "The rusty swingset creaked ominously in the fading light, a lone sentinel in the overgrown backyard. A mischievous squirrel chattered from a nearby oak, its bushy tail twitching with agitation. The air hung heavy with the scent of petrichor, the earth releasing its earthy fragrance after a recent downpour. A lone ladybug, its crimson shell gleaming like a miniature jewel, crawled along a weathered brick path. A symphony of crickets chirped in the distance, their incessant chorus a lullaby to the twilight. A forgotten kite, its vibrant colors faded and tattered, lay tangled in the branches of a weeping willow. A lone dandelion, its seed head a delicate sphere of fluff, swayed gently in the breeze. A weathered rocking chair sat abandoned on the porch, its paint peeling in the relentless summer sun. A mischievous breeze rustled through the leaves of the ancient maple tree, casting dancing shadows on the crumbling stone patio. A lone hummingbird, its wings a blur of iridescent green, hovered near a cluster of honeysuckle, its long, slender beak probing for nectar. A discarded toy truck, its wheels rusted and immobile, lay half-buried in the soft earth. A lone robin, its breast a vibrant crimson, perched on a fence post, its melodious song echoing through the still air.",
    latitude: -33.87488,
    longitude: 151.1987113,
    address: "Headington Rd, Headington, Oxford OX3 0BP",
    user: {
      _id: "sdfasdf",
      name: "Arancha Carpintero Guardiola",
      email: "carpinteroaranchag@gmail.com",
      profilePicture: null,
    },
    disasterId: "string",
    priority: PriorityTypes.HIGH,
  },
  {
    _id: "14",
    type: {
      _id: "1",
      title: PinTypes.MISSINGS,
      description: "",
    },
    title: "We need things",
    description:
      "The old, weathered clock ticked incessantly, each chime a melancholic echo in the dusty attic. A forgotten photograph lay nestled amongst cobwebs, a sepia-toned portrait whispering tales of a bygone era. Dust motes danced in the single shaft of sunlight piercing the gloom, illuminating a tarnished silver locket. A sudden gust of wind rattled the windowpane, momentarily dispelling the oppressive silence.",
    additionalInfo:
      "The rusty swingset creaked ominously in the fading light, a lone sentinel in the overgrown backyard. A mischievous squirrel chattered from a nearby oak, its bushy tail twitching with agitation. The air hung heavy with the scent of petrichor, the earth releasing its earthy fragrance after a recent downpour. A lone ladybug, its crimson shell gleaming like a miniature jewel, crawled along a weathered brick path. A symphony of crickets chirped in the distance, their incessant chorus a lullaby to the twilight. A forgotten kite, its vibrant colors faded and tattered, lay tangled in the branches of a weeping willow. A lone dandelion, its seed head a delicate sphere of fluff, swayed gently in the breeze. A weathered rocking chair sat abandoned on the porch, its paint peeling in the relentless summer sun. A mischievous breeze rustled through the leaves of the ancient maple tree, casting dancing shadows on the crumbling stone patio. A lone hummingbird, its wings a blur of iridescent green, hovered near a cluster of honeysuckle, its long, slender beak probing for nectar. A discarded toy truck, its wheels rusted and immobile, lay half-buried in the soft earth. A lone robin, its breast a vibrant crimson, perched on a fence post, its melodious song echoing through the still air.",
    latitude: -33.8605523,
    longitude: 151.1972205,
    address: "Headington Rd, Headington, Oxford OX3 0BP",
    user: {
      _id: "sdfasdf",
      name: "Arancha Carpintero Guardiola",
      email: "carpinteroaranchag@gmail.com",
      profilePicture: null,
    },
    disasterId: "string",
    priority: PriorityTypes.HIGH,
  },
];
