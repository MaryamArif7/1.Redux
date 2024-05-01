/* Redux:
-> React only allows for a uni-directional flow of data. That means data cannot be sent from a child to a parent
->in redux state cannot be mdified directly, to share data among siblings in React, a state has to live in the parent component.
 A method for updating this state is provided by the parent 
component and passed as props to these sibling components.
store-> There is a central store that holds the entire state of the application. Each component can access 
the stored state without having to send down props from one component to another.
this store has dispatch->action,subcribe->listener
action->Redux actions are events. They are the only way you can send data from your application to your Redux store.
Actions ->are plain JavaScript objects ->have two things ->1.A type property
->2.A payload object that contains the information that should be used to change the state
 Actions are created via an action creator, which is a function that returns an action,it has
 type of action and payload
reducers-> are pure functions(A pure function is a function that will always return the same value if given the same parameters, i.e., the function depends on only the parameters and no external data) 
that take the current state of an application, perform an action, and return a new state. 
 The reducer handles how the state (application data) will change in response to an action
Reducers take the previous state of the app and return a new state based on the action passed to it.
 the only way the state can change is through actions dispatched to the store
 basically reducer takes current state and an action and returns the new state.
 ->Subscribe ->subscribers are function that listen for state changes in store,
  a function can be subscribe to the store which listen for changes in the store ,
  whenever an action is disptched and state in the store changes,all listeners are
  notified .subscribers can then retrive the updated state 

flow->the components get to update the store via actions and then subscribe to the changes to the store so they know when to re-render:
1.create a redux store with inital state
2.define a reducer fun,this function is responsible for updating the state based on dispatch actions
3.subscriber function is subscribed to the store ,this function defined to log to the current state,
whenever it current state changes function will be notified.
4->an action is dispatch to store which trigger the reducer to update the state
5->after each action dipatch,the subcriber function is called due to subcritpion
6->then the it gets complete with all the dipacthed actions 
flow:
dispatch an action to the ->reducer function takes the action and returns new state object then
->redux replaces the old state  with the new ->after the state is updated ,redux notifies all the subcribers -> then
->then the subcribers recieve the new state->subcriber perform any side effect so updating the ui to reflect new state
so ui is updated after subscriber execution after recieving the updated state. 


*/

const redux = require('redux');
// define an initial state object
const INITIAL_VALUE = {
  counter: 0
};
// reducer function, store-> current state,andan object(action)
const reducer = (store = INITIAL_VALUE, action) => {
  // refrence pitning to the current stata in the store 
  //newstore is  refrence to the current state ,not creating the copy its the same object
  let newStore = store;
  if (action.type === 'INCREMENT') {
    newStore = {counter: store.counter + 1};
  } else if (action.type === 'DECREMENT') {
    newStore = {counter: store.counter - 1};
  } else if (action.type === 'ADDITION') {
    newStore = {counter: store.counter + action.payload.number};
    // the updated new store object is returned from the reducer function
  return newStore;
}
//creating the redux store , taking  a function 
const store = redux.createStore(reducer);
//subcriber function that retrives the current state from store 
const subscriber = () => {
  const state = store.getState();
  console.log(state);
}
//subscribing to the subcriber function to the store , this function is called whenever ther eis new change
store.subscribe(subscriber);
// dipatching serires of action to the store ,each action is an object ,these acyion trigggers the reduver

store.dispatch({type: 'INCREMENT'});
store.dispatch({type: 'DECREMENT'});
store.dispatch({type: 'INCREMENT'});
store.dispatch({type: 'ADDITION', payload: {number: 7}});
store.dispatch({type: 'DECREMENT'});