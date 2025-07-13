import { Product } from '@/types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
    price: 199.99,
    image: '/api/placeholder/300/300',
    category: 'Electronics',
    stock: 25,
    rating: 4.5,
    reviews: [
      {
        id: '1',
        userId: '1',
        userName: 'John Doe',
        rating: 5,
        comment: 'Amazing sound quality and comfort!',
        createdAt: '2024-01-15T10:00:00Z'
      },
      {
        id: '2',
        userId: '2',
        userName: 'Jane Smith',
        rating: 4,
        comment: 'Great headphones, battery life is excellent.',
        createdAt: '2024-01-16T14:30:00Z'
      }
    ]
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking with heart rate monitoring, GPS, and smartphone notifications. Water resistant up to 50m.',
    price: 299.99,
    image: '/api/placeholder/300/300',
    category: 'Electronics',
    stock: 15,
    rating: 4.3,
    reviews: [
      {
        id: '3',
        userId: '3',
        userName: 'Mike Johnson',
        rating: 4,
        comment: 'Good fitness tracking features.',
        createdAt: '2024-01-17T09:15:00Z'
      }
    ]
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable 100% organic cotton t-shirt available in multiple colors. Eco-friendly and sustainable fashion.',
    price: 29.99,
    image: '/api/placeholder/300/300',
    category: 'Clothing',
    stock: 50,
    rating: 4.7,
    reviews: [
      {
        id: '4',
        userId: '4',
        userName: 'Sarah Wilson',
        rating: 5,
        comment: 'Super soft and comfortable!',
        createdAt: '2024-01-18T11:45:00Z'
      }
    ]
  },
  {
    id: '4',
    name: 'Premium Coffee Beans',
    description: 'Single-origin Arabica coffee beans, medium roast. Rich flavor with notes of chocolate and caramel.',
    price: 24.99,
    image: '/api/placeholder/300/300',
    category: 'Food',
    stock: 30,
    rating: 4.8,
    reviews: [
      {
        id: '5',
        userId: '5',
        userName: 'David Brown',
        rating: 5,
        comment: 'Best coffee I\'ve ever tasted!',
        createdAt: '2024-01-19T08:20:00Z'
      }
    ]
  },
  {
    id: '5',
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat with excellent grip and cushioning. Perfect for yoga, pilates, and general fitness.',
    price: 49.99,
    image: '/api/placeholder/300/300',
    category: 'Sports',
    stock: 20,
    rating: 4.4,
    reviews: [
      {
        id: '6',
        userId: '6',
        userName: 'Emily Davis',
        rating: 4,
        comment: 'Great quality and grip.',
        createdAt: '2024-01-20T16:10:00Z'
      }
    ]
  },
  {
    id: '6',
    name: 'Wireless Phone Charger',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator.',
    price: 39.99,
    image: '/api/placeholder/300/300',
    category: 'Electronics',
    stock: 35,
    rating: 4.2,
    reviews: [
      {
        id: '7',
        userId: '7',
        userName: 'Chris Martin',
        rating: 4,
        comment: 'Convenient and fast charging.',
        createdAt: '2024-01-21T13:25:00Z'
      }
    ]
  },
  {
    id: '7',
    name: 'Denim Jacket',
    description: 'Classic denim jacket with modern fit. Versatile piece that goes with any outfit.',
    price: 79.99,
    image: '/api/placeholder/300/300',
    category: 'Clothing',
    stock: 12,
    rating: 4.6,
    reviews: [
      {
        id: '8',
        userId: '8',
        userName: 'Lisa Taylor',
        rating: 5,
        comment: 'Perfect fit and style!',
        createdAt: '2024-01-22T12:40:00Z'
      }
    ]
  },
  {
    id: '8',
    name: 'Green Tea Set',
    description: 'Premium green tea collection with traditional ceramic teapot and cups. Perfect for tea ceremonies.',
    price: 89.99,
    image: '/api/placeholder/300/300',
    category: 'Food',
    stock: 8,
    rating: 4.9,
    reviews: [
      {
        id: '9',
        userId: '9',
        userName: 'Robert Lee',
        rating: 5,
        comment: 'Beautiful set and excellent tea quality.',
        createdAt: '2024-01-23T15:55:00Z'
      }
    ]
  }
];

export const categories = [
  'Electronics',
  'Clothing',
  'Food',
  'Sports',
  'Books',
  'Home',
  'Beauty'
];
