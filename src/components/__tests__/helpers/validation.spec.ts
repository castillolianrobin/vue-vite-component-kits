import type { ThemeColors } from "@/composables";
import { required } from "@/composables/validation/validations";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

export const validationTest = (component: any, name: string, options = {}) => {
  describe(`VALIDATION TEST: ${name}`, () => {

    // Required validation
    it("renders required label correctly", () => {
      const wrapper = mount(component, {
        props: {
          validations: 'required',
        },
      });
      const labels = wrapper
        .findAll("span")
        .filter(element => element.element.innerHTML.trim() === "*");
      // expect(wrapper.findAll('span').map(element => element.element)).toBe('asda')
      expect(labels.length).toBe(1);
      expect(labels[0].element.innerHTML.trim()).toBe("*");
      const errorClass:`text-${ThemeColors}` = 'text-error-500';
      expect(labels[0].element.className.includes(errorClass)).toBe(true);
    });

    it("validate required properly", async () => {
      const validation = required();
      const validationMessage = validation();
      const wrapper = mount(component, {
        props: {
          validations: 'required',
          modelValue: 'test',
        },
        ...options,
      });
      await wrapper.setProps({ modelValue: '' })
      
      const labels = wrapper
        .findAll("p")
        .filter(element => element.element.innerHTML === validationMessage)
      expect(labels.length).toBe(1);
      expect(labels[0].element.innerHTML).toBe(validationMessage);
    })
  });

  // try all validations if possible
}