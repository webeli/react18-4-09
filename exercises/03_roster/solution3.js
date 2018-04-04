
// Roster part 3 solution


let pt = React.PropTypes;

class User extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editing: false,
      name: props.name,
      skill: parseInt(props.skill)
    };
    this.startEdit = this.startEdit.bind(this);
    this.update = this.update.bind(this);
  }
  startEdit() {
    this.setState({
      editing: true
    });
  }
  update(vals) {
    this.setState({
      editing: false,
      name: vals.name,
      skill: vals.skill
    })
  }
  render() {
    let s = this.state;
    return s.editing ? <UserForm values={{name:s.name,skill:s.skill}} callback={this.update}/> : <div>
      <p>Name: {s.name}, skill: {s.skill} <button onClick={this.startEdit}>Edit</button></p>
    </div>;
  }
  static get propTypes() {
    return {
      name: pt.string.isRequired,
      skill: pt.number.isRequired
    };
  }
}

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

let Tester = () => <User name="John Doe" skill={3} />;

ReactDOM.render(<Tester/>,document.getElementById("target"));


