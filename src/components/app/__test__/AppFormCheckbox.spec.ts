import { validationTest } from "@/components/__tests__/helpers/validation.spec";
import { describe, expect } from "vitest";
import { namedSlotTest } from '../../__tests__/helpers/slot.spec';
import { AppFormCheckbox as component } from '../';
import { inputTest } from "@/components/__tests__/helpers/form.spec";
const name = 'AppFormCheckbox';


describe(name, () => {
  // validation test
  validationTest(component);
  
  // input test
  inputTest(component, {
    disableTest: async (wrapper, testEmit)=>{
      const input = wrapper.find('[role="checkbox"]');
      await input.trigger('click');
      await testEmit();
    },
  });

  // slot tests
  namedSlotTest(component, 'checkbox');
})