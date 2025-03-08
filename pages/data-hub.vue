<template>
  <div>
    <h1>Data Hub</h1>
    <h2>Questionnaires</h2>
    <div class="flex">
      <DataTable class="flex-2/3">
        <Column field="id" header="ID" />
        <Column field="lastUpdated" header="Last updated" />
        <Column field="status" header="Status" />
      </DataTable>
      <div class="flex-1/3">
        <!-- Diagram here -->
      </div>
  </div>
  </div>
</template>

<script setup lang="ts">


</script>
