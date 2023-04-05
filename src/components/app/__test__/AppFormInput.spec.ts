import { validationTest } from "@/components/__tests__/helpers/validation.spec";
import { describe } from "vitest";
import { namedSlotTest } from '../../__tests__/helpers/slot.spec';
import { AppFormInput } from '../';
const name = 'AppFormInput';


describe(name, () => {
  validationTest(AppFormInput);
  namedSlotTest(AppFormInput, 'prepend');
  namedSlotTest(AppFormInput, 'append');
})