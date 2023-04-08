import { defaultSlotTest } from "@/components/__tests__/helpers/slot.spec";
import { describe } from "vitest";
import { AppFormInputContainer as component } from '..';
const name = 'AppFormInputContainer'
// Component specific test
describe(name, () => {
  // slot test
  defaultSlotTest(component);
});
