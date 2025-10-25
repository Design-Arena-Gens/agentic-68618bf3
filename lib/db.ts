import { Cake, User, Order, Testimonial, Address } from './types';

export const cakes: Cake[] = [
  {
    id: '1',
    name: 'Classic Vanilla Dream',
    description: 'A timeless vanilla cake with smooth buttercream frosting. Perfect for any celebration.',
    price: 45.00,
    images: ['/cakes/vanilla-1.jpg', '/cakes/vanilla-2.jpg', '/cakes/vanilla-3.jpg'],
    category: 'Classic',
    flavor: 'Vanilla',
    occasion: 'Birthday',
    sizes: [
      { size: '6 inch', servings: 8, priceMultiplier: 1 },
      { size: '8 inch', servings: 12, priceMultiplier: 1.5 },
      { size: '10 inch', servings: 20, priceMultiplier: 2 }
    ],
    frostingOptions: ['Vanilla Buttercream', 'Chocolate Buttercream', 'Cream Cheese'],
    inStock: true,
    featured: true
  },
  {
    id: '2',
    name: 'Chocolate Indulgence',
    description: 'Rich chocolate cake layered with decadent chocolate ganache.',
    price: 50.00,
    images: ['/cakes/chocolate-1.jpg', '/cakes/chocolate-2.jpg', '/cakes/chocolate-3.jpg'],
    category: 'Premium',
    flavor: 'Chocolate',
    occasion: 'Birthday',
    sizes: [
      { size: '6 inch', servings: 8, priceMultiplier: 1 },
      { size: '8 inch', servings: 12, priceMultiplier: 1.5 },
      { size: '10 inch', servings: 20, priceMultiplier: 2 }
    ],
    frostingOptions: ['Chocolate Ganache', 'Chocolate Buttercream', 'Mocha'],
    inStock: true,
    featured: true
  },
  {
    id: '3',
    name: 'Red Velvet Romance',
    description: 'Luxurious red velvet cake with cream cheese frosting.',
    price: 55.00,
    images: ['/cakes/redvelvet-1.jpg', '/cakes/redvelvet-2.jpg', '/cakes/redvelvet-3.jpg'],
    category: 'Premium',
    flavor: 'Red Velvet',
    occasion: 'Wedding',
    sizes: [
      { size: '6 inch', servings: 8, priceMultiplier: 1 },
      { size: '8 inch', servings: 12, priceMultiplier: 1.5 },
      { size: '10 inch', servings: 20, priceMultiplier: 2 }
    ],
    frostingOptions: ['Cream Cheese', 'Vanilla Buttercream'],
    inStock: true,
    featured: true
  },
  {
    id: '4',
    name: 'Lemon Bliss',
    description: 'Light and refreshing lemon cake with zesty lemon frosting.',
    price: 48.00,
    images: ['/cakes/lemon-1.jpg', '/cakes/lemon-2.jpg', '/cakes/lemon-3.jpg'],
    category: 'Classic',
    flavor: 'Lemon',
    occasion: 'Anniversary',
    sizes: [
      { size: '6 inch', servings: 8, priceMultiplier: 1 },
      { size: '8 inch', servings: 12, priceMultiplier: 1.5 },
      { size: '10 inch', servings: 20, priceMultiplier: 2 }
    ],
    frostingOptions: ['Lemon Buttercream', 'Cream Cheese', 'Vanilla Buttercream'],
    inStock: true,
    featured: false
  },
  {
    id: '5',
    name: 'Strawberry Delight',
    description: 'Fresh strawberry cake with strawberry cream frosting.',
    price: 52.00,
    images: ['/cakes/strawberry-1.jpg', '/cakes/strawberry-2.jpg', '/cakes/strawberry-3.jpg'],
    category: 'Premium',
    flavor: 'Strawberry',
    occasion: 'Birthday',
    sizes: [
      { size: '6 inch', servings: 8, priceMultiplier: 1 },
      { size: '8 inch', servings: 12, priceMultiplier: 1.5 },
      { size: '10 inch', servings: 20, priceMultiplier: 2 }
    ],
    frostingOptions: ['Strawberry Cream', 'Vanilla Buttercream', 'Cream Cheese'],
    inStock: true,
    featured: false
  },
  {
    id: '6',
    name: 'Carrot Cake Supreme',
    description: 'Moist carrot cake with walnuts and cream cheese frosting.',
    price: 50.00,
    images: ['/cakes/carrot-1.jpg', '/cakes/carrot-2.jpg', '/cakes/carrot-3.jpg'],
    category: 'Classic',
    flavor: 'Carrot',
    occasion: 'Anniversary',
    sizes: [
      { size: '6 inch', servings: 8, priceMultiplier: 1 },
      { size: '8 inch', servings: 12, priceMultiplier: 1.5 },
      { size: '10 inch', servings: 20, priceMultiplier: 2 }
    ],
    frostingOptions: ['Cream Cheese', 'Vanilla Buttercream'],
    inStock: true,
    featured: false
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    rating: 5,
    comment: 'The chocolate cake was absolutely divine! Everyone at the party loved it.',
    date: new Date('2024-10-15')
  },
  {
    id: '2',
    name: 'Michael Chen',
    rating: 5,
    comment: 'Best wedding cake ever! The red velvet was perfect and looked stunning.',
    date: new Date('2024-10-10')
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    rating: 5,
    comment: 'Amazing quality and taste. The customization options made it perfect for our event.',
    date: new Date('2024-10-05')
  }
];

export const users: User[] = [];
export const orders: Order[] = [];

export function findUserByEmail(email: string): User | undefined {
  return users.find(u => u.email === email);
}

export function findUserById(id: string): User | undefined {
  return users.find(u => u.id === id);
}

export function createUser(user: User): User {
  users.push(user);
  return user;
}

export function updateUser(id: string, updates: Partial<User>): User | undefined {
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return undefined;
  users[index] = { ...users[index], ...updates };
  return users[index];
}

export function createOrder(order: Order): Order {
  orders.push(order);
  return order;
}

export function findOrdersByUserId(userId: string): Order[] {
  return orders.filter(o => o.userId === userId);
}

export function findOrderById(id: string): Order | undefined {
  return orders.find(o => o.id === id);
}

export function updateOrder(id: string, updates: Partial<Order>): Order | undefined {
  const index = orders.findIndex(o => o.id === id);
  if (index === -1) return undefined;
  orders[index] = { ...orders[index], ...updates };
  return orders[index];
}

export function findCakeById(id: string): Cake | undefined {
  return cakes.find(c => c.id === id);
}

export function updateCake(id: string, updates: Partial<Cake>): Cake | undefined {
  const index = cakes.findIndex(c => c.id === id);
  if (index === -1) return undefined;
  cakes[index] = { ...cakes[index], ...updates };
  return cakes[index];
}

export function createCake(cake: Cake): Cake {
  cakes.push(cake);
  return cake;
}

export function deleteCake(id: string): boolean {
  const index = cakes.findIndex(c => c.id === id);
  if (index === -1) return false;
  cakes.splice(index, 1);
  return true;
}
