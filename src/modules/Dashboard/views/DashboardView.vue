<script setup lang="ts">
// Plugins
import { DoughnutChart, LineChart, useDoughnutChart, useLineChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';
import colors from 'tailwindcss/colors';
// Components
import { AppButton, AppCard, AppFormRating } from '@/components/app';
import { DashboardCard } from '../components';
import { 
  ReceiptRefundIcon as NewOrderIcon,
  CurrencyDollarIcon as RevenueIcon,
  ShoppingBagIcon as EngagementIcon, 
} from '@heroicons/vue/24/solid';
import { computed, ref } from 'vue';


/** Chart Logic */

// INitialize Chart
Chart.register(...registerables);

// Random Data
function getRandomInt() {
  return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
}

// Line Chart Data
const datacollection = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Revenue per month",
      borderColor: colors.emerald[400], 
      
      backgroundColor: "#ffc9c9",
      data: [
        getRandomInt(),
        getRandomInt(),
        getRandomInt(),
        getRandomInt(),
        getRandomInt(),
        getRandomInt(),
        getRandomInt(),
        getRandomInt(),
        getRandomInt(),
        getRandomInt(),
        getRandomInt(),
        getRandomInt(),
      ],
    },
  ],
};

const options = computed(() => ({
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      // display: true,
      text: "Total REvenue",
    },
  },
}));


const { lineChartProps } = useLineChart({
  chartData: datacollection,
  options,
});



// doughut chart data
const doughtnutDataValue = ref([30, 40, 60, 70, 5]);
const doughtnutLegends = computed(() => ({
  labels: ["Glass 5-P", "Rebar 20x400", "Fiber Optics", "Cement", "Cement Bundle"],
  datasets: [
    {
      data: doughtnutDataValue.value,
      backgroundColor: [
        colors.emerald[700], 
        colors.emerald[600], 
        colors.emerald[400], 
        colors.emerald[300], 
        colors.emerald[200], 
      ],
    },
  ],
}));

const doughtnutOptions = computed(() => ({
  scales: {
    myScale: {
      // type: "logarithmic",
      position: "right",
    },
  },
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      // display: true,
      text: "Chart.js Doughnut Chart",
    },
  },
}));

const { doughnutChartProps } = useDoughnutChart({
  chartData: doughtnutLegends,
  options: doughtnutOptions,
});

</script>

<template>
  <div class="flex flex-col gap-5">
    <!-- Shortcuts -->
    <div 
      class="
        rounded-lg overflow-hidden
        grid grid-cols-1 md:grid-cols-3
        shadow-lg
        border dark:border-secondary-600
      "
    >
      <!-- Revenue Card -->
      <DashboardCard 
        class="
          bg-gradient-to-r
          from-primary-300 
          to-primary-200 
          bg-primary-400 

          text-black
        "
      >
        <template #title>
          <RevenueIcon 
            class="w-6 mr-2 text-black"
          ></RevenueIcon>
          <span class="text-black">Monthly Revenue</span>
        </template>
        
        <h3 class="text-4xl font-bold">
          $ 4,000
        </h3>
        <p class="mt-3 text-xs text-secondary-900">
          Yearly Estimate: $ 2,600 
        </p>
      </DashboardCard>

      <!-- New Order Card -->
      <DashboardCard
        class="dark:bg-secondary-800" 
      >
        <template #title>
          <NewOrderIcon 
            class="w-6 mr-2"
          ></NewOrderIcon>
          <span>New Orders</span>
        </template>
        
        <h3 class="text-4xl">
          +300
        </h3>
      </DashboardCard>

      <!-- Engangement Card -->
      <DashboardCard
        class="dark:bg-secondary-800" 
      >
        <template #title>
          <EngagementIcon 
            class="w-6 mr-2"
          ></EngagementIcon>
          <span>Store Engagement</span>
          
        </template>
        <div class="flex flex-col gap-3">
          <h3 class="">+25 Views today</h3>
          <div class="flex items-center gap-2">
            <span class="text-xs">Store Rating: </span>
            <AppFormRating
            class="max-w-[120px]"
            :max-value="5"
            :model-value="3"
            readonly
            ></AppFormRating>
          </div>
        </div>
      </DashboardCard>

      <!-- <div class="px-3 flex items-center justify-center">
        <AppButton variant="text">
          See More...
        </AppButton>
      </div> -->
    </div>

    <!-- Graphs -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      
      <!-- Revenue Graph -->
      <DashboardCard title="Revenue Graph" class="shadow-lg border dark:border-secondary-600">
        <LineChart  v-bind="lineChartProps" :height="250"></LineChart>
      </DashboardCard>

      <!-- Order Pie -->
      <DashboardCard title="Most Ordered" class="shadow-lg border dark:border-secondary-600">
        <DoughnutChart v-bind="doughnutChartProps" :height="250" ></DoughnutChart>
      </DashboardCard>

    </div>

    <!-- Extras -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <AppCard title="Orders">
        <template #title>
          <div class="flex items-center">
            <span>Orders</span>
            <AppButton
              size="sm"
              variant="text"
              class="ml-auto"
              :to="{ name: 'OrderList'}"
            >
              View All Orders
            </AppButton>
          </div>
        </template>
        <div class="mt-4 flex flex-col gap-3">
          <p>Pending Orders: 
            <span class="text-primary-500 font-bold">30</span>
          </p>

          <p>To Be Delivered: 
            <span class="text-primary-500 font-bold">15</span>
          </p>
        </div>
      </AppCard>

      <AppCard>
        <template #title>
          <div class="flex items-center">
            <span>Products</span>
            <AppButton
              size="sm"
              variant="text"
              class="ml-auto"
              :to="{ name: 'ProductList'}"
            >
              View All Products
            </AppButton>
          </div>
        </template>
        <div class="mt-5 flex flex-col gap-3 text-sm">
          <h5 class="">
              <span class="">
                Viewed Items:
              </span>
              <span class="text-primary-500 font-bold">50</span>
          </h5>

          <h5 class="">
              <span class="">
                Popular Item:
              </span>
              <span class="text-primary-500 font-bold">
                Fiber Optics
              </span>
          </h5>
        </div>
      </AppCard>

      <AppCard title="Lorem Ipsum">
        <p class="mt-4">
          Lorem Ipsum Dolor
        </p>
      </AppCard>
    </div>
  </div>
</template>
