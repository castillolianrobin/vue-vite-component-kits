import { validationTest } from "@/components/__tests__/helpers/validation.spec";
import { describe } from "vitest";
import { namedSlotTest } from '../../__tests__/helpers/slot.spec';
import { AppFormRating as component } from '../';
import { inputTest } from "@/components/__tests__/helpers/form.spec";
const name = 'AppFormInput';


describe(name, () => {
  // validation test
  validationTest(component);
  
  // input test
  inputTest(component, {
    disableTest: async (wrapper, testEmit)=>{
      const input = wrapper.findAll('[aria-label="rating-input"]');
      await input[4].trigger('click');
      await testEmit();
    },
    newValue: 3,
    options: { props: { maxValue: 5 }},
  }, );

  // slot tests
  // namedSlotTest(component, 'prepend');
  // namedSlotTest(component, 'append');
})