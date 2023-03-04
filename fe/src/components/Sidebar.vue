<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import user_profile from "@images/user-profile.png";
import { Menu, SubMenu } from "@interfaces/menuEntries";
import SidebarEntry from "@components/SidebarEntry.vue";
import "boxicons";

export default defineComponent({
  components: { SidebarEntry },
  data: () => {
    return {
      menuEntries: [
        {
          title: "Dashboard",
          link: "#",
          icon: "grid-alt",
        },
        {
          title: "Category",
          link: "#",
          icon: "collection",
          submenu: [
            {
              title: "HTML",
              link: "#",
            },
            {
              title: "Javascript",
              link: "#",
            },
            {
              title: "PHP",
              link: "#",
            },
            {
              title: "MySQL",
              link: "#",
            },
          ],
        },
        // {
        //   title: "Sub menu",
        //   link: "#",
        //   icon: "book-alt",
        //   submenu: [
        //     {
        //       title: "Submenu entry",
        //       link: "#",
        //     },
        //     {
        //       title: "Submenu entry",
        //       link: "#",
        //     },
        //     {
        //       title: "Submenu entry",
        //       link: "#",
        //     },
        //   ],
        // },
      ] as Menu[],
      userImage: user_profile,
      selectedSubmenu: undefined as number | undefined,
      isMenuExpanded: false as boolean,
    };
  },
  methods: {
    toggleSubMenu(index: number) {
      this.selectedSubmenu = this.selectedSubmenu === index ? undefined : index;
    },
    expandMenu() {
      this.isMenuExpanded = true;
    },
    shrinkMenu() {
      this.isMenuExpanded = false;
      this.selectedSubmenu = undefined;
    },
  },
});
</script>

<template>
  <div
    :class="['sidebar', isMenuExpanded ? 'opened' : '']"
    @mouseover="expandMenu()"
    @mouseleave="shrinkMenu()"
  >
    <div class="menu-hamburger">
      <box-icon color="white" name="menu"></box-icon>
      <span class="logo_name">Whereas</span>
    </div>
    <ul class="nav-links">
      <li
        :class="[selectedSubmenu == index ? 'showMenu' : '']"
        v-for="(entry, index) in menuEntries"
        :key="index"
      >
        <SidebarEntry :menuEntry="entry" :hasSubmenu="entry.hasOwnProperty('submenu')"/>
      </li>
    </ul>
    <div class="profile-details">
      <div class="profile-content">
        <img :src="userImage" alt="profile" />
      </div>
      <div class="name">
        <div class="profile-name">User Name</div>
      </div>
      <box-icon color="white" name="log-out"></box-icon>
    </div>
  </div>
</template>

<style scoped lang="scss">
$sidebar-width-opened: 260px;
$sidebar-width-closed: 78px;
$main-color: #11101d;
$secondary-color: #1d1b31;

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: $sidebar-width-closed;
  background: $main-color;
  z-index: 100;
  transition: all 0.5s ease;

  .menu-hamburger {
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;

    box-icon {
      font-size: 30px;
      height: 40px;
      min-width: $sidebar-width-closed;
      text-align: center;
      line-height: 50px;
    }

    .logo_name {
      font-size: 22px;
      color: #fff;
      font-weight: 600;
      opacity: 0;
      transition: 0.3s ease;
      transition-delay: 0.1s;
    }
  }

  .nav-links {
    height: 100%;
    padding: 10px 0 0px 0;
    // overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }

    li {
      list-style: none;
      position: relative;

      &:hover {
        background: $secondary-color;
      }

      // box-icon {
      //   height: 25px;
      //   min-width: $sidebar-width-closed;
      //   text-align: center;
      //   line-height: 50px;
      //   font-size: 0px;
      //   cursor: pointer;
      //   transition: all 0.4s ease;
      // }

      .sub-menu {
        padding: 0px 6px 6px 80px;
        background: $secondary-color;
        display: none;

        .menu-entry__tooltip {
          display: none;
        }

        li {
          padding: 5px 0px;

          a {
            color: white;
            font-weight: bolder;
            font-size: 15px;
            padding: 5px 0;
            white-space: nowrap;
            opacity: 0.6;
            transition: all 0.3 ease;

            &:hover {
              opacity: 1;
            }
          }
        }
      }

      
    }
  }

  .profile-details {
    position: fixed;
    bottom: 0;
    width: $sidebar-width-closed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: $secondary-color;
    padding: 6px 0;
    transition: all 0.5s ease;

    img {
      height: 52px;
      width: 52px;
      object-fit: cover;
      border-radius: 16px;
      margin: 0 14px 0 12px;
      background: $secondary-color;
    }

    .profile-name {
      color: white;
      font-size: 18px;
      font-weight: 500;
      white-space: nowrap;
      opacity: 0;
      transition: all 0.5s ease;
    }

    .profile-content {
      display: flex;
      align-items: center;
    }

    box-icon {
      height: 25px;
      min-width: $sidebar-width-closed;
      text-align: center;
      line-height: 50px;
      font-size: 0px;
      opacity: 0;
      cursor: pointer;
      transition: all 0.5s ease;
    }
  }
}

.home-section {
  position: relative;
  background: red;
  height: 100vh;
  left: $sidebar-width-closed;
  width: calc(100% - $sidebar-width-closed);
  transition: all 0.5s ease;

  .home-content {
    height: 60px;
    display: flex;
    align-items: center;

    box-icon {
      height: 80px;
      min-width: 35px;
    }

    .text {
      color: $main-color;
      font-size: 26px;
      font-weight: 600;
    }
  }
}
</style>
