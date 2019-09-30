import React, { Component, Fragment } from "react";
import history from "./history";
import { connect } from "react-redux";
import { Default } from "./pages";
import Form from "./components/form";
import Footer from "./components/footer";
import ThanksHeader from "./components/header";
import { PersonalCard } from "./modules/personalCard";
import { UserInfo } from "./modules/userInfo";
import "./App.css";
import { getUserListId } from "./modules/getUserListId/actions";

class App extends Component {
  componentDidMount() {
    const { getUserListId } = this.props;
    getUserListId();
  }
  render() {
    const { userId } = this.props;
    return (
      <Fragment>
        <UserInfo />
        <section id="thanks-top">
          <ThanksHeader history={history} />
          <div id="thanks-form">
            <div className="container">
              <div className="flex-spb-t">
                <div className="col-6 first">
                  <h1>
                    Отправь благодарность коллеге
                    <br />
                    <span>Скажи спасибо</span>
                  </h1>
                  <Form />                  
                </div>
                <div className="col-6">
                  <div id="my">
                    <div className="head-green angle-right">
                      <h4>ЛИЧНЫЙ КАБИНЕТ</h4>
                    </div>
                    {userId && <PersonalCard userId={userId} />}
                  </div>
                </div>  
              </div> 
            </div>
          </div>
        </section> 

        <Default />
        <Footer />
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    userId: state.modules.usersInfo.currentUser.userId
  }),
  { getUserListId }
)(App);
