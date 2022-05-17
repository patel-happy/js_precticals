<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" permenant clipped expand-on-hover app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar clipped-left clipped-right fixed app>
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.mdAndDown"
        @click.stop="drawer = !drawer"
      />
      <!-- <v-btn icon @click.stop="miniVariant = !miniVariant"> -->
      <!-- <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn> -->
      <!-- <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn> -->
      <v-toolbar-title v-text="title" />
      <v-btn color="red lighten-2" dark @click="openDriverModel = true">
        Driver Upload
      </v-btn>
      <openModel v-model="openDriverModel" uploadTo="Driver" />
      <!-- <openModel uploadTo="Vehical" />
      <openModel uploadTo="Customer" /> -->
      <v-spacer />
      <v-btn small depressed to="/dashboard">
        <span>Dashboard</span>
      </v-btn>

      <v-menu v-if="isTripPlaningActive" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            small
            depressed
            v-bind="attrs"
            v-on="on"
            class="font-weight-bold"
          >
            <span>Trip Planning</span>
            <v-icon small>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="showTripPlanningDialog = true">
            <v-list-item-title>Plan My Trips</v-list-item-title>
          </v-list-item>
          <v-list-item @click="showTemplateDialog = true">
            <v-list-item-title>Templates</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn v-else small depressed to="/trip-planning">
        <span>Trip Planning</span>
      </v-btn>
      <v-btn small depressed to="/insights">
        <span>Insights</span>
      </v-btn>
      <v-spacer />
      <div>
        <v-btn
          v-if="!$vuetify.theme.dark"
          small
          fab
          text
          @click.stop="$vuetify.theme.dark = true"
        >
          <v-icon>mdi-brightness-7</v-icon>
        </v-btn>

        <v-btn v-else small fab text @click="$vuetify.theme.dark = false">
          <v-icon>mdi-brightness-4</v-icon>
        </v-btn>
      </div>
      <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
    </v-app-bar>
    <v-main class="mx-5">
      <nuxt />
    </v-main>
    <!------------------------------------ Dialog Definition  ------------------------------------>
    <TemplateDialog v-model="showTemplateDialog" />
    <TripPlanningDialog v-model="showTripPlanningDialog" />

    <!-- id , trip_id & driver_name are mandatory props  -->
    <Chat />
    <!-- Global Notification  -->
    <Snackbar />
  </v-app>
</template>

<script>
import openModel from "~/components/upload-model";
import Snackbar from "~/components/Snackbar.vue";
import Chat from "~/components/Chat.vue";
import TemplateDialog from "~/components/Popups/TripPlanning/TemplateDialog";
import TripPlanningDialog from "~/components/Popups/TripPlanning/TripPlanningDialog";

export default {
  components: { openModel, Snackbar, Chat, TemplateDialog, TripPlanningDialog },
  data() {
    return {
      items: [
        {
          icon: "mdi-apps",
          title: "Dashboard",
          to: "/dashboard",
        },
      ],
      title: "FERO ",
      drawer: true,
      openDriverModel: false,
      showTemplateDialog: false,
      showTripPlanningDialog: false,
    };
  },
  computed: {
    isTripPlaningActive() {
      if (this.$route.path == "/trip-planning") {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.v-btn {
  text-transform: capitalize;
}
</style>
