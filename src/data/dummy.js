import {
  HomeIcon,
  PostIcon,
  AccountIcon,
  ThemeIcon,
  BannerIcon,
  MultiAccountsIcon,
} from "components/Icons";

import { FiCreditCard } from "react-icons/fi";
import { BsCurrencyDollar, BsShield } from "react-icons/bs";
import { Category, SearchSuggestIcon } from "components/Icons";

import avatar from "./avatar.jpg";
import avatar2 from "./avatar2.jpg";
import avatar3 from "./avatar3.png";
import avatar4 from "./avatar4.jpg";
import { EmailOutlined } from "@mui/icons-material";

export const normalAdminTabs = [
  {
    title: "pages",
    links: [
      {
        path: "/admin/posts/create",
        name: "post",
        icon: <PostIcon />,
      },
      {
        path: "/admin/send-mail",
        name: "Gửi mail",
        icon: <EmailOutlined />,
      }     
    ],
  },
];

export const superAdminTabs = [
  {
    title: "Dashboard",
    links: [
      {
        path: "/admin",
        name: "home",
        icon: <HomeIcon />,
      },
    ],
  },
  {
    title: "pages",
    links: [
      {
        path: "/admin/posts",
        name: "Bài đăng",
        icon: <PostIcon />,
        subLinks: [
          {
            path: "/admin/posts",
            name: "Tất cả",
          },
          {
            path: "/admin/posts/create",
            name: "Tạo mới",
          }
        ]
      },
      {
        path: "/admin/accounts",
        name: "Tài khoản",
        icon: <AccountIcon />,
      },
      {
        path: "/admin/banners",
        name: "Bìa",
        icon: <BannerIcon />,
      },
      {
        path: "/admin/themes",
        name: "Chủ đề",
        icon: <ThemeIcon />,
      },
      {
        path: "/admin/worker-manager",
        name: "Người thuê",
        icon: <MultiAccountsIcon />,
      },
      {
        path: "/admin/category-manager",
        name: "Danh mục",
        icon: <Category />,
      },
      {
        path: "/admin/search-suggest",
        name: "Từ khoá gợi ý",
        icon: <SearchSuggestIcon />,
      },
      {
        path: "/admin/send-mail",
        name: "Gửi mail",
        icon: <EmailOutlined />,
      }     
    ],
  },
];

export const workerTabs = [
  {
    path: "/posts",
    name: "post",
    icon: <PostIcon />,
  },
  {
    path: "/admin/send-mail",
    name: "Gửi mail",
    icon: <EmailOutlined />,
  } 
]

export const chatData = [
  
  {
    image: avatar2,
    message: "Roman Joined the Team!",
    desc: "Congratulate him",
    time: "9:08 AM",
  },
  {
    image: avatar3,
    message: "New message received",
    desc: "Salma sent you new message",
    time: "11:56 AM",
  },
  {
    image: avatar4,
    message: "New Payment received",
    desc: "Check your earnings",
    time: "4:39 AM",
  },
  {
    image: avatar,
    message: "Jolly completed tasks",
    desc: "Assign her new tasks",
    time: "1:12 AM",
  },
];

export const medicalproBranding = {
  data: [
    {
      title: "Due Date",
      desc: "Oct 23, 2021",
    },
    {
      title: "budget",
      desc: "$98,500",
    },
    {
      title: "Expense",
      desc: "$63,000",
    },
  ],
  teams: [
    {
      name: "Bootstrap",
      color: "orange",
    },
    {
      name: "Angular",
      color: "#FB9678",
    },
  ],
  leaders: [
    {
      image: avatar2,
    },
    {
      image: avatar3,
    },
    {
      image: avatar2,
    },
    {
      image: avatar4,
    },
    {
      image: avatar,
    },
  ],
};

export const themeColors = [
  {
    name: "blue-theme",
    color: "#1A97F5",
  },
  {
    name: "green-theme",
    color: "#03C9D7",
  },
  {
    name: "purple-theme",
    color: "#7352FF",
  },
  {
    name: "red-theme",
    color: "#FF5C8E",
  },
  {
    name: "indigo-theme",
    color: "#1E4DB7",
  },
  {
    color: "#FB9678",
    name: "orange-theme",
  },
];

export const userProfileData = [
  {
    icon: <BsCurrencyDollar />,
    title: "My Profile",
    desc: "Account Settings",
    iconColor: "#03C9D7",
    iconBg: "#E5FAFB",
  },
  {
    icon: <BsShield />,
    title: "My Inbox",
    desc: "Messages & Emails",
    iconColor: "rgb(0, 194, 146)",
    iconBg: "rgb(235, 250, 242)",
  },
  {
    icon: <FiCreditCard />,
    title: "My Tasks",
    desc: "To-do and Daily Tasks",
    iconColor: "rgb(255, 244, 229)",
    iconBg: "rgb(254, 201, 15)",
  },
];
