<template>
  <v-container>
    <!-- title  -->
    <section>
      <v-row>
        <v-col>
          <h3>Member Dashboard</h3>
        </v-col>
      </v-row>
    </section>

    <!-- Card Infographic  -->
    <section>
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
          <v-card class="rounded-lg custom-shadow" :loading="home_loading">
            <div class="d-flex align-center justify-space-between pa-5">
              <div class="d-flex flex-column">
                <div class="font-weight-bold text-h5">{{ differentNationality }}</div>
                <div class="text-caption text-grey-darken-1">Different Nationality</div>
              </div>
              <div>
                <font-awesome-icon icon="flag" size="3x" />
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
          <v-card class="rounded-lg custom-shadow" :loading="home_loading">
            <div class="d-flex align-center justify-space-between pa-5">
              <div class="d-flex flex-column">
                <div class="font-weight-bold text-h5 text-capitalize">{{ mostGender }}</div>
                <div class="text-caption text-grey-darken-1">Most Gender</div>
              </div>
              <div>
                <font-awesome-icon :icon="`${mostGender === 'female' ? 'venus' : 'mars'}`" size="3x" />
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
          <v-card class="rounded-lg custom-shadow" :loading="home_loading">
            <div class="d-flex align-center justify-space-between pa-5">
              <div class="d-flex flex-column">
                <div class="font-weight-bold text-h5">~{{ averageAge }}</div>
                <div class="text-caption text-grey-darken-1">Average Age</div>
              </div>
              <div>
                <font-awesome-icon icon="person-walking" size="3x" />
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6" >
          <v-card class="rounded-lg custom-shadow" :loading="home_loading">
            <div class="d-flex align-center justify-space-between pa-5">
              <div class="d-flex flex-column">
                <div class="font-weight-bold text-h5">~{{ averageMembership }} year</div>
                <div class="text-caption text-grey-darken-1">Average Membership</div>
              </div>
              <div>
                <font-awesome-icon icon="users" size="3x" />
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </section>

    <!-- table list data  -->
    <section class="mt-5">
      <v-row v-if="home_loading">
        <v-col class="text-center">
          <v-progress-circular :size="50" color="primary" indeterminate />
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col>
          <v-table class="bg-transparent custom-table">
            <tbody>
              <tr
                v-for="item in home_users"
                :key="item.id"
                v-bind="props"
                class="cursor-pointer"
                @click="onClickDetail(item)"
              >
                <td>
                  <v-avatar size="40">
                    <v-img :src="item.picture.thumbnail" />
                  </v-avatar>
                </td>
                <td>
                  <div class="d-flex flex-column">
                    <div class="font-weight-bold">
                      {{ item.name.title }} {{ item.name.first }} {{ item.name.last }}
                    </div>
                    <div class="text-caption text-grey-darken-1">{{ item.email }}</div>
                  </div>
                </td>
                <td class="font-weight-bold">{{ item.dob.age }}</td>
                <td>
                  <v-chip
                    label
                    size="small"
                    :color="item.gender === 'female' ? 'pink' : 'blue'"
                    text-color="white"
                  >
                    {{ item.gender }}
                  </v-chip>
                </td>
                <td>
                  <img
                    :src="`https://flagcdn.com/40x30/${item.nat.toLowerCase()}.png`"
                    width="20"
                    :alt="item.location.country"
                  />
                </td>
                <td class="font-weight-bold">
                  {{ item.location.street.name }} {{ item.location.street.number }}, {{ item.location.city }},
                  {{ item.location.country }}
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </section>

    <DetailUserDialog :dialog="dialog" :data="detailUser" @close="onCloseDialog" />
  </v-container>
</template>

<script setup>
// vue
import { ref, computed, onBeforeMount } from 'vue';

// store
import { useHomeStore } from '../store/home.store';
import { storeToRefs } from 'pinia';

// lodash
import isEmpty from 'lodash/isEmpty';

// Composable
import useAppDialog from '@/modules/app/composable/useAppDialog';

// component
import DetailUserDialog from './components/DetailUserDialog.vue';

//initiate dialog
const { dialog, dialog_showDialog, dialog_closeDialog } = useAppDialog();

// define store
const storeHome = useHomeStore();
const { home_loading, home_users } = storeToRefs(storeHome);

// initiate data
const detailUser = ref({});

/**
 * @description for get diferrent nationality
 *
 * @return {number}
 */
const differentNationality = computed(() => {
  let result = '-';
  if (!isEmpty(home_users.value)) {
    const uniqueNationalities = new Set(home_users.value.map(member => member.nat));
    result = uniqueNationalities.size;
  }

  return result;
});

/**
 * @description for get most gender
 *
 * @return {number}
 */
const mostGender = computed(() => {
  let result = '-';
  if (!isEmpty(home_users.value)) {
    const genderCounts = {};
    home_users.value.forEach(person => {
      const gender = person.gender;
      genderCounts[gender] = (genderCounts[gender] || 0) + 1;
    });

    result = Object.keys(genderCounts).reduce((a, b) => (genderCounts[a] > genderCounts[b] ? a : b));
  }

  return result;
});

/**
 * @description for get average age
 *
 * @return {number}
 */
const averageAge = computed(() => {
  let result = '-';
  if (!isEmpty(home_users.value)) {
    const totalAge = home_users.value.reduce((sum, person) => sum + person.dob.age, 0);
    const averageAge = totalAge / home_users.value.length;
    result = Math.round(averageAge);
  }

  return result;
});

/**
 * @description for get average membership
 *
 * @return {number}
 */
const averageMembership = computed(() => {
  let result = '-';
  if (!isEmpty(home_users.value)) {
    const currentDate = new Date(); // Tanggal saat ini
    let totalDuration = 0;

    home_users.value.forEach(member => {
      const registrationDate = new Date(member.registered.date);
      const durationInMilliseconds = currentDate.getTime() - registrationDate.getTime();
      const durationInDays = Math.floor(durationInMilliseconds / (1000 * 60 * 60 * 24));
      totalDuration += durationInDays;
    });

    const averageDurationInDays = totalDuration / home_users.value.length;
    const averageDurationInYears = Math.round(averageDurationInDays / 365);
    result = averageDurationInYears;

    // const totalMembership = home_users.value.reduce((sum, person) => sum + person.registered.age, 0);
    // const avgMembership = totalMembership / home_users.value.length;
    // result = Math.round(avgMembership);
  }

  return result;
});

// for fetch the data for the first time
onBeforeMount(async () => {
  await fetchData();
});

const fetchData = async () => {
  await storeHome.home_getUser();
};

const onClickDetail = item => {
  detailUser.value = item;
  dialog_showDialog();
};

const onCloseDialog = () => {
  detailUser.value = {};
  dialog_closeDialog();
};
</script>
