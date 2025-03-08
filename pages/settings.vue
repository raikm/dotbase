<template>
  <div>
    <h1 class="text-3xl mb-2">User Settings</h1>
    <p class="text-md mb-4">
      Update your personal information below. You can change your name and email
      address.
    </p>

    <Form
      v-slot="$form"
      :resolver="resolver"
      :initial-values="initialValues"
      class="flex flex-col gap-4 w-full"
      @submit="onFormSubmit"
    >
      <ControlledTextInput
        name="firstName"
        label="First Name"
        placeholder="First Name"
        type="text"
        fluid
        :invalid="$form.firstName?.invalid"
        :error-message="$form.firstName?.error?.message"
      />
      <ControlledTextInput
        name="lastName"
        label="Last Name"
        placeholder="Last Name"
        type="text"
        fluid
        :invalid="$form.lastName?.invalid"
        :error-message="$form.lastName?.error?.message"
      />

      <ControlledTextInput
        name="email"
        label="Email"
        placeholder="Email"
        type="text"
        fluid
        :invalid="$form.email?.invalid"
        :error-message="$form.email?.error?.message"
      />

      <Button type="submit" severity="secondary" label="Submit" />
    </Form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
import type { User } from "~/types/User";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

const { data: user } = await useFetch<User>("/api/user/720072c1-47d9-4f2f-b2ba-e8ec0e8dee42");

const initialValues = ref<FormData>({
  firstName: user.value?.firstName || "",
  lastName: user.value?.lastName || "",
  email: user.value?.email || "",
});

const resolver = ref(
  zodResolver(
    z.object({
      firstName: z.string().min(1, { message: "First name is required." }),
      lastName: z.string().min(1, { message: "Last name is required." }),
      email: z
        .string()
        .min(1, { message: "Email is required." })
        .email({ message: "Invalid email address." }),
    }),
  ),
);

const onFormSubmit = async ({
  valid,
  values,
}: {
  valid: boolean;
  values: FormData;
}) => {
  if (!user.value?.id || !valid) {
    return;
  }

  await useFetch(`/api/user/${user.value.id}`, {
    method: "POST",
    body: {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
    },
  });
};
</script>
