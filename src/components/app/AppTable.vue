<script setup lang="ts">
import { themedColorProps, useThemedColor } from '@/composables';
import { toRef, computed, type PropType, ref, nextTick, watch } from 'vue';
import { AppButton, AppLoading, AppPagination } from '.';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid';

export interface HeadersProp {
  text: string; // Text to be displayed as header
  key: string; //The key to match with the item
  subKey?: string; // use this if the key is nested from the main key
  sortable?: boolean; //Flag to make the header sortable
  desc?: boolean; //Flag to sort the data by descending order
  className?: string; // class of the header
}

export interface SortEmitReturn {
  items: Record<string, any>;
  header: HeadersProp;
}
const props = defineProps({
  ...themedColorProps,
  /** Disabled internal functionalities (for API fetching)  */
  static: { 
    type: Boolean as PropType<boolean>, 
    default: false, 
    required: false 
  },
  /** Disables navigation on table */
  disabled: { 
    type: Boolean as PropType<boolean>, 
    default: false, 
    required: false 
  }, 
  /** Add loading overlay to table */
  loading: { 
    type: Boolean as PropType<boolean>, 
    default: false, 
    required: false 
  }, 
  /** Table headers to be displayed. can be String or Object */
  headers: {
    type: Array as PropType<(HeadersProp | string)[]>,
    required: true,
  },
  /** 
   * items to be displayed. 
   * Should be an array of object that matches the key of 
   * header props ( if header is array of string, the key will be it's index )
   */
  items: {
    type: Object as PropType<Record<string, any>[]>,
    required: true,
  },
  /** Flag whether to emit an event on item click */
  itemsClickable: { 
    type: Boolean as PropType<boolean>, 
    default: false,
    required: false, 
  },
  /** number of items to be displayed per page*/
  itemsPerPage: { 
    type: [Number, String] as PropType<number | string>,
    default: 10, 
    required: false 
  },
  /** Current page of items to be displayed. */
  currentPage: { 
    type: [Number, String] as PropType<number | string>,
    default: 1, 
    required: false 
  },
  /** Total number of pages (disabled if static is FALSE) */
  pageLength: {
    type: [Number, String] as PropType<number | string>,
    default: 1, 
    required: false,
  },
  mobileColumnNumber: {
    type: [String, Number] as PropType<string | number>,
    default: 1,
    required: false,
  },
  persistColumnOnMobile: {
    type: Array as PropType<number[]>,
    default: ()=>[],
    required: false,
  },
  /** TO be Deprecated */
  persistColumnOnSmall: {
    type: Array as PropType<number[]>,
    default: ()=>[],
    required: false,
  },
  caption: String,
  hideCaption: { 
    type: Boolean as PropType<boolean>, 
    default: false, 
    required: false 
  },
 
  /** Configuration for the table pagination.*/
  // paginationConfig: {
  //   type: Object as PropType<PaginationConfig>,
  //   default: (): PaginationConfig => ({
  //     class: "",
  //     hideDetails: false,
  //     centerPagination: false,
  //   }),
  // },

  /** ============== DEPRECATED PROPS ============== */
  
  /** \<V-MODEL COMPATIBLE\> current page of items being displayed.
   * (To be used when retrieving data from the API)
   */
  apiPage: { type: [Number], default: 0 },
  /** Total number of items from the API.
   * (To be used when retrieving data from the API)
   */
  apiTotal: { type: [Number], default: 0 },
});

const emits = defineEmits<{
  (e: "update:headers", headers: HeadersProp[]): void;
  (e: "update:currentPage", page: number): void;
  (e: "sort", sortData: SortEmitReturn): void;
  (e: "itemClick", item: Record<string, any>): void;
}>();

/** Themed color composable */
const { color } = useThemedColor(toRef(props, 'color'))


/** Table Headers Logic */

// handles the header to be displayed to table
const headersComputed = computed<HeadersProp[]>(() =>
  props.headers.map((header, i)=>{
    if (typeof header === 'string') 
      return { text: header, key: `${i}` };
    else 
      return header
  })
);

function isHeaderDesc(item: HeadersProp) {
  return currentSortKey.value === item.key
    ? currentSortDesc.value
    : item.desc

}

function onSortHandler(headerIndex: number) {
  // Restrict if header props is array of strings
  const { headers } = props;
  if (headers.length && typeof headers[0] === 'string') 
    return;
  
  const newHeaders = headersComputed.value.map((header, i) => 
    i === headerIndex 
      ? { ...header, desc: !isHeaderDesc(header) } 
      : { ...header, desc: false }
  );

  emits('update:headers', newHeaders);

  if (props.static) {
    emits('sort', {
      items: props.items,
      header: newHeaders[headerIndex], 
    });
  } else {
    currentSortKey.value = newHeaders[headerIndex].key;
    currentSortDesc.value = newHeaders[headerIndex].desc;
    nextTick(()=>{
      emits('sort', {
        items: itemsComputed.value,
        header: newHeaders[headerIndex], 
      });
    })
  }

}


