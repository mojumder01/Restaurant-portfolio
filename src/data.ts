// All restaurant content lives here: dishes, menu, gallery, reviews and contact details.
// Photos are Unsplash photo ids (the last part of an unsplash.com/photos/... link).
// To use your own photo instead, put a full image URL or a file in /public in `photo`.

export type Spice = 'Mild' | 'Medium' | 'Hot' | '';

export interface Dish {
  id: string;
  bn: string;
  name: string;
  desc: string;
  price: number;
  photo: string;
  spice?: Spice;
  tag?: string;
}

export const restaurant = {
  name: 'Aurelia',
  tagline: 'Bengali kitchen',
  area: 'Gulshan 2, Dhaka',
  address: 'Road 71, Gulshan 2, Dhaka 1212',
  phone: '+880 1700-000000',
  phoneHref: 'tel:+8801700000000',
  email: 'hello@aurelia.example',
  hours: [
    { days: 'Saturday – Thursday', time: '12:00 – 23:00' },
    { days: 'Friday', time: '13:30 – 23:30' },
  ],
};

export const heroPhoto = 'ysmeQt1dzcw';

export const signatures: Dish[] = [
  { id: 'kacchi', tag: 'Bestseller', bn: 'কাচ্চি বিরিয়ানি', name: 'Mutton kacchi biryani', price: 890, photo: 'zVT0sPIo58g', desc: 'Marinated mutton and aromatic rice sealed in the handi and slow-cooked on charcoal.' },
  { id: 'ilish', tag: 'Seasonal', bn: 'সর্ষে ইলিশ', name: 'Shorshe ilish', price: 1250, photo: 'tklxd4BUWBs', desc: 'Padma hilsa steamed in fresh mustard paste, green chilli and mustard oil.' },
  { id: 'kalabhuna', tag: 'Chittagong style', bn: 'কালা ভুনা', name: 'Beef kala bhuna', price: 780, photo: 'eEWlcfydzQ4', desc: 'Beef slow-fried for hours until dark, rich and tender, with whole spices.' },
  { id: 'rezala', tag: 'Mughlai', bn: 'মাটন রেজালা', name: 'Mutton rezala', price: 850, photo: '3OMLWzkkt0Y', desc: 'Silky yoghurt and cashew gravy, kewra and fried onion.' },
  { id: 'malai', tag: 'Chef’s pick', bn: 'চিংড়ি মালাই কারি', name: 'Chingri malai curry', price: 1150, photo: 'tWkA48kabZE', desc: 'Golda prawns simmered in a gentle coconut-milk curry.' },
];

export const menuTabs = [
  { id: 'biryani', label: 'Biryani & rice' },
  { id: 'curries', label: 'Curries' },
  { id: 'starters', label: 'Street-style starters' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'drinks', label: 'Drinks' },
] as const;

export type MenuTab = (typeof menuTabs)[number]['id'];

