
// Roster part 2 solution


let pt = React.PropTypes;

class UserForm extends React.Component {
  submit() {
    this.props.callback({
      name: this.refs.name.value,
      skill: parseInt(this.refs.skill.value)
    });
  }
  render() {
    let v = this.props.values;
    return <div>
      <label htmlFor="name">Enter name: </label>
      <input name="name" type="text" ref="name" defaultValue={v.name}/>
      <br/>
      <label htmlFor="skill">Assess skill:</label>
      <input name="skill" type="range" min="1" max="10" ref="skill" defaultValue={v.skill}/>
      <br/>
      <button onClick={e=>this.submit()}>Submit</button>
    </div>
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


