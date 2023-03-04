<template>
  <div class="menu-entry">
    <a :href="menuEntry.link">
      <box-icon
        class="menu-entry__icon"
        color="white"
        :name="menuEntry.icon"
      ></box-icon>
      <!-- <span v-if="!hasSubmenu" class="menu-entry__tooltip">{{ menuEntry.title }}</span>
      <span v-else class="menu-entry_subMenu-tooltip"></span> -->
    </a>
    <!-- <box-icon
      class="arrow"
      color="white"
      name="chevron-down"
      v-if="menuEntry.submenu"
    ></box-icon> -->

    <span v-if="!hasSubmenu" class="menu-entry__tooltip">{{
      menuEntry.title
    }}</span>
    <span v-else class="menu-entry__submenu-tooltip">
      <span class="menu-entry__submenu-tooltip-title">{{ menuEntry.title }}</span>
      <ul class="sub-menu">
        <li v-for="(option, index) in menuEntry.submenu" :key="index">
          <a class="sub-menu__entry" :href="option.link"> {{ option.title }}</a>
        </li>
      </ul>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";
import { Menu, SubMenu } from "@interfaces/menuEntries";
import "boxicons";

export default defineComponent({
  data: () => {
    return {
      selectedSubmenu: undefined as number | undefined,
      isTooltipShown: false as boolean,
    };
  },
  props: {
    menuEntry: {
      type: Object as PropType<Menu>,
      required: true,
    },
    hasSubmenu: Boolean,
  },
  methods: {
    showTooltip() {
      this.isTooltipShown = true;
    },
    hideTooltip() {
      this.isTooltipShown = false;
    },
  },
});
</script>

<style lang="scss">
$sidebar-width-opened: 260px;
$sidebar-width-closed: 78px;
$main-color: #11101d;
$secondary-color: #1d1b31;

.menu-entry {
  display: flex;
  padding: 20px 0;
  justify-content: space-between;
  align-items: center;

  &:hover box-icon {
    background: $secondary-color;
  }

  box-icon {
    height: 30px;
    background: $main-color;
    min-width: $sidebar-width-closed;
    text-align: center;
    line-height: 50px;
    font-size: 0px;
    cursor: pointer;
    z-index: 10;
  }

  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    position: relative;
  }

  .arrow {
    opacity: 0;
    transition: all 0.6s ease;
  }

  &:hover &__tooltip {
    left: 105%;
    opacity: 1;
    pointer-events: auto;
  }

  &:hover &__submenu-tooltip {
    left: 105%;
    opacity: 1;
    pointer-events: auto;
  }

  &__tooltip {
    display: flex;
    background: $main-color;
    padding: 0.8rem;
    border-radius: 25px;
    font-size: 18px;
    font-weight: 400;
    justify-content: center;
    color: white;
    min-width: calc($sidebar-width-opened - $sidebar-width-closed * 1.7);
    position: absolute;
    left: 45%;

    opacity: 0;
    pointer-events: none;
    transition: all 0.4s ease-in-out;
  }

  &__submenu {
    &-tooltip {
      justify-content: center;
      position: absolute;
      background: $main-color;
      padding: 0.8rem 0;
      border-radius: 20px;
      min-width: calc($sidebar-width-opened - $sidebar-width-closed * 1.7);
      position: absolute;
      left: 45%;
      top: 25%;

      opacity: 0;
      pointer-events: none;
      transition: all 0.4s ease-in-out;
      //TODO: try to add invisible border to fill the gap?
      
      &-title {
        display: block;
        width: 100%;
        text-align: center;
        font-size: 18px;
        font-weight: 400;
        color: white;
        // border-bottom: 0.1rem solid white;
      }
      
      .sub-menu {
        margin-top: 0.8rem;
        margin-bottom: 0.55rem;
        list-style: none;
        
        li:hover {
          background: $secondary-color;
        }

        &__entry {
          justify-content: center;
          padding: 0.4rem 0rem;
          text-decoration: none;
          font-size: 14px;
          font-weight: 400;
          color: white;
        }
      }
    }
  }
}

// .showMenu {
//   .sub-menu {
//     display: block;
//   }

//   box-icon.arrow {
//     transform: rotate(-180deg);
//   }
// }
</style>
