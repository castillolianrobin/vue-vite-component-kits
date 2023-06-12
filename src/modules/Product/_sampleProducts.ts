import product1 from '@/assets/mock_assets/product/cement.png';
import product2 from '@/assets/mock_assets/product/rebar.png';
import product3 from '@/assets/mock_assets/product/cinder_block.png';
import product4 from '@/assets/mock_assets/product/lg-sahara-cement.png';
import product5 from '@/assets/mock_assets/product/lg-plywood.png';

export default [
  {
    id: 1,
    name: 'Cement',
    quantity: 10,
    image: product1,
    category: 'Concrete',
  },
  {
    id: 2,
    name: 'Rebar',
    quantity: 3000,
    image: product2,
    category: 'Metalworks',
  },

  {
    id: 3,
    name: 'Cinder Block',
    quantity: 300000,
    image: product3,
    category: 'Concrete',
  },

  {
    id: 4,
    name: 'Premium Cement',
    quantity: 300,
    image: product4,
    category: 'Concrete',
  },
  
  {
    id: 5,
    name: 'Large Plywood',
    quantity: 0,
    image: product5,
    category: 'Woodwork',
  },
]