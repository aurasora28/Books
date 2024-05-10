import {
  IconHome,
  IconPoint,
  IconApps,
  IconClipboard,
  IconFileDescription,
  IconBorderAll,
  IconAlertCircle,
  IconSettings,
  IconLogin,
  IconUserPlus,
  IconRotate,
  IconZoomCode

} from '@tabler/icons';
import { uniqueId } from 'lodash';

const Menuitems = [
  {
    id: uniqueId(),
    title: 'Apps',
    icon: IconApps,
    href: '/apps/',
    children: [   
      {
        id: uniqueId(),
        title: 'Books',
        icon: IconPoint,
        href: '/apps/ecommerce/',
        children: [
          {
            id: uniqueId(),
            title: 'Catalog',
            icon: IconPoint,
            href: '/apps/ecommerce/shop',
          },
          {
            id: uniqueId(),
            title: 'Detail',
            icon: IconPoint,
            href: '/apps/ecommerce/detail/1',
          },
          {
            id: uniqueId(),
            title: 'List',
            icon: IconPoint,
            href: '/apps/ecommerce/eco-product-list',
          },
          {
            id: uniqueId(),
            title: 'Checkout',
            icon: IconPoint,
            href: '/apps/ecommerce/eco-checkout',
          },
        ],
      },
    ],
  },
];
export default Menuitems;
