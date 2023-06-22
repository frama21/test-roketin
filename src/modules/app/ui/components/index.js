import { AppBaseDialog, AppBaseLabel } from '@/modules/app/ui/components/base';
import { AppLayoutDefault, AppLayoutEmpty } from '@/modules/app/ui/components/layouts';

/**
 * Global components
 * @param app
 */
const BaseComponentRegister = app => {
  /**
   * Base Components
   * To make a components can access without import please put in below
   */
  app.component('AppBaseDialog', AppBaseDialog).component('AppBaseLabel', AppBaseLabel);

  /**
   * Base Layouts
   */
  app.component('EmptyLayout', AppLayoutEmpty);
  app.component('DefaultLayout', AppLayoutDefault);
};

export default BaseComponentRegister;
