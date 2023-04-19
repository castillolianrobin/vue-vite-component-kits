import { validationTest } from "@/components/__tests__/helpers/validation.spec";
import { describe, expect } from "vitest";
import { defaultSlotTest, namedSlotTest } from '../../__tests__/helpers/slot.spec';
import { AppFormRadio as component } from '../';
import { inputTest } from "@/components/__tests__/helpers/form.spec";
const name = 'AppFormRadio';


describe(name, () => {
  // validation test
  validationTest(component);
  
  // input test
  inputTest(component, {
    disableTest: async (wrapper, testEmit)=>{
      const input = wrapper.find('[role="radio"]');
      await input.trigger('click');
      await testEmit();
    },
  });

  // slot tests
  namedSlotTest(component, 'radio')
})