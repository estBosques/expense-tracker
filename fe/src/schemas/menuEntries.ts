export interface SubMenu {
  title: string;
  link: string;
}

export interface Menu {
  title: string;
  link: string;
  icon: string;
  submenu?: SubMenu[];
}
