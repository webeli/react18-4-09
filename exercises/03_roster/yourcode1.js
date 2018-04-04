// Exercise Roster, part 1

let pt = React.PropTypes;

// Complete the UserForm declaration so that it works as expected!
class UserForm extends React.Component {
  render() {
    return <p>Not yet implemented! Open up the file <code>yourcode1.js</code> and try to figure it out!</p>;
  }
  static get propTypes() {
    return {
      callback: pt.func.isRequired,
      defaultname: pt.string.isRequired
    }
  }
}

// You never need to touch the Tester component, it is just there to make sure YOUR stuff works ok! :)
class Tester extends React.Component {
  constructor(){
    super();
    this.state = {msg: "Enter data and submit it!"};
    this.submitted = this.submitted.bind(this);
  }
  submitted(data) {
    this.setState({msg:"You submitted the name "+data});
  }
  render() {
    return <div>
      <p>{this.state.msg}</p>
      <UserForm callback={this.submitted} defaultname="John Doe" />
    </div>
  }
}

ReactDOM.render(<Tester/>,document.getElementById("target"));


