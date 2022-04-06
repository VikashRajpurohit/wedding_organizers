import "./App.css";
import react,{Fragment} from "react";
import AdminBar from "./components/Sidebar/AdminBar";
import OrganizerBar from "./components/Sidebar/OrganizerBar";
import AdminDesk from "./pages/Admin/AdminDesk";
import OrganizerDesk from"./pages/Organizer/OrganizerDesk";
import AddService from"./pages/Admin/AddService";
import AddService_Cat from"./pages/AddService_Cat";
import AddService_Detils from"./pages/Organizer/AddService_Detils";
import ShowService from"./pages/Admin/ShowService";
import ShowUser from"./pages/Admin/ShowUser";
import Show_Cat from"./pages/Show_Cat";
import Login from "./components/coman/Login";
import Registration from "./components/coman/Registration";
import Navbar from "./components/coman/Navbar";
import Aboutus from "./components/coman/Aboutus";
import Landing from "./components/coman/Landing";
import Footer from "./components/coman/Footer";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import Services from "./components/coman/Services";

const App = () => {
  return (
    <>
      <Navbar />
      
        <Switch>
        <Route exact path="/" component={Landing} />
          <Route exact path="/about" component={Aboutus} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Registration} />
          <Route exact path="/services" component={Services} />
        </Switch>
      <Footer />
    </>
     /* <AdminBar class="sidebar">
        <Switch>
          <Route path="/AdminDesk" component={AdminDesk } />
          <Route path="/Addservice" component={AddService } />
          <Route path="/AddService_Cat" component={AddService_Cat } />
          <Route path="/ShowService" component={ShowService } />
          <Route path="/ShowUser" component={ShowUser } />
          <Route path="/Show_Cat" component={Show_Cat } />
                    
           <Route path="*" component={<> not found</>} />
        </Switch>
      </AdminBar>  
      <OrganizerBar class="sidebar">
          <Switch> 
            <Route path="/OrganizerDesk" component={OrganizerDesk } />
            <Route path="/AddService_Detils" component={AddService_Detils } />
            <Route path="/ShowService" component={ShowService } />
            <Route path="/ShowClient" component={ShowUser } />
            <Route path="/AddService_Detils" component={AddService_Detils } />                 
            <Route path="*" component={<> not found</>} />
          </Switch>
        </OrganizerBar> 
    </> */
  );
}

export default App;
