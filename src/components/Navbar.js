import React from 'react';
import { NavLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SummarizeIcon from '@mui/icons-material/Summarize';
import PersonIcon from '@mui/icons-material/Person';
import ContactsIcon from '@mui/icons-material/Contacts';


const Navbar = ({ children }) => {
const menuItem = [
{
  path:"/",
    text: "Dashboard",
    icon:<DashboardIcon/>
},
{
  path:"/",
    text: "Accounts",
    icon:<AccountBalanceWalletIcon/>
},
{
  path:"/",
    text: "Payroll",
    icon: <AttachMoneyIcon/>
},
{
  path:"/",
    text: "Reports",
    icon: <SummarizeIcon/>
},
{
  path:"/",
    text: "Advisor",
    icon: <PersonIcon/>
},
{
  path:"/",
    text: "Contacts",
    icon: <ContactsIcon/>
}
];

  return (
    <div className="container">
       <div  className="sidebar">
           {
               menuItem.map((item, index)=>(
                   <NavLink to={item.path} key={index} className="link" activeclassName="active">
                       <div className="icon">{item.icon}</div>
                       <div  className="link_text">{item.text}</div>
                   </NavLink>
               ))
           }
       </div>
       <main>{children}</main>
    </div>
);
};

export default Navbar