export const menu: Record<MenuTab, Dish[]> = {
  biryani: [
    { id: 'kacchi', bn: 'কাচ্চি বিরিয়ানি', name: 'Mutton kacchi biryani', desc: 'Our signature, with aloo and a glass of borhani', price: 890, spice: 'Medium', photo: 'zVT0sPIo58g' },
    { id: 'tehari', bn: 'বিফ তেহারি', name: 'Beef tehari', desc: 'Old-Dhaka style, mustard oil and green chilli', price: 520, spice: 'Medium', photo: 'hEeA50ZHo4o' },
    { id: 'polao', bn: 'মোরগ পোলাও', name: 'Morog polao', desc: 'Fragrant polao with a whole leg of chicken', price: 620, spice: 'Mild', photo: 'qykaahjNbgA' },
    { id: 'khichuri', bn: 'ভুনা খিচুড়ি', name: 'Bhuna khichuri', desc: 'With beef bhuna and a fried egg — a rainy-day classic', price: 480, spice: 'Medium', photo: 'I7-ORDdavFk' },
  ],
  curries: [
    { id: 'kalabhuna', bn: 'কালা ভুনা', name: 'Beef kala bhuna', desc: 'Slow-fried until dark and tender', price: 780, spice: 'Hot', photo: 'eEWlcfydzQ4' },
    { id: 'rezala', bn: 'মাটন রেজালা', name: 'Mutton rezala', desc: 'Yoghurt, cashew and kewra', price: 850, spice: 'Mild', photo: '3OMLWzkkt0Y' },
    { id: 'ilish', bn: 'সর্ষে ইলিশ', name: 'Shorshe ilish', desc: 'Hilsa in fresh mustard paste', price: 1250, spice: 'Medium', photo: 'tklxd4BUWBs' },
    { id: 'roast', bn: 'চিকেন রোস্ট', name: 'Wedding-style chicken roast', desc: 'Sweet-spiced, rich and buttery', price: 520, spice: 'Mild', photo: 'tsQhEvzU6MQ' },
  ],
  starters: [
    { id: 'fuchka', bn: 'ফুচকা', name: 'Fuchka', desc: 'Crisp shells, spiced potato and tamarind water', price: 250, spice: 'Medium', photo: 'KPC-IA1-ZaA' },
    { id: 'chotpoti', bn: 'চটপটি', name: 'Chotpoti', desc: 'Yellow peas, egg, tamarind and onion', price: 220, spice: 'Medium', photo: '_sfMD-OhFR8' },
    { id: 'shami', bn: 'শামি কাবাব', name: 'Shami kebab', desc: 'Minced beef and lentil patties, mint chutney', price: 320, spice: 'Mild', photo: 'n0zK35d967w' },
    { id: 'reshmi', bn: 'রেশমি কাবাব', name: 'Chicken reshmi kebab', desc: 'Creamy, charcoal-grilled skewers', price: 480, spice: 'Mild', photo: 'FOZbF67e-DE' },
  ],
  desserts: [
    { id: 'kalojam', bn: 'কালোজাম', name: 'Kalojam', desc: 'Warm milk dumplings in cardamom syrup', price: 200, photo: '2oJ4eGRPqrE' },
    { id: 'shahitukra', bn: 'শাহী টুকরা', name: 'Shahi tukra', desc: 'Fried bread, saffron rabri and pistachio', price: 350, photo: 'uwu2ZLDmX8k' },
    { id: 'mishtidoi', bn: 'মিষ্টি দই', name: 'Mishti doi', desc: 'Bogura-style sweet yoghurt', price: 180, photo: 'jFTgZ4P7ATU' },
    { id: 'custard', bn: 'ফ্রুট কাস্টার্ড', name: 'Fruit custard', desc: 'Vanilla custard with seasonal fruit', price: 250, photo: '86Xd_vAyFv4' },
  ],
  drinks: [
    { id: 'borhani', bn: 'বোরহানি', name: 'Borhani', desc: 'Spiced yoghurt drink — made for kacchi', price: 150, photo: '0sz-sfC_ekc' },
    { id: 'lassi', bn: 'ম্যাংগো লাচ্ছি', name: 'Mango lassi', desc: 'Rajshahi mangoes and yoghurt', price: 220, photo: 'KlVIYmGVRQ8' },
    { id: 'lebucha', bn: 'লেবু চা', name: 'Lebu cha', desc: 'Lemon tea with ginger and a pinch of black salt', price: 90, photo: 'GDpTZESzJDQ' },
    { id: 'icedtea', bn: 'আইসড লেমন টি', name: 'Iced lemon tea', desc: 'Black tea, lemon and mint over ice', price: 160, photo: 'FM253_03JJw' },
  ],
};

export const story = {
  photos: ['Wj-JhBwtXVY', 'vsnAIYA9bms', '7a--Ad6mkNE'],
  pillars: [
    { title: 'Dum on charcoal', body: 'Biryani sealed under a dough lid and slow-cooked the traditional way.' },
    { title: 'Spices ground daily', body: 'Whole spices roasted and ground in our kitchen every morning.' },
    { title: 'Market at dawn', body: 'Fish, meat and vegetables bought fresh each day.' },
  ],
  stats: [
    { value: 32, suffix: '', label: 'Years of family recipes' },
    { value: 48, suffix: '', label: 'Dishes on the menu' },
    { value: 4.9, suffix: '', label: 'Average guest rating', decimals: 1 },
  ],
};

export const gallery = [
  { photo: 'vsnAIYA9bms', caption: 'A full table, the Bengali way' },
  { photo: 'Wj-JhBwtXVY', caption: 'Low and slow on the stove' },
  { photo: 'KPC-IA1-ZaA', caption: 'Street-food spirit' },
  { photo: 'Wzo_34cS5bA', caption: 'The dining room at night' },
  { photo: '0hnVMVaDaNM', caption: 'Kebabs off the grill' },
  { photo: 'T8iKgDAvRrg', caption: 'Sweets for the road' },
];

export const reviews = [
  { name: 'Nusrat J.', place: 'Banani', text: 'The kacchi is the real thing — the meat falls off the bone and the rice smells of ghee and kewra. We now come every Friday.' },
  { name: 'Tanvir A.', place: 'Dhanmondi', text: 'Shorshe ilish that tastes like home. Warm staff, beautiful room, and the borhani is perfect.' },
  { name: 'Farhana R.', place: 'Gulshan', text: 'Booked the family table for my parents’ anniversary. Every dish was spot on, and they brought out shahi tukra with a candle.' },
  { name: 'Imran H.', place: 'Uttara', text: 'Kala bhuna with plain polao is worth the drive across town. Generous portions, fair prices.' },
];

export const reservePhoto = 'Wzo_34cS5bA';
