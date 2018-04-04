// Roster part 1 solution

let pt = React.PropTypes;

class UserForm extends React.Component {
  submit() {
    this.props.callback(this.refs.name.value);
  }
  render() {
    let d = this.props.defaultname;
    return <div>
      <label htmlFor="name">Enter name: </label>
      <input name="name" type="text" ref="name" defaultValue={d}/>
      <br/>
      <button onClick={e=>this.submit()}>Submit</button>
    </div>
  }
  static get propTypes() {
    return {
      callback: pt.func.isRequired,
      defaultname: pt.string.isRequired
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



