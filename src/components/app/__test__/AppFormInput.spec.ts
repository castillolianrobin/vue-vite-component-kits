import { validationTest } from "@/components/__tests__/helpers/validation.spec";
import { describe } from "vitest";
import { AppFormInput } from '../';
import { namedSlotTest } from '../../__tests__/helpers/slot.spec';
const name = 'AppFormInput';


describe(name, () => {
  // Slot Tests
  validationTest(AppFormInput, name);
  namedSlotTest(AppFormInput, 'prepend', name);
  namedSlotTest(AppFormInput, 'append', name);

  /** test if hover is working */

  /** test if active is working */

  /** test if disabled css is working */

  /** test if loading css is working */
  
  /** test if sizes is working */
})