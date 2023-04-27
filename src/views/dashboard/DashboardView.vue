
<script setup lang="ts">
import { computed, ref } from "vue";
// Elements
import { AppTable, AppCard } from "@/components/app";
// Icons
import {
  ShoppingCartIcon,
  UserGroupIcon,
  ChevronRightIcon,
} from '@heroicons/vue/24/solid';
// vue chart
import {
  LineChart,
  useLineChart,
  DoughnutChart,
  useDoughnutChart,
} from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

/******************************
COMPONENT STATE 
******************************/

// Line chart
function getRandomInt() {
  return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
}

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
      label: "Sale Trend",
      borderColor: "purple",
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
      display: true,
      text: "Total Yearly Sales",
    },
  },
}));

const { lineChartProps } = useLineChart({
  chartData: datacollection,
  options,
});

// order table
const orderHeaders = [
  { text: "Name", key: "name" },
  { text: "Item Qty", key: "qty" },
  { text: "Current Status", key: "status" },
  { text: " ", key: "" },
];
const orders: { name: string; qty: number; status: string }[] = [
  { name: "Fred Smitch", qty: 3, status: "pending" },
  { name: "Jane Doe", qty: 19, status: "pending" },
  { name: "Eva Willis", qty: 19, status: "canceled" },
  { name: "George Bush", qty: 19, status: "done" },
  { name: "Fred Smitch", qty: 3, status: "pending" },
  { name: "Jane Doe", qty: 19, status: "pending" },
  { name: "George Bush", qty: 19, status: "done" },
];

// doughut chart data
const doughtnutDataValue = ref([30, 40, 60, 70, 5]);
const doughtnutLegends = computed(() => ({
  labels: ["Paris", "Nîmes", "Toulon", "Perpignan", "Autre"],
  datasets: [
    {
      data: doughtnutDataValue.value,
      backgroundColor: ["#77CEFF", "#0079AF", "#123E6B", "#97B0C4", "#A5C8ED"],
    },
  ],
}));

const doughtnutOptions = computed(() => ({
  scales: {
    myScale: {
      type: "logarithmic",
      position: "right",
    },
  },
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
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
  <div class="px-10 py-5">
    <!-- Weekly Overview -->
    <div>
      <h3 class="my-2 text font-semibold">Weekly Overview</h3>
      <div class="grid md:grid-cols-3 gap-3 mt-1">
        <!-- Weekly Sales -->
        <AppCard header="Sales" headerColor="info-600">
          <div class="flex p-1 w-full justify-start">
            <div class="p-3">
              <span class="text-5xl font-semibold">$ 120K</span>
              <span class="ml-2 text-success-500 font-bold">+ 3.12%</span>
            </div>
          </div>
        </AppCard>

        <!-- Weekly Orders -->
        <AppCard header="Orders" headerColor="alert-500">
          <div class="flex p-1 w-full justify-start">
            <ShoppingCartIcon class="w-16 text-alert-500"></ShoppingCartIcon>
            <div class="p-3">
              <span class="text-5xl font-semibold">4,012</span>
              <span class="ml-2 text-success-500 font-bold">+ 1.12%</span>
            </div>
          </div>
        </AppCard>

        <!-- Weekly Clients -->
        <AppCard header="Clients" headerColor="success-500">
          <div class="flex p-1 w-full justify-start">
            <UserGroupIcon class="w-16 text-success-500"></UserGroupIcon>
            <div class="p-3">
              <span class="text-5xl font-semibold">100</span>
              <span class="ml-2 text-error-500 font-bold">- 3.12%</span>
            </div>
          </div>
        </AppCard>
      </div>
    </div>

    <div class="grid md:grid-cols-2 gap-3 md:gap-5 mt-5">
      <!-- New Orders -->
      <div class="flex flex-col">
        <h3 class="my-2 text font-semibold">Sales Chart</h3>
        <AppCard class="flex-grow">
          <LineChart v-bind="lineChartProps" :height="250"></LineChart>
        </AppCard>
      </div>

      <div class="">
        <!-- Random Doughtnut Chart -->
        <h3 class="my-2 text font-semibold">Doughtnut Chart</h3>
        <AppCard>
          <DoughnutChart v-bind="doughnutChartProps" :height="300" />
        </AppCard>
      </div>
    </div>

    <!-- Sales Analytics -->
    <div class="pt-5">
      <h3 class="my-2 text font-semibold">New Orders</h3>
      <AppTable
        :headers="orderHeaders"
        :items="orders"
        :itemsPerPage="5"
        :persist-column-on-small="[2, 3]"
      >
        <template v-slot:item="{ item }">
          <td class="px-3 py-1.5 font-semibold">{{ item.name }}</td>
          <td class="px-3 py-1.5">{{ item.qty }}</td>
          <td class="px-3 py-1.5">
            <span
              class="px-2 py-0.5 rounded-xl uppercase text-xs text-white"
              :class="{
                'bg-info-500': item.status === 'pending',
                'bg-secondary-500': item.status === 'canceled',
                'bg-success-500': item.status === 'done',
              }"
            >
              {{ item.status }}
            </span>
          </td>
          <td class="flex justify-end">
            <ChevronRightIcon
              class="app-icon text-primary-500 hover:text-white h-6"
            ></ChevronRightIcon>
          </td>
        </template>
      </AppTable>
    </div>
  </div>
</template>
