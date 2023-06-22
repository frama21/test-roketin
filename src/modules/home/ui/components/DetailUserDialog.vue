<template>
  <AppBaseDialog v-bind="dialog" width="400">
    <div class="d-flex flex-column justify-center pa-5">
      <AppBaseLabel class="text-center" text="Detail User" font-size="20px" />
      <div class="text-center">
        <img class="shadow-default rounded-xl" :src="data?.picture?.medium" width="120" alt="avatar" />
      </div>

      <div>
        <v-row>
          <v-col>
            <v-list bg-color="transparent">
              <v-list-item>
                <AppBaseLabel text="Name" font-size="13px" no-gutter />
              </v-list-item>
              <v-list-item>
                <AppBaseLabel text="Email" font-size="13px" no-gutter />
              </v-list-item>
              <v-list-item>
                <AppBaseLabel text="Age" font-size="13px" no-gutter />
              </v-list-item>
              <v-list-item>
                <AppBaseLabel text="Gender" font-size="13px" no-gutter />
              </v-list-item>
              <v-list-item>
                <AppBaseLabel text="Nationality" font-size="13px" no-gutter />
              </v-list-item>
              <v-list-item>
                <AppBaseLabel text="Address" font-size="13px" no-gutter />
              </v-list-item>
              <v-list-item>
                <AppBaseLabel text="Membership" font-size="13px" no-gutter />
              </v-list-item>
            </v-list>
          </v-col>
          <v-col>
            <v-list bg-color="transparent">
              <v-list-item>
                <AppBaseLabel
                  :text="`${data?.name?.title} ${data?.name?.first} ${data?.name?.last}`"
                  no-gutter
                  font-size="13px"
                  :bold="false"
                />
              </v-list-item>
              <v-list-item>
                <AppBaseLabel :text="data?.email" no-gutter font-size="13px" :bold="false" />
              </v-list-item>
              <v-list-item>
                <AppBaseLabel :text="data?.dob?.age" no-gutter font-size="13px" :bold="false" />
              </v-list-item>
              <v-list-item>
                <v-chip label size="small" :color="data?.gender === 'female' ? 'pink' : 'blue'" text-color="white">
                  {{ data.gender }}
                </v-chip>
              </v-list-item>
              <v-list-item>
                <img
                  v-if="data?.nat"
                  :src="`https://flagcdn.com/40x30/${data?.nat?.toLowerCase()}.png`"
                  width="40"
                  height="30"
                  :alt="data?.location?.country"
                />
              </v-list-item>
              <v-list-item>
                <AppBaseLabel
                  :text="`${data?.location?.street?.name} ${data?.location?.street?.number}, ${data?.location?.city},
                  ${data?.location?.country}`"
                  no-gutter
                  font-size="13px"
                  :bold="false"
                />
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </div>
      <div class="text-center">
        <v-btn color="primary rounded-xl px-10" size="large" @click="onClose"> Back </v-btn>
      </div>
    </div>
  </AppBaseDialog>
</template>

<script setup>
// define props
defineProps({
  dialog: {
    type: Object,
    default: () => {
      return {};
    },
  },
  data: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

// define emit
const emit = defineEmits(['close']);
const onClose = () => {
  emit('close');
};
</script>
