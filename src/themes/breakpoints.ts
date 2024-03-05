// export default {
//   breakpoints: ['30em', '48em', '62em', '80em'],
// };

import { createBreakpoints } from '@chakra-ui/theme-tools';
const breakpoints = createBreakpoints({
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
});

export default {
  breakpoints,
};
