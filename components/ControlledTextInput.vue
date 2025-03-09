<template>
  <div class="flex flex-col gap-1">
    <label :for="name">{{ label }}</label>
    <InputText
      :id="name"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :fluid="fluid"
    />
    <Message v-if="invalid" severity="error" size="small" variant="simple">{{
      errorMessage
    }}</Message>
  </div>
</template>

<script setup lang="ts">
interface TextInputProps {
  name: string
  label: string
  placeholder?: string
  type?: string
  fluid?: boolean
  invalid?: boolean
  errorMessage?: string
}

defineProps<TextInputProps>()
</script>
