import {
  FcAssistant,
  FcAutomotive,
  FcBusinessman,
  FcConferenceCall,
  FcSalesPerformance,
  FcShipped,
} from "react-icons/fc";

export const navbar_menu = [
  // { label: "Чат", link: "/chat", icon: <FcAssistant /> },
  {
    label: "Завантаження",
    link: "/logistic-work",
    icon: <FcShipped />,
    // submenu: [
    //   { label: "Актуальні завантаження", link: "/current-transportation" },
    //   { label: "Тендери", link: "/tenders" },
    //   { label: "Закриті завантаження", link: "/closed-transportation" },
    //   { label: "Запит ціни", link: "/transportation-price" },
    // ],
  },
  // {
  //   label: "Експедиція",
  //   icon: <FcSalesPerformance />,
  //   submenu: [
  //     { label: "Перевезення актуальні", link: "/transportation" },
  //     { label: "Перевезення закриті", link: "/closed-transportation" },
  //     { label: "Необхідно провести номери", link: "/transport-numbers" },
  //   ],
  // },
  {
    label: "Контрагенти",
    link: "/carriers",
    icon: <FcConferenceCall />,
    // submenu: [
    //   { label: "Перевізники", link: "/carriers" },
    //   { label: "Замовники", link: "/customers" },
    //   { label: "Експедиції", link: "/expeditions" },
    // ],
  },
  // { label: "Працівники", link: "/workers", icon: <FcBusinessman /> },
];
