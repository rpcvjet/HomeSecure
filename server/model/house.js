'use strict';

const uuid = require('uuid');
const firebase = require('firebase');
const createError = require('http-errors');

const House = module.exports = function(opts){

  this.id = opts.id || uuid.v1();
  this.name = opts.name;

};

House.fetchAll = function(){
  return firebase.database().ref('/house').once('value')
  .then(snapShot => {
    console.log('snapshot.val=========>',snapShot.val());
    let data = snapShot.val();
    console.log('data==========>',data);
    console.log('this is the fetch all for House');
    let house = Object.keys(data).map(key => data[key]);
    return house;

  });
};

House.findIdAndDelete = function(id){
  return firebase.database().ref('/house')
  .child(id).remove()
  .then( () => firebase.auth().signOut())
  .catch(err => {
    firebase.auth().signOut();
    throw err;
  });
};


House.prototype.validate = function(){
  if(!this.name)
    return Promise.reject(createError(400, 'missing a required property'));
  return Promise.resolve();
};

House.prototype.save = function(){
  return this.validate()
  .then( () => {
    return firebase.database().ref('/house')
    .child(this.id).set(this);
  })
  .then(() => {
    return firebase.auth().signOut();
  })
  .then(() => this)
  .catch(err => {
    firebase.auth().signOut();
    throw err;
  });
};
