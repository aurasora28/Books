import {
  IconPoint,
  IconBasket,
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },
  {
    id: uniqueId(),
    title: 'Books',
    icon: IconBasket,
    href: '/apps/ecommerce/',
    children: [
      {
        id: uniqueId(),
        title: 'Catalog',
        icon: IconPoint,
        href: '/apps/ecommerce/shop',
      }
    ],
  }
];

export default Menuitems;
