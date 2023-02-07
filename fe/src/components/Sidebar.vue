<script lang="ts">
  import { defineComponent } from "@vue/runtime-core";
  import user_profile from "@images/user-profile.png";
  import { Menu, SubMenu } from "@interfaces/menuEntries";
  import "boxicons";

  export default defineComponent({
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
          {
            title: "Sub menu",
            link: "#",
            icon: "book-alt",
            submenu: [
              {
                title: "Submenu entry",
                link: "#",
              },
              {
                title: "Submenu entry",
                link: "#",
              },
              {
                title: "Submenu entry",
                link: "#",
              },
            ],
          },
        ] as Menu[],
        userImage: user_profile,
        selectedSubmenu: undefined as number | undefined,
        isMenuExpanded: false as boolean,
      };
    },
    methods: {
      toggleSubMenu(index: number) {
        this.selectedSubmenu =
          this.selectedSubmenu === index ? undefined : index;
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
    <div class="logo-details">
      <box-icon type="logo" color="white" name="c-plus-plus"></box-icon>
      <span class="logo_name">Whereas</span>
    </div>
    <ul class="nav-links">
      <li
        :class="selectedSubmenu == index ? 'showMenu' : ''"
        v-for="(entry, index) in menuEntries"
        :key="entry.title"
      >
        <div class="icon-link" @click="toggleSubMenu(index)">
          <a :href="entry.link">
            <box-icon color="white" :name="entry.icon"></box-icon>
            <span class="link-name">{{ entry.title }}</span>
          </a>
          <box-icon
            class="arrow"
            color="white"
            name="chevron-down"
            v-if="entry.submenu"
          ></box-icon>
        </div>
        <template v-if="entry.submenu">
          <ul class="sub-menu">
            <li v-for="option in entry.submenu">
              <a :href="option.link"> {{ option.title }}</a>
            </li>
          </ul>
        </template>
      </li>
      <!-- <li>
        <a href="#">
          <box-icon color="white" name="grid-alt"></box-icon>
          <span class="link-name">Dashboard</span>
        </a>
        <ul class="sub-menu blank">
          <li><a class="link-name" href="#">Dashboard</a></li>
        </ul>
      </li>
      <li>
        <div class="icon-link">
          <a href="#">
            <box-icon color="white" name="collection"></box-icon>
            <span class="link-name">Category</span>
          </a>
          <box-icon color="white" name="chevron-down"></box-icon>
        </div>
        <ul class="sub-menu">
          <li><a class="link-name" href="#">Category</a></li>
          <li><a href="#">Sub menu link</a></li>
          <li><a href="#">Sub menu link</a></li>
          <li><a href="#">Sub menu link</a></li>
          <li><a href="#">Sub menu link</a></li>
        </ul>
      </li>
      <li>
        <div class="icon-link">
          <a href="#">
            <box-icon color="white" name="book-alt"></box-icon>
            <span class="link-name">Sub menu</span>
          </a>
          <box-icon color="white" name="chevron-down"></box-icon>
        </div>
      </li> -->
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
  <div>
    <section class="home-section">
      <div class="home-content">
        <box-icon color="#11101d" name="menu"></box-icon>
        <span class="text">Dropdown Sidebar</span>
      </div>
    </section>
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

    .logo-details {
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
        transition: all 0.4s ease;
        position: relative;

        &:hover {
          background: $secondary-color;
        }

        .icon-link {
          display: flex;
          padding: 20px 0;
          justify-content: space-between;
          align-items: center;

          a {
            text-decoration: none;
            display: flex;
            align-items: center;

            .link-name {
              font-size: 18px;
              font-weight: 400;
              color: white;
              min-width: calc(
                $sidebar-width-opened - $sidebar-width-closed * 2
              );
              opacity: 0;
              transition: all 0.5s ease;
            }
          }

          .arrow {
            opacity: 0;
            transition: all 0.6s ease;
          }
        }

        box-icon {
          height: 25px;
          min-width: $sidebar-width-closed;
          text-align: center;
          line-height: 50px;
          font-size: 0px;
          cursor: pointer;
          transition: all 0.4s ease;
        }

        .sub-menu {
          padding: 0px 6px 6px 80px;
          background: $secondary-color;
          display: none;

          .link-name {
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

        &.showMenu {
          .sub-menu {
            display: block;
          }

          box-icon.arrow {
            transform: rotate(-180deg);
          }
        }
      }
    }

    &.opened {
      width: $sidebar-width-opened;

      .logo-details {
        .logo_name {
          opacity: 1;
          pointer-events: none;
          transition-delay: 0s;
        }
      }
      .nav-links {
        overflow: visible;

        li {
          // &:hover {
          //   .sub-menu {
          //     top: 0px;
          //     opacity: 1;
          //     pointer-events: auto;

          //     &.blank {
          //       top: 50%;
          //       transform: translateY(-50%);
          //     }
          //   }
          // }

          .icon-link {
            cursor: pointer;

            .link-name {
              opacity: 1;
            }

            .arrow {
              opacity: 1;
            }
          }

          .sub-menu {
            // position: absolute;
            // left: 100%;
            // top: -10px;
            // margin-top: 0;
            // padding: 10px 20px;
            // border-radius: 0 6px 6px 0;
            transition: all 0.4s ease;
            opacity: 1;
            pointer-events: none;

            // &.blank {
            //   opacity: 1;
            //   pointer-events: auto;
            //   padding: 3px 20px 6px 16px;
            // }

            // .link-name {
            //   font-size: 18px;
            //   opacity: 1;
            //   display: block;
            // }
          }
        }
      }

      .profile-details {
        width: $sidebar-width-opened;

        .profile-name {
          opacity: 1;
        }

        box-icon {
          opacity: 1;
        }
      }

      // ~ .home-section {
      //   // left: $sidebar-width-opened;
      //   // width: calc(100% - $sidebar-width-opened);
      // }
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
