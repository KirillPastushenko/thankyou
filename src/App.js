import React, { Component } from "react";
import history from "./history";
import { connect } from "react-redux";
import { Default } from "./pages";
import { Layout } from "antd";
import Form from "./components/form";
import Footer from "./components/footer"
import ThanksHeader from "./components/header";
import PersonCard from "./components/personcard"
import * as userActions from "./actions/user";
import "antd/dist/antd.css";
import "./App.css";
import { getUserListId } from "./modules/getUserListId/actions";
import PersonCardThanks from "./components/personcardthanks";
const { Header, Content } = Layout;
const { getUser } = userActions;
class App extends Component {
  componentDidMount() {
    const { getUser, getUserListId } = this.props;
    getUser();
    getUserListId();  
  }
  render() {   
    return (
      <Layout> 
        <section id="thanks-top">
          <ThanksHeader history={history} />
          <div id="thanks-form" > 
            <div className="container">
              <div className="flex-spb-t">
                <div className="col-6 first">
                  <h1>Отправь благодарность коллеге<br/><span>Скажи спасибо</span></h1>
                  <Form />
                </div>
                <div className="col-6">
                  <div id="my">
                    <div className="head-green angle-right">
                        <h4>ЛИЧНЫЙ КАБИНЕТ</h4>
                    </div>
                    <PersonCard />
                  </div>
                </div>
              </div>
            </div>
          </div> 

        </section>  
      

        <Default/>
        <Footer/>  
      </Layout>
       
    );
  }
}

export default connect(
  state => ({}),
  { getUser, getUserListId }
)(App);
