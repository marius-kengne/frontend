/**
 * @todo YOU HAVE TO IMPLEMENT THE DELETE AND SAVE TASK ENDPOINT, A TASK CANNOT BE UPDATED IF THE TASK NAME DID NOT CHANGE, YOU'VE TO CONTROL THE BUTTON STATE ACCORDINGLY
 */
import { Check, Delete } from '@mui/icons-material';
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch.ts';
import { Task } from '../index';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TodoPage = () => {
  const api = useFetch();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [open, setOpen] = useState(false); 
  const [newTaskName, setNewTaskName] = useState('');
  const [currentTaskId, setCurrentTaskId] = useState<number | null>(null); 
  const [currentTaskName, setCurrentTaskName] = useState<string>(''); 

  const handleFetchTasks = async () => setTasks(await api.get('/tasks'));
  var message = '';
  const handleDelete = async (id: number) => {
    // @todo IMPLEMENT HERE : DELETE THE TASK & REFRESH ALL THE TASKS, DON'T FORGET TO ATTACH THE FUNCTION TO THE APPROPRIATE BUTTON
    try {
      await api.delete(`/tasks/${id}`); 
      await handleFetchTasks();
      message = 'Tâche supprimée avec succès !';
      toast.success(message);
    } catch (error) {
      console.error('Failed to delete the task:', error);
    }
  }

  const handleSave = async (task: Task) => {
    // @todo IMPLEMENT HERE : SAVE THE TASK & REFRESH ALL THE TASKS, DON'T FORGET TO ATTACH THE FUNCTION TO THE APPROPRIATE BUTTON
    try {
      if (task.id) {
        await api.patch(`/tasks/${task.id}`, { name: task.name });
      } else {
        await api.post('/tasks', { name: task.name });
      }
      await handleFetchTasks();
    } catch (error) {
      console.error('Failed to save the task:', error);
    }
  }

  const handleFocusTask = (task: Task) => {
    setCurrentTaskId(task.id); 
    setCurrentTaskName(task.name); 
  };

  const handleBlurTask = async (task: Task) => {
    if (currentTaskName.trim() === task.name) {
      setCurrentTaskId(null);
      setCurrentTaskName('');
    } else if (currentTaskName.trim() !== '') {
      try {
        await handleSave({ ...task, name: currentTaskName });
        setCurrentTaskId(null);
        setCurrentTaskName('');
        message = 'Tâche mise à jour avec succès !';
      toast.success(message);
      } catch (error) {
        console.error('Failed to update the task:', error);
      }
    }
  };

  const handleChangeTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTaskName(e.target.value); 
  };
  
  const handleClickCheckTask = async (task: Task) => {
    try {
      await handleSave({ ...task, name: currentTaskName });
      setCurrentTaskId(null);
      setCurrentTaskName('');
      
      message = 'Tâche mise à jour avec succès !';
      toast.success(message);
    } catch (error) {
      console.error('Failed to save the task:', error);
    }
  };
  

  const handleAddTask = async () => {
    if (newTaskName.trim()) {
      try {
        await handleSave({ id: undefined, name: newTaskName });
        setNewTaskName(''); 
        setOpen(false); 
        message = 'Tâche ajoutée avec succès !';
        toast.success(message);
      } catch (error) {
        console.error('Failed to save the task:', error);
      }
    }
  };

  useEffect(() => {
    (async () => {
      handleFetchTasks();
    })();
  }, []);


  return (
    <Container>
      <ToastContainer />
      <Box display="flex" justifyContent="center" mt={5} flexDirection="column" alignItems="center">
        <Typography variant="h2">HDM Todo List</Typography>
        <Typography variant="subtitle1" color="textSecondary" marginTop={2}>
          Total des tâches : {tasks.length}
        </Typography>
      </Box>

      <Box justifyContent="center" mt={5} flexDirection="column">
        {
          tasks.map((task) => (
            <Box display="flex" justifyContent="center" alignItems="center" mt={2} gap={1} width="100%">
              <TextField size="small" value={currentTaskId === task.id ? currentTaskName : task.name}
              onChange={handleChangeTask} onFocus={() => {handleFocusTask(task)}} onBlur={() => {
                if (currentTaskId === task.id) {
                  handleBlurTask(task);
                }
              }} fullWidth sx={{ maxWidth: 350 }} />
              <Box>
                <IconButton color="success" 
                disabled={currentTaskId != task.id || currentTaskName.trim() === '' || currentTaskName === task.name}
                onClick={() => {
                  handleClickCheckTask(task)
                 }}> 
                  <Check />
                </IconButton>
                <IconButton color="error" onClick={() => { handleDelete(task.id) }}>
                  <Delete />
                </IconButton>
              </Box>
            </Box>
          ))
        }

        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <Button variant="outlined" onClick={() => {setOpen(true)}}>Ajouter une tâche</Button>
        </Box>
      </Box>

      <Dialog 
        open={open} 
        onClose={() => setOpen(false)} 
        sx={{ 
          '& .MuiDialog-paper': { 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minWidth: 400,
          } 
        }}
      >
        <DialogTitle>Ajouter une nouvelle tâche</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nom de la tâche"
            type="text"
            fullWidth
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Annuler</Button>
          <Button onClick={handleAddTask} variant="contained" color="primary">Créer</Button>
        </DialogActions>
      </Dialog>
      
    </Container>
  );
}

export default TodoPage;
