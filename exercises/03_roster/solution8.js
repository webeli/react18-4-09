
// Roster part 8 solution


let pt = React.PropTypes;

class User extends React.Component {
  constructor(props){
    super(props);
    this.state = { editing: false };
    this.startEdit = this.startEdit.bind(this);
    this.submit = this.submit.bind(this);
  }
  startEdit() {
    this.setState({ editing: true });
  }
  submit(data) {
    this.props.update(data);
    this.setState({ editing: false });
  }
  render() {
    let p = this.props;
    return this.state.editing ? <UserForm values={{name:p.name,skill:p.skill}} callback={this.submit} delete={this.props.delete} /> : <div>
      <p>Name: {p.name}, skill: {p.skill} <button onClick={this.startEdit}>Edit</button></p>
    </div>;
  }
  static get propTypes() {
    return {
      name: pt.string.isRequired,
      skill: pt.number.isRequired,
      update: pt.func.isRequired,
      delete: pt.func.isRequired
    };
  }
}

class UserForm extends React.Component {
  submit() {
    this.props.callback({
      name: this.refs.name.value,
      skill: parseInt(this.refs.skill.value)
    });
    this.refs.name.value = '';
    this.refs.skill.value = 5; // seems like a sensible default
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
      <button onClick={e=> this.submit(e)}>{this.props.button || 'Submit'}</button>
      {this.props.delete && <button onClick={this.props.delete}>Delete</button> }
    </div>
  }
  static get propTypes() {
    return {
      callback: pt.func.isRequired,
      values: pt.shape({
        name: pt.string.isRequired,
        skill: pt.number.isRequired
      }).isRequired,
      button: pt.string,
      delete: pt.func
    }
  }
}

class Roster extends React.Component {
  constructor(props){
    super(props);
    this.update = this.update.bind(this);
    this.add = this.add.bind(this);
    this.delete = this.delete.bind(this);
    // if you want to feel like a ninja, use `reduce` instead! :)
    let users = {};
    this.props.users.forEach((user,n) => {
      users["user"+n] = user
    });
    this.state = { users: users };
  }
  update(userid,newuserdata) {
    let users = this.state.users;
    users[userid] = newuserdata;
    this.setState({users:users});
  }
  add(newuserdata) {
    let newid = "user"+(Object.keys(this.state.users).length+1);
    this.update(newid,newuserdata);
  }
  delete(userid) {
    let users = this.state.users;
    delete users[userid];
    this.setState({users:users});
  }
  render() {
    let renderedusers = [];
    for(let id in this.state.users){
      let u = this.state.users[id];
      let updatefn = this.update.bind(this,id);
      let deletefn = this.delete.bind(this,id);
      renderedusers.push(
        <User key={id} name={u.name} skill={u.skill} update={updatefn} delete={deletefn} />
      );
    }
    return <div>
      {renderedusers}
      <h4>Add new user:</h4>
      <UserForm values={{name:'',skill:5}} callback={this.add} button="Add"/>
    </div>;
  }
}

let userdata = [{name:"David",skill:10},{name:"Hannes",skill:8},{name:"Jacob",skill:6}];

let Tester = React.createClass({
  render() {
    return <Roster users={userdata} />;
  }
});

ReactDOM.render(<Tester/>,document.getElementById("target"));
