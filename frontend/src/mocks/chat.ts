import {
  ChatStatus,
  MessageStatus,
  PinTypes,
  PriorityTypes,
} from "@/types/enums";
import { IChat } from "@/types/structures";

export const chatMock: IChat[] = [
  {
    _id: "1",
    participants: [
      {
        user: {
          _id: "6793c1ab4ef2222c5e1270e2",
          name: "Arancha Carpintero Guardiola",
          email: "19315348@brookes.ac.uk",
          profilePicture: null,
        },
        role: "seeker",
        lastRead: "2025-01-14",
      },
      {
        user: {
          _id: "02",
          name: "Emily Prentiss",
          email: "emilyprentiss@email.com",
        },
        role: "volunteer",
        lastRead: "2025-01-14",
      },
    ],
    createdAt: "2025-01-14",
    updatedAt: "2025-01-14",
    status: ChatStatus.ACTIVE,
    pin: {
      _id: "0",
      type: {
        _id: "1",
        title: PinTypes.MISSINGS,
        description: "",
      },
      title: "Pin Title 1",
      description:
        "The old, weathered clock ticked incessantly, each chime a melancholic echo in the dusty attic. A forgotten photograph lay nestled amongst cobwebs, a sepia-toned portrait whispering tales of a bygone era. Dust motes danced in the single shaft of sunlight piercing the gloom, illuminating a tarnished silver locket. A sudden gust of wind rattled the windowpane, momentarily dispelling the oppressive silence.",
      additionalInfo:
        "The rusty swingset creaked ominously in the fading light, a lone sentinel in the overgrown backyard. A mischievous squirrel chattered from a nearby oak, its bushy tail twitching with agitation. The air hung heavy with the scent of petrichor, the earth releasing its earthy fragrance after a recent downpour. A lone ladybug, its crimson shell gleaming like a miniature jewel, crawled along a weathered brick path. A symphony of crickets chirped in the distance, their incessant chorus a lullaby to the twilight. A forgotten kite, its vibrant colors faded and tattered, lay tangled in the branches of a weeping willow. A lone dandelion, its seed head a delicate sphere of fluff, swayed gently in the breeze. A weathered rocking chair sat abandoned on the porch, its paint peeling in the relentless summer sun. A mischievous breeze rustled through the leaves of the ancient maple tree, casting dancing shadows on the crumbling stone patio. A lone hummingbird, its wings a blur of iridescent green, hovered near a cluster of honeysuckle, its long, slender beak probing for nectar. A discarded toy truck, its wheels rusted and immobile, lay half-buried in the soft earth. A lone robin, its breast a vibrant crimson, perched on a fence post, its melodious song echoing through the still air.",
      coordinates: { lat: -33.8567844, lng: 151.213108 },
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
    messages: [
      {
        _id: "001",
        chatId: "1",
        sender: "02",
        content: "This is a message",
        createdAt: "2025-01-14",
        status: MessageStatus.SENT,
      },
      {
        _id: "002",
        chatId: "1",
        sender: "02",
        content: "This is another message",
        createdAt: "2025-01-14",
        status: MessageStatus.SENT,
      },
      {
        _id: "003",
        chatId: "1",
        sender: "02",
        content: "This is the third and last message",
        createdAt: "2025-01-14",
        status: MessageStatus.SENT,
      },
    ],
  },
  {
    _id: "2",
    participants: [
      {
        user: {
          _id: "6793c1ab4ef2222c5e1270e2",
          name: "Arancha Carpintero Guardiola",
          email: "19315348@brookes.ac.uk",
          profilePicture: null,
        },
        role: "seeker",
        lastRead: "2025-01-14",
      },
      {
        user: {
          _id: "02",
          name: "Aaron Hotchner",
          email: "emilyprentiss@email.com",
        },
        role: "volunteer",
        lastRead: "2025-01-14",
      },
    ],
    createdAt: "2025-01-14",
    updatedAt: "2025-01-14",
    status: ChatStatus.ACTIVE,
    pin: {
      _id: "0",
      type: {
        _id: "1",
        title: PinTypes.HELP_OFFER,
        description: "",
      },
      title: "Pin Title 2",
      description:
        "The old, weathered clock ticked incessantly, each chime a melancholic echo in the dusty attic. A forgotten photograph lay nestled amongst cobwebs, a sepia-toned portrait whispering tales of a bygone era. Dust motes danced in the single shaft of sunlight piercing the gloom, illuminating a tarnished silver locket. A sudden gust of wind rattled the windowpane, momentarily dispelling the oppressive silence.",
      additionalInfo:
        "The rusty swingset creaked ominously in the fading light, a lone sentinel in the overgrown backyard. A mischievous squirrel chattered from a nearby oak, its bushy tail twitching with agitation. The air hung heavy with the scent of petrichor, the earth releasing its earthy fragrance after a recent downpour. A lone ladybug, its crimson shell gleaming like a miniature jewel, crawled along a weathered brick path. A symphony of crickets chirped in the distance, their incessant chorus a lullaby to the twilight. A forgotten kite, its vibrant colors faded and tattered, lay tangled in the branches of a weeping willow. A lone dandelion, its seed head a delicate sphere of fluff, swayed gently in the breeze. A weathered rocking chair sat abandoned on the porch, its paint peeling in the relentless summer sun. A mischievous breeze rustled through the leaves of the ancient maple tree, casting dancing shadows on the crumbling stone patio. A lone hummingbird, its wings a blur of iridescent green, hovered near a cluster of honeysuckle, its long, slender beak probing for nectar. A discarded toy truck, its wheels rusted and immobile, lay half-buried in the soft earth. A lone robin, its breast a vibrant crimson, perched on a fence post, its melodious song echoing through the still air.",
      coordinates: { lat: -33.8567844, lng: 151.213108 },
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
    messages: [
      {
        _id: "001",
        chatId: "1",
        sender: "02",
        content: "This is a message",
        createdAt: "2025-01-14",
        status: MessageStatus.RECEIVED,
      },
      {
        _id: "002",
        chatId: "1",
        sender: "02",
        content: "This is another message",
        createdAt: "2025-01-14",
        status: MessageStatus.RECEIVED,
      },
      {
        _id: "003",
        chatId: "1",
        sender: "02",
        content: "This is the third and last message",
        createdAt: "2025-01-14",
        status: MessageStatus.RECEIVED,
      },
      {
        _id: "004",
        chatId: "1",
        sender: "6793c1ab4ef2222c5e1270e2",
        content: "This is a response",
        createdAt: "2025-01-14",
        status: MessageStatus.RECEIVED,
      },
    ],
  },
  {
    _id: "3",
    participants: [
      {
        user: {
          _id: "6793c1ab4ef2222c5e1270e2",
          name: "Arancha Carpintero Guardiola",
          email: "19315348@brookes.ac.uk",
          profilePicture: null,
        },
        role: "seeker",
        lastRead: "2025-01-14",
      },
      {
        user: {
          _id: "02",
          name: "Derek Morgan",
          email: "emilyprentiss@email.com",
        },
        role: "volunteer",
        lastRead: "2025-01-14",
      },
    ],
    createdAt: "2025-01-14",
    updatedAt: "2025-01-14",
    status: ChatStatus.ACTIVE,
    pin: {
      _id: "0",
      type: {
        _id: "1",
        title: PinTypes.HELP_REQUEST,
        description: "",
      },
      title: "Pin Title 3",
      description:
        "The old, weathered clock ticked incessantly, each chime a melancholic echo in the dusty attic. A forgotten photograph lay nestled amongst cobwebs, a sepia-toned portrait whispering tales of a bygone era. Dust motes danced in the single shaft of sunlight piercing the gloom, illuminating a tarnished silver locket. A sudden gust of wind rattled the windowpane, momentarily dispelling the oppressive silence.",
      additionalInfo:
        "The rusty swingset creaked ominously in the fading light, a lone sentinel in the overgrown backyard. A mischievous squirrel chattered from a nearby oak, its bushy tail twitching with agitation. The air hung heavy with the scent of petrichor, the earth releasing its earthy fragrance after a recent downpour. A lone ladybug, its crimson shell gleaming like a miniature jewel, crawled along a weathered brick path. A symphony of crickets chirped in the distance, their incessant chorus a lullaby to the twilight. A forgotten kite, its vibrant colors faded and tattered, lay tangled in the branches of a weeping willow. A lone dandelion, its seed head a delicate sphere of fluff, swayed gently in the breeze. A weathered rocking chair sat abandoned on the porch, its paint peeling in the relentless summer sun. A mischievous breeze rustled through the leaves of the ancient maple tree, casting dancing shadows on the crumbling stone patio. A lone hummingbird, its wings a blur of iridescent green, hovered near a cluster of honeysuckle, its long, slender beak probing for nectar. A discarded toy truck, its wheels rusted and immobile, lay half-buried in the soft earth. A lone robin, its breast a vibrant crimson, perched on a fence post, its melodious song echoing through the still air.",
      coordinates: { lat: -33.8567844, lng: 151.213108 },
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
    messages: [
      {
        _id: "001",
        chatId: "1",
        sender: "02",
        content: "This is a message",
        createdAt: "2025-01-14",
        status: MessageStatus.SENT,
      },
      {
        _id: "002",
        chatId: "1",
        sender: "02",
        content: "This is another message",
        createdAt: "2025-01-14",
        status: MessageStatus.SENT,
      },
      {
        _id: "003",
        chatId: "1",
        sender: "02",
        content: "This is the third and last message",
        createdAt: "2025-01-14",
        status: MessageStatus.SENT,
      },
    ],
  },
];
