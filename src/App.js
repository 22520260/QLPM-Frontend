import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { publicRoutes } from "./routes";
import DefaultLayout from "./component/Layout/DefaultLayout";
import { Fragment } from "react";
import { FaSearch, FaRedoAlt } from "react-icons/fa";
import { IFSearch } from "./component/Layout/TabLayout/InputForm";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          {publicRoutes.map((route, index) => {
            let Layout = DefaultLayout
            if (route.layout) {
              Layout = route.layout;
            }
            if (route.layout === null) {
              Layout = Fragment;
            }
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

// function App() {
//   return (
//     <div>
//       <div className="px-3 py-2 bg-primary">Dịch vụ</div>
//       <div className="py-3 border border-primary">
//         <div className="container-fluid mb-3">
//           <div className="row py-2">
//             <IFSearch
//               title={"Nhập dịch vụ"}
//               size={6}
//               onChange={(value) => {
//                 console.log("dichVu", value);
//               }}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

export default App;
