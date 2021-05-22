import React, {useState} from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import "whatwg-fetch";
import axios from "axios";
import Button from "react-bootstrap/Button";
import {Document,Page} from "react-pdf";
import pdf from "./download.pdf";


class App extends React.Component{
  
  render(){
    return(
   <Router >
    <Switch>
    <Route path="/login" component={Login}/>
    <Route path="/register" component={Register}/>
    <Route path="/uploadebook" component={UploadEbook}/>
    <Route path="/ebooks" component={Viewer} />
    <Route path="/" component={Home}/>
    </Switch>
    </Router>
    );
  }
}
class Home extends React.Component{
  
constructor(props){
    super(props);
    this.state = { apiRes: ""};
  };
  
  
componentDidMount() {
fetch("http://localhost:3001/").then(res => res.text()).then(res => this.setState({apiRes: res}));
}

  render(){
    return(
      <div>
      <nav className="navbar px-2 fixed-top bg-light">
       <a href="" className="navbar-brand text-pink font-weight-bold text-mont">
      Couch
       </a>
        <Button variant="outline-pink" className="outline-pink text-pink round-sides text-kufi py-0">
        Search
        </Button>
      </nav>
     <body>
     <div className="container mt-5">
     <div className="landing mt-5">
      
     </div>
      <div className="row">
       <div className="col-12 col-md-6">
        <div className="mt-3 ">
         <p className="lg-1 mb-1 text-pink text-k2d mx-2">Books we love</p>
         <Books title="13 Secrets" author="Steve Courage" about="The secret why school does not give real education."/>
         <Books title="Rich Dad, Poor Dad" author="Robert Kiyosaki" about="The best book to read on financial literacy."/>
         <Books title="22 Immutable laws on marketing" author="Al & Ries Jack" about="The best book to read on Marketing."/>
        </div>
        </div>
      <div className="col-12 col-md-6">
      <p className="lg-1 text-k2d text-pink px-2">Your reads</p>
      <Books title="Think and grow rich"author="Napoleon Hill"about="The secret to everlasting financial confidence."/>
      <Books title="Unlock it"author="Dan Lok"about="Unlock your financial freedom."/>
      <i>{this.state.apiRes}</i>
      </div> 
      </div>
      </div>
      </body>
      <footer className="">
      <div className="text-center">
      <pre>
       <a href="" className="link text-kufi">About Couch</a>
       |
       <a href="" className="link text-kufi">Terms and Privacy</a>
       |
       <a href="" className="link text-kufi">Logout</a>
       </pre>
       </div>
      </footer>
      </div> 
      );
  }
}

/* all div Component*/

class Books extends React.Component{
  render(){
    return(
      /* cls means className */
      
      <div className="bg-light mb-2">
      <div className="text-dark">
      <div className="px-2 text-kufi">
      <b>
      <a href=""className="text-dark">
       {this.props.title}
       </a>
       </b>
       <br/>
       <span className="subtitle">
       By {this.props.author}
       </span>
       </div>
       <div className="p-2 text-jso">
       
       {this.props.about}
       </div>
      </div>
      </div>
      );
  }
}
class Login extends React.Component{
  render(){
    return(
      <div className="container">
      <h1 className="text-center mt-5 text-k2d">We are glad you are here.</h1>
      <p className="text-center text-kufi">Get access to unlimited books written for the top 1%.</p>
      <form className="form-inline p-2">
      <input type="email" placeholder="Email here" className="form-control mb-2"/>
      <input type="password" placeholder="Password" className="form-control mb-2"/>
      <input type="submit" className="form-control bg-pink text-light btn-secondary border-0"/>
      </form>
     <p className="text-kufi text-center">Don't have an account, I will love to <Link className="text-pink" to="/register">join now</Link></p>
      </div>
      );
  }
}
class Register extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      fullName: '',
      username: '',
      email: '',
      password: ''
    };
    this.changeFullName = this.changeFullName.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  changeFullName(event) {
    this.setState({
     fullName: event.target.value, 
    });
  }
  
  changeUsername(event){
    this.setState({
      username: event.target.value
    });
  }
  
changeEmail(event){
    this.setState({
      email: event.target.value
    });
  }
  
changePassword(event){
    this.setState({
       password: event.target.value
    });
  }
  
  onSubmit(event){
    event.preventDefault();
    var registered = {
      fullName: this.state.fullName,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };
    axios.post("http://localhost:4000/app/signup",registered).then(response => console.log(response.data));
    
    this.setState({
      fullName: '',
      username: '',
      email: '',
      password: ''
    });
  }
  render(){
    return (
      <div className="container">
     <h1 className="text-k2d mt-5 text-center"> 
     Let's start the journey.
     </h1>
   <p className="text-kufi text-center">Unlimited access to books that helps you write your success story.</p>
     <form method="post" className="form-inline" onSubmit={this.onSubmit}>
     <input type="text" placeholder="Your full name" className="form-control mt-2" value={this.state.fullName} onChange={this.changeFullName}/>
     <input type="text" placeholder="Your Username" className="form-control mt-2" value={this.state.username} onChange={this.changeUsername}/>
     <input type="email" placeholder="Your Email" className="form-control mt-2" value={this.state.email} onChange={this.changeEmail}/>
     <input type="password" placeholder="Your Password" className="form-control mt-2" value={this.state.password} onChange={this.changePassword}/>
     <input type="submit" value="Register" className="form-control bg-pink text-light mt-2 border-0"/>
     
     </form>
     <p className="text-muted text-center text-kufi mt-3">
     Already have an account? sign in 
     <Link to="/login" className="text-pink"> here</Link>
     </p>
       </div>
      );
  }
}
class UploadEbook extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      bookToUpload : ''
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
  }
  onChangeHandler(event){
    this.setState({
      bookToUpload: event.target.value
    });
    const file = event.target.files[0];
  }
  onClickHandler(event){
    event.preventDefault();
    if(this.state.bookToUpload){
      var uploaded = {
        bookToUpload: this.state.bookToUpload
      }
      axios.post("http://localhost:4000/app/upload",uploaded).then((response) => console.log(response.data));
    }
   
    this.setState({
     bookToUpload: '' 
    });
    
  }
  render(){ 
    return(
      <div className="container">
      <form className="form-inline mt-5" method="post" onSubmit={this.onClickHandler} action="/upload">
      <input className="form-control" type="file" onChange={this.onChangeHandler} value={this.state.bookToUpload} name="image"/>
      <input type="submit" className="bg-pink btn text-light mt-2" value="Upload"/>
      <div>{this.state.uploaded}</div>
      </form>
      </div>
      );
  }
}

/*class Viewer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      bookRecieved: "Yeah"
    }
  }
  
const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
 
    return(
      <div>
      {this.state.bookRecieved}
      </div>
      );
}*/

ReactDOM.render(<App/>,document.querySelector("#root"));
