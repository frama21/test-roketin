import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

// icon
library.add(fas);

const FontAwesomeComponent = app => {
  app.component('FontAwesomeIcon', FontAwesomeIcon);
};

export default FontAwesomeComponent;