/** Table Items Logic */

// handles the displayed data in the api
const itemsComputed = computed(()=> {
  //  disable internal logic if static is true 
  if (props.static) return props.items;

  const _items = [...props.items];
  return internalPaginate(internalSort(_items));
});
// onClick handler for items 
function onItemClickHanlder(item: Record<string, any>) {
  if (!props.itemsClickable) return;
  emits('itemClick', item)
}

/** Table Pagination Logic */

const currentPageComputed = computed(()=> {
  return props.static 
    ? props.currentPage 
    : currentPage.value;
});

const pageLengthComputed = computed(()=> {
  return props.static  
    ? props.pageLength
    : Math.ceil(props.items.length / +props.itemsPerPage); 
});

function onPageChangeHandler(page: number) {
  emits('update:currentPage', page);

  if (!props.static) {
    currentPage.value = page;
  }
}


/** Internal Sorting Logic */

// Handles the internal sorting (disabled when static)
let currentSortedHeader = headersComputed.value.find(header =>
  header.desc !== undefined
);
const currentSortKey = ref<string>(currentSortedHeader?.key || '')
const currentSortDesc = ref(currentSortedHeader?.desc);
// Returns a sorted value of given item
function internalSort(items: Record<string, any>[]) {
  if (!currentSortKey.value) return items;

  const key = currentSortKey.value;
  return items.sort((a,b)=>sortObjArrBy(a, b, key));
}
// main sorter for array of object
function sortObjArrBy(a:any,b:any, key: string) {
  return currentSortDesc.value
    ? sortObjByDesc(a, b, key)
    : sortObjByAsc(a,b, key);
}
// sorter for descending array of object
function sortObjByDesc(a: any, b: any, key: string) {
  const isBGreater = a[key] < b[key];
  const isAGreater = b[key] < a[key];
  
  if (isBGreater) return 1;
  else if (isAGreater) return -1;
  else return 0;
}
// sorter for ascending array of object
function sortObjByAsc(a: any, b: any, key: string) {
  const isBLesser = a[key] > b[key];
  const isALesser = b[key] > a[key];
  
  if (isBLesser) return 1;
  else if (isALesser) return -1;
  else return 0;
}


/** Internal Pagination Logic */

// Handles the internal pagination (disabled when static)  
const currentPage = ref(parseInt(`${props.currentPage}`));
// Returns a paginated value of given item
function internalPaginate(items: Record<string, any>[]) {
  const { itemsPerPage } = props;
  const startIndex = +itemsPerPage * (currentPage.value - 1); 
  const endIndex = +startIndex + (+itemsPerPage);
  return items.slice(startIndex, endIndex);
}

/** Mobile Responsive Logic */

// List of columns displayable in mobile dimensions
const visibleColumns = computed(()=>{
  const _visible = [...(props.persistColumnOnMobile || props.persistColumnOnSmall)];
  for (let i = 0; i < +props.mobileColumnNumber; i++) {
    _visible.push(i+visibleCellOffset.value)
  }
  return _visible.sort();
});


// offset the current number  visible columns 
// (works like pagination)
const visibleCellOffset = ref(0);

// handler for changing offset
function incrementOffset(increment = 1) {
  const newOffset = visibleCellOffset.value + increment;
  const { headers } = props;
  if (
    newOffset < 0  
    || newOffset + visibleColumns.value.length > headers.length 
  ) return;

  visibleCellOffset.value += increment;
}

// Template Ref for table
const TableRef = ref<HTMLTableElement | null>(null);

// function that adds the class to make cells visible on mobile 
watch(visibleColumns, ()=>{
  nextTick(()=> {
    const rows = TableRef.value?.getElementsByTagName('tr');
    if (rows && rows?.length) {
      for (let iRow = 0; iRow < rows.length; iRow++) {
        const row = rows.item(iRow);
        let cells = row?.getElementsByTagName('td');
        
        if (!cells?.length)
          cells = row?.getElementsByTagName('th');

        if (!cells?.length) continue;
        for (let iCell = 0; iCell < cells?.length; iCell++) {
          const cell = cells.item(iCell);
          const visibleClass = 'visible-cell';
          const firstVisible = [ 'pl-7' ];
          const lastVisible = [ 'pr-7' ];
          
          if (visibleColumns.value.includes(iCell)) {
            cell?.classList.add(visibleClass);
            visibleColumns.value[0] === iCell && cell?.classList.add(...firstVisible);
            [...visibleColumns.value].pop() === iCell && cell?.classList.add(...lastVisible);
          } else {
            cell?.classList.remove(visibleClass, ...firstVisible, ...lastVisible)
          }
        }
      }  
    }
  })
}, { immediate: true })


