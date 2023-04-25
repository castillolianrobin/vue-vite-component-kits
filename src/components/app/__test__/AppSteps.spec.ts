
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { AppSteps as component } from '..'
import type { ItemProp } from "../AppTabs.vue";
const name = 'AppSteps';
describe(name, ()=> {
  const step1Text = 'Step 1 Slot';
  const slots = {
    'step-1': `<p id="step-1-slot">${step1Text}</p>`,
    'step-2': `<p id="step-2-slot">${step1Text}</p>`,
  };
  // steps with no custom label
  const defaultW = mount(component, {
    props: {
      steps: 2,
    },
    slots
  });
  const labeledSteps = [
      'Test 1', 
      'Test 2', 
  ];
    // steps with custom label
  const labeledW = mount(component, {
    props: {
      steps: labeledSteps,
    },
    slots,
  });
  const steps = (wrapper: typeof defaultW) => wrapper.findAll('li');

  it('renders step properly', ()=> {
    expect(steps(defaultW)[1].find('span').text()).toContain('Step 2')    
    expect(steps(labeledW)[1].find('span').text()).toContain(labeledSteps[1])
  })
  
  it('render steps content properly', ()=> {
    const defaultWSlot = defaultW.find('#step-1-slot');  
    const labeledWSlot = labeledW.find('#step-1-slot'); 
    
    expect(defaultWSlot.exists()).toBeTruthy();
    expect(defaultWSlot.text()).toContain(step1Text);
    expect(labeledWSlot.exists()).toBeTruthy();
    expect(labeledWSlot.text()).toContain(step1Text);
  })
  
  it('next button functions properly',  async ()=> { 
    const defaultNextButon = ()=> defaultW.find('[aria-label="next step button"]');
    const labeledNextButon = ()=> labeledW.find('[aria-label="next step button"]');
    const defaultWSlot2 = ()=>defaultW.find('#step-2-slot');  
    const labeledWSlot2 = ()=>labeledW.find('#step-2-slot'); 
    await defaultNextButon().trigger('click');

    expect(defaultNextButon().attributes()).toHaveProperty('disabled')
    expect(defaultWSlot2().exists()).toBeTruthy()
    expect(defaultWSlot2().isVisible()).toBeTruthy()
    
    await labeledNextButon().trigger('click');
    
    expect(labeledNextButon().attributes()).toHaveProperty('disabled')
    expect(labeledWSlot2().exists()).toBeTruthy()
    expect(labeledWSlot2().isVisible()).toBeTruthy()
  })

  it('previous button functions properly', async ()=> { 
    const defaultBackButon = ()=> defaultW.find('[aria-label="previous step button"]');
    const labeledBackButon = ()=> labeledW.find('[aria-label="previous step button"]');
    const defaultWSlot2 = ()=>defaultW.find('#step-1-slot');  
    const labeledWSlot2 = ()=>labeledW.find('#step-1-slot'); 
    await defaultBackButon().trigger('click');
    
    expect(defaultBackButon().attributes()).toHaveProperty('disabled')
    expect(defaultWSlot2().exists()).toBeTruthy()
    expect(defaultWSlot2().isVisible()).toBeTruthy()
    
    await labeledBackButon().trigger('click');
    
    expect(labeledBackButon().attributes()).toHaveProperty('disabled')
    expect(labeledWSlot2().exists()).toBeTruthy() 
    expect(labeledWSlot2().isVisible()).toBeTruthy() 
  })
})