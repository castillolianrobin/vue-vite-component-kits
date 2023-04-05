import { defaultSlotTest, namedSlotTest } from "@/components/__tests__/helpers/slot.spec";
import { describe } from "vitest";
import { AppCard } from '..';
const name = 'AppCard';

describe(name, () => {
  
  describe('Slots', ()=>{
    defaultSlotTest(AppCard);
    namedSlotTest(AppCard, 'title');
    namedSlotTest(AppCard, 'subtitle');
    namedSlotTest(AppCard, 'actions');
  });
})