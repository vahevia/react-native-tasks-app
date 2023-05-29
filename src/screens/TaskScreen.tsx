import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, FlatList, Button, Modal, TextInput } from 'react-native';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Task, addTask, taskSelector } from "../redux/tasksReducer";

const TaskScreen: React.FC = () => {
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const existingTasks = useAppSelector(taskSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTasks(existingTasks);
  },  [existingTasks]);

  function handleAddTask() {
    if (!newTaskTitle.trim()) {
      setShowErrorMessage(true)
      return;
    }
    setShowErrorMessage(false)
    const newTask = {
      id: (tasks.length + 1).toString(),
      title: newTaskTitle,
    };
    dispatch(addTask(newTask));
    setModalVisible(!modalVisible)
    setNewTaskTitle("")
    setShowErrorMessage(false)
  }

  function renderItem({item}: {item: Task}) {
    return(
      <View style={styles.taskCard}>
        <Text>
          {item.title}
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={[styles.input, showErrorMessage && styles.redInput]}
              onChangeText={setNewTaskTitle}
              value={newTaskTitle}
            />
            {showErrorMessage && <Text style={styles.errorText}>Required</Text>}
            <Button
              color="green"
              title="Add New Task"
              onPress={handleAddTask}
            />
          </View>
        </View>
      </Modal>
      <Button color="green" title="Add New Task" onPress={() => setModalVisible(true)}/>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  taskCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    margin: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    }
  },
  input: {
    width: 250,
    height: 50,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'black',
    paddingHorizontal: 20,
    margin: 10
  },
  redInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold'
  }
});

export default TaskScreen;