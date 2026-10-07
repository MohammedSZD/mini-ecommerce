import type { Product } from "../types/product";
import { colors } from "./colors";

import smartphone from "../assets/products/smartphone.svg";
import laptop from "../assets/products/laptop.svg";
import headphones from "../assets/products/headphones.svg";
import earbuds from "../assets/products/earbuds.svg";
import speaker from "../assets/products/speaker.svg";
import smartwatch from "../assets/products/smartwatch.svg";
import fitnessBand from "../assets/products/fitness-band.svg";
import charger from "../assets/products/charger.svg";
import keyboard from "../assets/products/keyboard.svg";
import powerBank from "../assets/products/power-bank.svg";

/** Fictional demo catalog. Brands and products are made up. */
export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Orbit One 5G",
    description: "6.4-inch OLED display, all-day battery and a dual-lens camera.",
    price: 699,
    imageUrl: smartphone,
    category: "Smartphones",
    colors: colors("Graphite", "Silver", "Blue"),
  },
  {
    id: 2,
    title: "Nimbus Air 14",
    description: "Ultralight 14-inch laptop with a sharp display and 16 GB memory.",
    price: 1199,
    imageUrl: laptop,
    category: "Laptops",
    colors: colors("Silver", "Graphite"),
  },
  {
    id: 3,
    title: "Halo ANC Headphones",
    description: "Over-ear wireless headphones with adaptive noise cancelling.",
    price: 249,
    imageUrl: headphones,
    category: "Audio",
    colors: colors("Black", "White", "Blue"),
  },
  {
    id: 4,
    title: "Halo Buds",
    description: "Compact true wireless earbuds with a pocket-sized charging case.",
    price: 129,
    imageUrl: earbuds,
    category: "Audio",
    colors: colors("White", "Black"),
  },
  {
    id: 5,
    title: "Pulse Mini Speaker",
    description: "Water-resistant Bluetooth speaker with surprisingly full sound.",
    price: 79,
    imageUrl: speaker,
    category: "Audio",
    colors: colors("Black", "Green", "Red"),
  },
  {
    id: 6,
    title: "Tempo Watch S2",
    description: "Always-on smartwatch with GPS, sleep tracking and 5-day battery.",
    price: 299,
    imageUrl: smartwatch,
    category: "Wearables",
    colors: colors("Black", "Silver", "Gold"),
  },
  {
    id: 7,
    title: "Tempo Band 3",
    description: "Lightweight fitness band that tracks activity, heart rate and sleep.",
    price: 59,
    imageUrl: fitnessBand,
    category: "Wearables",
    colors: colors("Black", "Blue"),
  },
  {
    id: 8,
    title: "Anchor 65W GaN Charger",
    description: "Fast USB-C wall charger small enough to keep in your bag.",
    price: 49,
    imageUrl: charger,
    category: "Accessories",
    colors: colors("White", "Black"),
  },
  {
    id: 9,
    title: "Slate Mechanical Keyboard",
    description: "Compact wireless keyboard with hot-swappable tactile switches.",
    price: 119,
    imageUrl: keyboard,
    category: "Accessories",
    colors: colors("Graphite", "White"),
  },
  {
    id: 10,
    title: "Volt 20K Power Bank",
    description: "20,000 mAh power bank with two USB-C ports and a charge display.",
    price: 69,
    imageUrl: powerBank,
    category: "Accessories",
    colors: colors("Black", "Silver"),
  },
];
