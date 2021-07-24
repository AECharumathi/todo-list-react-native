import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';

import bin from "./img/bin.png";
import { black } from 'ansi-colors';

export default function App() {
   const [task, setTask] = useState("");
   const [error, setError] = useState("");
   const [taskList, setTaskList] = useState([]);

   const addTask = (taskName) =>{
     if(taskName !== ""){
      let taskObj = {
        key: taskList.length+1,
        name: taskName
      }
      let  tasks = taskList.concat(taskObj)
       setTaskList(tasks);
       setTask("");
       setError("");
     }
     else{
       setError("Enter task");
     }
   }

   const removeTask = (key, taskName) =>{
    let beforeDel = taskList;  
    let afterDel = beforeDel.filter((task)=> task.name !== taskName && task.key !== key)
    setTaskList(afterDel);
   }

  return (
    <View style={styles.container}>
      <Text style={styles.errorMsg}>{error}</Text>
      <TextInput style={styles.textFeild} placeholder="Enter your to-do task" onChange={(e)=>setTask(e.target.value)} value={task}/>
      <Button onPress={()=>addTask(task)} title="Add task" />
      <StatusBar style="auto" />

      <FlatList
        data={taskList}
        renderItem={({item}) =>
        (<View key={item.key} style={styles.itemView} >
            <Text style={styles.item}>{item.name} </Text>
            <TouchableOpacity onPress={()=>removeTask(item.key,item.name)}>
             <Image source={bin} style={styles.tinyLogo} />
             </TouchableOpacity>
          </View>)}
          keyExtractor={ (item, index) => index.toString() }
      /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin:20,
  },
  errorMsg:{
    color: "red",
  },
  textFeild: {
      height: 40,
      padding: 10,
      margin:10,
      borderColor: 'gray',
      borderWidth: 1,
      fontSize:20,
      borderRadius: 7,
  },
  itemView:{
    display: 'flex',
    flexDirection: 'row',
    width:200,
    justifyContent: 'space-between'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: "black",
  },
  tinyLogo: {
    width: 40,
    height: 40,
  },
});
