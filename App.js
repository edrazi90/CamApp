import React, {Component} from 'react';
import {Text, View, Button, TextInput, Alert} from 'react-native';
import {Styles} from './Styles';

export default class App extends Component{
  constructor(){
    super();
    this.state = {
      word: 0,
      consonants: 0,
      vowels:0,
    }
  }

analyzeWord=()=>{
  let totalCons=0;
  let totalVow=0;
  for(var i=0;i<this.state.word.length;i++){
      if(this.state.word!==undefined){
        var letter=this.state.word[i].toLowerCase();
      }
    if(this.state.word[i]==='a'||
       this.state.word[i]==='e'||
       this.state.word[i]==='i'||
       this.state.word[i]==='o'||
       this.state.word[i]==='u'){
         totalVow++;
       }
      else
        totalCons++;
  }
  this.setState({vowels: totalVow}, ()=>{
      totalVow=this.state.vowels;
  });
  this.setState({consonants: totalCons}, ()=>{
    totalCons=this.state.consonants;
  });
}
   






  render() {
    return (
      <View style={Styles.container}>
        <View style={Styles.container}>
        <Text style={Styles.welcome}> A Word Analyzer</Text>
        </View>
        <View style={Styles.container}>
        <TextInput onChangeText={(word) => this.setState({word})} style={Styles.instructions} placeholder='detect'/>
        <Text></Text>
        <Text></Text>
        </View>
        <View style={Styles.container}>
        <Button color="#C70039" onPress={this.analyzeWord} title='Analyze'/>
        <Text></Text>
        <Text style={Styles.result}>Word : {this.state.word}</Text>
        <Text style={Styles.result}>No of Consonants : {this.state.consonants}</Text>
        <Text style={Styles.result}>No of Vowels : {this.state.vowels}</Text>
        <Text style={Styles.result}>No of Characters :{this.state.word.length}</Text>
        </View>
      </View>
    );
  }
}