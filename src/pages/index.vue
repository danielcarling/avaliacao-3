<template>
  <v-container>
    <v-btn @click="openDialog">Adicionar Item</v-btn>
  </v-container>
  <v-container>
    <div v-for="task in tasks" :key="task.id" class="card-container">
      <v-card v-if="task.user_id === userStore.user.uid">
        <v-card-title>{{ task.username }}</v-card-title>
        <v-card-text>
          {{ task.task }}
        </v-card-text>
        <v-card-actions>
          <v-btn @click="editTask(task)">Editar</v-btn>
          <v-btn @click="deleteTask(task)">Excluir</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-container>

  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="editedTask.task"
                label="Tarefa"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
        <v-btn color="blue darken-1" text @click="save">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, onMounted, reactive, nextTick } from 'vue';
import { useUserStore } from '@/stores/user';

const dialog = ref(false);
const tasks = ref([]);
const editedIndex = ref(-1);
const defaultTask = { id: null, user_id: '', username: '', task: '' };
const editedTask = reactive({ ...defaultTask });

const userStore = useUserStore();

const formTitle = computed(() => (editedIndex.value === -1 ? 'Novo item' : 'Editar item'));

const fetchTasks = async () => {
  try {
    const response = await fetch('http://localhost:5008/tasks');
    tasks.value = await response.json();
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};

const openDialog = () => {
  editedIndex.value = -1;
  Object.assign(editedTask, defaultTask);
  dialog.value = true;
};

const editTask = (task) => {
  editedIndex.value = tasks.value.indexOf(task);
  Object.assign(editedTask, task);
  dialog.value = true;
};

const deleteTask = async (task) => {
  const index = tasks.value.indexOf(task);
  if (confirm('Tem certeza de que deseja excluir este item?')) {
    try {
      await fetch(`http://localhost:5008/tasks/${task.id}`, {
        method: 'DELETE'
      });
      tasks.value.splice(index, 1);
    } catch (error) {
      console.error('Erro ao excluir item:', error);
    }
  }
};

const close = () => {
  dialog.value = false;
  nextTick(() => {
    Object.assign(editedTask, defaultTask);
    editedIndex.value = -1;
  });
};

const save = async () => {
  if (editedIndex.value > -1) {
    try {
      await fetch(`http://localhost:5008/tasks/${editedTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedTask)
      });
      Object.assign(tasks.value[editedIndex.value], editedTask);
    } catch (error) {
      console.error('Erro ao atualizar item:', error);
    }
  } else {
    try {
      // Preencher os campos adicionais
      editedTask.user_id = userStore.user.uid;
      editedTask.username = userStore.user.displayName;

      const response = await fetch('http://localhost:5008/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedTask)
      });
      const newTask = await response.json();
      tasks.value.push(newTask);
    } catch (error) {
      console.error('Erro ao criar item:', error);
    }
  }
  close();
};

onMounted(fetchTasks);
</script>

<style scoped>
.card-container+.card-container {
  margin-bottom: 20px;

}
</style>