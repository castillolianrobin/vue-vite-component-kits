import { validationTest } from "@/components/__tests__/helpers/validation.spec";
import { describe } from "vitest";
import { namedSlotTest } from '../../__tests__/helpers/slot.spec';
import { AppFormTextArea as component } from '../';
import { inputTest } from "@/components/__tests__/helpers/form.spec";
const name = 'AppFormInput';


describe(name, () => {
  // validation test
  validationTest(component);
  // input test
  inputTest(component)
  // slot tests
  namedSlotTest(component, 'prepend');
  namedSlotTest(component, 'append');
})