<template>
  <div>
    <h1>Data Hub</h1>
    <h2>Questionnaires</h2>
    <div v-if="questionnaires" class="flex">
      <DataTable class="flex-2/3" :value="questionnaires">
        <Column field="id" header="ID" />
        <Column field="lastUpdated" header="Last updated" />
        <Column field="status" header="Status" />
      </DataTable>
      <div class="flex-1/3">
        <Chart type="radar" :data="chartData" :options="chartOptions" class="w-full md:w-[30rem]" />
      </div>
    </div>
    <div v-else>
      <!-- no questionnairs found -->
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Questionnaire } from '~/types/Questionnaire'
import Chart from 'primevue/chart';

const questionnaires = ref<Questionnaire[]>()
const { data } = await useFetch<Questionnaire[]>(`/api/questionnaires`)
questionnaires.value = data.value || []

onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
})


const chartData = ref();
const chartOptions = ref();
        
const setChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');

    return {
        labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
        datasets: [
            {
                label: 'My First dataset',
                borderColor: documentStyle.getPropertyValue('--p-gray-400'),
                pointBackgroundColor: documentStyle.getPropertyValue('--p-gray-400'),
                pointBorderColor: documentStyle.getPropertyValue('--p-gray-400'),
                pointHoverBackgroundColor: textColor,
                pointHoverBorderColor: documentStyle.getPropertyValue('--p-gray-400'),
                data: [65, 59, 90, 81, 56, 55, 40]
            },
            {
                label: 'My Second dataset',
                borderColor: documentStyle.getPropertyValue('--p-pink-400'),
                pointBackgroundColor: documentStyle.getPropertyValue('--p-pink-400'),
                pointBorderColor: documentStyle.getPropertyValue('--p-pink-400'),
                pointHoverBackgroundColor: textColor,
                pointHoverBorderColor: documentStyle.getPropertyValue('--p-pink-400'),
                data: [28, 48, 40, 19, 96, 27, 100]
            }
        ]
    };
};
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');

    return {
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            r: {
                grid: {
                    color: textColorSecondary
                }
            }
        }
    };
}
</script>