/** HELPERS */

function getNestedString(o: { [key: string]: any; }, s: string) {
  s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  s = s.replace(/^\./, '');           // strip a leading dot
  let a = s.split('.');
  for (let i = 0, n = a.length; i < n; ++i) {
    let k = `${a[i]}`;
    if (typeof o === 'object' && o && k in o) {
      o = o[k];
    } else {
      return '';
    }
  }
  return o;
}

</script>

<template>
  <div class="relative">
    <AppLoading 
      v-if="props.loading"
      class="
        w-full 
        h-full 
        absolute 
        bg-black/20 z-10
      "
      spinner-class="w-7 h-7"
    ></AppLoading>
    <table
      ref="TableRef" 
      :class="[
        `
          w-full
          relative
          border dark:border-secondary-700
          [&_th]:hidden md:[&_th]:table-cell
          [&_td]:hidden md:[&_td]:table-cell
          [&_.visible-cell]:table-cell
        `,
        { 'blur-sm': props.loading }
      ]"
    >
      <caption 
        class="mb-2 text-left text-sm  font-light "
        :class="{ 'sr-only': props.hideCaption }"
      >
        {{ props.caption }}
      </caption>
      <!-- Table Header -->
      <thead class="relative">
        <!-- Mobile Only: Column Navigation -->
        <div class="md:sr-only">
          <div class="absolute top-0 -left-2 h-full flex items-center">
            <AppButton 
              :disabled="!props.items.length"
              size="sm"
              variant="text"
              color="white"
              @click="incrementOffset(-1)"
            >
              <ChevronLeftIcon class="h-6 w-6" />
            </AppButton>
          </div>
  
          <div class="absolute top-0 -right-2 h-full flex items-center">
            <AppButton 
              :disabled="!props.items.length"
              size="sm"
              variant="text"
              color="white"
              class="px-0"
              @click="incrementOffset(1)"
            >
              <ChevronRightIcon class="h-6 w-6" />
            </AppButton>
          </div>
        </div>
        
        <tr
          :class="`bg-${color} text-white font-semibold`"
        >
          <th
            v-for="header, i in headersComputed"
            :key="header.key"
            :aria-label="`column ${i+1}`"
            :class="`
              py-1 md:pl-2 md:pr-2
              header-${header.key} 
            `"
          >
            <div class="flex items-center">
              <p class="mr-2">{{ header.text }}</p>
              
              <AppButton
                v-if="header?.sortable"
                :class="`header-${header.key}-sort-btn text-xs`"
                size="sm" 
                variant="text" 
                color="secondary-200"
                @click="onSortHandler(i)"
              >
                <span v-if="isHeaderDesc(header)">&#x25B2;</span>
                <span v-else>&#x25BC;</span>
              </AppButton>
            </div> 
          </th>
        </tr>
      </thead>

      <!-- Empty Table Body -->
      <tr v-if="!props.items.length">
        <td
          class="table-cell font-bold text-center py-10" 
          :colspan="headers.length"
        >
          No items to show
        </td>
      </tr>
      <!-- Table Body -->
      <tbody v-else>
        <!-- Items -->
        <slot name="items" v-bind="{ items: props.items }">
          <!-- Item Row -->
          <tr
            v-for="(item, itemIndex) in itemsComputed"
            :key="`appTableItem-${itemIndex}`"
            :class="[
              `item-${itemIndex}`,
              `even:bg-${color} even:bg-opacity-5`,
              { 
                [`hover:bg-${color} hover:bg-opacity-40 cursor-pointer transition`]: props.itemsClickable
              }
            ]"
            @click="onItemClickHanlder"
          >
            <slot name="item" v-bind="{ item }">
              <!-- Item Cell -->
              <td
                v-for="(property, propertyIndex) in headersComputed"
                :key="`table-item-${itemIndex}-${propertyIndex}`"
                :class="`
                  py-2 md:pl-2 md:pr-2
                  item-${itemIndex}-${property.key}
                `"
              >
                <slot
                  :name="`item-${property.key}`"
                  v-bind="{ item }"
                >
                  {{ property.subKey 
                    ? getNestedString(item, `${property.key}.${property.subKey}`)  
                    : item[property.key] 
                  }}
                </slot>
              </td>
            </slot>
          </tr>
        </slot>
      </tbody>
    </table>
    <AppPagination
      v-if="props.items.length"
      :length="pageLengthComputed"
      :model-value="currentPageComputed"
      :disabled="props.loading || props.disabled"
      @update:model-value="onPageChangeHandler"
    ></AppPagination>
  </div>
</template>