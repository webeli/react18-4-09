
// Exercise Roster, part 2


let pt = React.PropTypes;

// Complete the UserForm declaration so that it works as expected!
class UserForm extends React.Component {
  render() {
    return <p>Not yet implemented! Open up the file <code>yourcode2.js</code> and try to figure it out!</p>;
  }
  static get propTypes() {
    return {
      callback: pt.func.isRequired,
      values: pt.shape({
        name: pt.string.isRequired,
        skill: pt.number.isRequired
      }).isRequired
    }
  }
}


class Tester extends React.Component {
  constructor(){
    super();
    this.state = {msg: "Enter data and submit it!"};
    this.submitted = this.submitted.bind(this);
  }
  submitted(data) {
    this.setState({msg:"You submitted "+data.name+" with skill "+data.skill+"."});
  }
  render() {
    return <div>
      <p>{this.state.msg}</p>
      <UserForm callback={this.submitted} values={{name:"John Doe",skill:3}} />
    </div>;
  }
}

ReactDOM.render(<Tester/>,document.getElementById("target"));





