// import { useSelector } from "react-redux";
// import { RootState } from "../store/store";

// const Menu: React.FC = () => {
//   const theme = useSelector((state: RootState) => state.telegram.theme);

//   const handleExit = () => {
//     if (window.Telegram?.WebApp) {
//       (window.Telegram.WebApp as any).close();
//     }
//   };

//   return (
//     <div className="p-4 flex gap-2">
//       <button
//         onClick={handleExit}
//         className={`px-4 py-2 rounded text-white ${
//           theme === "dark" ? "bg-red-600 hover:bg-red-700" : "bg-red-500 hover:bg-red-600"
//         }`}
//       >
//         Chiqish
//       </button>
//     </div>
//   );
// };

// export default Menu;


const Menu = () => {
  return (
    <div></div>
  )
}

export default Menu